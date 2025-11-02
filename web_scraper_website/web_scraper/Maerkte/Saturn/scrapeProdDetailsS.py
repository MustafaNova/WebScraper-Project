import logging, asyncio
from playwright.async_api import async_playwright
from web_scraper.Maerkte.Saturn import get_images, get_badges, get_configs, get_paymentPlan, get_description, get_technicalData, get_safetyData, get_accessoires
from web_scraper.models import ProductDetails_saturn
from asgiref.sync import sync_to_async


logging.basicConfig(filename="scrapeProdDetailsS.log",format="%(asctime)s - z.%(lineno)d - %(message)s ") #message=f"{url} - {e}"


async def saturn_details(url: str):
  print("---STARTING 'scrapeProdDetailsS.py'---")
    
  try:
    async with asyncio.timeout(30):
     async with async_playwright() as p:         
      browser= await p.chromium.launch(headless=False)
      page= await browser.new_page()
      await page.goto(url)
    
    
      # reject cookies
      await page.locator("button",has_text="Alle ablehnen").click()
      
      # type hints
      images: list | None
      badges: list | None
      configs: dict | None
      paymentPlan: dict | None
      descriptionContent: str | None
      technicalData: dict | None
      safety_Info: dict | None
      accessoires: list | None
      
      # coroutines
      corutines= [
      get_images(page),
      get_badges(page),
      get_configs(page),
      get_description(page),
      get_technicalData(page),
      get_safetyData(page),
      get_accessoires(page)      
      ]
      
      images, badges, configs, descriptionContent, technicalData, safety_Info, accessoires = await asyncio.gather(*corutines)        
      paymentPlan= await get_paymentPlan(page)
      
      # write in database  
      data = {
      "images": images,
      "badges": badges,
      "configs": configs,
      "descriptionContent": descriptionContent,
      "technicalData": technicalData,
      "safety_Info": safety_Info,
      "accessoires": accessoires,
      "paymentPlan": paymentPlan
      }
      
      entry= ProductDetails_saturn(name=url,data=data)
      await sync_to_async(entry.save)()
      
      print("---ENDING 'scrapeProdDetailsS.py'---")
      
  except asyncio.TimeoutError as e:
    logging.error(f"{url} - TimeoutError(exceeded timelimit of 30seconds)")
    print(f"exception: {e}")
  
    
  except Exception as e:
   logging.error(f"{url} - {e}")
   print(f"exception: {e}")
    
    
    
    
if __name__=="__main__":
  url= "https://www.saturn.de/de/product/_apple-ipad-wi-fi-11th-generation-tablet-128-gb-11-zoll-blau-2984280.html"
  name="ipad"
  asyncio.run(saturn_details(url))