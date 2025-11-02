import os,sys,django

import logging
logging.basicConfig(
    filename= "mainSaturn.log",
    format= "%(asctime)s - %(lineno)d - %(message)s" #eingaben({user_input},{startpoint},{filterDic}) - {e}
)


sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_scraper_website.settings')
django.setup()

sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")

import asyncio
from playwright.async_api import async_playwright
from web_scraper.Maerkte.Main import prepare_scraping, creating_scraper_tasks, debugPrint, give_correct_returnValue

async def main(user_input: str, filterDic: dict, startpoint: int, activeScraper: set ,timeForScraper: int):
 async with async_playwright() as p:
    
    #setup 
    browser= await p.chromium.launch(headless=True)
    context= await browser.new_context()

    
    #Contains preparation Informations 
    prep: dict|None= await prepare_scraping(user_input, filterDic, startpoint, activeScraper, context)
    
    
    # Error with all preparing functions
    if not prep:
        return {"results": [], "activeScraper":activeScraper}

   
    # Creating scraping tasks
    alle_produkte: list= await creating_scraper_tasks(startpoint, activeScraper, prep, user_input, filterDic)
    
    # extract returnValues of the tasks and reacts to empty results
    returnValue: dict= await give_correct_returnValue(alle_produkte, activeScraper, timeForScraper)
    
    return returnValue
    

if __name__=="__main__":
 produkt= "ipad"
 startpoint= 1
 #filter= {"filter": ["Bewertungen"], "bewertung": ["4 &mehr"]}
 filter={}
 activeScraper= set(["Saturn","Otto"])
 timeout= 22222222
 
 res= asyncio.run(main(produkt,filter,startpoint,activeScraper,timeout))
 #print(res)
 debugPrint(res)





 