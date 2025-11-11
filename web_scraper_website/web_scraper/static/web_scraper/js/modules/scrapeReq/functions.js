
export const SUBMIT_FILTER = document.getElementById("submitFilter")
const slideInStandard=document.getElementById("slideInStandard")
const errMsg=document.getElementById("errorMessage")
const MAIN_CONTENT = document.getElementById("mainContent")


// Help

  function transitioning(event){
    if (getComputedStyle(alleProdukte).opacity == "0"){
      alleProdukte.remove()
      alleProdukte.removeEventListener("transitionend",transitioning)
    }      
  }


// sends request to url and answer will be appended to website
async function fetchRequest(url){
  
  const response_obj = await fetch(url)   // send request
  const response = await response_obj.text() // wait for response from req

  if (response == "Fehler"){    
   errMsg.style.visibility="visible"
   return   
  }

  // convert response to html
  const parser = new DOMParser()
  const response_html = parser.parseFromString(response,"text/html") 

  // append req content to MAIN_CONTENT
  const alleProdukte = response_html.getElementById("inhalt")
  MAIN_CONTENT.innerHTML=""
  MAIN_CONTENT.appendChild(alleProdukte)

  // append wit transition
  requestAnimationFrame(()=>{alleProdukte.style.opacity="1"})
  
  //timeoutFehler.html is shown. this box has a cross to remove the warning.
  // adds listener to remove box if cross is clicked
  if (alleProdukte.classList == "errorBox"){
    alleProdukte.addEventListener("transitionend",transitioning)  
  }

}


function lesbareUrlfkt(url){
     const stateObject={"korrekteUrl":url}
     url=url
     .replace(/["\[\]{}]/g,"")
     .replace(/,/g,"&")
     .replace("filter=","")
     .replace("speicherKap","SpeicherKapazität")
     .replace(/\s+/g,"").replace("http://127.0.0.1:8000/suche/","##anfangUrl##")
     .replace("Preis:absteigend","Preis_absteigend").replace("Preis:aufsteigend","Preis_aufsteigend")
     .replace(/:/g,"=").replace("Preis_absteigend","Preis:absteigend").replace("Preis_aufsteigend","Preis:aufsteigend")
     .replace("##anfangUrl##","http://127.0.0.1:8000/suche/")

     
     window.history.pushState(stateObject,"",url)
  } 


// Main
export function startScraping(){
  slideInStandard.classList.remove("openSlide")
  //bei scrapingStart entfernen
  if(errMsg){
      errMsg.style.visibility="hidden"
    }

  let alleFilter={}
  Array.from(ChoosenFilterDiv.children).forEach((filterTag=>{
    const key=filterTag.getAttribute("data-filter")
    const value=filterTag.innerText.trimEnd()
   

    if (["märkte","marken"].includes(key)){
      alleFilter[key]=filterTag.getAttribute("data-all")
      return
    }
    key in alleFilter ? alleFilter[key].push(value) : alleFilter[key]=[value] //alle speicherKap Boxen in ein array machen
  }))
   
  //nicht löschen!!!
  /*
  const curUrl= new URL(window.location.href) //erstellt url Objekt
  const produkt=curUrl.searchParams.get("produkt")
  */
  
  produkt="ipad"
  if (produkt==null) return //ohne produkt kann es nicht scrapen mit filtern
  
 
  url= `http://127.0.0.1:8000/suche/?produkt=${produkt}&filter=${encodeURIComponent(JSON.stringify(alleFilter))}`
  
  fetchRequest(url)


  
  //ulr verändern für User ohne reloading der Website
  lesbareUrlfkt(decodeURIComponent(url))  
  
  
 
}



//Schickt die Scraping Anfrage an Backend, wenn in searchbar ein nichtleeres Wort eingegeben wird

export function sendScrapeReq(event){
  const inputVal = event.target.value.trim()
  if (event.key == "Enter" && inputVal != ""){
    
    event.target.value = "" // clear searchbar input
    if(errMsg) errMsg.style.visibility = "hidden" 

    history.pushState(null,"",`http://127.0.0.1:8000/suche/?produkt=${inputVal}`)  // no request, only visually changing url
    fetchRequest(`http://127.0.0.1:8000/suche/?produkt=${inputVal}`) // send scraping request on users input
  }
}



function EntferneErrorBox(event){
  event.target.parentElement.style.opacity="0"
}


function scrapingBiggerTimeOut(event){
  
  event.target.parentElement.parentElement.style.opacity="0"

  const state=history?.state
  url=state?.korrekteUrl

  if (url==undefined){
   url= window.location.href + "&timeForScraper=30"
  }
  else{
   url+= "&timeForScraper=30"
  }
  
  fetchRequest(url)


}

function filling(event){ 
  popUp=document.getElementById("wunschlisteAdded")
  popUpDeleted=document.getElementById("wunschlisteDeleted")

  if( event.target.classList.contains("fa-regular") ){
    popUp.classList.add("active")
    popUpDeleted.classList.remove("active")
  }else{

    popUpDeleted.classList.add("active")
    popUp.classList.remove("active")
  
  }

  event.target.classList.toggle("fa-regular")
  event.target.classList.toggle("fa-solid")

}

function schliesen(event){
  event.target.parentElement.classList.remove("active")

}


//an views.infiniteScrolling wird anfrage geschickt. Dadurch gibt es 12 weitere gescrapte Produkte zurück
//views.infiniteScrolling startet im Hintergrund 30 weitere Scraper, die in Datenbank gescpeichert werden
async function dataBase_request_scrapingData(){
  
  url="http://127.0.0.1:8000/datenbankRequest/"  
  response= await fetch(url).then(response => response.text())
  
  //HtmlDoc parsen
  const parser= new DOMParser()
  const htmlDoc=parser.parseFromString(response,"text/html")
  
  
  const source=htmlDoc.getElementById("inhalt")
  const target=document.getElementById("inhalt")
  
  //aktuelle ButtonDIv entfernen und die neuen Produkte mit ButtonDiv hinzufügen
  const oldCount=document.getElementById("prodCount").innerText.trim()
  document.getElementById("12weitereProdukteDiv").remove()
  while(source.firstChild){
    target.appendChild(source.firstChild)
  }

  //produkt Counter(6 von 543) um +Zahl erhöhen
  const newCount= parseInt(oldCount) + 6
  document.getElementById("prodCount").innerText=newCount


}