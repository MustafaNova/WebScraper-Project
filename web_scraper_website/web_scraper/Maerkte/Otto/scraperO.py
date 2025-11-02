import sys,asyncio
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")
from web_scraper.Maerkte.Otto import get_href_and_name_safe,locator_exists,extract_price,extract_rating
from web_scraper.tasks import scrapeDetails_otto



#erste Produkt an index 1.data-list-position=1 
async def scraper_otto(i: int,targetPage,activeScraper: set):       
   
  try:
    async with asyncio.timeout(30):
      
     # check if locator exists 
     productOtto= await locator_exists(targetPage,activeScraper,i)
     if not productOtto: return None
     
     #scroll to product          
     await productOtto.scroll_into_view_if_needed() 
     
      
     #url and name
     res= await get_href_and_name_safe(productOtto)
     produktUrl, name= res[0], res[1]
     
     # extract productdetails with celery task
     #scrapeDetails_otto.delay(produktUrl) # DONT DELET
      
    
     preis: tuple= await extract_price(productOtto)    
      
     rating: str= await extract_rating(productOtto)
     
     bild_link= await productOtto.locator("img[class^='find_tile__productImage']").get_attribute("src")
         
     #Debugging Information
     print(f" succesfull otto {i}: {await productOtto.get_attribute("data-qa")}")
        
     return [name, preis, rating, produktUrl, bild_link]
   
  except asyncio.TimeoutError as e:
    print(e)
    return None

  except Exception as e:
        print(f"\n---\nFEHLER scraperO.py: {e}\n---\n")
        return None
        