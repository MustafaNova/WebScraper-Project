//Abkürzungen:
//Mk->Marken


const filter_button=document.getElementById("filter_button")
const aktuelle_filter= document.getElementById("aktuelle_filter")
const filter_menu= document.getElementById("filter_menu")
const arrow_filter=document.getElementById("arrow_filter")
const all_menu=document.querySelectorAll("[data-menu]")

//Preise
const preise_button=document.getElementById("preise_button")
const preise_menu=document.getElementById("preise_menu")
const arw_preise=document.getElementById("arrow_preise")

const märkte_button= document.getElementById("märkte_button")
const märkte_menu= document.getElementById("märkte_menu")
const arrow_märkte=document.getElementById("arrow_märkte")
const märkte_search_bar=document.getElementById("search_bar_märkte")
const toggle_button= document.getElementById("märkte_alles_auswählen")
const toggleButtonMk= document.getElementById("märkte_alles_auswählenMk")
const alle_checkboxen_label=document.querySelectorAll(".checkmark")
const submit_checkbox=document.getElementById("submit_checkbox")
const märkte_zähler=document.getElementById("märkte_zähler")
const markenZähler=document.getElementById("markenZähler")

const märkte_boxen=document.querySelectorAll("[data-MenuBox='märkte']")
const marken_boxen=document.querySelectorAll("[data-MenuBox='marken']")
const ausgewählte_box=document.getElementById("ausgewählte_märkte")
const ausgewählte_boxMk=document.getElementById("ausgewählte_märkteMk")
const meine_märkte=document.getElementById("meine_märkte")
const meine_märkteMk=document.getElementById("meine_märkteMk")
const gesuchteMärkteInhalt=document.getElementById("gesuchte_märkteInhalt")
const gesuchteMärkteInhaltMk=document.getElementById("gesuchte_märkteInhaltMk")
const showMoreText=document.getElementById("showMoreText")
const showMoreTextMk=document.getElementById("showMoreTextMk")
const bewertungenButton=document.getElementById("bewertungen_button")
const bewertungenMenu=document.getElementById("bewertungen_menu")
const arrowBewertungen=document.getElementById("arrow_bewertungen")
const ChoosenFilterDiv=document.getElementById("showChoosenFilter")
const markenMenu=document.getElementById("marken_menu")
const markenArrow=document.getElementById("arrow_marken")
const gesuchteMärkteButton=document.getElementById("gesuchte_märkte_button")
const gesuchteMärkteButtonMk=document.getElementById("gesuchte_märkte_buttonMk")
const speicherKapMenu=document.getElementById("speicherKap_menu")
const arrowSpeicherKap=document.getElementById("arrow_speicherKap")
const märkteTrashCan=document.getElementById("trashcan")
const markenTrashCan=document.getElementById("trashcanMk")
const errMsg=document.getElementById("errorMessage")
const noResDiv=document.getElementById("noResDiv")

const suchvorschläge=document.getElementById("suchvorschläge")
const suchvorschlägeMk=document.querySelector("#suchvorschlägeMk")
const märkte_liste= ["Saturn", "Otto", "Amazon", "Alternate", "Alza", 
  "Apple", "Arlt", "Caseking", "Computeruniverse", "Conrad Connect", "Cyberport", 
  "Conrad Electronic", "Digitalo", "DeinHandy", "Discount24", "Deltatecc", "DeutschlandHandy", 
  "Euronics", "EP: ElectronicPartner", "Expert", "E.Leclerc", "Euronics XXL", "Fachmarkt24", 
  "Freenet", "Funkwerk", "Fujitsu", "Fritz Berger", "Galeria Karstadt Kaufhof", "Gigaset", 
  "Gorenje", "Gravis", "Giant"]





const marken_liste= ["Apple",
  "Acepad", "Agm by Beafon", "AILIHEN", "Airturn",
   "AKG", "Alcatel", "ALLDOCUBE", "ALOGIC",
  "Amazon", "Amazon Basics", "Anker", "ANTEMPER", "Aplic",
  "ascrecem", "Asus", "ATTACK SHARK", "Augustin Group", "Auna", "AWOW", "ayex"
]
const SearchKreuz=document.getElementById("search_kreuz")
const SearchKreuzMk=document.getElementById("search_kreuzMk")
const searchBarInput=document.getElementById("searchBarInput")
const searchBarInputMk=document.getElementById("searchBarInputMk")
const no_res=document.getElementById("no_results")
const no_resMk=document.getElementById("no_resultsMk")
const searchValue=document.getElementById("search_value")
const searchValueMk=document.getElementById("search_valueMk")
const gesuchte_märkte=document.getElementById("gesuchte_märkte")
const gesuchte_märkteMk=document.getElementById("gesuchte_märkteMk")
const searchBarDiv=document.getElementById("search_bar_märkte")
const searchBarDivMk=document.getElementById("search_bar_marken")

const container=document.querySelector("#ausgewählte_märkte")
const priceInputs=document.querySelectorAll(".price-input input")
const progress=document.getElementsByClassName("progress")[0] //returned HTMLCollection
const minThumb=document.getElementById("MinRange")
const thumbs=document.getElementsByClassName("PriceRanges")
const introSlideOpening= document.getElementById("introSlideOpening")
const slideInStandard=document.getElementById("slideInStandard")
const changingRating=document.getElementById("changingRating")
const filterSlide=document.getElementById("filterSlide")
const changingPrice=document.getElementById("changingPrice")
const changingGb=document.getElementById("changingSpeicherKap")
const alleInput=document.querySelectorAll("#speicherKap_menu input") 
const produkteDiv=document.getElementById("Produkte")

const markenDiv=document.getElementById("markenDiv")
const märkteDiv=document.getElementById("märkteDiv")
const markenSpeicher=markenDiv.cloneNode(true)
const märkteSpeicher=märkteDiv.cloneNode(true)

//Variablen
const suchergebnisse_alle=Array.from(gesuchteMärkteInhalt.children)
const OffeneMenus=[]
//Ende


//Click auf Button wird rechts introSlide geöffnet
function openSlide(){
  slideInStandard.classList.toggle("openSlide") 
}


const menuListeners = {
  
  filter_menu: [
    { element: filter_menu, type: "click", handler: filterMenuHandler },
    { element: filter_menu, type: "mousedown", handler: mousedown },
    { element: filter_menu, type: "mouseup", handler: mouseup },
  ],

  märkte_menu: [
    { element: SearchKreuz, type: "click", handler: SearchKreuzHandler },  //searchquery entfernen bei click auf kreuz
    { element: searchBarInput, type: "keyup", handler: searchBarInputHandler },
    { element: showMoreText, type: "click", handler: showMoreTextHandler },
    { element: searchBarInput, type: "focus", handler: movingText }
  ],

  marken_menu: [
    { element: SearchKreuzMk, type: "click", handler: SearchKreuzMkHandler },  //searchquery entfernen bei click auf kreuz
    { element: searchBarInputMk, type: "keyup", handler: searchBarInputMkHandler },
    { element: showMoreTextMk, type: "click", handler: showMoreTextMkHandler },
    { element: searchBarInputMk, type: "focus", handler: movingTextMk }
  ],

  preise_menu: [
     //PreiseBox zu id=showChoosenFilter adden
    { element: thumbs[0], type: "mouseup", handler: thumbHandler },
    { element: thumbs[1], type: "mouseup", handler: thumbHandler },
    //Input validierung nach Eingabe
    { element: priceInputs[0], type: "blur", handler: firstpriceInputHandler },
    { element: priceInputs[1], type: "blur", handler: secondpriceInputHandler },
    //Input validierung bevor angezeigt wird die Eingabe
    { element: priceInputs[0], type: "keydown", handler: priceInputHandlerZero },
    { element: priceInputs[1], type: "keydown", handler: priceInputHandlerOne },
    //Range Farbe anpassen
    { element: priceInputs[0], type: "input", handler: ThumbColorHandlerOne },
    { element: priceInputs[1], type: "input", handler: ThumbColorHandlerTwo },
    //thumb Position anpassen
    { element: thumbs[0], type: "input", handler: thumbPositionHandlerOne },
    { element: thumbs[1], type: "input", handler: thumbPositionHandlerTwo }
  ]
};


let curMenuOffen="" //wenn Menu schliest, wird hier zugreifen deattach fkt und alle eventlistener removen
function attachMenuListener(MenuId){
  
  //EventListener aus menuListeners bauen
  function buildingEventListener(id){
    menuListeners[id].forEach(listener=>{
      listener["element"].addEventListener(listener["type"],listener["handler"])
    })
  }
  
  switch(MenuId){

    case "filter_menu":
     buildingEventListener("filter_menu")
     curMenuOffen="filter_menu"
     break
    
    case "märkte_menu":
     buildingEventListener("märkte_menu") 
     curMenuOffen="märkte_menu"
     break

    case "marken_menu":
     buildingEventListener("marken_menu")
     curMenuOffen="marken_menu"
     break
    
    case "preise_menu":
     buildingEventListener("preise_menu")
     curMenuOffen="preise_menu"
     break
    
    case "bewertungen_menu":
      //keine EventListener
      curMenuOffen="bewertungen_menu"
      break
    
    case "speicherKap_menu":
      //keine EventListener
      curMenuOffen="speicherKap_menu"
      break
  }
}
function detachMenuListener(){

  if (["bewertungen_menu","speicherKap_menu"].includes(curMenuOffen)) return //Menus ohne EventListener 

  menuListeners[curMenuOffen].forEach(listener=>{
    listener["element"].removeEventListener(listener["type"],listener["handler"])
  })
  
}


function ButtonClickHandling(Menu){
  
  const SlideDiv=Menu.parentElement
  SlideDiv.classList.add("openSlide")

  SlideDiv.querySelector("[class*='positioningIcon']").classList.add("unsichtbar")
  attachMenuListener(Menu.id)
}





function ChoosenBoxGenerator(id,text,fkt,filter){
  return `<p class="showChoosenFilter" id="${id}" data-filter="${filter}"> 
    <span class="ChooseninnerText">
     ${text}
    </span>
    <i class='fa-solid fa-xmark showChoosenFilterKreuz' onclick=${fkt}></i>
  </p>`
}


//bewertungen Sterne id=showChoosenFilter div hinzufügen
function addingRating(event){
   document.getElementById("RatingChoosen")?.remove() //falls andere Bewertung vorhanden,löschen
  
   //changing Überschrift ändern
   changingRating.innerHTML=
   event.target.id=="alleRating"
   ? "Alle Bewertungen" 
   : `${event.target.id.slice(-1)}<i class="fa-solid fa-star"></i><span> &mehr </span>`
   
   if (event.target.id!="alleRating") ChoosenFilterDiv.innerHTML+= ChoosenBoxGenerator("RatingChoosen",`${event.target.id.slice(-1)}<i class="fa-solid fa-star test test"></i> &mehr`,"deleteMyself_rating(event)","bewertung")
}


function ArrowLeftSlide(event){
  
  const curSlide=event.target.parentElement
  curSlide.classList.remove("openSlide")
  slideInStandard.classList.add("openSlide")

  const menuType=event.target.getAttribute("data-detach")
  if (menuType=="märkte_menu"){
    SearchKreuz.click()
  }else if(menuType=="marken_menu"){
    SearchKreuzMk.click()
  }
   

  detachMenuListener(menuType) //aktuelle Menu eventlistener entfernen
  
  //erst wenn rechte Slide komplett geschlossen, Icon wieder sichtbar machen
  curSlide.addEventListener("transitionend",function icon(event){
    if (event.propertyName=="transform"){
      curSlide.querySelector("[class*='positioningIcon']").classList.remove("unsichtbar")
    }
    curSlide.removeEventListener("transitionend",icon)
  })

}


function deleteMyself_filter(event){
  event.target.parentElement.remove()
  aktuelle_filter.innerText="Topseller"  
}

function deleteMyself_märkte(event){
  event.target.parentElement.remove() 
  märkteTrashCan.click()
}

function deleteMyself_marken(event){
  event.target.parentElement.remove() 
  markenTrashCan.click()
}

function deleteMyself_togglePrice(event){
  event.target.parentElement.remove()
  document.getElementById("preisToggle").checked=false
 
  
}

function deleteMyself_price(event){
  event.target.parentElement.remove()
  priceInputs[0].value=0
  priceInputs[1].value=9999

  thumbs[0].value=0
  thumbs[1].value=9999
  
  changingPrice.innerText="0€ - 9999€"

  progress.style.left=0
  progress.style.width="100%"

}


function deleteMyself_rating(event){
  event.target.parentElement.remove()
  const allStars=document.getElementById("alleRating")
  allStars.checked=!allStars.checked
  changingRating.innerHTML="Alle Bewertungen"


}

function deleteMyself_speicherKap(event){
  event.target.parentElement.remove() //eigene Box entfernen
  document.getElementById("allegb").click() //allegb auswählen
}


//Suchvorschläge pfeil click, MarktName in searchBarInput verschieben
function moveText(event){
  const marktVorschlag=event.target.previousElementSibling.innerText
  const searchBarInputID=event.target.getAttribute("data-target")
  document.getElementById(searchBarInputID).value=marktVorschlag
}


function boxClicken(event,searchKreuz){
  
 
  const marktName= event.target.innerText.trim() //deleting spaces at beginning and ending
  const box= document.getElementById(`meine_märkte_box_${marktName.toLowerCase()}`)

  if (event.target.tagName=="I"){ //click auf Pfeil
    return
  }else if(box){ //box schon vorhanden
    searchKreuz.click()
    return
  }

  //neue Box hinzufügen zu meine_märkte
 
  const OriginalBox= document.querySelector(`[data-name=${marktName}]`)
  OriginalBox.click()
  searchKreuz.click()
 
  
}

//Boxen erstellen, für meine Märkte return [ptag,ptag_id]
function ptag_ersteller(target){

  const name=target.innerText.toLowerCase()
  const ptag_id="meine_märkte_box_" + name

  const ptag=`
  <p class='meine_märkte_box d-block' id='${ptag_id}' data-remove-id='${target.id}_label'>
  <span>${target.innerText}</span>
  <i class='fa-solid fa-xmark meine_märkte_box_kreuz'></i>
  </p>`

  const temp=document.createElement("div")
  temp.innerHTML+=ptag
  const ptagNode=temp.childNodes[1]

  return [ptag,ptag_id,ptagNode]
  }

//wenn Box entchecken wird das aufgerufen
function toggleAndBoxhandling(box,number,toggleButton){ 
  
  //bei toggleButton erkennbar ob es Markenmenu oder Märktemenu ist. je nachdem wird box genommen
  const viertesKind= toggleButton.id.includes("Mk") ? meine_märkteMk.children[3] : meine_märkte.children[3]
  const isBoxVisible=!box.classList.contains("d-none")
  if(toggleButton.checked) toggleButton.checked=false //box entfernen--> toggle entchecken
  isBoxVisible && number>3 ? viertesKind.classList.replace("d-none","d-block") : null
  box.remove()
}
  


//onclick Funktionen:

//trashcan
function deleteAll(){
  showMoreText.click()
  const alle=meine_märkte.querySelectorAll(".meine_märkte_box_kreuz")
  
  alle.forEach((box)=>{
    box.click()
  })   
}

function deleteAllMk(){
  showMoreTextMk.click()
  const alle=meine_märkteMk.querySelectorAll(".meine_märkte_box_kreuz")
  alle.forEach((box)=>{
    box.click()
  })  

}


function checken(event){

    const chkbox=event.target.previousElementSibling
    if (chkbox.checked) return deleteAll()

    if (SearchKreuz.style.visibility=="visible") SearchKreuz.click()
    const allBoxes=document.querySelectorAll("[data-MenuBox='märkte']")
  
    chkbox.checked=!chkbox.checked
    const checkedState=chkbox.checked
      
    Array.from(allBoxes).forEach((box)=>{
      const checkbox=box.querySelector("input").checked
      if (checkbox!=checkedState) box.click() //nur nicht gecheckte Boxen anclicken
    }) 

}


//toggle-button onclick
function checkenMk(event){
    
    const chkbox=event.target.previousElementSibling

    if (chkbox.checked) return deleteAllMk() //es löscht alle Boxen 
    if (SearchKreuzMk.style.visibility=="visible") SearchKreuzMk.click()

    
    allBoxes=document.querySelectorAll("[data-MenuBox='marken']")
            
    chkbox.checked=!chkbox.checked
    const checkedState=chkbox.checked
      
    Array.from(allBoxes).forEach((box)=>{
      const checkbox=box.querySelector("input").checked
      if (checkbox!=checkedState) box.click() //nur nicht gecheckte Boxen anclicken
    }) 
      

}

  
//PreisToggleChecken
function toggle(event){
  const chkbox=event.target.previousElementSibling
  const PriceBox=document.getElementById("PriceChoosenToggle")
  chkbox.checked=!chkbox.checked

  let dynamicValue="kein Wert"
  chkbox.checked ? dynamicValue= "reduzierte Artikel" : null
  
 
  let box=  ChoosenBoxGenerator("PriceChoosenToggle",dynamicValue,"deleteMyself_togglePrice(event)","reduzierteArtikel")
  dynamicValue!="kein Wert" ? ChoosenFilterDiv.innerHTML+=box : PriceBox.remove()
}

function toggleShowMoreText (number,showmoretext){
  number>6
  ? showmoretext.style.visibility="visible"
  : showmoretext.style.visibility="hidden"  
}


function updateBoxAppereance(target){
  
  const checkbox=target.querySelector("input")
  const häkchen=target.querySelector("label")
  checkbox.checked=!checkbox.checked 
  häkchen.classList.toggle("bg-success",checkbox.checked)
}




//für MarkenMenu und MärkteMenu
function märkte_checken(event,zähler,meineMärkte,toggleButton,ausgewählteMärkte,alleAnzeigenText){
  
  const clickedCheckbox=event.target.querySelector("input")
  const ptag_infos= ptag_ersteller(event.target)
  const speicher= meineMärkte==meine_märkte ? märkteSpeicher : markenSpeicher
  const speicherTarget=speicher.querySelector(`#${event.target.getAttribute("id")}`)
  

  //KopieBox vorhanden, dann soll auch da checken und bg success
  const searchBoxTarget=document.getElementById(event.target.id + "_kopie")
  if (searchBoxTarget!=null) updateBoxAppereance(searchBoxTarget)
  updateBoxAppereance(event.target)

  const number= parseInt(zähler.textContent)
  zähler.textContent= number + (clickedCheckbox.checked ? 1 :-1) //checked +1, unchecked -1

  
  if (clickedCheckbox.checked){ //meineMärkte hinzufügen
    meineMärkte.innerHTML+=ptag_infos[0]
    //mehr als 3 vorhanden, soll clickedBox unsichtbar adden
    const clickedBox=document.getElementById(ptag_infos[1])
   
    //markenSpeicher kennzeichnen, welche checked sind  
    speicherTarget.querySelector("input").checked=true
    speicherTarget.querySelector("label").classList.add("bg-success")
    
    const mehrAlsDrei=parseInt(zähler.textContent)>6
    const small=meineMärkte.getAttribute("data-state")=="small"

    if (mehrAlsDrei && small){
      clickedBox.classList.replace("d-block","d-none")
    }
     

    // bei Märkte und Marken verschieden onclick-Fkt
    clickedBox.lastElementChild.setAttribute("onclick",
      meineMärkte.id=="meine_märkte"
      ? "deleteBoxen(event,toggle_button,märkte_zähler,showMoreText,ausgewählte_box)"
      : "deleteBoxen(event,toggleButtonMk,markenZähler,showMoreTextMk,ausgewählte_boxMk)"
    )

  
  }
  else{ 
    //meineMärkte entfernen
    const clickedBox=document.getElementById(ptag_infos[1])
    const state=meineMärkte.getAttribute("data-state")
    
    //markenSpeicher entchecked merken
    
    speicherTarget.querySelector("input").checked=false
    speicherTarget.querySelector("label").classList.remove("bg-success")
    
    //org Box click und meineMärkte zeigt nur 6 boxen an. wenn davon 1 entfernt , soll von unsichtbare eine box sichtbar werden
    if (state=="small" && number>6) meineMärkte.children[6].classList.replace("d-none","d-block")
    toggleAndBoxhandling(clickedBox,number,toggleButton)
  }
  
  //aktualisierte zähler.innerText
  toggleShowMoreText(zähler.innerText,alleAnzeigenText)

}


//suchvorschläge box entfernen
function entfernen(event){
  const parentBox=event.target.parentElement.parentElement
  parentBox.classList.replace("d-block","d-none")
}


//suchergebnisse box clicken
function markt_kopie_clicken(event,zähler,meineMärkte){

  const isMk=meineMärkte.id.includes("Mk")
  const togglebutton=isMk ? toggleButtonMk : toggle_button
  const showmoretext=isMk ? showMoreTextMk : showMoreText
  const onClickFkt=
  isMk 
  ? "deleteBoxen(event,toggleButtonMk,markenZähler,showMoreTextMk,ausgewählte_boxMk)" 
  : "deleteBoxen(event,toggle_button,märkte_zähler,showMoreText,ausgewählte_box)"


  const originalBox=document.getElementById(event.target.id.replace("_kopie",""))

  updateBoxAppereance(originalBox) 
  updateBoxAppereance(event.target)

  const checkbox_kop=event.target.children[0].checked 
  let number=parseInt(zähler.textContent)
  zähler.textContent= number + (checkbox_kop ? 1:-1)

  //Boxen zu meine Märkte hinzufügen/entfernen
  if (checkbox_kop){
    const ptag_infos=ptag_ersteller(event.target)
    
    const removeId=ptag_infos[2].getAttribute("data-remove-id").replace("_kopie_label","_label")
    ptag_infos[2].setAttribute("data-remove-id",removeId)
    
  
    ptag_infos[2].lastElementChild.setAttribute("onclick",onClickFkt)

    if (number>=3) ptag_infos[2].classList.replace("d-block","d-none") // ptag_infos[2] wird "d-block" hinzugefügt,deshalb replace, anstatt add
    meineMärkte.appendChild(ptag_infos[2])

  }
  else{
    const name=event.target.innerText.toLowerCase()  
    const meineBox= document.getElementById(`meine_märkte_box_${name}`) //vermeidung ptag_ersteller() unnötig erneut aufzurufen.stattdessen locaten
    toggleAndBoxhandling(meineBox,number,togglebutton)

  }

 // parseInt(zähler.textContent) statt number, da es aktuelle Wert gibt
  toggleShowMoreText(parseInt(zähler.textContent),showmoretext) 

}


function filterMenuHandler(event){
  if (event.target.tagName=="DIV") return //tagName!="DIV" -> Auswahl mehrere wird vermieden
  
  aktuelle_filter.textContent= event.target.textContent
  document.getElementById("filterChoosen")?.remove()
  ChoosenFilterDiv.innerHTML+= ChoosenBoxGenerator("filterChoosen",event.target.innerText,"deleteMyself_filter(event)","filter")

}




function deleteBoxen(event,toggleButton,zähler,showMoreText,ausgewählte_box){
  const number=parseInt(zähler.textContent)
  const ptag=event.target.parentElement
  const orgId=ptag.getAttribute("data-remove-id").replace("_label","")
    
  //im Speicher unchecked notieren
  const speicher= zähler==märkte_zähler ? märkteSpeicher : markenSpeicher
  const speicherBox=speicher.querySelector(`#${orgId}`)
  speicherBox.querySelector("input").checked=false
  speicherBox.querySelector("label").classList.remove("bg-success")



  if (toggleButton.checked) toggleButton.checked=false
  const selectedDiv=event.target.getAttribute("onclick").includes("Mk") ? meine_märkteMk : meine_märkte
 
  //wenn 7boxen und 1 löschen->6 übrig, also, darf kein mehr anzeigen geben
  if (number==7){
   showMoreText.innerText="alle anzeigen" 
   showMoreText.style.visibility="hidden"
   selectedDiv.setAttribute("data-state","small")
   
  }
 
  const small=selectedDiv.getAttribute("data-state")
  if (small && number>6){
    const siebteKind=ptag.parentElement.children[6]
    siebteKind.classList.replace("d-none","d-block")
  }
  
  function defaultAppereance(target){
    if (target){
      target.classList.remove("bg-success")
      target.previousElementSibling.checked=false
    }
    
  }
  
  const ptagRemoveId=ptag.getAttribute("data-remove-id")

  //Original Box
  defaultAppereance(document.getElementById(ptagRemoveId))

  //Kopie Box
  const label_kopie=document.getElementById(ptagRemoveId + "_kopie")
  label_kopie!=null ? defaultAppereance(label_kopie) : null
  
  zähler.textContent=number-1
  ptag.remove()
}


function filterHinzufügen(zähler,ID,meineMärkte){

  const zählerWert=parseInt(zähler.textContent)
  document.getElementById(ID)?.remove() 
  if (zählerWert<=0) return
  
  const bedingung=meineMärkte.id.includes("Mk")

  let onClickFkt=
  bedingung
  ? "deleteMyself_marken(event)"
  : "deleteMyself_märkte(event)"
  
  let filter= bedingung ? "marken" : "märkte"
  const allChildren=Array.from(meineMärkte.children)
  let children=[]
  allChildren.forEach(child=>{
    children.push(child.textContent.replace(/\s+/g, '')) //Whitespaces mit '' ersetzen
  })
  const childrenString=children.join(";")


  dynamicValue=allChildren.slice(0,2).map(markt=> markt.textContent.replace(/\s+/g, '')).join(",")
  if (zählerWert>2) dynamicValue+=` &(${zählerWert-2})`
  
  ChoosenFilterDiv.innerHTML+=
  `<p class="showChoosenFilter" id="${ID}" data-filter="${filter}" data-all="${childrenString}"> 
    <span class="ChooseninnerText">
     ${dynamicValue}
    </span>
    <i class='fa-solid fa-xmark showChoosenFilterKreuz' onclick=${onClickFkt}></i>
  </p>`
  
}

//MärktenMenu. reaktion auf zählerWert veränderung
const mutationObserver=new MutationObserver(entries=>{
  filterHinzufügen(märkte_zähler,"märkteChoosen",meine_märkte)
})
mutationObserver.observe(märkte_zähler,{childList:true})


//MarkenMenu. reaktion auf zählerWert veränderung
const mutationObserverMk=new MutationObserver(entries=>{
  filterHinzufügen(markenZähler,"markenChoosen",meine_märkteMk) 
})
mutationObserverMk.observe(markenZähler,{childList:true})





//alle Boxen wieder anzeigen wenn man auf Kreuz clicked
function searchBar(input,kreuz){ 
  input.value=""
  kreuz.style.visibility="hidden"
  const div = (kreuz==SearchKreuz) ? märkteDiv : markenDiv

  const speicher= kreuz==SearchKreuz ? märkteSpeicher : markenSpeicher
  kreuz==SearchKreuz ? notFoundStyleMärkte("","hidden","","none") : notFoundStyleMk("","hidden","","none") 
  
  div.innerHTML=""
   
  Array.from(speicher.children).forEach(box=>{
    div.appendChild(box.cloneNode(true))
  })
   
}


function SearchKreuzHandler(){
  searchBar(searchBarInput,SearchKreuz)
}
function SearchKreuzMkHandler(){
  searchBar(searchBarInputMk,SearchKreuzMk)
}


function notFoundStyleMk(a,b,c,d){
  const fakeplaceholder=searchBarDivMk.querySelector(".FakePlaceHolder")
  const notFound=searchBarDivMk.querySelector("#notFound")
  const kreisKreuz=fakeplaceholder.firstElementChild

  searchBarDivMk.style=a
  notFound.style.visibility=b
  fakeplaceholder.style=c
  kreisKreuz.style.display=d
}

function notFoundStyleMärkte(a,b,c,d){
  const fakeplaceholder=searchBarDiv.querySelector(".FakePlaceHolder")
  const notFound=searchBarDiv.querySelector("#notFoundMärkte")
  const kreisKreuz=fakeplaceholder.firstElementChild

  searchBarDiv.style=a
  notFound.style.visibility=b
  fakeplaceholder.style=c
  kreisKreuz.style.display=d
}







function EingabeVerarbeitung(itemsList,searchBarDiv){ 
  const searchBarKreuz=searchBarDiv.children[2]
  const searchBarInput=searchBarDiv.children[0]
  const searchquery=searchBarInput.value
  let searchMatches=null

  if (searchquery.length){

    searchBarKreuz.style.visibility="visible" 
    searchMatches=itemsList.filter(item=>item.toLowerCase().includes(searchquery.toLowerCase()))
   
    if (searchMatches.length>0){
      notFoundStyleMk("","hidden","","none")
      executeSearch(searchMatches,searchquery,"Marken")
    }
    else{   
      notFoundStyleMk("border:2px solid rgb(219, 14, 14)","visible","color:rgb(219, 14, 14)","inline-block")
    }
         
  }
  else{  

    notFoundStyleMk("","hidden","","none")
    markenDiv.innerHTML=""
    Array.from(markenSpeicher.children).forEach(box=>{ markenDiv.appendChild(box.cloneNode(true)) })
    searchBarKreuz.style.visibility="hidden"
  }   
  

}

function executeSearch(searchMatches,searchquery,choosed){
           
      neuesDiv=document.createElement("div")
      neuesDiv.innerHTML=` <h1 class="ms-2" style="margin-top:30px">'${searchquery.toLowerCase()}'</h1>`
      //für jede ergebnis aus suche ein box erstellen
    
      for (i=0; i<searchMatches.length;i++){

        const speicher= choosed=="Marken" ? markenSpeicher : märkteSpeicher
        const box_kopie=speicher.querySelector(`[data-name='${searchMatches[i]}']`).cloneNode(true) //originalBox kopieren
              
        //textNode durch spanTag mit markierung ersetzen.übereinstimmende buchstaben
        let neueTag=document.createElement("span")
        neueTag.classList.add("noPointer")
        const alteText=box_kopie.firstChild

        const regex= new RegExp(searchquery,"ig")
        neueTag.innerHTML=box_kopie.textContent.replace(regex,match=>`<b>${match}</b>`)
        box_kopie.replaceChild(neueTag,alteText)
        neuesDiv.appendChild(box_kopie)       
      }  
      
      const div= choosed=="Marken" ? markenDiv : märkteDiv
      div.innerHTML=""
      div.appendChild(neuesDiv)  
   
      

}



//EingabeVerarbeitung für märkteMenu
function EingabeVerarbeitungMärkte(itemsList,searchBarDiv){ 
  const searchBarKreuz=searchBarDiv.children[2]
  const searchBarInput=searchBarDiv.children[0]
  const searchquery=searchBarInput.value
  let searchMatches=null

  if (searchquery.length){

    searchBarKreuz.style.visibility="visible" 
    searchMatches=itemsList.filter(item=>item.toLowerCase().includes(searchquery.toLowerCase()))
    
   
    if (searchMatches.length>0){
      notFoundStyleMärkte("","hidden","","none")
      executeSearch(searchMatches,searchquery,"Märkte")
    }
    else{   
      notFoundStyleMärkte("border:2px solid rgb(219, 14, 14)","visible","color:rgb(219, 14, 14)","inline-block")
    }
         
  }
  else{  

    notFoundStyleMärkte("","hidden","","none")
    märkteDiv.innerHTML=""
    Array.from(märkteSpeicher.children).forEach(box=>{ märkteDiv.appendChild(box.cloneNode(true)) })
    searchBarKreuz.style.visibility="hidden"
  }   
  

}






function searchBarInputHandler(event){
  //eingabeverarbeitung separate funktion hier einsetzen
  EingabeVerarbeitungMärkte(märkte_liste,searchBarDiv)
}

function searchBarInputMkHandler(event){
  EingabeVerarbeitung(marken_liste,searchBarDivMk)
}










function showMoreTextToggle(meineMärkte,showMoreText,ausgewählte_box){
  const kopieBoxen=meineMärkte.querySelectorAll(".meine_märkte_box")
  const Anzeigen=showMoreText.innerText
 
  if (Anzeigen=="alle anzeigen"){
    showMoreText.innerText="weniger anzeigen"
    meineMärkte.setAttribute("data-state","big")
    
    kopieBoxen.forEach((box)=>{box.classList.replace("d-none","d-block")}) //alle boxen sichtbar machen
  }
  else{    
    showMoreText.innerText="alle anzeigen"
    meineMärkte.setAttribute("data-state","small")
    //ausgewählte_box.style.cssText="height:50px;width:400px" 
    
    Array.from(kopieBoxen).slice(6).forEach((markt)=>{
    markt.classList.replace("d-block","d-none")
    })   
  }
}

function showMoreTextHandler(){
  showMoreTextToggle(meine_märkte,showMoreText,ausgewählte_box)
}
function showMoreTextMkHandler(){
  showMoreTextToggle(meine_märkteMk,showMoreTextMk,ausgewählte_boxMk)
}



function AddingChoosenPrice(minWert,maxWert){
  document.getElementById("PriceChoosen")?.remove()
  
  ChoosenFilterDiv.innerHTML+=ChoosenBoxGenerator("PriceChoosen",`${minWert}€ - ${maxWert}€`,"deleteMyself_price(event)","preis")
  changingPrice.innerText=`${minWert}€ - ${maxWert}€` // changingText ändern
}


function thumbHandler(){
  AddingChoosenPrice(priceInputs[0].value,priceInputs[1].value)
}


function secondpriceInput(event){
  let curWert=event.target.value
  const EingabeZahl=parseInt(curWert)
  const MinInputZahl=parseInt(priceInputs[0].value)

  if (curWert==0){
    event.target.value=9999
    
  }else if (EingabeZahl<MinInputZahl){
    MinInputZahl+100<=9999 ? event.target.value=MinInputZahl+100 : event.target.value=9999
  } 
  AddingChoosenPrice(priceInputs[0].value,event.target.value)
}

function secondpriceInputHandler(event){
  secondpriceInput(event)
}

function firstpriceInput(event){
  curWert=event.target.value
  const EingabeZahl=parseInt(curWert)
  const MaxInputZahl=parseInt(priceInputs[1].value)
  if (curWert==0){
    event.target.value=0
  
  }else if (EingabeZahl>MaxInputZahl){
    MaxInputZahl-100>=0 ? event.target.value=MaxInputZahl-100 : event.target.value=0
  }
  AddingChoosenPrice(event.target.value, priceInputs[1].value)
}

function firstpriceInputHandler(event){
 firstpriceInput(event)
}

function priceInputHandlerZero(event){
  taste=event.key
  if (!["Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(taste) && ![1,2,3,4,5,6,7,8,9,0].includes(Number(taste))){
    event.preventDefault()  } 
  if (taste=="Enter") priceInputs[0].blur() 
}
function priceInputHandlerOne(event){
  taste=event.key
  if (!["Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(taste) && ![1,2,3,4,5,6,7,8,9,0].includes(Number(taste))){
    event.preventDefault()  } 
  if (taste=="Enter") priceInputs[1].blur() 
}


function updateProgress(){
  const minthumbV=thumbs[0].value
  const maxthumbV=thumbs[1].value
  const range=9999
  
  const Valuerange=maxthumbV-minthumbV
  const width = (Valuerange/range) *100
  progress.style.width= width + "%"
  const minOffset= (minthumbV)/range *100
  progress.style.left=minOffset + "%"
}



function CleanInput(event){
  const curWert=event.target.value
  
  if(curWert=="") return //wenn leer input, rangeslider nicht verändern
  
  if (curWert[0]==0 && curWert.length>1){
    event.target.value = curWert.slice(1)
  }

  else if (curWert.length>4){
    event.target.value = curWert.slice(0, 4) 
  } 
}


function ThumbColorHandlerTwo(event){
  CleanInput(event)
  const curWert=event.target.value
  thumbs[1].value=curWert
  minV=parseInt(thumbs[0].value)
  const range=parseInt(priceInputs[1].value)-parseInt(priceInputs[0].value)
  
  if (range<=100){
    thumbs[1].value=parseInt(thumbs[0].value)+100
    const minthumbV=parseInt(thumbs[0].value)
    const maxthumbV=parseInt(thumbs[1].value) //gibt minV+100 Wert heraus
    progress.style.width=((maxthumbV-minthumbV)/9999)*100 + "%"
  }
  else{
    progress.style.width=(range/9999)*100 + "%"
  }
  
  if (curWert==""){
  thumbs[1].value=9999
  progress.style.width=((9999-minV)/9999)*100 + "%"
  }
}
function ThumbColorHandlerOne(event){
  CleanInput(event)
  const curWert=event.target.value
  thumbs[0].value=curWert
  const range=parseInt(priceInputs[1].value)-parseInt(priceInputs[0].value)
  
  if (range<=100){
    thumbs[0].value=parseInt(thumbs[1].value)-100
    const minthumbV=parseInt(thumbs[0].value)
    const maxthumbV=parseInt(thumbs[1].value) //gibt maxV-100 Wert heraus
    progress.style.width=((maxthumbV-minthumbV)/9999)*100 + "%"
    progress.style.left=((minthumbV)/9999)*100 + "%"
    
  }
  else{
  progress.style.width=((range)/9999)*100 + "%"
  progress.style.left=(parseInt(curWert)/9999)*100 + "%"
  }

  if (curWert==""){
    thumbs[0].value=0
    progress.style.left=0
  }
}



function thumbPosition(zahlA,zahlB,operator,newValue){
 const PriceGap=thumbs[1].value-thumbs[0].value



 
 if (PriceGap<=100){
  thumbs[zahlA].value= operator=="+" ? parseInt(thumbs[zahlB].value)+100 : parseInt(thumbs[zahlB].value)-100
  
 }else{
  priceInputs[zahlA].value=newValue
  updateProgress()
 }
}

function thumbPositionHandlerTwo(event){
  const inputTwo=event.target
  thumbPosition(1,0,"+",inputTwo.value) 
  if (!inputTwo.classList.contains("overlap")) {
    inputTwo.previousElementSibling.classList.remove("overlap")
    inputTwo.classList.add("overlap")
  }
}

function thumbPositionHandlerOne(event){
  const inputOne=event.target
  thumbPosition(0,1,"-",inputOne.value) 
  if (!inputOne.classList.contains("overlap")) {
    inputOne.nextElementSibling.classList.remove("overlap")
    inputOne.classList.add("overlap")
  }
}


function Counter(string,zeichen){
  let counter=0
  for (i=0;i<string.length;i++){
    if (string[i]==zeichen) counter+=1
  }
  return counter
}

//gibt neue Kopie vom Array ohne elem zurück
const removeElement= (array,elem)=> array.filter(opt=>opt!=elem)


function fakeplaceholderMoving(searchBarInput,searchInputId){
 
  //auserhalb searchBar fakeplaceholder wieder reinmoven
  function move(event){ 
    if (event.target.id!=searchInputId && searchBarInput.value==""){
      placeholderCls.remove("FakePlaceHolderAnimation")
      document.removeEventListener("click",move)
    }
  }
  const placeholderCls=searchBarInput.nextElementSibling.classList
  placeholderCls.add("FakePlaceHolderAnimation")
  document.addEventListener("click",move)
}

function movingText(event){
  fakeplaceholderMoving(searchBarInput,"searchBarInput") 
}

function  movingTextMk(event){
  fakeplaceholderMoving(searchBarInputMk,"searchBarInputMk") 
}


/*
let CounterChangingGb=0 //zählt wie viele GB-Optionen in Überschrift eingefügt sind. Maximal 2 Stück
let hiddenGbArray=[]
function helper(event){
  function AddingFilter(event){

    if (event.target.tagName!="INPUT" || event.target.id=="allegb") return
    const allegbInput=document.getElementById("allegb") 
    const selectedValue=event.target.nextElementSibling.innerText.replace("\n"," ")
  
    
    if (event.target.checked){

      if (allegbInput.checked) allegbInput.checked=false //nicht allegbInput.click(),weil soll nicht entchecken  
     
      if (changingGb.innerText=="alle GB-Optionen"){
         changingGb.innerText=selectedValue
      }
      else if(CounterChangingGb>=2){
        hiddenGbArray.push(selectedValue)
        if(!changingGb.innerText.includes(".")) changingGb.innerText+=",.."      
      }
      else{
        changingGb.innerText+= `,${selectedValue}`       
      }  

      CounterChangingGb+=1 
      const id=`${event.target.id}Choosen`
      ChoosenFilterDiv.innerHTML+=ChoosenBoxGenerator(id,selectedValue,"deleteMyself_speicherKap(event)","speicherkapazität")
      

    }
    else{

      CounterChangingGb-=1
      //wenn kein GB Optionen gechecked, soll es "alle GB-Optionen" checken
      const ohneLetzteInput=Array.from(alleInput).slice(0,-1)
      const allUnchecked=ohneLetzteInput.every(input=>!input.checked)
      if (allUnchecked) allegbInput.click()

      let filteredArray=changingGb.innerText.split(",").filter(Opt=>Opt!=selectedValue)
     
      if (Counter(filteredArray.join(",") , ",")==1){                
          if (hiddenGbArray.length==1) filteredArray=removeElement(filteredArray,"..")
          
          //immer 2 Optionen sollen sichtbar sein, aus hiddenGbArray holen wenn nötig
          filteredArray.length==1
          ? filteredArray.push(hiddenGbArray[0])
          : filteredArray.splice(filteredArray.length-1,0,hiddenGbArray[0])

          //hiddenGbArray[0] zu sichtbaren gemacht, deshalb aus hidden löschen
          hiddenGbArray=removeElement(hiddenGbArray,hiddenGbArray[0])     
      }
      
      hiddenGbArray=removeElement(hiddenGbArray,selectedValue) //wenn Gb nicht angezeigt wird trotzdem bon hiddenGbArray löschen  
      if (hiddenGbArray.length==0) filteredArray=removeElement(filteredArray,"..")        
      changingGb.innerText=filteredArray.join(",")
      
      document.getElementById(event.target.id+ "Choosen").remove()
      
    }
   
  }

  AddingFilter(event)
}
*/



let hovertimer
function show(event,size){ 
  
  hovertimer=setTimeout(()=>{
    const slide=document.getElementById(event.target.getAttribute("data-slidemenu"))
   size=="normal" ? slide.classList.add("openBit") : slide.classList.add("openBigBit")  
  },500)
}

function showNot(event){
  clearTimeout(hovertimer)
  const slide=document.getElementById(event.target.getAttribute("data-slidemenu"))
  slide.classList.remove("openBit","openBigBit")
}


function mousedown(event){ event.target.style.color="black" }
function mouseup(event){ event.target.style.color="" }

const observerChildren=new MutationObserver(mutations=>{
  const count=ChoosenFilterDiv.children.length
  const submitDiv=document.getElementById("submitDiv")
  const alleLöschen=document.getElementById("alleLöschen")
  
  submitDiv.classList.toggle("visible",count>0)
  if (count>0) alleLöschen.innerText=`Alle löschen(${count})` 
})

observerChildren.observe(ChoosenFilterDiv,{childList:true})


function reset(){
 const alle=document.querySelectorAll("#showChoosenFilter p [class*='showChoosenFilterKreuz']")
 alle.forEach( filter=>{filter.click()} )
}



function startScraping(){
  slideInStandard.classList.remove("openSlide")
  errMsg.style.visibility="hidden" //bei scrapingStart entfernen

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
  lesbareUrlfkt(decodeURIComponent(url))  
  
  
 
}


function addingSpeicherKap(event){
   document.getElementById("SpeicherKapChoosen")?.remove() //falls andere Bewertung vorhanden,löschen
   const changingSpeicherKap=document.getElementById("changingSpeicherKap")
   //changing Überschrift ändern
   changingSpeicherKap.innerHTML= event.target.nextElementSibling.innerText
   if (event.target.id!="allegb"){
    ChoosenFilterDiv.innerHTML+= ChoosenBoxGenerator("SpeicherKapChoosen",event.target.nextElementSibling.innerText,"deleteMyself_speicherKap(event)","speicherKap")
   } 
  
}


//produkt Scraping Anfrage schicken
const searchbar=document.getElementById("searchbar")

//SlideMenu schliesen, wenn searchbar focus
searchbar.addEventListener("focus",()=>{
  slideInStandard.classList.remove("openSlide")
})


//Schickt die Scraping Anfrage an Backend, wenn in searchbar ein nichtleeres Wort eingegeben wird
searchbar.addEventListener("keydown",(event)=>{

  const searchVal=event.target.value.trim()
  if (event.key=="Enter" && searchVal!=""){
    
    const produkt=event.target.value
    event.target.value=""
    errMsg.style.visibility="hidden" //falls davor errMSg vorhanden war, soll nach Suche entfernen
    history.pushState(null,"",`http://127.0.0.1:8000/suche/?produkt=${produkt}`)
    fetchRequest(`http://127.0.0.1:8000/suche/?produkt=${produkt}`)
    
    
  }

})



async function fetchRequest(url){
  const response= await fetch(url).then(response=>response.text())

  if (response=="Fehler"){    
   errMsg.style.visibility="visible"
   return   
  }

  const parser= new DOMParser()
  const doc= parser.parseFromString(response,"text/html")
  const alleProdukte=doc.getElementById("inhalt")
  produkteDiv.innerHTML=""
  produkteDiv.appendChild(alleProdukte)
  requestAnimationFrame(()=>{alleProdukte.style.opacity="1"})
  
  //timeoutFehler.html wenn mit Kreuz entfernen, dann mit übergang entfernen
  if (alleProdukte.classList=="errorBox"){
    function transitioning(event){
      if (getComputedStyle(alleProdukte).opacity=="0"){
        alleProdukte.remove()
        alleProdukte.removeEventListener("transitionend",transitioning)
      }      
    }
    alleProdukte.addEventListener("transitionend",transitioning)
  
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