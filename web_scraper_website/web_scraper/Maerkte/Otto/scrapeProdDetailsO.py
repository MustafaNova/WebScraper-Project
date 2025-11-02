import sys,os,django
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_scraper_website.settings')
django.setup()
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")

from playwright.async_api import async_playwright
import asyncio
import logging
from Maerkte.Otto import getInteractives,setup_page,get_image_slider,get_prodDetails_images,get_table,get_article_description,get_badges
from web_scraper.models import ProductDetails_otto
from asgiref.sync import sync_to_async

logging.basicConfig(filename="scrapeProdDetailsO.log",format="%(asctime)s - z.%(lineno)d - %(message)s ") #message=f"{url} - {e}"


async def otto_details(url: str):
  print("---START OTTO_DETAILS---")
  try:
    async with asyncio.timeout(30):
     async with async_playwright() as p:
        page= await setup_page(p,url)
    
        # images
        slider_images: list|None= await  get_image_slider(page)                  
        pd_images: dict= await get_prodDetails_images(page)


        # product details table
        pd_table: dict= await get_table(page)
              
        # article description if exists
        article_desc: dict|None= await get_article_description(page)


        # badges(gray boxes on top) if exists
        badges: list|None= await get_badges(page)

            
        # interactive Elements on the right side of the website    
        interactives: list|None= await getInteractives(page,url)
        
        
        # Datenbank reinschreiben 
        res= {"slider_images": slider_images, "pd_images": pd_images, "pd_table": pd_table, "article_desc": article_desc, "badges": badges, "interactives": interactives}
        
        entry= ProductDetails_otto(name=url,data=res)
        await sync_to_async(entry.save)()
        
        print("---END OTTO_DETAILS---")
      
    
  except asyncio.TimeoutError as e:
    logging.error(f"{url} - {e}")
    print(e)
                    
  except Exception as e:
    error_message=f"{url} - {e}"
    logging.error(error_message)
    print(e)
            
        
        
        
    






url= "https://www.otto.de/p/hiland-mountainbike-26-27-5-29-zoll-bike-mtb-fuer-maenner-frauen-studenten-pendlerfahrrad-mit-v-bremse-21-gang-federgabel-hochwertiger-rahmen-kettenschaltung-S0QD90PE/#variationId=S0QD90PEASH7"
url2= "https://www.otto.de/p/apple-ipad-10-2-wi-fi-plus-cellular-2021-tablet-10-2-64-gb-ipados-4g-lte-1503515566/#variationId=1503515567"
imgGalery= "https://www.otto.de/p/tazzio-cargohose-16610-stretch-mit-elasthan-regular-fit-S0R1N0MV/#variationId=S0R1N0MV0D4X"
iphone= "https://www.otto.de/p/apple-iphone-16-smartphone-15-54-cm-6-12-zoll-128-gb-speicherplatz-48-mp-kamera-128gb-256gb-512gb-1909231538/#variationId=1909231539"

if __name__=="__main__":
 asyncio.run(otto_details(iphone))