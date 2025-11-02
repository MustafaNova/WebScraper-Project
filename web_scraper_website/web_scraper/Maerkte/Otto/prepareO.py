import sys
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")
from web_scraper.Maerkte.Otto import extractNumber, setup, check_page_errors, find_max_product_count, adjust_otto_pagination, navigate_to_next_pageO
from playwright.async_api import Page




async def prepareOtto(startpoint: int,user_input: str,filterDic: dict,context,activeScraper: set) -> list:
    print("otto page gestartet")
    
    try:           
        page= await setup(user_input, filterDic, startpoint, context)      

        if await check_page_errors(page, activeScraper):
            return None
      
        
        #maximale Anzahl Produkte die es zur Suchanfrage gibt
        maxNum: int= await find_max_product_count(page)
      
        
        #Prüfen ob startpoint in ungültigem Bereich ist
        if startpoint > maxNum: 
            activeScraper.discard("Otto")
            return None
                 
        #Korrigierung der pagination Abschätzung Otto
        await adjust_otto_pagination(page, startpoint, activeScraper)
            
        #Maximum Produkt Zahl auf aktuelle Page, damit man weis wann overflowpage nötig ist
        pageMaxAttribute= await page.locator("section[id='reptile-tilelist'] > article").last.get_attribute("data-qa") 
        pageMax= extractNumber(pageMaxAttribute)  
        print(pageMax)
        
        # es werden +6 produkte gescrapt. schauen ob overflowpage notwendig ist
        overflowpage= None
        if startpoint+6 > pageMax:
            overflowpage: Page= await navigate_to_next_pageO(page, context)
            

         
        return [page,overflowpage,pageMax,maxNum]   
    
    except Exception as e:
        print(f"FEHLER prepareO.py: {e}")
        activeScraper.remove("Otto")
        return None
    
    
    
        
        