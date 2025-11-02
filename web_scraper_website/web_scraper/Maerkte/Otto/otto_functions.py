import re,math,logging,asyncio
from playwright.async_api import Page, Locator


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
    return url + f"&l=gq&o={numOfPageTurns}"

 
#Korrigierung der pagination Abschätzung Otto
#erste und letzte ProduktNummer auf der aktuellen Seite scrapen. Prüfen ob startpoint zwischen ihnen ist, wenn nicht soll es ein page nach vorne oder zurück clicken 
async def adjust_otto_pagination(page, startpoint: int, activeScraper: set):
    nextBtn=page.locator("#reptile-paging-bottom-next")
    while True:
        firstProduct=await page.locator("section[id='reptile-tilelist'] > article").first.get_attribute("data-qa") 
        lastProduct=await page.locator("section[id='reptile-tilelist'] > article").last.get_attribute("data-qa")
    
        firstNum= extractNumber(firstProduct)
        lastNum= extractNumber(lastProduct)
        print(f"page erste und letze Werte: {firstNum}<={startpoint}<={lastNum}")

        #korrekte Abschätzung
        if firstNum <= startpoint <= lastNum:
            break

        #Abschätzung korrigieren
        elif startpoint < firstNum:
            print("runter")
            prevBtn=page.locator("#reptile-paging-bottom-prev")        
            await prevBtn.scroll_into_view_if_needed()
            async with page.expect_navigation():
             await prevBtn.click()
    
        
        elif startpoint > lastNum:
            print("hoch")
        
        if await nextBtn.count()==0: 
            activeScraper.remove("Otto")
            return False
        
        await nextBtn.scroll_into_view_if_needed()
        async with page.expect_navigation():
            await nextBtn.click()


async def find_max_product_count(page) -> int:
    nextBtn=page.locator("#reptile-paging-bottom-next")
    
    #wenn kein nextBtn vorhanden, dann ist man auf der letzten Seite
    if await nextBtn.count()==0:
        maxProd=await page.locator("section[id='reptile-tilelist'] > article").last.get_attribute("data-qa")
        return extractNumber(maxProd)
        
    
    else:
        #HilfsInformation um auf fertige Navigation zu warten
        paginationInfo=await page.locator("#reptile-page-info").inner_text()
        
        #letze Seite navigieren
        await page.locator("xpath=//li[@id='reptile-paging-bottom-next']/preceding-sibling::*[1]").scroll_into_view_if_needed()       
        await page.locator("xpath=//li[@id='reptile-paging-bottom-next']/preceding-sibling::*[1]").click()       
        await page.wait_for_function("(paginationInfo) => paginationInfo!=document.querySelector('#reptile-page-info').innerText ",arg=paginationInfo)
        
        #letzte Element zahl extrahieren
        await page.locator("section[id='reptile-tilelist'] > article").highlight()
        maxProd=await page.locator("section[id='reptile-tilelist'] > article").last.get_attribute("data-qa")
        maxNum=extractNumber(maxProd)
        
        #zu startpoint Seite zurück navigieren       
        await page.go_back()
        await page.wait_for_function("(paginationInfo) => paginationInfo==document.querySelector('#reptile-page-info').innerText ",arg=paginationInfo)
        
        return maxNum



async def check_page_errors(page, activeScraper) -> bool:
    #keine Produkte überprüfen Otto  
    err= await page.get_by_text("Hoppla, da ist etwas schiefgegangen. Unser System hat einen Schluckauf - sollte schnell vorbei sein. Hier findest du Artikel, die dir auch gefallen könnten.").count()
    err2= await page.get_by_text("Hoppla, deine gewünschten Artikel finden wir nicht mehr. Hier findest du Artikel, die dir auch gefallen könnten").count()
    err3= await page.locator("[data-pagecluster='GlobalErrorPage502']").count()
    errors= [err,err2,err3]
    
    if any(errors):
        activeScraper.remove("Otto")
        print("OTTO Fehler")
        return True
    return False
        
        
        
async def setup(user_input, filterDic, startpoint, context) -> Page:
    url_otto=f"https://www.otto.de/suche/{user_input}?"
    urlTemp=filterOttoUrl(url_otto,filterDic)
    url=await pagination(urlTemp,startpoint,context)   
      
    
    page=await context.new_page()              
    await page.goto(url)
    return page


def filterPrice(value):  
    lst=[c for c in value if c.isdigit()]
    lst.insert(-2,".")
    return float("".join(lst))   

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



# bei otto wird statt 1200 -> 1.200 in attribut geschrieben
def formatNumber(num: int) -> str:   
    if len(str(num)) > 3:
        return f"{num:,}".replace(",",".")
    
    return str(num)


async def locator_exists(targetPage,activeScraper: set,i: int):
    productOtto= targetPage.locator(f"article:not([class*='similar'])[class^='product'][data-list-position='{formatNumber(i)}']")
    
    if await productOtto.count()==0:
     if "Otto" in activeScraper: activeScraper.remove("Otto")  
     return False
    
    return productOtto


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


# Help

# label,options and current choosen option
'''async def get_label_and_options(elem):
    label= await elem.locator(":scope > :first-child").inner_text()
    
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
    
    
    return {"label": label, "selecInfos": tuple(selecInfos) }'''


# label,options and current choosen option
async def get_interactive(elem) -> dict:
    
    # label
    label= await elem.locator("label").inner_text()
    
    # current option
    curOption= await elem.locator("select").get_attribute("data-value")
    
    
    # all options
    options= elem.locator("option")
    cnt= await options.count()
    
    optionValues= []
    for i in range(0,cnt):
        option= options.nth(i)
        optionVal= await option.inner_text()
        optionValues.append(optionVal)
        
    return {"label": label, "curOption": curOption, "options": optionValues} 




def checkingError(elemCount,url):
    if  elemCount != 1 : 
        logging.error(f"{url} - interaktive Elem, div Anzahl != 1")
        print("FEHLER: interaktive Elem, div Anzahl != 1")
        

   
# Main
async def getInteractives(page,url: str) -> list|None:
    interactElems= page.locator("[class='pdp_dimension-selection__type']")
    interactElemsCount= await interactElems.count()
    
    if interactElemsCount == 0: return None
  
    interactives= [] 
    for i in range(0,interactElemsCount):
        elem= interactElems.nth(i).locator(":scope > :first-child")
        
        '''elemCount = await elem.count()
        checkingError(elemCount,url)'''
                        
        oneInteractive: dict= await get_interactive(elem)
        interactives.append(oneInteractive)
        
        
    return interactives
    
async def take_screenshot(elem,productNumber):
    
    imgDir="web_scraper_website/web_scraper/ProductDetailImages/"    
    prodImgPath= imgDir + f"product{productNumber}.png"
    
    await elem.scroll_into_view_if_needed()
    await elem.screenshot(path=prodImgPath)
    
    return prodImgPath

def extractNumber(stringAttribut: str) -> int:
    firstNum= re.search(r"\d+(\.\d+)?",stringAttribut).group()
    if "." in firstNum:
        firstNum=firstNum.replace(".","")
    
    return int(firstNum)


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






def extractNumber(stringAttribut: str) -> int:
    firstNum= re.search(r"\d+(\.\d+)?",stringAttribut).group()
    if "." in firstNum:
        firstNum=firstNum.replace(".","")
    
    return int(firstNum)



# öffnet aktuelle seite in neuem page context. da clickt es auf next Button. es wartet bis es fertig geladen ist. es gibt diese Seite zurück
async def navigate_to_next_pageO(ottoPage, context) -> Page:
    
    #neue Page öffnen
    overflowpage= await context.new_page()
    await overflowpage.goto(ottoPage.url) 
    
    #zur nächsten Seite navigieren    
    paginationInfo=await overflowpage.locator("#reptile-page-info").inner_text()
    await overflowpage.locator("#reptile-paging-bottom-next").click()            
    await overflowpage.wait_for_function("(paginationInfo) => paginationInfo!=document.querySelector('#reptile-page-info').innerText ",arg=paginationInfo)
    
    return overflowpage  




async def open_overflowPageO_If_Needed(flags: dict, curProd: int, pageMax: int, prepOtto: list, context) -> None:
    if flags["firstTimeO"] and curProd > pageMax:                              
     prepOtto[0]= await navigate_to_next_pageO(prepOtto[0], context)
     flags["firstTimeO"]= False
     
     
     
async def setup_page(p,url) -> Page:
    browser= await p.chromium.launch(headless=False)
    page= await browser.new_page()
    await page.goto(url)

    #Cookies ablehnen and waiting loading of website
    ablehnenBtn=page.locator("button",has_text="Einwilligung ablehnen")
    if await ablehnenBtn.count()==1:
        await ablehnenBtn.click()
    await page.wait_for_selector("oc-icon-button-v2[class*='image'] + * > :first-child")
    
    return page


# extracts images of the vertical image slider galery on the left 
async def get_image_slider(page) -> list|None:
        
    picList= page.locator("oc-icon-button-v2[class*='image'] + * > :first-child")
    allPic= picList.locator("> *")  
    cnt= await allPic.count()
    
    if cnt == 0: return None
    
    # extract images
    images: list= []
    for i in range(0,cnt):
     img= allPic.nth(i).locator(":first-child")
     imgSrc=await img.get_attribute("src")
     images.append(imgSrc)
      
    return images



# Help

async def extract_opc_provider(opc_provider) -> dict:
    
    res= {}
    all_container= opc_provider.locator("> div")
    cnt= await all_container.count()
    
    # first container is bigger content
    first_container= all_container.nth(0)
    first_image= "https://www.otto.de" + (await first_container.locator("source[srcset*='desktop.jpg']").get_attribute("srcset"))
    first_header= await first_container.locator("[data-qa*='headline']").inner_text()
    first_description= await first_container.locator("[data-qa*='description']").inner_text()
    
    res["Container0"]= {"image": first_image, "header": first_header,"description": first_description}
    
    # all other containers
    for i in range(1,cnt):

        container= all_container.nth(i)
        image= "https://www.otto.de" + (await container.locator("source[srcset*='desktop.jpg']").get_attribute("srcset"))
        header= await container.locator("[data-qa*='headline']").inner_text()
        description= await container.locator("[data-qa*='teaser-text']").inner_text()
        
        res[f"Container{i}"]= {"image": image, "header": header, "description": description}
    
    return res


async def extract_img_galery(img_gallery: Locator) -> dict:
    all_images= img_gallery.locator("> [class*='desktop'] img")
    cnt= await all_images.count()
    
    res= {}
    for i in range(0,cnt):
        img= all_images.nth(i)
        alt= await img.get_attribute("alt")
        src= await img.get_attribute("src")
        res[f"Container{i}"]= {"src": src, "alt": alt}
    
    return res


# Main

# extract images of the Product Details
async def get_prodDetails_images(page) ->dict|None:       
    
    # different presentations of the pictures. provider says what type of presentation
    appleProvider=page.locator("[data-provider-name='HMMH_APPLE'][data-qa='manufacturer-content-provider-container']")
    opc_provider= page.locator("[data-provider='opc']")
    img_gallery= page.locator("#pdp-image-gallery")
    
                
    if await img_gallery.count()==1:                      
        res: dict= await extract_img_galery(img_gallery)
         
    elif await appleProvider.count()==1:
        link= "https://www.otto.de" + (await appleProvider.locator("source[srcset*='desktop.jpg']").get_attribute("srcset"))
        res= {"Container0": link}

        
    elif await opc_provider.count()==1:
        res: dict= await extract_opc_provider(opc_provider)
    
    else:
        res= None
    
    
    return res



# Help

async def get_rows(table) -> list:
    rows=[]
    
    allRows= table.locator("tr")
    rowsCount= await allRows.count()
    
    for i in range(0,rowsCount):
        rowChilds= allRows.nth(i).locator("> *")
        left, right= await rowChilds.first.inner_text(), await rowChilds.last.inner_text()
        rows.append((left,right))
    
    return rows



#Überschrift der Tabelle. bei ipad gibts mehrere Tabellen mit mehreren Überschriften.
# wenn eine Tabelle, dann hat es nur Überschrift Details 
async def get_header(table,tableCnt) -> str:
    if tableCnt==1:
        return "Details"
    else:
        return await table.locator("caption").inner_text()
    


# Main

# product details tables extracting
async def get_table(page) -> dict|None:
    allTables= page.locator("h2:has-text('Details') + * > [class*='details'] > *")
    tableCnt= await allTables.count()
      
    if tableCnt == 0: return None
     
    res= {}    
    for i in range(0,tableCnt):                
        table= allTables.nth(i)
        
        # extract infos
        key: str= await get_header(table,tableCnt)
        rows: list= await get_rows(table)
        
        res[key]= rows
    
    return res

# Help

# Artikel-Nr.(unter Artikelbeschreibung einfügen)
async def get_articleNum(page,resDict):
    articlenum= page.locator("[data-qa='articleNr']")
    count= await articlenum.count()
    
    if count == 0: return
    
    resDict["articleNum"]= await articlenum.inner_text()


async def get_bulletPoints(page, res):
    points= page.locator("[class*='pdp_selling-points'] li")
    pointsCount= await points.count()
    
    if pointsCount == 0: return 
   
    bulletpoints= []
    for i in range(0,pointsCount):
        pointTxt=await points.nth(i).inner_text()
        bulletpoints.append(pointTxt)
    
    res["bulletPoints"]= bulletpoints


async def get_descriptionTxt(page, res):
    dscTxt= page.locator("[class*='js_pdp_description__expander']")
    count= await dscTxt.count()
    
    if count == 0: return
    
    res["descriptionTxt"]= await dscTxt.inner_text()


# Main
async def get_article_description(page) -> dict|None:
    res= {}
      
    # writes in res if the infos exists 
    await get_articleNum(page, res)
    await get_bulletPoints(page, res)
    await get_descriptionTxt(page, res)
    
    if res == {}: return None
    return res
   

async def get_badges(page) -> list|None:
    boxList= page.locator("[class='pdp_top-info__list']")
    cnt= await boxList.count()
    
    if cnt == 0: return None
    
    badges= [] # [(28,32;"Leistung Akku"),(10,56;"Bildschirmdiagonale")]  
    boxes= boxList.locator("> *")
    boxesC= await boxes.count()
    
    for i in range(0,boxesC):
        value= await boxes.nth(i).locator("> *").first.inner_text() 
        label= await boxes.nth(i).locator("> *").last.inner_text() 
        badges.append((value,label))
        
    return badges




