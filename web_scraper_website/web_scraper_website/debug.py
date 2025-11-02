from playwright.sync_api import sync_playwright
import math
user_input="ipad"
anfang=300
ende=800
url_saturn=f"https://www.saturn.de/de/search.html?query={user_input}"
alle_produkte_saturn=[]
with sync_playwright() as p:
    
    browser=p.chromium.launch(headless=True)
    page=browser.new_page()
    
    
    page.goto(url_saturn)
    
    # cookies akzeptieren
    if page.locator("button.sc-2c264fcb-1.jXbtFA").is_visible():
        page.locator("button.sc-2c264fcb-1.jXbtFA").click()
      
    
    # Filter(preis) url
    mit_filtern_url=page.url + f"&filter=currentprice:{anfang}-{ende}" + "&sort=currentprice+asc"
    
    page.goto(mit_filtern_url)
    
    # runterscrollen
    page.evaluate("window.scrollBy(0,3000)")
    page.wait_for_timeout(2000)
    
    
  
  
  
    # Saturn Scraper  
    
    for i in range(10):
        ein_produkt_saturn=[]
        
        saturn_container=page.locator(f"div.sc-f524209-0.hnJqbe.sc-3e603664-1.dPhyvL>>nth={i}")
        
        name=saturn_container.locator("div.sc-bc13ac82-0.cDKZks").inner_text().replace(","," ")
        ein_produkt_saturn.append(name)

        
        
        # preise scrapen
        preis_container=saturn_container.locator("div.sc-f524209-0.fBfSmR")
        vorherige_preis_locator=saturn_container.locator("span.sc-8b815c14-0.eYMewX")
        
        
        
        # aktuell preis auch noch scrapen, dann als Tupel (aktuelle preis, vorherige preis) in alle_preise hinzufügen
        if vorherige_preis_locator.count()==1: # vorherige Preis falls vorhanden, soll es scrapen
            vorherige_preis= vorherige_preis_locator.inner_text().split(r"\x")
            
        else:
            vorherige_preis="-"
            
        
        aktuelle_preis=saturn_container.locator("div.sc-f524209-0.eDhLj").inner_text().split("\n")
        ein_produkt_saturn.append( (aktuelle_preis[-1],vorherige_preis[0])  )
        
         
         
        #container_bewertungen=saturn_container.locator("div.sc-83d6282b-0")
        #anzahl_bewertungen=container_bewertungen.locator("span.sc-8b815c14-0.ddCaQK").inner_text()
        
        #sterne_bewertung=saturn_container.locator("div.sc-b75705db-0.ijCsWb[data-test='mms-customer-rating'][role='img']").get_attribute("aria-label")
        
        container_bewertungen=saturn_container.locator("sc-4d774f03-0.iyHWrU")
        anzahl_bewertungen=saturn_container.locator("[data-test='mms-customer-rating-count']").inner_text()
        
        sterne_bewertungen=saturn_container.locator("div[data-test='mms-customer-rating']").get_attribute("aria-label")
 
 
       

