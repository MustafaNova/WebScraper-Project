import sys
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")
from web_scraper.Maerkte.Saturn import goto_product, clickLoadMoreIfNeeded, performErrorCheck, goto_filtered, get_real_product_url, reject_cookies
import logging


                 
async def prepareSaturn(user_input: str,context,startpoint: int,filterDic: dict,activeScraper: set):
    try:
        
        url= f"https://www.saturn.de/de/search.html?query={user_input}"
        page2= await context.new_page()
        
        
        # goto page with url and then the url changes to the real product url. 
        # This url we can use to add parameter
        await get_real_product_url(page2,url)
        
        
         
        # without filter
        if not filterDic:
         await goto_product(page2,startpoint)     
    
                  
        # with filter
        else:
         await goto_filtered(page2,filterDic,startpoint)

    
        await reject_cookies(page2)
        
        
        # checks Errors that can occur and starts validation tests
        if not await performErrorCheck(page2,user_input,startpoint,filterDic):
            activeScraper.discard("Saturn")
            return None
        
    

        # returns if loadMoreBtn was clicked or not
        lmBtn: bool= await clickLoadMoreIfNeeded(page2, startpoint)
    

        return [page2,lmBtn]
    
    except Exception as e:
        
        print(f"FEHLER prepareS.py : {e}")
        logging.error(f"eingaben({user_input},{startpoint},{filterDic}) - {e}")
        
        activeScraper.discard("Saturn")
        return None