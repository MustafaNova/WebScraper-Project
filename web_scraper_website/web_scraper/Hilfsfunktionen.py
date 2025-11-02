import re,math,asyncio
import logging
from web_scraper.models import ScraperData




def filterPrice(value):  
    lst=[c for c in value if c.isdigit()]
    lst.insert(-2,".")
    return float("".join(lst))   


def incrementPage(url):
    res=re.findall(r"page=\d+",url)
    newNum=int(res[0][-1])+1
    newUrl=re.sub(r"page=\d+",f"page={newNum}",url)
    return newUrl

def filterOttoUrl(url,filterDic):
    if (filterDic=={}): return url
    
    filterUrl={"Preis: aufsteigend": "&sortiertnach=preis-aufsteigend",
            "Preis: absteigend":"&sortiertnach=preis-absteigend",
            "Bewertungen":"&sortiertnach=bewertung",
            "TopSeller":"&sortiertnach=topseller"                  
            }
    
    bewertungenUrl={"5 &mehr":"&bewertung=5-sterne",
                    "4 &mehr":"&bewertung=ab-4-sternen",
                    "3 &mehr":"&bewertung=ab-3-sternen",
                    "2 &mehr":"&bewertung=ab-2-sternen",
                    "1 &mehr":"&bewertung=ab-einem-stern"}
    
    speicherKapUrl={"64GB &mehr": "&speicherkapazitaet=128-gb,256-gb,512-gb,64-gb,groesser-1-tb",
                    "128GB &mehr": "&speicherkapazitaet=128-gb,256-gb,512-gb,groesser-1-tb",
                    "256GB &mehr": "&speicherkapazitaet=256-gb,512-gb,groesser-1-tb",
                    "512GB &mehr": "&speicherkapazitaet=512-gb,groesser-1-tb",
                    "1TB &mehr": "&speicherkapazitaet=groesser-1-tb"                           
                    }
    
    for key,value in filterDic.items():
        
        if key=="filter":
            url+=filterUrl[value[0]]
            
        elif key=="preis":
            zahlenArray=re.findall(r"\d+",value[0])
            anfang,ende= int(zahlenArray[0]), int(zahlenArray[1])                   
            url+=f"&preis-in-eur~ab={anfang}&preis-in-eur~bis={ende}"
            
        elif key=="bewertung":
            url+=bewertungenUrl[value[0]]
            
        elif key=="speicherKap":
            url+=speicherKapUrl[value[0]]
            
        elif key=="marken":
            lower=[s.lower() for s in value.split(",")]
            url+= "&marke=" + ",".join(lower)
            
            
    
    return url

def filterSaturnUrl(url,filterDic):
            
    if (filterDic=={}): return url #wenn keine Filter, normal scrapen
    
    filterUrl={"Preis: aufsteigend":"&sort=currentprice+asc",
            "Preis: absteigend":"&sort=currentprice+desc",
            "Bewertungen":"&sort=customerrating+desc",
            "TopSeller":"&sort=salescount+desc"}
    
    bewertungenUrl={"5 &mehr":"&customerratingNoDec=[5%20TO%205]",
                    "4 &mehr":"&customerratingNoDec=[4%20TO%205]",
                    "3 &mehr":"&customerratingNoDec=[3%20TO%205]",
                    "2 &mehr":"&customerratingNoDec=[2%20TO%205]",
                    "1 &mehr":"&customerratingNoDec=[1%20TO%205]"}
    
    #das ist nur für tablet speicherKapazität gibts nicht bei allen
    for key,value in filterDic.items():
        
        if key=="filter":
            url+=filterUrl[value[0]]
            
        elif key=="preis":
            zahlenArray=re.findall(r"\d+",value[0])
            anfang,ende= int(zahlenArray[0]), int(zahlenArray[1])
            url+=f"&currentprice={anfang}-{ende}"
        
        elif key=="bewertung":
            url+= bewertungenUrl[value[0]]
        
        elif key=="speicherKap":
            anfangGb=re.findall(r"\d+",value[0])[0]
            url+=f"&capacity={anfangGb}-2000"
        
        elif key=="marken":
            arrayMarken=[s.upper() for s in value.split(",")]
            url+= "&brand=" + "%20OR%20".join(arrayMarken)
            
        
                        
    return url

async def route(route,request):            
    if request.resource_type in ["ping","xhr","font","other","stylesheet","css"]  :
        await route.abort()             
    else:
        await route.continue_() 

#Seite abschätzen, wo das Produkt sein kann
async def pagination(url,startpoint,context):
    #davon ausgegangen das jede otto produktseite 120produkte hat
    if startpoint<=120: return url 
    
    #Schritt zahl in url extrahieren
    extractPage= await context.new_page()
    await extractPage.goto(url)
    
    async with extractPage.expect_navigation():
     await extractPage.locator("#reptile-paging-bottom-next").click()   
    
    #Zahl extrahieren      
    stepNum=int(re.search(r"l=gq&o=\d+",extractPage.url).group()[7:])
    await extractPage.close()
    
    #anzahl Schritte berechnen und Zahl ausgeben
    numOfPageTurns=stepNum * (math.ceil(startpoint/120)-1)  #0-120 oben if abgebrochen. 121-240 ->2 . 241-360 -> 3. zu page 2, soll es ber nur einmal *stepNum machen, weil bei page=0 gibts das nicht
    return url + f"l=gq&o={numOfPageTurns}"

def extractNumber(stringAttribut: str) -> int:
    firstNum= re.search(r"\d+(\.\d+)?",stringAttribut).group()
    if "." in firstNum:
        firstNum=firstNum.replace(".","")
    
    return int(firstNum)
     
# bei otto wird statt 1200 -> 1.200 in attribut geschrieben
def formatNumber(num: int) -> str:   
    if len(str(num)) > 3:
        return f"{num:,}".replace(",",".")
    
    return str(num)



#Funktion: QuerySet wird in die Struktur von "results" bei Main.py gebracht
#Warum: Template geht von dieser Struktur aus und greift dementsprechend zu. Bei QuerySet treten Probleme auf


def querySet_to_list(querySet):
   res= []
   data=ScraperData.objects.order_by("createdTime").values_list("name","aktuellerPreis","vorherigerPreis","rabatt","sterne","produktUrl","imageUrl")[0:6]  
   
   for prod in data:
      name=prod[0]    
      aktuellerPreis=prod[1]
      vorherigerPreis=prod[2]
      rabatt=prod[3]    
      sterne=prod[4]
      produktUrl=prod[5]
      imageUrl=prod[6]     
      res.append([name,(aktuellerPreis,vorherigerPreis,rabatt),sterne,produktUrl,imageUrl])
   
   return res





async def extract_label_and_selections(elem):
    label= await elem.first.inner_text()
    
    selections= elem.locator("[data-dimension-type] > *")
    selectionsCount= await selections.count()
    
    selecInfos= []
    for i in range(0,selectionsCount):
        selecElem= selections.nth(i)
        value= await selecElem.locator("> input").get_attribute("value")
        imgLink= None 
        
        img= selecElem.locator("> a")
        if await img.count()==1: imgLink= await img.get_attribute("href")   
        selecInfos.append((value,imgLink))
    
    
    return {"label": label, "selecInfos": tuple(selecInfos) }


def checkingError(elemCount,url):
    if  elemCount != 1 : 
        logging.error(f"{url} - interaktive Elem, div Anzahl != 1")
        print("FEHLER: interaktive Elem, div Anzahl != 1")
     

async def getInteractives(interactElems,interactElemsCount,url: str) -> list:
    
    if interactElemsCount > 0:
        interactives= []
        
        for i in range(0,interactElemsCount):
            elem= interactElems.nth(i).locator("> div:not([class])")
            elemCount = await elem.count()
            
            checkingError(elemCount,url)
                         
            oneInteractive: dict= await extract_label_and_selections(elem)
            interactives.append(oneInteractive)
           
        
        return interactives


#error checking
def checkInteractivesCount(scrapedInteractives: int, trueInteractives: int,url: str) -> None:
    if scrapedInteractives!=trueInteractives:
        error_message=f"{url} - Scraped({scrapedInteractives}) -  realNum({trueInteractives}) - Number of scraped interactive Elements doesnt equal the real Number"
        logging.error(error_message)
        print(f"----------\nFehler interaktive Elemente Anzahl:\nurl: {url}\nanzahl gescrapte Elem: {scrapedInteractives}\ntatsächliche Anzahl Elem: {trueInteractives}\n----------\n")
        return
    
    
    
async def take_screenshot(elem,productNumber):
    
    imgDir="web_scraper_website/web_scraper/ProductDetailImages/"    
    prodImgPath= imgDir + f"product{productNumber}.png"
    
    await elem.scroll_into_view_if_needed()
    await elem.screenshot(path=prodImgPath)
    
    return prodImgPath



#für scraperO: produktlink scrapen, falls länger als 3 sekunden, soll zum produkt scrollen und nochmal versuchen
async def get_href_and_name_safe(productOtto):
    url= "https://www.otto.de"
    try:
        url+= await asyncio.wait_for(productOtto.locator(f"a.find_tile__productLink").get_attribute("href"),timeout=3)
        name= await productOtto.locator("a.find_tile__productLink").get_attribute("title")
    
    except asyncio.TimeoutError:
        await productOtto.scroll_into_view_if_needed()
        url+= await productOtto.locator("a.find_tile__productLink").get_attribute("href")
        name= await productOtto.locator("a.find_tile__productLink").get_attribute("title")
        return [url,name.replace('"',"")]
                    
    return [url,name.replace('"',"")]



async def locator_exists(targetPage,activeScraper: set,i: int):
    productOtto= targetPage.locator(f"article:not([class*='similar'])[class^='product'][data-list-position='{formatNumber(i)}']")
    
    if await productOtto.count()==0:
     if "Otto" in activeScraper: activeScraper.remove("Otto")  
     return False
    
    return productOtto


async def extract_price(productOtto):
     preis_locator=await productOtto.locator(f"div.find_tile__priceAndUVP").inner_text()
     preis= preis_locator.split("\n") # Liste von aktuelle und vorherige Preis
     
     
     if len(preis)==1:             
      return tuple([filterPrice(preis[0]),None,None])   
        
     else:      
       neue_p=filterPrice(preis[0])
       alte_p=filterPrice(preis[1])
       rabatt=int(((alte_p-neue_p)/alte_p)*100)      
       return tuple([neue_p,alte_p,rabatt]) 
   
   
   
async def extract_rating(productOtto):
     rating_stars=productOtto.locator(".reptile_tile__rating__stars")
     rating_stars_count= await rating_stars.count()
     
     if rating_stars_count==1:
         
         filled50, half50, empty50=0, 0, 0
                  
         for stern in range(5):
          sterne_link_filled= await rating_stars.locator(f"use>>nth={stern}").get_attribute("xlink:href")
          sterne_link_half= await rating_stars.locator(f"use>>nth={stern}").get_attribute("xlink:href")
          if "#pl_icon_rating-filled50" in sterne_link_filled:
              filled50+=1
          elif "#pl_icon_rating-half50" in sterne_link_half:
              half50+=1
          else:
              empty50+=1
              
         anzahl_bewertungen= await productOtto.locator(".reptile_tile__rating__number").inner_text() 
         
          
        
          
         return f"{filled50},{half50},{empty50},{anzahl_bewertungen[1:-1]}" #[1:-1] weil Zahlen: (56) 
         
     else:
        return "keine Bewertungen"