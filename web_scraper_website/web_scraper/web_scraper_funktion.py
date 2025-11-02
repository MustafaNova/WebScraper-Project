from playwright.sync_api import sync_playwright
import math

def scraper(user_input,anfang,ende):
 if any(char.isdigit() for char in user_input):
        return False
 
 # urls
 url_otto=f"https://www.otto.de/suche/{user_input}/?preis-in-eur~ab={anfang}&preis-in-eur~bis={ende}&sortiertnach=preis-aufsteigend"
 url_saturn=f"https://www.saturn.de/de/search.html?query={user_input}"




 alle_produkte_otto=[]
 alle_produkte_saturn=[]

 with sync_playwright() as p:
    
    browser=p.chromium.launch(headless=True)
    page=browser.new_page()
    page.goto(url_otto)
    
    #cookies akzeptieren schauen
    
    page.evaluate("window.scrollBy(0,2400)")
    page.wait_for_timeout(2000)
    sterne_locator=0
    
    for i in range(5):
        
     ein_produkt_otto=[]  
     image_container_otto=page.locator(f"div.find_tile__productImageContainer>>nth={i}")
     container_locator_o=page.locator(f"div.find_tile__content>>nth={i}")
        
     ein_produkt_otto.append(container_locator_o.locator(f"p.find_tile__name.pl_copy100").inner_text().replace('"',""))
     preis=container_locator_o.locator(f"div.find_tile__priceAndUVP").inner_text().split("\n") # Liste von aktuelle und vorherige Preis
     
     
     if len(preis)==1:
      ein_produkt_otto.append(tuple(preis+["-"]))
      preis_tupel= tuple( preis )
      
     else:
         
       #Rabatt % berechnen für template  
       neue_p= int(preis[0][0:3])
      
       if "UVP" in preis[-1]:
          alte_p=int(preis[-1][4:7])
       else:
          alte_p=int(preis[-1][0:3])
       
       # rabatt berechnen, float zahl 6.54324345 in int(),also 6 . dann in str() "6" + "%" ergebnis: "6%"
       rabatt=str(int(((alte_p-neue_p)/alte_p)*100)) + "%"
       preis_tupel=tuple( preis + [rabatt] ) 
       
     ein_produkt_otto.append(preis_tupel)

     
     # Sterne Bewertungen scrapen
     
     
     rating_stars=container_locator_o.locator("span.reptile_tile__rating__stars")
     
     
     if rating_stars.count()==1:
         
         filled50=0
         half50=0
         empty50=0
         
         
         for stern in range(5):
            
          if "#pl_icon_rating-filled50" in rating_stars.locator(f"use>>nth={stern}").get_attribute("xlink:href"):
              filled50+=1
          elif "#pl_icon_rating-half50" in rating_stars.locator(f"use>>nth={stern}").get_attribute("xlink:href"):
              half50+=1
          else:
              empty50+=1
              
         anzahl_bewertungen=page.locator(f"span.reptile_tile__rating__number>>nth={sterne_locator}").inner_text() 
         
          
         # list(range) für template sterne bewertung for loop
          
         ein_produkt_otto.append(  ( ( list(range(filled50)) , list(range(half50)), list(range(empty50)) ) ,anzahl_bewertungen[1:-1] ) ) #[1:-1] weil Zahlen: (56) 
         
         sterne_locator+=1
         filled50=0
         half50=0
         
         
     
     
     
     else:
        ein_produkt_otto.append(("keine Bewertungen"))
        
        
     ein_produkt_otto.append("https://www.otto.de"+ container_locator_o.locator(f"a.find_tile__productLink").get_attribute("href"))
     
      #Bildlink scrapen
     
     bild_link=image_container_otto.locator("img.find_tile__productImage.find_tile__productImage--animated").get_attribute("src")
     ein_produkt_otto.append(bild_link)
     
     
     alle_produkte_otto.append(tuple(ein_produkt_otto))
     
     

    
   
    
  
    page.goto(url_saturn)
    
    # cookies akzeptieren
    if page.locator("button.sc-2c264fcb-1.jXbtFA").is_visible():
        page.locator("button.sc-2c264fcb-1.jXbtFA").click()
      
    #mit_filtern_url=page.url + f"&filter=currentprice:300-800" + "&sort=currentprice+asc"
    # Filter(preis) url
    mit_filtern_url=page.url + f"&filter=currentprice:{anfang}-{ende}" + "&sort=currentprice+asc"
    
    page.goto(mit_filtern_url)
    
    # runterscrollen
    page.evaluate("window.scrollBy(0,3000)")
    page.wait_for_timeout(2000)
    
    
  
  
  
    # Saturn Scraper  
    
    for i in range(5):
        ein_produkt_saturn=[]
        
        #saturn_container=page.locator(f"div.sc-f524209-0.hnJqbe.sc-3e603664-1.dPhyvL>>nth={i}")
        saturn_container=page.locator("[data-test='mms-search-srp-productlist']>*").nth(i)
        
        #prüfen ob Produkt auf Lager ist, wenn nicht soll es überspringen. prüft ob warenkorb button vorhanden ist
        
        if saturn_container.locator("button[data-test='a2c-Button']").count()==0:
            continue
        
        #Produkt Name
        name=saturn_container.locator("div.sc-bc13ac82-0.cDKZks").inner_text().replace(","," ")
        ein_produkt_saturn.append(name)

        
        
        # preise scrapen
        #preis_container=saturn_container.locator("div.sc-f524209-0.fBfSmR")
        vorherige_preis_locator=saturn_container.locator("span.sc-8b815c14-0.eYMewX")
        aktuelle_preis=saturn_container.locator("div.sc-f524209-0.eDhLj").inner_text().split("\n")
        
        
        # aktuell preis auch noch scrapen, dann als Tupel (aktuelle preis, vorherige preis) in alle_preise hinzufügen
        if vorherige_preis_locator.count()==1: # vorherige Preis falls vorhanden, soll es scrapen
            vorherige_preis= vorherige_preis_locator.inner_text().split(r"\x")
            
            #rabatt berechnen
            
            neue_p=int(aktuelle_preis[-1][0:3])
            alte_p=int(vorherige_preis[0][0:3])
            
            rabatt=str(int(((alte_p-neue_p)/alte_p)*100)) + "%"
            preis_tupel=tuple( preis + [rabatt] ) 
            
            
            
        else:
            vorherige_preis="-"
            preis_tupel=(aktuelle_preis[-1],vorherige_preis[0])
            
        
        ein_produkt_saturn.append( preis_tupel )
        
        
       
        container_bewertungen=saturn_container.locator("sc-4d774f03-0.iyHWrU")
        anzahl_bewertungen=saturn_container.locator("[data-test='mms-customer-rating-count']").inner_text()
        
        sterne_bewertung=saturn_container.locator("div[data-test='mms-customer-rating']").get_attribute("aria-label")
        
        
        if sterne_bewertung==None:
            ein_produkt_saturn.append("keine Bewertungen")
        else:
            
            # 'Bewertung: 4.4286 von 5 Sternen', '7' die erste zahl wird ausgewählt
            # aufgerundet,abgerundet
            sterne_bewertung_zahl=float( sterne_bewertung.split(" ")[1] )
           
            if isinstance(sterne_bewertung_zahl,int):
                sterne_bewertung_anzahl_sterne=( sterne_bewertung_zahl, 0, 5-sterne_bewertung_zahl )
            else:
                
                
                aufgerundet=math.ceil(sterne_bewertung_zahl)
                sterne_bewertung_anzahl_sterne=( list(range(int(sterne_bewertung_zahl))), [1], list(range(5-aufgerundet)) )
                
            
                
            ein_produkt_saturn.append((sterne_bewertung_anzahl_sterne,anzahl_bewertungen))
            
            
        link="https://www.saturn.de" + saturn_container.locator("[data-test='mms-router-link-product-list-item-link_mp']").get_attribute("href")
        ein_produkt_saturn.append(link)
        
        #Bildlink 
        
        bild_link=saturn_container.locator("img[crossorigin='anonymous']").get_attribute("src")
        ein_produkt_saturn.append(bild_link)
        
        alle_produkte_saturn.append( tuple(ein_produkt_saturn))



   
   
# alle Produkte   
 alles_zusammen= alle_produkte_saturn + alle_produkte_otto
 


# preis extrahieren aus tupel
 def preis(zeile):
    
    price=zeile[1][0]
    assert isinstance(price,str), print(price)
    price = float(price.replace('€', '').replace(',', '.'))
    return price 


 # nach diese preis tupel sortieren
 alles_zusammen.sort(key=preis)
 return alles_zusammen

#print(scraper("ipad",300,800))