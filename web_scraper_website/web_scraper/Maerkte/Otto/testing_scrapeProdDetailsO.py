from playwright.async_api import async_playwright
from web_scraper.Maerkte.Otto import otto_details
import asyncio



async def finding_errors(url):  
    
    async with async_playwright() as p:
        browser= await p.chromium.launch(headless=True)
        page= await browser.new_page()
        await page.goto(url)
        
        # für 20 Produkte auf dieser Seite anwenden
        for i in range(1,20):
         prodContainer= page.locator(f"article:not([class*='similar'])[class^='product'][data-list-position={i}]")
         rest_link= await prodContainer.locator(f"a.find_tile__productLink").get_attribute("href")
         produktUrl= "https://www.otto.de" + rest_link
         otto_details(produktUrl,1)
         
         
    
    
    
async def main():
    produktnamen = [
    "iphone 14",
    "samsung galaxy s23",
    "playstation 5",
    "macbook air",
    "nintendo switch",
    "kaffeevollautomat",
    "dyson v15",
    "samsung qled tv",
    "waschmaschine",
    "bose kopfhoerer",
    "ipad pro",
    "lenovo laptop",
    "philips hue",
    "samsung galaxy tab",
    "bosch waschmaschine",
    "siemens geschirrspueler",
    "kitchenaid kuechenmaschine",
    "beats kopfhoerer",
    "smeg kuehlschrank",
    "lego technic",
    "dyson airwrap",
    "sony bravia tv",
    "xbox series x",
    "fossil smartwatch",
    "nintendo switch spiele",
    "samsung soundbar",
    "acer predator",
    "rowenta staubsauger",
    "jbl lautsprecher",
    "anker powerbank"
    ]

    urls = [f"https://www.otto.de/suche/{name.replace(' ', '-')}" for name in produktnamen]


    tasks= []
    for url in urls:
        tasks.append(finding_errors(url))  

    await asyncio.gather(*tasks)          


asyncio.run(main())