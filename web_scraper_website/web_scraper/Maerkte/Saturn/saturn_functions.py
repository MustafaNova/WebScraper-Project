import re, math, logging, asyncio
from playwright.async_api import Locator, Page
from fuzzywuzzy import fuzz


urlsSaturn={
    "https://www.saturn.de/de/brand/apple/":
    [
    set(["iphone", "ipad", "mac", "apple watch", "airpods", "apple tv", "homepod", "ipod",
        "apple pencil", "magic keyboard", "magic mouse", "mac studio", "airtag","homepod","appletv"]),
    "brand"
    ],
    
    "https://www.saturn.de/de/category/laptops-66.html?query=":
    [
    set(["laptop", "notebook", "macbook", "ultrabook", "chromebook", "thinkpad", "xps", "surface", "laptop pc", "2-in-1", "convertible", "portabel", "gaming laptop", "business laptop",
    "netbook", "laptop computer",
    "windows laptop", "gaming notebook", "lenovo thinkpad",
    "hp spectre",  "asus zenbook",  
    "razer blade", "hp elitebook", "dell latitude", "macbook air", 
    "macbook pro", "hp pavilion", "acer swift", "lenovo yoga", "samsung notebook",
    "sony vaio", "alienware", "dell xps", "asus tuf", "microsoft surface",
    "apple macbook pro", "laptop gaming", "laptop business", 
    "laptop tablet", "hybrid laptop", "touchscreen laptop"]),
    "category"
    ],
    }

async def get_real_product_url(page2,url):
    await page2.route("**/*",heavy_intercepts)
    await page2.goto(url,wait_until='domcontentloaded')  
    await page2.unroute("**/*",heavy_intercepts)



#mit "https://www.saturn.de/de/search.html?query={user_input}" kann jede produkt erreichen OHNE Filter
async def goto_product(page2,startpoint):
    
    # on which page Number is the current product
    pageNum= (startpoint-1)//12 + 1
    url= page2.url + f"&page={pageNum}"
    
    # goto page and intercept
    await page2.route("**/*",normal_intercepts)
    await page2.goto(url)  
    await page2.unroute("**/*",normal_intercepts)
    
 


async def goto_filtered(page2, filterDic: dict, startpoint) :


    
    # filters added on url
    new_url= filterSaturnUrl(page2.url,filterDic)
    
    # page Number added on url
    pageNum= (startpoint-1)//12 + 1
    new_url= new_url + f"&page={pageNum}"   
    
    # goto page and intercept
    await page2.route("**/*",normal_intercepts)
    await page2.goto(new_url)
    await page2.unroute("**/*",heavy_intercepts)
    
    
  
   


#Prüfen, auf Vorhandensein in urlsSaturn 
#[direkte_url,urlStructure] eine url und urlStructure ist ein Wort welches anzeigt wie die url aufgebaut wird
def is_url_buildable(user_input):     
    for url in urlsSaturn:            
        if user_input in urlsSaturn[url][0]:    
            return [url,urlsSaturn[url][1]]  
        
    return [None,None]     

    
        

def incrementPage(url) -> str:
    # zahl extrahieren und inkrementieren
    res= re.search(r"page=\d+",url).group()
    zahl= int(res.split("=")[1]) + 1
    
    # url mit neue zahl ersetzen
    newUrl= re.sub(r"page=\d+",f"page={zahl}",url)
    return newUrl

def filterPrice(value):  
    lst=[c for c in value if c.isdigit()]
    lst.insert(-2,".")
    return float("".join(lst))   

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
        
        
        

async def locator_exists(targetPage,i: int, activeScraper: set) -> bool|Locator:
    
    
    saturn_container= targetPage.locator("[data-test='mms-search-srp-productlist']>*").nth(i)
    
    # checking non existing
    if await saturn_container.count()==0:
        activeScraper.discard("Saturn")
        return False
    
    return saturn_container
  
#Werbungen haben statt <article> tag den <section> tag. Diese werden übersprungen  
async def container_is_advertisement(saturn_container):
    
    alleKinder= saturn_container.locator(":scope > *")
    tagName= await alleKinder.evaluate("el => el.tagName")
    
    if tagName=="SECTION": return True
    return False 
    
    
async def extract_price(saturn_container)-> tuple:
    #beide Preise locaten und durch min,max aktuelle und vorherige Preis finden
    preis_container_locator=saturn_container.locator("div[data-test='mms-price']").locator("text=/^[0-9,€]+$/")
    
    
    if await preis_container_locator.count()==2: # vorherige Preis falls vorhanden, soll es scrapen
                     
        priceA=filterPrice(await preis_container_locator.nth(0).inner_text())
        priceB=filterPrice(await preis_container_locator.nth(1).inner_text())
        prices=sorted([priceA,priceB]) #Preise sortieren
        
        
        priceOne,priceTwo=prices[0],prices[1]
                                    
        #Rabatt berechnen
        rabatt=int(((priceTwo-priceOne)/priceTwo)*100)            
        return (priceOne,priceTwo,rabatt) 
                    
        
    else:
        price= filterPrice(await preis_container_locator.nth(0).inner_text())      
        return (price,None,None)
    
    
async def extract_rating(saturn_container):
    anzahl_bewertungen= await saturn_container.locator("[data-test='mms-customer-rating-count']").inner_text()  
    sterne_bewertung= await saturn_container.locator("div[data-test='mms-customer-rating']").get_attribute("aria-label")
    
    
    if sterne_bewertung==None:
        return "keine Bewertungen"
    else:
        
        # 'Bewertung: 4.4286 von 5 Sternen', '7' die erste zahl wird ausgewählt
        #re.findall gibt Liste zurück
        sterne_bewertung_string=re.findall(r"\d+\.?\d*",sterne_bewertung)[0]
        
        #Zahl in float oder int
        if "." in sterne_bewertung_string:
            
            sterne_bewertung_zahl=float(sterne_bewertung_string)  
            aufgerundet=math.ceil(sterne_bewertung_zahl)
            empty=5-aufgerundet
            sterne_bewertung_anzahl_sterne= f"{int(sterne_bewertung_zahl)},{1},{empty}"
        else:
            
            sterne_bewertung_zahl=int(sterne_bewertung_string)
            empty=5-int(sterne_bewertung_string)
            sterne_bewertung_anzahl_sterne= f"{sterne_bewertung_string},0,{empty}"
            
    return f"{sterne_bewertung_anzahl_sterne},{anzahl_bewertungen}"


async def extract_max(user_input,page2) -> int:
    
   # cookies ablehnen
   await page2.click("button:has-text('Alle ablehnen')")
      
   # page header Artikel anzahl extrahieren
   await page2.locator("[data-test='mms-search-main'] [data-test='mms-search-srp-headlayout'] > *").first.scroll_into_view_if_needed()
   res= await page2.locator("[data-test='mms-search-main'] [data-test='mms-search-srp-headlayout'] > *").first.inner_text()

   # userI löschen, weil kann Zahl enthalten(iphone 16)
   res_without_user_input= re.sub(user_input,"",res)
   
   # alle NICHT zahlen entfernen
   num_as_string= re.sub(r"\D","",res_without_user_input)
   print(f"maxNum: {num_as_string}")
   return int(num_as_string)



# first extract maxNum then go to right page, so the pageNum 
# will a valid number and not bigger than the product has pages
# if not true it will return the maxNum
    
async def startpoint_exceeds_maxNum(user_input: str, page2, startpoint: int, activeScraper: set) -> bool|int:
       
   # extract Maxnum
   try:
    maxNum= await extract_max(user_input,page2)
   except Exception as e:
       print(f"saturn_functions(z.273) extrac_max Fehler: {e}")
   
   if startpoint > maxNum:
     activeScraper.discard("Saturn")
     return True
   
   return maxNum
   
   


async def on_searched_product_page(page, user_input: str) -> bool:
    
    # Check if the product name is in the headlayout
    headlayout: str= (await page.locator("[data-test='mms-search-srp-headlayout']").first.inner_text()).strip().lower()
    similarity= fuzz.partial_ratio(user_input,headlayout)
    if similarity >= 80:
        return True
    
    
    # locate all titel
    all_titel= page.locator("#mms-search-productlist p[data-test='product-title']")
    count= await all_titel.count()
    
    # extract text of the titel and add to 'produktNamen'
    produktNamen= set()
    for i in range(count):
        text= (await all_titel.nth(i).inner_text()).strip().lower()
        produktNamen.add(text)
        
        
    # search for user_input in the titles    
    for titel in produktNamen:
        similarity= fuzz.partial_ratio(user_input,titel)
        if similarity >= 80:
            print(f"similarity > 70 ({user_input}) and ({titel})")
            return True
      
    
    return False
   

   
# True: no errors, False: errors
async def performErrorCheck(page2, user_input, startpoint, filterDic) -> bool:

    # Error Warnings on the page
    err1= await page2.locator("text=Ups! Etwas ist schiefgelaufen!").count()
    err2= await page2.locator("text=Leider ist ein technischer Fehler aufgetreten, wir grübeln bereits an der Lösung.").count()
    err3= await page2.get_by_text("Ups! Wir konnten leider keine Ergebnisse finden. Bitte überprüfe deine Eingabe oder passe deine Suchfilter an.").count()
    errors=[err1,err2,err3]  
    
    if any(errors):
        print("prepareS.py z.31 Fehlermeldung Text auf page")
        return False
    

    # Debugging
    if not await on_searched_product_page(page2, user_input):
        print(f"FEHLER: nicht auf richtige Produktseite\nProdukt: {user_input}\nurl: {page2.url}")
 
         
    # &page=Num shouldnt changed 
    if hasPageParamChanged(page2.url,startpoint):
        logging.error(f"eingaben({user_input},{startpoint},{filterDic}) - &page=Num changed")
        return False
    
    
    # Check if product Container available for scraping
    if not await productsAvailable_onpage(page2):
        logging.error(f"eingaben({user_input},{startpoint},{filterDic}) - no products available on page")
        return False
    
    
    
    return True






async def heavy_intercepts(route,request):          
    url= request.url
    
    ''' abort_conditions = [
    "https://www.saturn.de/assets/webmobile-pwa",
    "https://www.googletagmanager.com",
    "images",
    "https://region1.google-analytics.com/g/collect",
    "https://www.saturn.de/assets/fonts",
    "https://www.saturn.de/public/manifest/favicon-Saturn-48x48.png",
    "https://www.saturn.de/api/v1/",
    "https://www.saturn.de/cdn-cgi/challenge-platform/",
    "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_90585443/mobilecms_x_72_png"
    ]
    
    if (any(cond in url for cond in abort_conditions)):
        await route.abort()
    else:
        print(f"{request.resource_type} {request.url}")
        await route.continue_()'''
    
    if request.resource_type == "document":
        await route.continue_()
    else:
        await route.abort()
        
async def normal_intercepts(route,request):
    url= request.url
    
    abort_conditions = [
    "https://www.googletagmanager.com",
    "images",
    "https://region1.google-analytics.com/g/collect",
    "https://www.saturn.de/assets/fonts",
    "https://www.saturn.de/public/manifest/favicon-Saturn-48x48.png",
    
    ]

    
    if (any(cond in url for cond in abort_conditions)):
        await route.abort()
    else:
        await route.continue_()
        
    
    
    
async def add_page_parameter_to_url(page2, url, startpoint, activeScraper):
    pageNum= (startpoint-1)//12 + 1
    
    # goto page and intercept
    await page2.route("**/*",normal_intercepts)
    await page2.goto(url + f"&page={pageNum}")
    await page2.unroute("**/*",normal_intercepts)
    
    # Error checking on page
    if await performErrorCheck(page2):
        return False
    
    # making sure products are loaded before scraperS begins
    firstProd= page2.locator("[data-test='mms-search-srp-productlist']>*").nth(0)
    await firstProd.wait_for(state="attached")
    
    
    print(f"url: {url + f"&page={pageNum}"}")
    
    
    
# lokale Nummer startpoint finden, also Nummer auf der aktuellen Seite. dann +6 und schauen ob es noch innerhalb 0-11 ist 
async def overflowpage_if_needed(startpoint, page2, context, maxNum) -> Page|bool:
    
    # product position on page
    productLocalNum= (startpoint-1)%12
     
    # check if overflowpage exceeds maxNum
    if productLocalNum + 6 > maxNum:
        return False
    
     
    # check if overflowpage is needed
    if productLocalNum + 6 > 11:
               
        # go to next page and aborting unimportant requests
        overflowpage= await context.new_page()
        
        # intercept unimportant requests
        await overflowpage.route("**/*",normal_intercepts)
        await overflowpage.goto(incrementPage(page2.url))
        await overflowpage.unroute("**/*",normal_intercepts)  
              
        return overflowpage
    
    # no overflowpage is needed
    return False


# clicks loadMore if needed and available and returns True. If not returns False
# if doesnt needed returns False without clicking
async def clickLoadMoreIfNeeded(page, startpoint) -> bool:
    localNumProd= (startpoint-1) % 12
    
    # no need for loading more products
    if localNumProd + 6 <= 11:
        return False
    
    
    # not available
    loadMoreBtn= page.locator("button:has-text('12 weitere Produkte anzeigen')")
    if await loadMoreBtn.count()==0:
        return False
    
    
    # available
    await loadMoreBtn.click()
    
    # wait for the first new product that will load
    await page.locator("[data-test='mms-search-srp-productlist']>*").nth(12).wait_for(state="attached")
    

    return True



def hasPageParamChanged(url: str,startpoint: int) -> bool:
    correctPageNum= (startpoint-1)//12 + 1
    
    # url extracting &page=Num
    sol= re.search(r"&page=(\d+)",url)
  
    # gives the first group (\d+)
    curPageNum= int(sol.group(1))
    
    if curPageNum!=correctPageNum:
        print(f"prepareS(z.45):\n curPageNum: {curPageNum}\n correctPageNum: {correctPageNum}")
        return True
    
    return False
    
    
async def productsAvailable_onpage(page) -> bool:

    productCount= await page.locator("[data-test='mms-search-srp-productlist']>*").count()
    if productCount==0:
        print(f"prepareS(z.48):\n no products on page for scraping\n url: {page.url}")
        return False
    
    return True

# Helper 
async def click_nextBtn_until_disabled(page):
    nextBtn= page.locator("section[data-test='mms-th-gallery'] button[aria-label='Nächstes Element']")
    
    # no Btn to click
    if await nextBtn.count()==0: return             
    
    # click until it doesnt work 
    try:         
      async with asyncio.timeout(2):
       while True:
        await nextBtn.click()
          
    except asyncio.TimeoutError:
     pass
    
    
    
async def extract_images(imgs_locater) -> list:
    images= []
    imgsC= await imgs_locater.count()
    
    for i in range(0,imgsC):
     try:
      img= imgs_locater.nth(i)
      src= await img.get_attribute("src",timeout=5000)
      alt= await img.get_attribute("alt",timeout=5000) 
     except Exception as e:
         print(f"scrapProdDetailsS get_images: {e}")
         
     images.append({"imageLink": src, "altText": alt})
    
    return images
     
     
# Main   
async def get_images(page) -> list|None:
    imgs_locater= page.locator("[data-test='mms-image-thumbnail'] img")
    
    # no images
    if await imgs_locater.count()==0:
        return None
    
    # load all available images for extracting
    await click_nextBtn_until_disabled(page)
    
    # extract link and alt from every image
    images: list= await extract_images(imgs_locater)

    return images


async def get_badges(page) -> list|None:
    badges= page.locator("[data-test='cofr-pdp-badge'] li")
    badgesCount= await badges.count()
    
    # no badges
    if badgesCount==0: return None
    
    badgesArr= []
    for i in range(0,badgesCount):
       badge_txt= await badges.nth(i).inner_text()
       badgesArr.append(badge_txt)
       
       
    return badgesArr


# Helper
async def get_colors(page, res: dict):
    color_options= page.locator("[data-test='mms-pdp-variants-color']")
    
    if await color_options.count()==1:
        
        all_pics= color_options.locator("ul li")
        all_picsC= await all_pics.count()
        
        colors= []
        for i in range(0,all_picsC):
            pic= all_pics.nth(i)
            
            imgLink= await pic.locator("img").get_attribute("src")
            colorName= await pic.locator("a[aria-label]").get_attribute("aria-label")
            
            colors.append( {"name": colorName, "img": imgLink})
    
    res["colors"]= colors    
    
async def get_others(page, res: dict):
    all_configs= page.locator("section[aria-label='Listen von Produktvarianten'] > *:not([data-test='mms-pdp-variants-color'])")
    all_configsC= await all_configs.count()
    
    for i in range(0,all_configsC):
        config= all_configs.nth(i)
        
        # name 
        configName= await config.locator("p").inner_text()  
        
        # locate options
        configOptions= config.locator("a")
        n= await configOptions.count()
        
        # get names of the options
        options= []
        for i in range(0,n):
            option= await configOptions.nth(i).inner_text()
            options.append(option)
            
    
        res[configName]= options

# Main
async def  get_configs(page) -> dict|None:
    
    noConfigs= await page.locator("section[aria-label='Listen von Produktvarianten']").count() == 0
    if noConfigs:
        return None
      
    res= {}
    
    # extracts colors and writes in res
    await get_colors(page,res)
    
    # éxtracts others and writes in res
    await get_others(page,res)
     
            
    return res
        

# Helper
async def get_options_count(page) -> int:
    
    # open payment-menu
    calculatorBtn= page.locator("[data-test='financing-box-calculator-button']")
    await calculatorBtn.click()
    
    # open month Options
    await page.click("[data-test='mms-financing-calculator'] [aria-haspopup='listbox']")
    
    # count all options
    monthOptions= page.locator("ul[data-test='floating-testId'] > *")
    count= await monthOptions.count() 
    
    return count

async def extract_payment_plan_options(page) -> dict:
    paymentPlan= {}
    optionsC= await get_options_count(page)
    
    for i in range(0,optionsC):      
        # months option
        monthOptions= page.locator("ul[data-test='floating-testId'] > *")
        opt= monthOptions.nth(i)
        months= await opt.inner_text()
        
        # close months option popup
        await opt.click()
        
        # monatsrate
        first= page.locator("dt:has-text('Monatsrate') + *")
        monatsrate= (await first.inner_text()).replace("\xa0","")
        
        # effektiver jahreszins
        second= first.locator("+ * + *")
        effektiver_jahreszins= await second.inner_text()
        
        # finanzierungsgesamtbetrag
        third= second.locator("+ * + *")
        finanzierungsgesamtbetrag= (await third.inner_text()).replace("\xa0","")
        
        # add to paymentPlan
        paymentPlan[months]= {"monatsrate": monatsrate, "effektiver_jahreszins": effektiver_jahreszins,"finanzierungsgesamtbetrag": finanzierungsgesamtbetrag }

    
        # open next month Options
        await page.click("[data-test='mms-financing-calculator'] [aria-haspopup='listbox']")
        
    return paymentPlan

# Main
async def get_paymentPlan(page) ->dict|None:
         
    btn= page.locator("[data-test='financing-box-calculator-button']")
    if await btn.count() == 0 : return None
    
    paymentPlan: dict= await extract_payment_plan_options(page)  
    
    # close menu
    closeBtn= page.locator("[aria-label='Finanzierungsrechner'] button[aria-label='Schließen']")  
    await closeBtn.click()
            
    return paymentPlan
        
        
        
        
async def get_description(page) -> str|None:
    descriptionBtn= page.locator("#description")
    count= await descriptionBtn.count()
    if count==0: return None
      
    # open
    await descriptionBtn.scroll_into_view_if_needed()
    await descriptionBtn.click()
    
    # extract
    descriptionContent= page.locator("#description-content")
    descriptionContent= await descriptionContent.inner_text()
    
    # return
    return descriptionContent


# Help

async def extract_rows(table) -> dict:
    tableContent= {}
    
    rows= table.locator("tbody tr")
    rowsC= await rows.count()
    
    for m in range(0,rowsC):
        rowTxt= rows.nth(m).locator("td")        
        left= await rowTxt.nth(0).inner_text()
        right= await rowTxt.nth(1).inner_text()
        tableContent[left]= right
        
    return tableContent
    
# clicks button if the content is closed. if open it does nothing
async def ensureVisibility(btn,content) -> None:
    
    # scroll to content (one time scrollin doesnt scroll to content)
    for i in range(0,3):
     await content.scroll_into_view_if_needed()
    
    
    # click btn if content is not visible
    techDataState= await btn.get_attribute("aria-expanded")
    
    if techDataState == "false":
     await btn.scroll_into_view_if_needed()
     await btn.click()

        
# Main
async def get_technicalData(page) -> dict|None:
    
    # exists technicalData
    content= page.locator("[aria-label='Technische Daten']")
    if await content.count() == 0: return None

    btn= page.locator("[aria-label='Technische Daten'] button:has-text('Technische Daten')")
    await ensureVisibility(btn, content)
    
    
    # all tables with information
    tables= page.locator("[aria-label='Technische Daten'] table")
    end= await tables.count()
    
    res={}  
    for i in range(0,end):
          
        # name of table
        table= tables.nth(i)
        header= await table.locator("thead").inner_text()
        
        # all Rows of table
        allRows: dict= await extract_rows(table)
        
        res[header]= allRows           
    
    return res
        

# Help

async def get_rows(table) -> dict:
    rows= table.locator("tbody tr")
    count= await rows.count()

    res= {}
    for i in range(0,count):
        data= rows.nth(i).locator("p")
    
        key= await data.nth(0).inner_text()
        value= await data.nth(1).inner_text()
 
        res[key]= value
    
    return res



async def extract_safetyData(page) -> dict:
    tables= page.locator("[data-test='mms-general-product-safety-regulation'] table")
    count= await tables.count()
    
    res= {}
    for i in range(0,count):
        table= tables.nth(i)
        
        head= (await table.locator("thead").inner_text()).strip()
        rows: dict= await get_rows(table)
        res[head]= rows
    
    return res

# Main
async def get_safetyData(page) -> dict|None:
    
    # existing
    btn= page.locator("button:has-text('Allgemeine Produktsicherheit')")
    if await btn.count() == 0: return None
    
    # visibility
    safetyContent= page.locator("[aria-label='Allgemeine Produktsicherheit']")
    await ensureVisibility(btn, safetyContent)

    # data
    safetyData: dict= await extract_safetyData(page)

    return safetyData
    


# Help

def convert_to_float(num):
    return float(num.replace("€","").replace(",","."))

async def get_price(prod) -> dict:
    
    # locate tag which contains the price(same price is two times in the tag)
    priceContainer= prod.locator("[data-test='mms-price']")
    
    # filter the text which is a price
    Arr= (await priceContainer.inner_text()).split("\n")
    priceArr= [elem for elem in Arr if "€" in elem and not "\xa0" in elem]
    
    # no discount
    if len(priceArr)==1:
        return {"curPrice": priceArr[0]}
    
    # old-and discounted price
    elif len(priceArr)==2:
        numA= convert_to_float(priceArr[0])
        numB= convert_to_float(priceArr[1])
        
        if numA > numB:
            old= priceArr[0]
            cur= priceArr[1]
        else:
            old= priceArr[1]
            cur= priceArr[0]
            
        return {"curPrice":cur,"oldPrice":old}
        
        
   
        
  

async def get_rating(prod) -> dict|None:
        
    # attributes of the stars
    fullStarAttr= "mms-fully-rated-star"
    halfStarAttr= "mms-partial-rated-star"
        
    # locate stars
    stars= prod.locator("[data-test='mms-customer-rating'] [data-test*='star'] ")
    count= await stars.count()
    
    # no rating
    if count == 0: return None
    
    
    # counting stars
    full,half,empty=0,0,0
    
    for i in range(0,count):
        star= stars.nth(i)
        curStarAttr= await star.get_attribute("data-test")
        
        if curStarAttr == fullStarAttr:
            full+=1
        elif curStarAttr == halfStarAttr:
            half+=1
        else:
            empty+=1
    
    # get rating count
    ratingCount= await prod.locator("[data-test='mms-customer-rating-count']").inner_text()
    
    res= {}
    res["stars"]= {"full":full,"half":half,"empty":empty}
    res["ratingCount"]= ratingCount

    return res
    
        
    
async def scrape_accessoire(prod) -> dict|None:
   try:
       
    name= await prod.locator("[title]").get_attribute("title")
    price: dict= await get_price(prod)
    rating: dict|None= await get_rating(prod)
    imgLink= await prod.locator("[data-test='product-image'] img").get_attribute("src")
    
    return {"name":name, "price":price, "rating":rating, "img": imgLink}


   except Exception as e:
       print(e)
       return None
    
    
    
    
    
    
        

# Main
async def get_accessoires(page) ->list|None:
    
    # no accessoires
    accessoires= page.locator("[aria-label='Zubehör']")
    if await accessoires.count() == 0 : return None
    
    nextBtn= page.locator("[aria-label='Zubehör'] button[aria-label='Nächstes Element']")
    
    # all accessoire products
    products= page.locator("[aria-label='Zubehör'] [data-test='mms-product-card']")
    count= await products.count()
    
    # load all prod
    for i in range(9):
        await nextBtn.click()
    
    # parallel scraping
    tasks = [ scrape_accessoire(products.nth(i)) for i in range(count) ]
    all_prod = await asyncio.gather(*tasks)
    
    return all_prod




# reject cookies if exists
async def reject_cookies(page2):
    btn = page2.locator("button",has_text="Alle Ablehnen")
    if await btn.is_visible():
        await btn.click()