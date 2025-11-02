from celery import shared_task
import asyncio
from web_scraper.models import ScraperData
from web_scraper.Maerkte.Saturn.scrapeProdDetailsS import saturn_details
from web_scraper.Maerkte.Otto.scrapeProdDetailsO import otto_details


#scrapt und speichert Produkte in Datenbank
@shared_task
def moreScraping(input,filterDic,startpoint,activeScraper,time):
    print("---START moreScraping Task---")
    from Maerkte.Main import main
    
    print("---Start celeryTask moreScraping---")
    activeScraper = set(activeScraper) #fkt parameter wird end als liste gegeben
    res = asyncio.run(main(input,filterDic,startpoint,activeScraper,time))
  
    for produkt in res["results"]:
     pName = produkt[0]
     pAktuelle = produkt[1][0]
     pVorherige = produkt[1][1]
     pRabatt = produkt[1][2]
     pSterne = produkt[2]
     pUrl = produkt[3]
     pImage = produkt[4]
     ScraperData(name=pName,aktuellerPreis=pAktuelle,vorherigerPreis=pVorherige,rabatt=pRabatt,sterne=pSterne,produktUrl=pUrl,imageUrl=pImage).save() 

 
# scrape product details saturn
@shared_task
def scrapeDetails_saturn(url): 
    asyncio.run(saturn_details(url))    
  
    

@shared_task
def scrapeDetails_otto(url):
    asyncio.run(otto_details(url))

