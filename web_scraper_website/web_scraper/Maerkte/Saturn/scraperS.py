import sys, logging, asyncio
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")
from web_scraper.Maerkte.Saturn import locator_exists, extract_price, extract_rating, container_is_advertisement
from playwright.async_api import Locator
from web_scraper.tasks import scrapeDetails_saturn


# startet von index 0 produkte
async def scraper_saturn(productNumber: int,targetPage: str,activeScraper: set,startpoint, user_input, filterDic):
    
    try:
     async with asyncio.timeout(30):  
        # check if the product locator exists
        saturn_container: bool|Locator= await locator_exists(targetPage, productNumber, activeScraper)
        
        if not saturn_container: 
            logging.error(f"eingaben({user_input},{startpoint},{filterDic}) - locator{productNumber} doesnt exist")
            print(f"scraperS locator of {productNumber} doesnt exist")
            return None
        
        
        # scroll to container
        await saturn_container.scroll_into_view_if_needed()    
        
        
               
        # skipping the advertisement container
        if await container_is_advertisement(saturn_container):
            print(f"container({productNumber}) was advertisement")
            return None     
        
        
        # Name
        name: str= await saturn_container.locator("p[data-test='product-title']").inner_text()
        
        # Produktlink    
        rest_link= await saturn_container.locator("a[data-test^='mms-router-link-product-list-item-link']").get_attribute("href")
        productLink= "https://www.saturn.de" + rest_link
        
        
        # extract productdetails with celery task
        #scrapeDetails_saturn.delay(productLink) # DONT DELETE
        
        
        #Preise  
        preis_tupel: tuple= await extract_price(saturn_container)         
        
        
        #Bewertungen
        rating: str= await extract_rating(saturn_container)       

        
        #Bildlink      
        bild_link= await saturn_container.locator("//picture[@data-test='product-image']/img").get_attribute("src")
        
        print(f"succesfull saturn {productNumber}")
        return [name, preis_tupel, rating, productLink, bild_link]
    
    except asyncio.TimeoutError as e:
     print(e)
     return None
    
    except Exception as e:
        
        print(f"FEHLER scraperS.py({productNumber}): {e}")
        logging.error(f"eingaben({user_input},{startpoint},{filterDic}) - {e}")
        return None