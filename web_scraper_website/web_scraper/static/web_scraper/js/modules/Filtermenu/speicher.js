import { EvtManager } from "../eventListener/class.js"

import { 
  set_INPUT_TIMEOUT,clear_INPUT_TIMEOUT,clear_timeout, set_timeout, clear_HOVERTIMER, set_HOVERTIMER, set_CUR_POSITION, 
  /*FILTER_MENU, PREISE_MENU, CHOOSENFILTERDIV, 
  TOGGLE_SWITCH_MÄRKTE, TOGGLE_SWITCH_MARKEN, MÄRKTEDIV, MÄRKTE_ZÄHLER, MEINE_MÄRKTE, SHOWMORE_TXT, SHOWMORE_TXT_MK, MÄRKTE_TOGGLE_STATE, 
  MARKEN_TOGGLE_STATE, MARKEN_ZÄHLER, MEINE_MARKEN, FM_SLIDES, RATING_POPUP, OVERLAY, FILTERMENU_SLIDE, NB, MAIN_DIV, SCROLLBAR_WIDTH, 
  NB_SEARCHBAR, PRICE_SLIDE, aktuelle_filter, ausgewählte_box, ausgewählte_boxMk, SearchKreuz, SearchKreuzMk, searchBarInput, searchBarInputMk, 
  searchBarDiv, searchBarDivMk, RANGESLIDERBOX, priceInputs, progress, thumbs, changingRating, changingPrice, leftArrows, preiseInputs, 
  SEPARATOR, SLIDER, priceRanges, PRICE_TOGGLE, CHOOSENFILTER, SUBMITDIV, DELETE_ALL,marken_liste, CUR_POSITION,
  BEWERTUNGEN_MENU, CHOOSEN_CONTENT, LEFT_ARROWS, NOTFOUND_MÄRKTE,CLEAR_BTN, CHOSEN_MARKETS, CHOSEN_MARKETS_SELECTIONS,
  MÄRKTE_MENU, CHOOSE_ALL,MARKET_OPTIONS, EMPTY_MSG, SEARCHBAR_MÄRKTE,
  FAKEPLACEHOLDER_MÄRKTE, CROSSIMG_MÄRKTE, MARKETS, MQ_MAX1060, MÄRKTE_SLIDE,MARKET_GRIP*/
} from "./variables.js";

import * as V from "./variables.js"
export * from "./variables.js"



export function ButtonClickHandling(menu){
  
  const SlideDiv = menu.parentElement
  SlideDiv.classList.add("openSlide")
  const changingHeader = SlideDiv.querySelector(".changingText")
  changingHeader?.classList.remove("toRight")  // at show-function this was moved to right out of normal position to hide it. now removing to position it normal

  SlideDiv.querySelector("[class*='positioningIcon']").classList.add("d-none") // Icon only for showing a bit menu
  SlideDiv.querySelector(".arrowLeftCorner").classList.remove("d-none")  // important for leaving the current slide
  EvtManager.attachListener(menu.id)

}



export function ChoosenBoxGenerator(id,text,filter){
  return `<p class="showChoosenFilter" id="${id}" data-filter="${filter}"> 
    <span class="ChooseninnerText">
     ${text}
    </span>
    <i class='fa-solid fa-xmark showChoosenFilterKreuz'></i>
  </p>`
}


// Help

function clearPrevHighlight(){
  const prevRating = BEWERTUNGEN_MENU.querySelector(".borderYellow")
  prevRating.classList.remove("borderYellow")

  const prevStars = Array.from(prevRating.children)
  prevStars.forEach(star => {
    star.classList.remove("yellow")
  })
}

function highlightItem(elem){
  elem.classList.add("borderYellow")  

  const stars = Array.from(elem.children)
  stars.forEach(star => {
    star.classList.add("yellow")
  })
}

function updateHighlight(elem){
  clearPrevHighlight()            // unhighlight the previous choosen rating
  highlightItem(elem)             // highlight current choosen rating
}


function addToChoosenFilter(event, ratingType){

  // remove the class from stars so it will be smaller
  const clone = event.target.cloneNode(true)
  Array.from(clone.children).forEach(star => {
    star.classList.remove("default")
    star.classList.add("moveBitUp")
  })

  // add new rating-box to start slide
  if (ratingType!="all"){
    CHOOSEN_CONTENT.innerHTML+= ChoosenBoxGenerator("RatingChoosen",clone.innerHTML,"bewertung")
  } 
}

// user chooses stars option. function changes header
// removes existing stars option box on startSlide and adds new starts option to start slide
export function addingRatingHelp(event){
  const ratingType = event.target.dataset.stars
  document.getElementById("RatingChoosen")?.remove()

  updateHighlight(event.target)
  changingRating.innerHTML = ratingType == "all" ? "Alle Bewertungen" : event.target.innerHTML  //change header
  addToChoosenFilter(event, ratingType)

}



// Main
export function addingRating(e){
    if (!e.target.hasAttribute("data-stars")) return    // Only react to click on radio btn
    addingRatingHelp(e)

}



// Help

// make icon of the menu visible and arrow unvisible
function unhideIcon(curSlide, arrow){
  curSlide.addEventListener("transitionend",function icon(event){
    if (event.propertyName != "transform") return
    curSlide.querySelector("[class*='positioningIcon']").classList.remove("d-none")
    arrow.classList.add("d-none")   
    curSlide.removeEventListener("transitionend",icon)

  })

}



// clear the searchbar if the curSlide closes
function handleMenuSpecificClose(menuType){
  switch(menuType){
    case "märkte_menu":
      SearchKreuz.click()
      break
    
    case "marken_menu":
      SearchKreuzMk.click()
      break
  }
}


// Main
export function ArrowLeftSlide(event){
  
  const menuType = event.target.getAttribute("data-detach")
  const curSlide = event.target.parentElement.parentElement   

  curSlide.classList.remove("openSlide")                      // close curSlide
  handleMenuSpecificClose(menuType)                           // performs extra actions when closing märkte or marken menu
  unhideIcon(curSlide, event.target)                          // make icon visible and arrow unvisible after right slide completely closed
  EvtManager.detachListener(menuType)                         // delete eventlisteners of the current menu
}


export function resetFilter(event){
  event.target.parentElement.remove()
  aktuelle_filter.innerText="Topseller"  
}


// close chosen markets section based on if bottom or right slide ist active
function closeCM(){
  if (MQ_MAX1060.matches){
    MÄRKTE_MENU.classList.replace("secondB-height","firstB-height")    
  }
  else{
    MÄRKTE_MENU.classList.remove("second-height","third-height")
    MÄRKTE_MENU.classList.add("first-height")
    CHOSEN_MARKETS.classList.remove("bigger-height")
  }

  CHOSEN_MARKETS.hidden = true

}

// sets marketSlide to default with removing all choosen markets
function removeMarkets(){

  const markets = Array.from(CHOSEN_MARKETS_SELECTIONS.children)
  markets.forEach(market =>{
    const box = MARKET_OPTIONS.querySelector(`[data-find='${market.dataset.find}']`)
    const btn_span = box.querySelector(".btnMärkte").firstElementChild
    btn_span.innerText = "Auswählen"
    market.remove()
  })

  MÄRKTE_ZÄHLER.innerText = 0
  CHOOSE_ALL.firstElementChild.innerText = "Alle auswählen"
  closeCM()

}

export function resetMärkte(event){
  event.target.parentElement.remove()
  removeMarkets() 

}

export function resetMarken(event){
  event.target.parentElement.remove() 
}

export function resetPriceToggle(event){
  event.target.parentElement.remove()
  document.getElementById("preisToggle").checked = false
 
  
}

export function resetPrice(event){
  event.target.parentElement.remove()
  priceInputs[0].value=0
  priceInputs[1].value=9999

  thumbs[0].value=0
  thumbs[1].value=9999
  
  changingPrice.innerText="0€ - 9999€"

  progress.style.left=0
  progress.style.width="100%"

}


export function resetRating(event){
  event.target.parentElement.remove()
  updateHighlight(V.ALL_STARS)                      // highlight 'Alle Bewertungen' box
  changingRating.innerHTML = "Alle Bewertungen"


}

export function resetSpeicherKap(event){
  event.target.parentElement.remove() //eigene Box entfernen
  document.getElementById("allegb").click() //allegb auswählen
}


//Suchvorschläge pfeil click, MarktName in searchBarInput verschieben
export function moveText(event){
  const marktVorschlag=event.target.previousElementSibling.innerText
  const searchBarInputID=event.target.getAttribute("data-target")
  document.getElementById(searchBarInputID).value=marktVorschlag
}


export function boxClicken(event,searchKreuz){
  
 
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
export function ptag_ersteller(target){

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
export function toggleAndBoxhandling(box,number,toggleButton){ 
  
  //bei toggleButton erkennbar ob es Markenmenu oder Märktemenu ist. je nachdem wird box genommen
  const viertesKind= toggleButton.id.includes("Mk") ? MEINE_MARKEN.children[3] : MEINE_MÄRKTE.children[3]
  const isBoxVisible=!box.classList.contains("d-none")
  if(toggleButton.checked) toggleButton.checked=false //box entfernen--> toggle entchecken
  isBoxVisible && number>3 ? viertesKind.classList.replace("d-none","d-block") : null
  box.remove()
}
  


//onclick Funktionen:

export function deleteAll(){
  
  // delete every choosen box
  const boxes = Array.from(MEINE_MÄRKTE.children)
  boxes.forEach((box)=>{
    deleteBox(box,MÄRKTE_TOGGLE_STATE,MÄRKTE_ZÄHLER,SHOWMORE_TXT)
  })   


}

export function deleteAllMk(){

  const boxes = Array.from(MEINE_MARKEN.children)
  boxes.forEach((box)=>{
    deleteBox(box,MARKEN_TOGGLE_STATE,MARKEN_ZÄHLER,SHOWMORE_TXT_MK)
  })  

}


export function checken(event){

    // uncheck every box
    const chkbox = event.target.previousElementSibling
    if (chkbox.checked) return deleteAll()

    if (SearchKreuz.style.visibility=="visible") SearchKreuz.click()
    const allBoxes = document.querySelectorAll("[data-MenuBox='märkte']")
    
    // update checked state
    chkbox.checked =! chkbox.checked
    const checkedState = chkbox.checked
      
    // select all not choosen markets
    Array.from(allBoxes).forEach((box)=>{
      const checkbox = box.querySelector("input").checked
      if (checkbox!=checkedState) selectBox(box,MÄRKTE_ZÄHLER,MEINE_MÄRKTE,MÄRKTE_TOGGLE_STATE,SHOWMORE_TXT)
    }) 

}


//toggle-button onclick
export function checkenMk(event){
    
  // uncheck every box
    const chkbox = event.target.previousElementSibling
    if (chkbox.checked) return deleteAllMk()

    if (SearchKreuzMk.style.visibility=="visible") SearchKreuzMk.click()
    const allBoxes = document.querySelectorAll("[data-MenuBox='marken']")
    
    // update checked state
    chkbox.checked =! chkbox.checked
    const checkedState = chkbox.checked
    
    // select all unchoosen boxes
    Array.from(allBoxes).forEach((box)=>{
      const checkbox = box.querySelector("input").checked
      if (checkbox!=checkedState) selectBox(box,MARKEN_ZÄHLER,MEINE_MARKEN,MARKEN_TOGGLE_STATE,SHOWMORE_TXT_MK)
    })
      

}

  
//PreisToggleChecken
export function toggle(event){
  const PriceBox = document.getElementById("PriceChoosenToggle")
  const chkbox = event.target.previousElementSibling
  chkbox.checked = !chkbox.checked
  
  let operation = 0
  operation = chkbox.checked ? 1 : 0
  
  let box = ChoosenBoxGenerator("PriceChoosenToggle","reduzierteArtikel","reduzierteArtikel")
  operation == 1 ? CHOOSEN_CONTENT.innerHTML+=box : PriceBox.remove()
  
}



export function toggleShowMoreText (number,showmoretext){
  number>6
  ? showmoretext.style.visibility="visible"
  : showmoretext.style.visibility="hidden"  
}


export function updateBoxAppereance(target){
  
  const checkbox=target.querySelector("input")
  const häkchen=target.querySelector("label")
  checkbox.checked=!checkbox.checked 
  häkchen.classList.toggle("bg-success",checkbox.checked)
}






//für MarkenMenu und MärkteMenu
export function selectBox(box,zähler,meineMärkte,toggleButton,alleAnzeigenText){
  const clickedCheckbox = box.querySelector("input")
  const ptag_infos= ptag_ersteller(box)
  const speicher= (meineMärkte == MEINE_MÄRKTE) ? märkteSpeicher : markenSpeicher
  const speicherTarget=speicher.querySelector(`#${box.getAttribute("id")}`)
  

  //KopieBox vorhanden, dann soll auch da checken und bg success
  const searchBoxTarget=document.getElementById(box.id + "_kopie")
  if (searchBoxTarget!=null) updateBoxAppereance(searchBoxTarget)
  updateBoxAppereance(box)

  const number= parseInt(zähler.textContent)
  zähler.textContent= number + (clickedCheckbox.checked ? 1 :-1) //checked +1, unchecked -1 

  
  if (clickedCheckbox.checked){ //meineMärkte hinzufügen
    meineMärkte.innerHTML+=ptag_infos[0]
    //mehr als 3 vorhanden, soll clickedBox unvisible adden
    const clickedBox=document.getElementById(ptag_infos[1])
   
    //markenSpeicher kennzeichnen, welche checked sind  
    speicherTarget.querySelector("input").checked=true
    speicherTarget.querySelector("label").classList.add("bg-success")
    
    const mehrAlsDrei=parseInt(zähler.textContent)>6
    const small=meineMärkte.getAttribute("data-state")=="small"

    if (mehrAlsDrei && small){
      clickedBox.classList.replace("d-block","d-none")
    }
     
  
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



export function selectBoxMärkte(e){
  if(e.target.dataset.menubox == "märkte"){
    selectBox(e.target,MÄRKTE_ZÄHLER,MEINE_MÄRKTE,TOGGLE_SWITCH_MÄRKTE,SHOWMORE_TXT)        
  }
}

export function selectBoxMarken(e){
  if(e.target.dataset.menubox == "marken"){
    selectBox(e.target,MARKEN_ZÄHLER,MEINE_MARKEN,TOGGLE_SWITCH_MARKEN,SHOWMORE_TXT_MK)        
  }
}


//suchvorschläge box entfernen
export function entfernen(event){
  const parentBox=event.target.parentElement.parentElement
  parentBox.classList.replace("d-block","d-none")
}


//suchergebnisse box clicken
export function markt_kopie_clicken(event,zähler,meineMärkte){

  const isMk=meineMärkte.id.includes("Mk")
  const togglebutton=isMk ? MARKEN_TOGGLE_STATE : MÄRKTE_TOGGLE_STATE
  const showmoretext=isMk ? SHOWMORE_TXT_MK : SHOWMORE_TXT
  const onClickFkt=
  isMk 
  ? "deleteBox(event,MARKEN_TOGGLE_STATE,MARKEN_ZÄHLER,SHOWMORE_TXT_MK)" 
  : "deleteBox(event,MÄRKTE_TOGGLE_STATE,MÄRKTE_ZÄHLER,SHOWMORE_TXT)"


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


export function filterMenuHandler(event){

  //tagName!="DIV" -> making sure only one is choosen
  if (event.target.classList!="filter"){
    return
  }

  aktuelle_filter.textContent= event.target.textContent
  document.getElementById("filterChoosen")?.remove()

  // Topseller is default setting, so no choosenbox will be added 
  if (event.target.textContent != "Topseller"){
    CHOOSEN_CONTENT.innerHTML+= ChoosenBoxGenerator("filterChoosen",event.target.innerText,"filter")
  }
  

}



function defaultAppereance(target){
  const label = target.querySelector("label")
  const input = target.querySelector("input")
  label.classList.remove("bg-success")
  input.checked = false  
}


export function deleteBox(box,toggleButton,zähler,SHOWMORE_TXT){
  const number = parseInt(zähler.textContent)
  const marketsDiv = box.parentElement // Div which contains all choosen markets
  const speicher= marketsDiv.id == "meine_märkte" ? märkteSpeicher : markenSpeicher  
  const orgId = box.getAttribute("data-remove-id").replace("_label","")
  const speicherBox = speicher.querySelector(`#${orgId}`)
  const small = marketsDiv.getAttribute("data-state") == "small"

  // toggle uncheck
  if (toggleButton.checked) toggleButton.checked = false

  //im Speicher unchecked notieren  
  speicherBox.querySelector("input").checked=false
  speicherBox.querySelector("label").classList.remove("bg-success")


  //wenn 7boxen und 1 löschen->6 übrig, also, darf kein mehr anzeigen geben
  if (number==7){
   SHOWMORE_TXT.innerText = "alle anzeigen" 
   SHOWMORE_TXT.style.visibility = "hidden"
   marketsDiv.setAttribute("data-state","small")
   
  }
 
  if (small && number>6){
    const siebteKind=box.parentElement.children[6]
    siebteKind.classList.replace("d-none","d-block")
  }
  
  
   // delete green color and uncheck box of originalbox
  defaultAppereance(document.getElementById(orgId))


  zähler.textContent=number-1
  box.remove()
}



export function deleteBoxMärkte(e){
  if (e.target.tagName == "I"){
    deleteBox(e.target.parentElement,TOGGLE_SWITCH_MÄRKTE,MÄRKTE_ZÄHLER,SHOWMORE_TXT)
  }
}

export function deleteBoxMarken(e){
  if (e.target.tagName == "I"){
    deleteBox(e.target.parentElement,TOGGLE_SWITCH_MARKEN,MARKEN_ZÄHLER,SHOWMORE_TXT_MK)
  }
}



// Help

// builds String which will be in chosenBox and returns it
function buildContent(){

  const chosenMarkets = Array.from(CHOSEN_MARKETS_SELECTIONS.children)
  let content = ""

  chosenMarkets.forEach((box, index) => {
    const title = box.querySelector(".title").innerText

    if (index == 0){
      content += title
    }
    else if (index == 1){
      content += ", " + title
    }

    if (index >= 2 && index == chosenMarkets.length - 1){
      const remaining = index - 1     // calculates how much markets after first two markets are added
      content += ` &(${remaining})`
    }
  })

  return content;

}


// all market names as string separeted with ';'
function getMarketsAsString(){
  const chosenMarkets = Array.from(CHOSEN_MARKETS_SELECTIONS.children)
  .map(box => box.querySelector(".title").textContent.replace(/\s+/g, ''))

  return chosenMarkets.join(";")



  /*
  allChildren.forEach(child=>{
    children.push(child.textContent.replace(/\s+/g, '')) //Whitespaces mit '' ersetzen
  })
  const childrenString=children.join(";")*/

}


function addChosenBox(){
  const content = buildContent()
  const childrenString = getMarketsAsString()

  document.getElementById("märkteChoosen")?.remove() 
  CHOOSEN_CONTENT.innerHTML+=
  `<p class="showChoosenFilter" id="märkteChoosen" data-filter="märkte" data-all="${childrenString}"> 
    <span class="ChooseninnerText">
     ${content}
    </span>
    <i class='fa-solid fa-xmark showChoosenFilterKreuz'></i>
  </p>`

}

function changeTxtAllBtn(targetTxt){
  CHOOSE_ALL.querySelector("span").innerText = targetTxt
}

function updateAllBtn(){
  const options = MARKET_OPTIONS.children.length
  const chosen = CHOSEN_MARKETS_SELECTIONS.children.length

  if (options == chosen){
    changeTxtAllBtn("Alle abwählen")
  }
  else{
    changeTxtAllBtn("Alle auswählen")
  }
}


// Main
export function onMarketsChange(){
  //handleCounterChange(MÄRKTE_ZÄHLER,"märkteChoosen",MEINE_MÄRKTE)

  const cntVal = parseInt(MÄRKTE_ZÄHLER.textContent)
  updateAllBtn()

  if (cntVal == 0){
    document.getElementById("märkteChoosen").remove() // choosen market box will be removed
  }
  else{
    addChosenBox()    
  }

}







// adds or removes markets from choosen when counter changes
// <=0 unvisible trashcan
// >0 visible trashcan
function handleCounterChange(zähler,ID,meineMärkte){

  const zählerWert = parseInt(zähler.textContent)
  document.getElementById(ID)?.remove()       // choosen market box will be removed

  let trashcan = (meineMärkte == MEINE_MÄRKTE ? TRASHCAN_MÄRKTE : TRASHCAN_MARKEN)   
  trashcan.classList.add("unvisible")     // if zählerWert<=0 then it will stay unvisible if >0 then unvisible will be removed z.787

  if (zählerWert<=0) return

  trashcan = (meineMärkte == MEINE_MÄRKTE ? TRASHCAN_MÄRKTE : TRASHCAN_MARKEN) 
  trashcan.classList.remove("unvisible")     // make trashcan visible because there are choosen markets
 

  const bedingung = meineMärkte.id.includes("Mk")  
  let filter= bedingung ? "marken" : "märkte"
  const allChildren=Array.from(meineMärkte.children)
  let children=[]
  allChildren.forEach(child=>{
    children.push(child.textContent.replace(/\s+/g, '')) //Whitespaces mit '' ersetzen
  })
  const childrenString=children.join(";")


  let dynamicValue=allChildren.slice(0,2).map(markt=> markt.textContent.replace(/\s+/g, '')).join(",")
  if (zählerWert>2) dynamicValue+=` &(${zählerWert-2})`
  
  CHOOSEN_CONTENT.innerHTML+=
  `<p class="showChoosenFilter" id="${ID}" data-filter="${filter}" data-all="${childrenString}"> 
    <span class="ChooseninnerText">
     ${dynamicValue}
    </span>
    <i class='fa-solid fa-xmark showChoosenFilterKreuz'></i>
  </p>`

  
}

export function handleMarkenCounterChange(){
  handleCounterChange(MARKEN_ZÄHLER,"markenChoosen",MEINE_MARKEN)
}






//alle Boxen wieder anzeigen wenn man auf Kreuz clicked
export function searchBar(input,kreuz){ 
  input.value = ""
  input.dispatchEvent(new Event("input"))
  kreuz.classList.remove("visible")
  kreuz == SearchKreuz ? noMarketsStyle(false) : notFoundStyleMarken(false) 
  
  /*
  const div = (kreuz==SearchKreuz) ? MÄRKTEDIV : markenDiv
  div.innerHTML=""
  const speicher= kreuz==SearchKreuz ? märkteSpeicher : markenSpeicher
  Array.from(speicher.children).forEach(box=>{
    div.appendChild(box.cloneNode(true))
  })
  */
   
}


export function SearchKreuzHandler(){
  searchBar(searchBarInput,SearchKreuz)
}
export function SearchKreuzMkHandler(){
  searchBar(searchBarInputMk,SearchKreuzMk)
}


export function notFoundStyleMarken(useStyle){
  const fakeplaceholder=searchBarDivMk.querySelector(".FakePlaceHolder")
  const notFound=searchBarDivMk.querySelector("#notFound")
  const kreisKreuz=fakeplaceholder.firstElementChild

  if (useStyle == true){
    searchBarDivMk.classList.add("redBorder")
    notFound.classList.add("visible")
    fakeplaceholder.classList.add("red")
    kreisKreuz.classList.add("d-inline-block")
  }
  else{
    searchBarDivMk.classList.remove("redBorder")
    notFound.classList.remove("visible")
    fakeplaceholder.classList.remove("red")
    kreisKreuz.classList.remove("d-inline-block")
  }
}



export function noMarketsStyle(useStyle){
  const fakeplaceholder = searchBarDiv.querySelector(".FakePlaceHolder")
  const kreisKreuz = fakeplaceholder.firstElementChild

  if (useStyle == true){
    searchBarDiv.classList.add("redBorder")
    fakeplaceholder.classList.add("red")
    kreisKreuz.classList.add("d-inline-block")
  }
  else{
    searchBarDiv.classList.remove("redBorder")
    fakeplaceholder.classList.remove("red")
    kreisKreuz.classList.remove("d-inline-block")
  }

  
}





export function EingabeVerarbeitung(itemsList,searchBarDiv){ 
  const searchBarKreuz=searchBarDiv.children[2]
  const searchBarInput=searchBarDiv.children[0]
  const searchquery=searchBarInput.value
  let searchMatches=null

  if (searchquery.length){

    searchBarKreuz.style.visibility="visible" 
    searchMatches=itemsList.filter(item=>item.toLowerCase().includes(searchquery.toLowerCase()))
   
    if (searchMatches.length>0){
      notFoundStyleMarken(false)
      executeSearch(searchMatches,searchquery,"Marken")
    }
    else{   
      notFoundStyleMarken(true)
    }
         
  }
  else{  

    notFoundStyleMarken(false)
    markenDiv.innerHTML=""
    Array.from(markenSpeicher.children).forEach(box=>{ markenDiv.appendChild(box.cloneNode(true)) })
    searchBarKreuz.style.visibility="hidden"
  }   
  

}

export function executeSearch(searchMatches,searchquery,choosed){
           
      const neuesDiv= document.createElement("div")
      neuesDiv.innerHTML=` <h1 class="ms-2" style="margin-top:30px">'${searchquery.toLowerCase()}'</h1>`

      //für jede ergebnis aus suche ein box erstellen  
      for (let i=0; i<searchMatches.length;i++){

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
      
      const div= choosed=="Marken" ? markenDiv : MÄRKTEDIV
      div.innerHTML=""
      div.appendChild(neuesDiv)  
   
      

}



//EingabeVerarbeitung für märkteMenu
export function EingabeVerarbeitungMärkte(itemsList,searchBarDiv){ 
  const searchBarInput=searchBarDiv.children[0]
  const searchquery=searchBarInput.value
  let searchMatches=null

  if (searchquery.length){

    CLEAR_BTN.classList.add("visible")
    searchMatches=itemsList.filter(item=>item.toLowerCase().includes(searchquery.toLowerCase()))
    
   
    if (searchMatches.length>0){
      //noMarketsStyle(false)
      //executeSearch(searchMatches,searchquery,"Märkte")
    }
    else{   
      noMarketsStyle(true)
    }
         
  }
  else{  
    CLEAR_BTN.classList.remove("visible")
    noMarketsStyle(false)
    //MÄRKTEDIV.innerHTML=""
    //Array.from(märkteSpeicher.children).forEach(box=>{ MÄRKTEDIV.appendChild(box.cloneNode(true)) })
    
  }   
  

}

export function searchBarInputMkHandler(){
  EingabeVerarbeitung(marken_liste,searchBarDivMk)
}








export function showMoreTextToggle(meineMärkte,SHOWMORE_TXT,ausgewählte_box){
  const kopieBoxen=meineMärkte.querySelectorAll(".meine_märkte_box")
  const Anzeigen=SHOWMORE_TXT.innerText
 
  if (Anzeigen=="alle anzeigen"){
    SHOWMORE_TXT.innerText="weniger anzeigen"
    meineMärkte.setAttribute("data-state","big")
    
    kopieBoxen.forEach((box)=>{box.classList.replace("d-none","d-block")}) //alle boxen sichtbar machen
  }
  else{    
    SHOWMORE_TXT.innerText="alle anzeigen"
    meineMärkte.setAttribute("data-state","small")
    //ausgewählte_box.style.cssText="height:50px;width:400px" 
    
    Array.from(kopieBoxen).slice(6).forEach((markt)=>{
    markt.classList.replace("d-block","d-none")
    })   
  }
}

export function showMoreTextHandler(){
  showMoreTextToggle(MEINE_MÄRKTE,SHOWMORE_TXT,ausgewählte_box)
}
export function showMoreTextMkHandler(){
  showMoreTextToggle(MEINE_MARKEN,SHOWMORE_TXT_MK,ausgewählte_boxMk)
}



export function AddingChoosenPrice(minWert,maxWert){

  
  document.getElementById("PriceChoosen")?.remove()   // delete current choosenbox
  changingPrice.innerText = `${minWert}€ - ${maxWert}€`   // update header

  // for 0 - 9999 no choosenbox will be added, because it is default setting
  if (!(minWert == 0 && maxWert == 9999)){
    CHOOSEN_CONTENT.innerHTML += ChoosenBoxGenerator("PriceChoosen",`${minWert}€ - ${maxWert}€`,"preis")
  }
  

  
}


export function thumbHandler(){
  AddingChoosenPrice(priceInputs[0].value,priceInputs[1].value)
}


export function secondpriceInput(event){
  let curWert = event.target.value
  const inputTwo = parseInt(curWert)
  const inputOne = parseInt(priceInputs[0].value)

  // if secondInput is empty it will be 9999
  if (curWert == ""){
    event.target.value = 9999
    
  }else if (inputTwo < inputOne){
    inputOne+100 <= 9999 ? event.target.value = inputOne+100 : event.target.value = 9999
  } 
  AddingChoosenPrice(priceInputs[0].value,event.target.value)
}

export function secondpriceInputHandler(event){
  secondpriceInput(event)
}

export function firstpriceInput(event){
  const curWert = event.target.value
  const inputOne = parseInt(curWert)
  const inputTwo = parseInt(priceInputs[1].value)

  // if input is empty it will be 0
  if (curWert == ""){
    event.target.value = 0
  
  }

  // first value bigger than second value
  else if (inputOne > inputTwo){
    inputTwo-100 >= 0 ? event.target.value = inputTwo-100 : event.target.value = 0
  }

  AddingChoosenPrice(event.target.value, priceInputs[1].value)
}

export function firstpriceInputHandler(event){
 firstpriceInput(event)
}

export function priceInputHandlerZero(event){
  const taste = event.key

  if (!["Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(taste) && ![1,2,3,4,5,6,7,8,9,0].includes(Number(taste))){
    event.preventDefault()  
  } 

  if (taste == "Enter"){
    priceInputs[0].blur()
  } 
}


export function priceInputHandlerOne(event){
  const taste = event.key

  if (!["Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(taste) && ![1,2,3,4,5,6,7,8,9,0].includes(Number(taste))){
    event.preventDefault()  
  } 

  if (taste == "Enter"){
    priceInputs[1].blur() 
  }
}


export function updateProgress(){
  const minthumbV=thumbs[0].value
  const maxthumbV=thumbs[1].value
  const range=9999
  
  const Valuerange=maxthumbV-minthumbV
  const width = (Valuerange/range) *100
  progress.style.width= width + "%"
  const minOffset= (minthumbV)/range *100
  progress.style.left=minOffset + "%"
}



export function CleanInput(event){
  const curWert=event.target.value
  
  if(curWert=="") return //wenn leer input, rangeslider nicht verändern
  
  if (curWert[0]==0 && curWert.length>1){
    event.target.value = curWert.slice(1)
  }

  else if (curWert.length>4){
    event.target.value = curWert.slice(0, 4) 
  } 
}


export function ThumbColorHandlerTwo(event){
  CleanInput(event)
  const curWert=event.target.value
  thumbs[1].value=curWert
  const minV=parseInt(thumbs[0].value)
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
export function ThumbColorHandlerOne(event){
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



export function thumbPosition(zahlA,zahlB,operator,newValue){
 const PriceGap=thumbs[1].value-thumbs[0].value



 
 if (PriceGap<=100){
  thumbs[zahlA].value= operator=="+" ? parseInt(thumbs[zahlB].value)+100 : parseInt(thumbs[zahlB].value)-100
  
 }else{
  priceInputs[zahlA].value=newValue
  updateProgress()
 }
}

export function thumbPositionHandlerTwo(event){
  const inputTwo=event.target
  thumbPosition(1,0,"+",inputTwo.value) 
  if (!inputTwo.classList.contains("overlap")) {
    inputTwo.previousElementSibling.classList.remove("overlap")
    inputTwo.classList.add("overlap")
  }
}

export function thumbPositionHandlerOne(event){
  const inputOne=event.target
  thumbPosition(0,1,"-",inputOne.value) 
  if (!inputOne.classList.contains("overlap")) {
    inputOne.nextElementSibling.classList.remove("overlap")
    inputOne.classList.add("overlap")
  }
}


export function Counter(string,zeichen){
  let counter=0
  for (i=0;i<string.length;i++){
    if (string[i]==zeichen) counter+=1
  }
  return counter
}




//gibt neue Kopie vom Array ohne elem zurück
const removeElement= (array,elem)=> array.filter(opt=>opt!=elem)


export function fakeplaceholderMoving(searchBarInput,searchInputId){
 
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

export function movingText(){
  fakeplaceholderMoving(searchBarInput,"searchBarInput") 
}

export function  movingTextMk(){
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
      CHOOSENFILTERDIV.innerHTML+=ChoosenBoxGenerator(id,selectedValue,"speicherkapazität")
      

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


// Help

function hideLeftArrow(event){
  const targetSlideId = event.target.dataset.slidemenu
  const targetSlide = document.getElementById(targetSlideId)
  const leftArr = targetSlide.querySelector(".arrowLeftCorner")
  leftArr.classList.add("unvisible")
}




// Help


// at show, the headerTxt is a bit seen. but only the icon should be seen, so temporary moving it to right
function moveHeader(slide){
  if (window.innerWidth > 1060){
    const changingHeader = slide.querySelector(".changingText")
    changingHeader.classList.add("toRight")
  }
}



// Main
export function show(event,size){ 

  if(event.target.classList != "ButtonDesign") return // only react to btn-element. hover on child elements of btn will be ignored

  const slideId = event.target.getAttribute("data-slidemenu")
  const slide = document.getElementById(slideId)

  moveHeader(slide) 

  
  // show a little of the menu
  const new_hovertimer = setTimeout(()=>{
    if(window.innerWidth <= 1060){
      slide.classList.add("openBit_bottom")
    }
    else{
      size == "normal" ? slide.classList.add("openBit_right") : slide.classList.add("openBigBit_right")    
    }    
  },500)

  set_HOVERTIMER(new_hovertimer)
}


// Help
function unhideLeftArrow(targetSlide){
  const leftArr = targetSlide.querySelector(".arrowLeftCorner")
  leftArr.classList.remove("unvisible")
}



// Main
export function showNot(event){
  if(event.target.classList != "ButtonDesign") return // only react to btn-element. hover on child elements of btn will be ignored
  clear_HOVERTIMER()  // => clearTimeout(HOVERTIMER) will be executed
  const slide = document.getElementById(event.target.getAttribute("data-slidemenu"))
  slide.classList.remove("openBit_bottom","openBigBit_bottom","openBit_right","openBigBit_right")

}


export function mousedown(e){ 
  e.preventDefault()
  if (e.target.classList == "filter"){
    e.target.style.color="black" 
  }
  
}

export function mouseup(e){
  if (e.target.classList == "filter"){
    e.target.style.color="" 
  }
   
}

// counts the number of choosen filter and writes it in X => Alle Löschen(X)
export function updateDeleteAllCount(){
  const count = CHOOSEN_CONTENT.children.length  

  if (count > 0) {
    DELETE_ALL.classList.remove("d-none")
    DELETE_ALL.innerText = `Alle löschen(${count})` 
  }
  else{
    DELETE_ALL.classList.add("d-none")
  }
}


// delete all choosen filter options button
export function reset(e){

  if(e.target.id != "alleLöschen"){
    return
  }

  const alle = document.querySelectorAll("#showChoosenFilter p [class*='showChoosenFilterKreuz']")
  alle.forEach(filter=>{
    filter.click()
  })
}


// choosing GB-Option, square gets checked, header txt changes, box ist added to first Slide
export function addingSpeicherKap(event){

  if(event.target.name != "speicherKap"){
    return
  }

  document.getElementById("SpeicherKapChoosen")?.remove() //falls andere Bewertung vorhanden,löschen
  const changingSpeicherKap=document.getElementById("changingSpeicherKap")


  //changing Überschrift ändern
  changingSpeicherKap.innerHTML= event.target.nextElementSibling.innerText

  if (event.target.id!="allegb"){
    CHOOSEN_CONTENT.innerHTML+= ChoosenBoxGenerator("SpeicherKapChoosen",event.target.nextElementSibling.innerText,"speicherKap")
  } 
  
}



// Help

// shift slide without transition, so the change is unvisible for the user 
function shiftSlide(move){
  for (const slide of FM_SLIDES){
      slide.classList.add("notrans")
  
      slide.classList.toggle("moveDown", move == "down")

      // wait 2 Frames to remove notrans, so 1 Frame is rendered with notrans
      requestAnimationFrame(() => {
          requestAnimationFrame(() => {
              slide.classList.remove("notrans");
          });
      });
  }
}



// Main

export function adjustMenuLayout(){
  
    if ( window.innerWidth <= 1060 && CUR_POSITION == "RIGHT"){

        shiftSlide("down")
        set_CUR_POSITION("BOTTOM")
    }

    else if ( window.innerWidth > 1060 && CUR_POSITION == "BOTTOM"){

        shiftSlide("up")
        set_CUR_POSITION("RIGHT")
    }

    
}


// Help

function makeMenuVisible(){
  for (const slide of FM_SLIDES){
    slide.classList.remove("unvisible")
  }
}


// Main

// if user reloads website with small window, slides are shown on bottom right corner
// to fix this, all slides are unvisible at start and this function executes one time at start
// it positions the slides correctly (bottom or right) and makes all slides visible
// bottom if <=1060px
// right if >1060px
export function setInitialMenuPosition(){
  adjustMenuLayout()
  makeMenuVisible()
}



// if user clicks the X of the boxes on the Startslide at the bottom( these are the choosen filter of the user)
// this filter gets reset, and default value for this filter will be set
export function removeFilter(e){

  if (e.target.tagName !== "I") return

    switch(e.target.parentElement.id){

      case "filterChoosen":
        resetFilter(e)
        break
        
      case "PriceChoosen":
        resetPrice(e)
        break

      case "RatingChoosen":
        resetRating(e)
        break  
      
      case "PriceChoosenToggle":
        resetPriceToggle(e)
        break
      
      case "SpeicherKapChoosen":
        resetSpeicherKap(e)
        break
      
      case "markenChoosen":
        resetMarken(e)
        break
      
      case "märkteChoosen":
        resetMärkte(e)
        break
            
    }

}



// if chosenMarket is open and bottomSlide changes to rightSlide
// this function adjusts the layout to the rightSlide
function chosenMarketToRight(){
  const count = CHOSEN_MARKETS_SELECTIONS.children.length
  if (count > 0){
    MÄRKTE_MENU.classList.replace("secondB-height","second-height")
  }
 
}





// changing chosenMarket layout from right to bottom
function chosenMarketToBottom(){
  const count = CHOSEN_MARKETS_SELECTIONS.children.length
  if (count == 0) return

  // remove settings chosenMarket for rightSlide
  MÄRKTE_MENU.classList.remove("first-height","second-height","third-height")
  CHOSEN_MARKETS.classList.remove("bigger-height")

  // only class needed for chosenMarket bottomSlide
  MÄRKTE_MENU.classList.add("secondB-height")

}



// Help

function toPriceBLayout(){
  PREISE_MENU.classList.replace("preise_menu","preise_menuBottom")
  PRICE_SLIDE.classList.add("flex-center")
  SEPARATOR.classList.replace("separator","separatorB")

  for (const preisInput of preiseInputs){
    preisInput.classList.replace("preise_input","preise_inputB")
  }

  // rangeSlider
  RANGESLIDERBOX.classList.add("width440")
  SLIDER.classList.add("width420")
  PRICE_TOGGLE.classList.replace("priceToggle","priceToggleB")

  for (const elem of priceRanges){
    elem.classList.add("width420")
  }

  // choosenboxes and all delete, submit button
  CHOOSENFILTER.classList.replace("Choosenfilter","ChoosenfilterB")
  SUBMITDIV.classList.replace("submitDiv","submitDivB")
  
  // set height for all bottom slides
  for (const slide of FM_SLIDES){
    slide.classList.add("height440")
  }

}

function toPriceRLayout(){
  PREISE_MENU.classList.replace("preise_menuBottom","preise_menu")
  SEPARATOR.classList.replace("separatorB","separator")
  PRICE_SLIDE.classList.remove("flex-center")

  for (const preisInput of preiseInputs){
    preisInput.classList.replace("preise_inputB","preise_input")
  }

  // rangeSlider
  RANGESLIDERBOX.classList.remove("width440")
  SLIDER.classList.remove("width420")
  PRICE_TOGGLE.classList.replace("priceToggleB","priceToggle")

  for (const elem of priceRanges){
    elem.classList.remove("width420")
  }

  CHOOSENFILTER.classList.replace("ChoosenfilterB","Choosenfilter")
  SUBMITDIV.classList.replace("submitDivB","submitDiv")
  
  for (const slide of FM_SLIDES){
    slide.classList.remove("height440")
  }

}




function toRatingBLayout(){
  RATING_POPUP.classList.replace("ratingPopUp","ratingPopUpB")
  RATING_POPUP.classList.replace("closedPopUp","closedPopUpB")
  BEWERTUNGEN_MENU.classList.replace("bewertungen_menu","bewertungen_menuB")

  // because innerHTML has been deleted, have to re-query the element
  // HIGH_RATINGS variable points to old element
  const highRatings = document.getElementById("highRatings")
  const lowRatings = document.getElementById("lowRatings")
  highRatings.classList.add("ratingRow")
  lowRatings.classList.add("ratingRow")
}

function toRatingRLayout(){
  // rating pop up
  RATING_POPUP.classList.replace("ratingPopUpB","ratingPopUp")
  RATING_POPUP.classList.replace("closedPopUpB","closedPopUp")
  BEWERTUNGEN_MENU.classList.replace("bewertungen_menuB","bewertungen_menu")


  const rows = BEWERTUNGEN_MENU.querySelectorAll(".ratingRow")
  rows.forEach(row=>{
    row.classList.remove("ratingRow")
  })
}



function toMarketBLayout(){
  MARKET_OPTIONS.classList.remove("pr-38")
  MÄRKTE_MENU.classList.replace("first-height","firstB-height")
  MÄRKTE_MENU.classList.add("ps-0")
  MARKET_GRIP.classList.add("positionGrip")

  FAKEPLACEHOLDER_MÄRKTE.classList.add("top-8")
  CROSSIMG_MÄRKTE.classList.add("top-1")
  searchBarInput.classList.add("w-750")
  NOTFOUND_MÄRKTE.classList.replace("empty","emptyB")

  // causing chosenMarket to be full width
  MÄRKTE_SLIDE.classList.add("pl-0")
  SEARCHBAR_MÄRKTE.classList.add("ml-50","width-100-70")
  MARKET_OPTIONS.classList.add("ml-50","width-100-50")

  CHOSEN_MARKETS.classList.add("h-145")
  CHOSEN_MARKETS_SELECTIONS.classList.replace("chosenMarkets-selections","chosenMarkets-selectionsB")

  // applied on every market box
  MARKETS.forEach(market => {
    market.querySelector(".subtitle").classList.add("fs-11")
  })


  chosenMarketToBottom()  // adjust chosenMarket section if open


}





function toMarketRLayout(){
  MARKET_OPTIONS.classList.add("pr-38")
  MÄRKTE_MENU.classList.replace("firstB-height","first-height")
  MÄRKTE_MENU.classList.remove("ps-0")
  MARKET_GRIP.classList.remove("positionGrip")
  FAKEPLACEHOLDER_MÄRKTE.classList.remove("top-8")
  CROSSIMG_MÄRKTE.classList.remove("top-1")
  searchBarInput.classList.remove("w-750")
  MÄRKTE_SLIDE.classList.remove("pl-0")
  SEARCHBAR_MÄRKTE.classList.remove("ml-50","width-100-70")
  MARKET_OPTIONS.classList.remove("ml-50","width-100-50")
  CHOSEN_MARKETS.classList.remove("h-145")
  CHOSEN_MARKETS_SELECTIONS.classList.replace("chosenMarkets-selectionsB","chosenMarkets-selections")
  NOTFOUND_MÄRKTE.classList.replace("emptyB","empty")

  // applied on every market box
  MARKETS.forEach(market => {
    market.querySelector(".subtitle").classList.remove("fs-11")
  })

  chosenMarketToRight() // adjust chosenMarket section if open



}



// Main
function toBottomLayout(){

  // change arrow directions from left to up
  for (const arr of leftArrows){
    arr.classList.replace("fa-arrow-left","fa-arrow-up")
  }

  FILTER_MENU.classList.add("centerContent") 
  CHOOSEN_CONTENT.classList.replace("content","contentB")
  LEFT_ARROWS.forEach(arrow => {arrow.classList.remove("shiftY")})  // bottom arrows look better without movingDown

  toRatingBLayout()
  toPriceBLayout()
  toMarketBLayout()

}

function toRightLayout(){

  for (const arr of leftArrows){
    arr.classList.replace("fa-arrow-up","fa-arrow-left")
  }

  FILTER_MENU.classList.remove("centerContent") 
  CHOOSEN_CONTENT.classList.replace("contentB","content")
  LEFT_ARROWS.forEach(arrow => {arrow.classList.add("shiftY")})

  toRatingRLayout()
  toPriceRLayout()
  toMarketRLayout()
 

}



// Main

// if MQ is true(<=1060px) it will change rightMenu to bottomMenu layout
export function changeMenuLayout(e){

  switch(e.matches){
    case true:
      toBottomLayout()
      break

    case false:
      toRightLayout()
      break
  }


}


// Help

function openingAnimation(){
  requestAnimationFrame(()=>{

    // ratingPopUp has for right and bottom different animations/layout
    if (window.innerWidth > 1060){
      RATING_POPUP.classList.replace("closedPopUp","openPopUp")
    }
    else{
      RATING_POPUP.classList.replace("closedPopUpB","openPopUpB")
    }
    
  })
}

function closingAnimation(){
  if (window.innerWidth > 1060){
    RATING_POPUP.classList.replace("openPopUp", "closedPopUp")
  }
  else{
    RATING_POPUP.classList.replace("openPopUpB", "closedPopUpB")
  }


  // waiting until closing animation is done
  setTimeout(()=>{
    RATING_POPUP.classList.add("d-none")
  },200)
}


// handles showing,not showing of rating popup
// leaving icon or popup starts function after 300ms which will close popup
// entering icon or popup delets the timer
export function enterElem(){
  clear_timeout() 

  // user have to hover 300ms, then popup will start opening
  const new_timeout = setTimeout(() => {
    RATING_POPUP.classList.remove("d-none")
    openingAnimation()

  },300)

  set_timeout(new_timeout)
 
}


export function leaveElem(){
  clear_timeout()

  const new_timeout = setTimeout(() => {  
    closingAnimation()

  },300)

  set_timeout(new_timeout)
}





function disableVerticalScroll(){

  // get current paddingRight value
  const prNB = parseFloat(window.getComputedStyle(NB).paddingRight)
  const prMain = parseFloat(window.getComputedStyle(MAIN_DIV).paddingRight)
  const pixelAdjustment = 0.5
  const minorAdjustment = 0.2
  
  // add scrollbarWidth to current paddingRight
  NB.style.paddingRight = `${SCROLLBAR_WIDTH + prNB +  minorAdjustment}px`
  MAIN_DIV.style.paddingRight = `${SCROLLBAR_WIDTH + prMain + pixelAdjustment}px`

  // searchbar at <=830 moves, so has to be corrected
  if (window.innerWidth <= 830){
    const newPR = parseFloat(window.getComputedStyle(NB_SEARCHBAR).paddingRight) + SCROLLBAR_WIDTH
    NB_SEARCHBAR.style.paddingRight = `${newPR}px`
  }

  // disable scrollbar
  const html = document.documentElement
  html.style.height = "100%"
  html.style.overflowY = "hidden"

}

function enableVerticalScroll(){

  // set paddingRight to default
  NB.style.paddingRight = ""
  MAIN_DIV.style.paddingRight = ""
  window.innerWidth <= 830 ? NB_SEARCHBAR.style.right = "" : null

  // enable scrollbar
  const html = document.documentElement
  html.style.height = ""
  html.style.overflowY = ""

}



export function openMenu(){

  OVERLAY.classList.add("activated")  // black background

  for (const slide of FM_SLIDES){
    slide.classList.add("trans") 
  }

  FILTERMENU_SLIDE.classList.add("openSlide")  
  
  disableVerticalScroll()
  EvtManager.attachListener("slideInStandard")
}


export function closeMenu(){
  OVERLAY.classList.remove("activated")
  FILTERMENU_SLIDE.classList.remove("openSlide")

  // wait until animation of closing menu is done
  // then remove trans from all slides and enable vertical scrolling
  setTimeout(() => {
    for (const slide of FM_SLIDES){
    slide.classList.remove("trans")
    }
    enableVerticalScroll()
  },400)


  EvtManager.detachListener("slideInStandard")

}


function changeRows(){
  const childs = BEWERTUNGEN_MENU.children
  childs[1].prepend(childs[0].lastElementChild)

  const newRow = document.createElement("div")
  newRow.classList.add("ratingRow")
  newRow.append(childs[1].lastElementChild.previousElementSibling, childs[1].lastElementChild)
  BEWERTUNGEN_MENU.appendChild(newRow)


}


function revertRows(){

  const childs = BEWERTUNGEN_MENU.children

  if (childs.length == 3){
    childs[0].appendChild(childs[1].firstElementChild)
    childs[1].append(childs[2].firstElementChild,childs[2].lastElementChild)
    childs[2].remove()
  }
}



// Main
export function restructureRows(e){
  switch(e.matches){
    case true:
      changeRows()
      break
    
    case false:
      revertRows()
      break
  }

}



export function addScrollbar(e){
  switch(e.matches){
    case true:
      CHOOSENFILTERDIV.classList.add("scrollBox")
      break
    
    case false:
      CHOOSENFILTERDIV.classList.remove("scrollBox")
      break
  }
}


// shows if element has scrollbar or not
export function checkScroll(){
  const el = CHOOSEN_CONTENT
  if (el.scrollHeight > el.clientHeight){
    CHOOSENFILTERDIV.classList.add("has-scroll")
  }
  else{
    CHOOSENFILTERDIV.classList.remove("has-scroll")
  }
}



// Help


function incMarketCount(){
  MÄRKTE_ZÄHLER.innerText = parseInt(MÄRKTE_ZÄHLER.innerText) + 1
}
function decMarketCount(){
  MÄRKTE_ZÄHLER.innerText = parseInt(MÄRKTE_ZÄHLER.innerText) - 1
}


// at right slide chosenMarkets can get bigger at height
function adjustRightSlide(childCount){

  if (childCount == 0){
    CHOSEN_MARKETS.hidden = true
    MÄRKTE_MENU.className = "märkte-menu first-height"
  }
  else if (childCount >= 1){
    CHOSEN_MARKETS.hidden = false
    MÄRKTE_MENU.className = "märkte-menu second-height"
  }

}


// chosenMarkets has only one height, cant get bigger
// because not much height available
// no third.height like adjustRightSlide()
function adjustBottomSlide(childCount){

  if (childCount == 0){
    CHOSEN_MARKETS.hidden = true
    MÄRKTE_MENU.className = "märkte-menu firstB-height ps-0"
  }
  else{
    CHOSEN_MARKETS.hidden = false
    MÄRKTE_MENU.className = "märkte-menu ps-0 secondB-height"
  }
}



// depending on if bottom or right is used, different handlings are needed
function handleChosenMarketOpening(){
  const childCount = CHOSEN_MARKETS_SELECTIONS.children.length

  if (MQ_MAX1060.matches){
    adjustBottomSlide(childCount)
  } else {
    adjustRightSlide(childCount)
  }


}

function addToChosenMarkets(curBox){
  const curBoxCopy = curBox.cloneNode(true)

  const title = curBoxCopy.querySelector(".title")
  const btn_copy = curBoxCopy.querySelector(".btnMärkte")

  curBoxCopy.dataset.find = title.innerText                   // when user clicks on Abwählen on original box, selection in chosenMarkets is easier
  title.innerText = title.innerText                           // remove blue highlight


  btn_copy.querySelector("span").innerText = "Entfernen"

  
  btn_copy.addEventListener("mouseup",() => {
    curBoxCopy.remove()
    decMarketCount()
    curBox.querySelector(".btnMärkte span").innerText = "Auswählen"
    handleChosenMarketOpening()   
  })

  CHOSEN_MARKETS_SELECTIONS.appendChild(curBoxCopy)
  incMarketCount()
}



function removeFromChosenMarkets(curBox){
  const marketName = curBox.querySelector(".title").innerText
  const chosenBox = CHOSEN_MARKETS_SELECTIONS.querySelector(`[data-find='${marketName}']`)
  chosenBox.remove()
  decMarketCount()
}




// Main

// select market, debounce of selection-box animation, toggle between 'auswählen' and 'abwählen'
export function toggleMarketSelection(event){

  const curBox = event.target.closest(".selection-box")
  const btnLabel = event.target.firstElementChild
  
  // animation
  curBox.classList.add("selection-box-no-hover")
  setTimeout(() => curBox.classList.remove("selection-box-no-hover"),100)


  // add or remove from chosenMarkets
  if (btnLabel.innerText === "Auswählen") {
    addToChosenMarkets(curBox);
    btnLabel.innerText = "Abwählen";
  } else {
    removeFromChosenMarkets(curBox);
    btnLabel.innerText = "Auswählen";
  }


  handleChosenMarketOpening()

}




// Help

function adjustStyle(){
  const chosenMarkets = Array.from(CHOSEN_MARKETS_SELECTIONS.children)
  chosenMarkets.forEach(market => {
    market.classList.remove("d-none") 

    // remove blue highlight
    const title = market.querySelector(".title")
    title.innerText = title.innerText
  })
}

function addMissingOptions(){

  // select all unchosen markets
  const btns = Array.from(document.querySelectorAll("[class='btnMärkte'] span"))
  .filter(span => span.innerText == "Auswählen")
  .map(span => span.parentElement)


  btns.forEach(btn => {
    btn.dispatchEvent(new MouseEvent("mouseup"))
  })

  adjustStyle()
  
}

function removeAllChoosen(){
  const boxes = Array.from(CHOSEN_MARKETS_SELECTIONS.children)
  boxes.forEach(box => {
    const btn = box.querySelector(".btnMärkte")
    btn.dispatchEvent(new MouseEvent("mouseup"))
  })
   
}




// Main

// not all markets are choosen => add missing markets
// if all markets are choosen => delete all
export function chooseAllHandler(){

  const options = MARKET_OPTIONS.children.length
  const chosen = CHOSEN_MARKETS_SELECTIONS.children.length


  if (chosen < options){
    addMissingOptions()
  } else if (chosen == options){
    removeAllChoosen()
  }


}



function highlight(titleEl,title,inputVal){
  const regex = new RegExp(`(${inputVal})`,"i")
  const newtitle = title.replace(regex,'<span class="highlight">$1</span>')
  titleEl.innerHTML = newtitle

}


function safetyCheck(inputVal){
  const max_len = 50
  if (inputVal.length > max_len){
    console.warn('Suchbegriff zu lang — Abbruch aus Sicherheitsgründen.')
    return false
  }
  return true
}

function noMarketsMsg(){  
  const elExists = !!MARKET_OPTIONS.querySelector(".selection-box:not(.d-none)")

  if (elExists){
    EMPTY_MSG.hidden = true
    noMarketsStyle(false)
  } else{
    EMPTY_MSG.hidden = false
    noMarketsStyle(true)
  }

  
}

function toggleClearBtn(inputVal){
  if (inputVal.trim() != ""){
    CLEAR_BTN.classList.add("visible")
  }
  else {
    CLEAR_BTN.classList.remove("visible")
  }
}


function showMatches(inputVal){
  const markets = Array.from(MARKET_OPTIONS.children)

  markets.forEach(box => {
    const titleEl = box.querySelector(".title")
    const title = titleEl.innerText.trim()
    inputVal = inputVal.trim().toLowerCase()
    const match = title.toLowerCase().includes(inputVal)

    if (!inputVal){
      // all boxes visible
      box.classList.remove("d-none")
      titleEl.innerHTML = title
      return
    }
    

    if (match){
      box.classList.remove("d-none")
      highlight(titleEl,title,inputVal)
    } else{
      box.classList.add("d-none")
    }

  })

  
}

function filterLogic(inputVal){
  toggleClearBtn(inputVal)
  showMatches(inputVal)
  noMarketsMsg()
}

export function filterMarkets(event){
  const inputVal = event.target.value
  if (!safetyCheck(inputVal)){
    return
  }

  clear_INPUT_TIMEOUT()
  set_INPUT_TIMEOUT(setTimeout(() => filterLogic(inputVal),100))
}



// executet when mousedown on marketGrip
export function startResize(e){
  
}