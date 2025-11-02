from django.shortcuts import render
from django.http import HttpResponse
import json,urllib.parse
from django.views.decorators.csrf import csrf_exempt
import asyncio

from web_scraper.Maerkte.Main.Main import main
from web_scraper.tasks import moreScraping
from web_scraper.models import ScraperData
from web_scraper.Hilfsfunktionen import querySet_to_list



 
def Home(request):
   print("Home aktiviert")
   return render(request,"web_scraper/base.html")
    
 
#nur bei der ersten Suche
def startScraper(request): 
   
   #Nötigen Infos auslesen
   filterDic={} # wenn keine Filter wird {} der Main-Fkt gegeben
   user_produkt=request.GET.get("produkt")   
   timeInt=request.GET.get("timeForScraper")
   activeScraper= filterDic["märkte"].split(";") if filterDic else ['Otto', 'Amazon', 'Alternate', 'Alza', 'Apple', 'Arlt', 'Berlet', 'ConradElectronic', 'Cyberport', 'ConradConnect', 'Computeruniverse', 'Caseking', 'Digitalo', 'DeinHandy', 'Discount24', 'Deltatecc', 'DeutschlandHandy', 'Euronics', 'EP:ElectronicPartner', 'Expert', 'E.Leclerc', 'EuronicsXXL', 'Fachmarkt24', 'Freenet', 'Funkwerk', 'Fujitsu', 'FritzBerger', 'GaleriaKarstadtKaufhof', 'Gigaset', 'Gorenje', 'Gravis', 'Giant', 'Saturn']
   
   #Scraping Funktion maximale Zeitdauer
   timeForScraper= int(timeInt) if timeInt!=None else 20
   
    
   #filter json decoden
   filter=request.GET.get("filter")
   if (filter): filterDic=json.loads(urllib.parse.unquote(filter))
      
    
   #User Session für Infinite Scrolling speichern
   request.session["user_produkt"]=user_produkt
   request.session["filterDic"]=filterDic
   request.session["activeScraper"]=activeScraper
   request.session["timeForScraper"]=timeForScraper
   request.session["scrapedCount"]=30 # 30 Produkte werden jetzt gescraped
   
   
    
         
   try:
      print("Scraper funktion aktiviert")
      startpoint=1
      

      #24 Produkte scrapen
      #for i in range(7,130,6):  
       #moreScraping.delay(user_produkt,filterDic,startpoint+i,activeScraper,timeForScraper) # [] anstatt set() bei activeScraper. MoreScraping.delay schickt fkt mit parametern in JSON Format an redis(in moreScraping wird wieder zu set()) 
       
      #6 Produkte scrapen   
      produkte=asyncio.run( main(user_produkt,filterDic,startpoint,set(activeScraper),timeForScraper) )
    
     
      
      if "timeoutFehler" in produkte and produkte["timeoutFehler"]==True:
         print("##timeOutFehler if Bedingung##")
         return render(request,"web_scraper/timeoutFehler.html")
          
      elif produkte["results"]==[]:
         print("##views,produkte['results']==[]##")
         return render(request,"web_scraper/keine_Produkte_gefunden.html")
           
           
      context={"produkte": produkte["results"]}   
      return render(request,"web_scraper/products.html",context)
   
   
   except Exception as e:
      print("startScraper Fehler aufgetreten",e)
      return HttpResponse("Fehler")




#Datenbank scrapingData zurückgeben und weitere 30 produkte scrapen mit CeleryTasks
def infiniteScrolling(request):
   
   scrapedCount= request.session.get("scrapedCount")
   user_produkt= request.session.get("user_produkt")
   filterDic= request.session.get("filterDic")
   activeScraper: list= request.session.get("activeScraper")
   timeForScraper= request.session.get("timeForScraper")
   
   
   #weiteren 30 Produkte im Hintergrund scrapen
   '''start=scrapedCount+1
   end=start+30 
   for startpoint in range(start,end,6):
      moreScraping.delay(user_produkt,filterDic,startpoint,activeScraper,timeForScraper)
   '''
   
   request.session["scrapedCount"]= scrapedCount + 30
   
   
   #Datenbank älteste Produkte rausnehmen. QuerySet in Liste umwandeln
   oldestProd= ScraperData.objects.order_by("createdTime")[0:6]  
   produkte: list= querySet_to_list(oldestProd)
   
     
   #Datenbank älteste Produkte entfernen
   oldestProd_time: list= ScraperData.objects.order_by("createdTime").values_list("createdTime",flat=True)[:6]
   ScraperData.objects.filter(createdTime__in=oldestProd_time).delete()
   
   
   
   #An Js-Frontend senden
   context={"produkte": produkte}   
   return render(request,"web_scraper/produkteDiv.html",context)
   
   
   

   
   
 
   
@csrf_exempt
def produkteAnnehmen(request):
   print("produkteAnnehmen aufgerufen")
   
   if request.method=="POST":
      data=json.loads(request.body)
      return render(request,"web_scraper/produkteDiv.html",data)
      
    
      
   
 
 
 
