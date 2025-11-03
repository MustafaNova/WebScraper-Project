import { EvtManager } from "../eventListener/class.js"
import * as V from "./variables.js"
export * from "./variables.js"



export function ButtonClickHandling(menu){ 

  const SlideDiv = menu.parentElement
  SlideDiv.classList.add("openSlide")
  SlideDiv.dataset.state = "open"
  const changingHeader = SlideDiv.querySelector(".changingText")
  changingHeader.classList.remove("opacity-0")  // at show header was set unvisible, now remove it

  SlideDiv.querySelector("[class*='positioningIcon']").classList.add("d-none") // Icon only for showing a bit menu
  SlideDiv.querySelector(".arrowCorner").classList.remove("d-none")  // important for leaving the current slide
  EvtManager.attachListener(menu.id)

}



export function ChosenBoxGenerator(id,text,filter){
  return `<p class="showChoosenFilter" id="${id}" data-filter="${filter}"> 
    <span class="ChoseninnerText">
     ${text}
    </span>
    <i class='fa-solid fa-xmark chosenCross'></i>
  </p>`
}


// Help

function clearYellow(menu){
  const prevRating = menu.querySelector(".borderYellow")
  prevRating.classList.remove("borderYellow")

  const prevStars = Array.from(prevRating.children)
  prevStars.forEach(star => {
    star.classList.remove("yellow")
  })
}

function clearBlue(menu){
  const prevBox = menu.querySelector(".selected")
  prevBox.classList.remove("selected")
  prevBox.firstElementChild.classList.remove("white")

}

function clearPrevHighlight(menu){

  if (menu == V.BEWERTUNGEN_MENU){
    clearYellow(menu)
  }
  else{
    clearBlue(menu)
  }
    
}

function highlightYellow(elem){
  elem.classList.add("borderYellow")  

  const stars = Array.from(elem.children)
  stars.forEach(star => {
    star.classList.add("yellow")
  })
}

function highlightBlue(elem){
  elem.classList.add("selected")
  elem.firstElementChild.classList.add("white")
}

function highlightItem(elem, menu){
  if (menu == V.BEWERTUNGEN_MENU){
    highlightYellow(elem)
  }
  else{
    highlightBlue(elem)
  }
  
}


// higlights only the given elem from the given menu
// highlight yellow if rating menu
// highlight blue for other menus
function updateHighlight(elem, menu){
  clearPrevHighlight(menu)          
  highlightItem(elem, menu)  
}


// return stars with smaller font-size
function smallStars(elem){
  const elemCopy = elem.cloneNode(true)
  const stars = elemCopy.querySelectorAll("i")
  stars.forEach(star => star.classList.add("small"))
  return elemCopy.innerHTML
}

function contentGenerator(elem, menuType){
  if (menuType == "gb"){
    return elem.dataset.value
  }
  else if (menuType == "rating"){ 
    return smallStars(elem)
  }
}




// Main
export function addingChosen(event, menuType){
  if (!event.target.hasAttribute("data-value")) return

  const { CHOSEN_ID, MENU, HEADER, FILTER, ALL_CHOSEN } = V.MENUS[menuType]
  const value = event.target.dataset.value
  document.getElementById(CHOSEN_ID)?.remove()

  updateHighlight(event.target, MENU)
  HEADER.innerHTML = value == "all" ? ALL_CHOSEN : menuType == "gb" ? event.target.innerText : event.target.innerHTML  
  
  
  if (value != "all") {
    const content = contentGenerator(event.target, menuType)
    V.CHOOSEN_CONTENT.innerHTML+= ChosenBoxGenerator(CHOSEN_ID,content,FILTER)
  }

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
    case "V.märkte_menu":
      V.CLEAR_BTN.click()
      break
    
    case "marken_menu":
      V.SearchKreuzMk.click()
      break
  }
}


// Main
export function ArrowLeftSlide(event){
  
  const menuType = event.target.getAttribute("data-detach")
  const curSlide = event.target.parentElement.parentElement   

  curSlide.dataset.state = "closed"
  curSlide.classList.remove("openSlide")                      // close curSlide
  handleMenuSpecificClose(menuType)                           // performs extra actions when closing märkte or marken menu
  unhideIcon(curSlide, event.target)                          // make icon visible and arrow unvisible after right slide completely closed
  EvtManager.detachListener(menuType)                         // delete eventlisteners of the current menu
}


export function resetFilter(event){
  event.target.parentElement.remove()
  updateHighlight(V.TOPSELLER, V.FILTER_MENU)
  V.aktuelle_filter.innerText = "Topseller"  
}



function closeCM(menu){
  menu.classList.remove("second-height")
  menu.classList.add("first-height", "normalMode")
}

// sets marketSlide to default with removing all choosen markets
function removeSelections(menuType){
  const { CM_SELECTIONS, OPTIONS, BTN_CLASS, COUNTER, MENU, CHOOSE_ALL } = V.MENUS[menuType]
  const selections = Array.from(CM_SELECTIONS.children)

  selections.forEach(selection =>{
    const box = OPTIONS.querySelector(`[data-find='${selection.dataset.find}']`)
    const btn_span = box.querySelector(BTN_CLASS).firstElementChild
    btn_span.innerText = "Auswählen"
    selection.remove()
  })

  COUNTER.innerText = 0
  CHOOSE_ALL.firstElementChild.innerText = "Alle auswählen"
  closeCM(MENU)




}

export function resetMärkte(event){
  event.target.parentElement.remove()
  removeSelections("märkte") 

}

export function resetMarken(event){
  event.target.parentElement.remove() 
  removeSelections("marken")
}

export function resetPriceToggle(event){
  event.target.parentElement.remove()
  document.getElementById("preisToggle").checked = false
 
  
}

export function resetPrice(event){
  event.target.parentElement.remove()
  V.priceInputs[0].value=0
  V.priceInputs[1].value=9999

  V.thumbs[0].value=0
  V.thumbs[1].value=9999
  
  V.changingPrice.innerText="0€ - 9999€"

  V.progress.style.left=0
  V.progress.style.width="100%"

}


export function resetRating(event){
  event.target.parentElement.remove()
  updateHighlight(V.ALL_STARS,V.BEWERTUNGEN_MENU)              
  V.changingRating.innerHTML = "Alle Bewertungen"


}

export function resetSpeicherKap(event){
  event.target.parentElement.remove()
  updateHighlight(V.ALL_GB,V.SPEICHERKAP_MENU) 
  V.changingGb.innerHTML = "Alle GB-Optionen"
}


//Suchvorschläge pfeil click, MarktName in V.searchBarInput verschieben
export function moveText(event){
  const marktVorschlag=event.target.previousElementSibling.innerText
  const searchBarInputID=event.target.getAttribute("data-target")
  document.getElementById(searchBarInputID).value=marktVorschlag
}


export function boxClicken(event,CLEAR_BTN){
  
 
  const marktName= event.target.innerText.trim() //deleting spaces at beginning and ending
  const box= document.getElementById(`meine_märkte_box_${marktName.toLowerCase()}`)

  if (event.target.tagName=="I"){ //click auf Pfeil
    return
  }else if(box){ //box schon vorhanden
    CLEAR_BTN.click()
    return
  }

  //neue Box hinzufügen zu V.meine_märkte
 
  const OriginalBox= document.querySelector(`[data-name=${marktName}]`)
  OriginalBox.click()
  CLEAR_BTN.click()
 
  
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
  const viertesKind= toggleButton.id.includes("Mk") ? V.MEINE_MARKEN.children[3] : V.MEINE_MÄRKTE.children[3]
  const isBoxVisible=!box.classList.contains("d-none")
  if(toggleButton.checked) toggleButton.checked=false //box entfernen--> toggle entchecken
  isBoxVisible && number>3 ? viertesKind.classList.replace("d-none","d-block") : null
  box.remove()
}
  


//onclick Funktionen:

export function deleteAll(){
  
  // delete every choosen box
  const boxes = Array.from(V.MEINE_MÄRKTE.children)
  boxes.forEach((box)=>{
    deleteBox(box,V.MÄRKTE_TOGGLE_STATE,V.MÄRKTE_ZÄHLER,V.SHOWMORE_TXT)
  })   


}

export function deleteAllMk(){

  const boxes = Array.from(V.MEINE_MARKEN.children)
  boxes.forEach((box)=>{
    deleteBox(box,V.MARKEN_TOGGLE_STATE,V.MARKEN_ZÄHLER,V.SHOWMORE_TXT_MK)
  })  

}


export function checken(event){

    // uncheck every box
    const chkbox = event.target.previousElementSibling
    if (chkbox.checked) return deleteAll()

    if (V.CLEAR_BTN.style.visibility=="visible") V.CLEAR_BTN.click()
    const allBoxes = document.querySelectorAll("[data-MenuBox='märkte']")
    
    // update checked state
    chkbox.checked =! chkbox.checked
    const checkedState = chkbox.checked
      
    // select all not choosen V.markets
    Array.from(allBoxes).forEach((box)=>{
      const checkbox = box.querySelector("input").checked
      if (checkbox!=checkedState) selectBox(box,V.MÄRKTE_ZÄHLER,V.MEINE_MÄRKTE,V.MÄRKTE_TOGGLE_STATE,V.SHOWMORE_TXT)
    }) 

}


//toggle-button onclick
export function checkenMk(event){
    
  // uncheck every box
    const chkbox = event.target.previousElementSibling
    if (chkbox.checked) return deleteAllMk()

    if (V.SearchKreuzMk.style.visibility=="visible") V.SearchKreuzMk.click()
    const allBoxes = document.querySelectorAll("[data-MenuBox='marken']")
    
    // update checked state
    chkbox.checked =! chkbox.checked
    const checkedState = chkbox.checked
    
    // select all unchoosen boxes
    Array.from(allBoxes).forEach((box)=>{
      const checkbox = box.querySelector("input").checked
      if (checkbox!=checkedState) selectBox(box,V.MARKEN_ZÄHLER,V.MEINE_MARKEN,V.MARKEN_TOGGLE_STATE,V.SHOWMORE_TXT_MK)
    })
      

}

  
//PreisToggleChecken
export function toggle(event){
  const PriceBox = document.getElementById("PriceChoosenToggle")
  const chkbox = event.target.previousElementSibling
  chkbox.checked = !chkbox.checked
  
  let operation = 0
  operation = chkbox.checked ? 1 : 0
  
  let box = ChosenBoxGenerator("PriceChoosenToggle","reduzierteArtikel","reduzierteArtikel")
  operation == 1 ? V.CHOOSEN_CONTENT.innerHTML+=box : PriceBox.remove()
  
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
  const speicher= (meineMärkte == V.MEINE_MÄRKTE) ? märkteSpeicher : markenSpeicher
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
    selectBox(e.target,V.MÄRKTE_ZÄHLER,V.MEINE_MÄRKTE,V.TOGGLE_SWITCH_MÄRKTE,V.SHOWMORE_TXT)        
  }
}

export function selectBoxMarken(e){
  if(e.target.dataset.menubox == "marken"){
    selectBox(e.target,V.MARKEN_ZÄHLER,V.MEINE_MARKEN,V.TOGGLE_SWITCH_MARKEN,V.SHOWMORE_TXT_MK)        
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
  const togglebutton=isMk ? V.MARKEN_TOGGLE_STATE : V.MÄRKTE_TOGGLE_STATE
  const showmoretext=isMk ? V.SHOWMORE_TXT_MK : V.SHOWMORE_TXT
  const onClickFkt=
  isMk 
  ? "deleteBox(event,V.MARKEN_TOGGLE_STATE,V.MARKEN_ZÄHLER,V.SHOWMORE_TXT_MK)" 
  : "deleteBox(event,V.MÄRKTE_TOGGLE_STATE,V.MÄRKTE_ZÄHLER,V.SHOWMORE_TXT)"


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
  if (event.target.classList != "filter"){
    return
  }

  V.aktuelle_filter.textContent = event.target.textContent
  document.getElementById("filterChoosen")?.remove()

  updateHighlight(event.target, V.FILTER_MENU)

  // Topseller is default setting, so no choosenbox will be added 
  if (event.target.textContent != "Topseller"){
    V.CHOOSEN_CONTENT.innerHTML+= ChosenBoxGenerator("filterChoosen",event.target.innerText,"filter")
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
  const marketsDiv = box.parentElement // Div which contains all choosen V.markets
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
    deleteBox(e.target.parentElement,V.TOGGLE_SWITCH_MÄRKTE,V.MÄRKTE_ZÄHLER,V.SHOWMORE_TXT)
  }
}

export function deleteBoxMarken(e){
  if (e.target.tagName == "I"){
    deleteBox(e.target.parentElement,V.TOGGLE_SWITCH_MARKEN,V.MARKEN_ZÄHLER,V.SHOWMORE_TXT_MK)
  }
}



// Help

// builds String which will be in chosenBox and returns it
function buildContent(CM_SELECTIONS){
  
  const chosen = Array.from(CM_SELECTIONS.children)
  let content = ""

  chosen.forEach((box, index) => {
    const title = box.querySelector(".title").innerText

    if (index == 0){
      content += title
    }
    else if (index == 1){
      content += ", " + title
    }

    if (index >= 2 && index == chosen.length - 1){
      const remaining = index - 1     // calculates how much V.markets after first two V.markets are added
      content += ` &(${remaining})`
    }
  })

  return content;

}


// all market names as string separeted with ';'
function convertToString(CM_SELECTIONS){
  const chosen = Array.from(CM_SELECTIONS.children)
  .map(box => box.querySelector(".title").textContent.replace(/\s+/g, ''))

  return chosen.join(";")
}


function addChosenBox(menuType){
  const {CM_SELECTIONS, CHOSENBOX_ID} = V.MENUS[menuType]
  const content = buildContent(CM_SELECTIONS)
  const childrenString = convertToString(CM_SELECTIONS)

  document.getElementById(CHOSENBOX_ID)?.remove() 
  V.CHOOSEN_CONTENT.innerHTML+=
  `<p class="showChoosenFilter" id=${CHOSENBOX_ID} data-filter=${menuType} data-all="${childrenString}"> 
    <span class="ChoseninnerText">
     ${content}
    </span>
    <i class='fa-solid fa-xmark chosenCross'></i>
  </p>`

}

function changeTxtAllBtn(targetTxt, menuType){
  const { CHOOSE_ALL } = V.MENUS[menuType]
  CHOOSE_ALL.querySelector("span").innerText = targetTxt
}

function updateAllBtn(menuType){
  const { OPTIONS, CM_SELECTIONS } = V.MENUS[menuType]

  const options = OPTIONS.children.length
  const chosen = CM_SELECTIONS.children.length

  if (options == chosen){
    changeTxtAllBtn("Alle abwählen", menuType)
  }
  else{
    changeTxtAllBtn("Alle auswählen", menuType)
  }
}


function resetSlide(menuType){
  const { MENU, CM_HEADER, GRIP, TOGGLE_CM, CM, CM_SELECTIONS } = V.MENUS[menuType]

  MENU.classList.add("normalMode")
  CM_HEADER.classList.remove("opacity-0")
  GRIP.classList.remove("opacity-0")
  TOGGLE_CM.classList.replace("fa-caret-up","fa-caret-down")
  MENU.classList.remove("hideCM")
  MENU.removeAttribute("style")
  CM.removeAttribute("style")
  CM_SELECTIONS.removeAttribute("style")

}


// Main
export function onCounterChange(menuType){
  const { COUNTER, MENU, CHOSENBOX_ID } = V.MENUS[menuType]
  const cntVal = parseInt(COUNTER.textContent)
  updateAllBtn(menuType)

  if (cntVal == 0){
    resetSlide(menuType)
    document.getElementById(CHOSENBOX_ID).remove() // choosen market box will be removed
  }
  else{
    MENU.classList.remove("normalMode")
    addChosenBox(menuType)    
  }

}







// adds or removes V.markets from choosen when counter changes
// <=0 unvisible trashcan
// >0 visible trashcan
function handleCounterChange(zähler,ID,meineMärkte){

  const zählerWert = parseInt(zähler.textContent)
  document.getElementById(ID)?.remove()       // choosen market box will be removed

  let trashcan = (meineMärkte == V.MEINE_MÄRKTE ? TRASHCAN_MÄRKTE : TRASHCAN_MARKEN)   
  trashcan.classList.add("unvisible")     // if zählerWert<=0 then it will stay unvisible if >0 then unvisible will be removed z.787

  if (zählerWert<=0) return

  trashcan = (meineMärkte == V.MEINE_MÄRKTE ? TRASHCAN_MÄRKTE : TRASHCAN_MARKEN) 
  trashcan.classList.remove("unvisible")     // make trashcan visible because there are choosen V.markets
 

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
  
  V.CHOOSEN_CONTENT.innerHTML+=
  `<p class="showChoosenFilter" id="${ID}" data-filter="${filter}" data-all="${childrenString}"> 
    <span class="ChoseninnerText">
     ${dynamicValue}
    </span>
    <i class='fa-solid fa-xmark chosenCross'></i>
  </p>`

  
}

export function handleMarkenCounterChange(){
  handleCounterChange(V.MARKEN_ZÄHLER,"markenChoosen",V.MEINE_MARKEN)
}






//alle Boxen wieder anzeigen wenn man auf Kreuz clicked
export function searchBar(input,kreuz, menuType){ 
  
     
}


export function SearchKreuzHandler(menuType){
  const { SEARCHBARINPUT, CLEAR_BTN } = V.MENUS[menuType]

  SEARCHBARINPUT.value = ""
  SEARCHBARINPUT.dispatchEvent(new Event("input"))
  CLEAR_BTN.classList.remove("visible")
  markSearchRed(false,menuType)
}




export function notFoundStyleMarken(useStyle){
  const fakeplaceholder=V.searchBarDivMk.querySelector(".FakePlaceHolder")
  const notFound=V.searchBarDivMk.querySelector("#notFound")
  const kreisKreuz=fakeplaceholder.firstElementChild

  if (useStyle == true){
    V.searchBarDivMk.classList.add("redBorder")
    notFound.classList.add("visible")
    fakeplaceholder.classList.add("red")
    kreisKreuz.classList.add("d-inline-block")
  }
  else{
    V.searchBarDivMk.classList.remove("redBorder")
    notFound.classList.remove("visible")
    fakeplaceholder.classList.remove("red")
    kreisKreuz.classList.remove("d-inline-block")
  }
}



export function markSearchRed(useStyle, menuType){
  const {SEARCHBARDIV} = V.MENUS[menuType]
  const fakeplaceholder = SEARCHBARDIV.querySelector(".FakePlaceHolder")
  const kreisKreuz = fakeplaceholder.firstElementChild

  if (useStyle == true){
    SEARCHBARDIV.classList.add("redBorder")
    fakeplaceholder.classList.add("red")
    kreisKreuz.classList.add("d-inline-block")
  }
  else{
    SEARCHBARDIV.classList.remove("redBorder")
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
      
      const div= choosed=="Marken" ? markenDiv : V.MÄRKTEDIV
      div.innerHTML=""
      div.appendChild(neuesDiv)  
   
      

}



//EingabeVerarbeitung für märkteMenu
export function EingabeVerarbeitungMärkte(itemsList,searchBarDiv, menuType){ 
  const searchBarInput=searchBarDiv.children[0]
  const searchquery=searchBarInput.value
  let searchMatches=null

  if (searchquery.length){

    V.CLEAR_BTN.classList.add("visible")
    searchMatches=itemsList.filter(item=>item.toLowerCase().includes(searchquery.toLowerCase()))
    
   
    if (searchMatches.length>0){

    }
    else{   
      markSearchRed(true, menuType)
    }
         
  }
  else{  
    V.CLEAR_BTN.classList.remove("visible")
    markSearchRed(false, menuType)

    
  }   
  

}

export function searchBarInputMkHandler(){
  EingabeVerarbeitung(V.marken_liste,V.searchBarDivMk)
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
  showMoreTextToggle(V.MEINE_MÄRKTE,V.SHOWMORE_TXT,V.ausgewählte_box)
}
export function showMoreTextMkHandler(){
  showMoreTextToggle(V.MEINE_MARKEN,V.SHOWMORE_TXT_MK,V.ausgewählte_boxMk)
}



export function AddingChoosenPrice(minWert,maxWert){

  
  document.getElementById("PriceChoosen")?.remove()   // delete current choosenbox
  V.changingPrice.innerText = `${minWert}€ - ${maxWert}€`   // update header

  // for 0 - 9999 no choosenbox will be added, because it is default setting
  if (!(minWert == 0 && maxWert == 9999)){
    V.CHOOSEN_CONTENT.innerHTML += ChosenBoxGenerator("PriceChoosen",`${minWert}€ - ${maxWert}€`,"preis")
  }
  

  
}


export function thumbHandler(){
  AddingChoosenPrice(V.priceInputs[0].value,V.priceInputs[1].value)
}


export function secondpriceInput(event){
  let curWert = event.target.value
  const inputTwo = parseInt(curWert)
  const inputOne = parseInt(V.priceInputs[0].value)

  // if secondInput is empty it will be 9999
  if (curWert == ""){
    event.target.value = 9999
    
  }else if (inputTwo < inputOne){
    inputOne+100 <= 9999 ? event.target.value = inputOne+100 : event.target.value = 9999
  } 
  AddingChoosenPrice(V.priceInputs[0].value,event.target.value)
}

export function secondpriceInputHandler(event){
  secondpriceInput(event)
}

export function firstpriceInput(event){
  const curWert = event.target.value
  const inputOne = parseInt(curWert)
  const inputTwo = parseInt(V.priceInputs[1].value)

  // if input is empty it will be 0
  if (curWert == ""){
    event.target.value = 0
  
  }

  // first value bigger than second value
  else if (inputOne > inputTwo){
    inputTwo-100 >= 0 ? event.target.value = inputTwo-100 : event.target.value = 0
  }

  AddingChoosenPrice(event.target.value, V.priceInputs[1].value)
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
    V.priceInputs[0].blur()
  } 
}


export function priceInputHandlerOne(event){
  const taste = event.key

  if (!["Backspace","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(taste) && ![1,2,3,4,5,6,7,8,9,0].includes(Number(taste))){
    event.preventDefault()  
  } 

  if (taste == "Enter"){
    V.priceInputs[1].blur() 
  }
}


export function updateProgress(){
  const minthumbV=V.thumbs[0].value
  const maxthumbV=V.thumbs[1].value
  const range=9999
  
  const Valuerange=maxthumbV-minthumbV
  const width = (Valuerange/range) *100
  V.progress.style.width= width + "%"
  const minOffset= (minthumbV)/range *100
  V.progress.style.left=minOffset + "%"
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
  V.thumbs[1].value=curWert
  const minV=parseInt(V.thumbs[0].value)
  const range=parseInt(V.priceInputs[1].value)-parseInt(V.priceInputs[0].value)
  
  if (range<=100){
    V.thumbs[1].value=parseInt(V.thumbs[0].value)+100
    const minthumbV=parseInt(V.thumbs[0].value)
    const maxthumbV=parseInt(V.thumbs[1].value) //gibt minV+100 Wert heraus
    V.progress.style.width=((maxthumbV-minthumbV)/9999)*100 + "%"
  }
  else{
    V.progress.style.width=(range/9999)*100 + "%"
  }
  
  if (curWert==""){
  V.thumbs[1].value=9999
  V.progress.style.width=((9999-minV)/9999)*100 + "%"
  }
}
export function ThumbColorHandlerOne(event){
  CleanInput(event)
  const curWert=event.target.value
  V.thumbs[0].value=curWert
  const range=parseInt(V.priceInputs[1].value)-parseInt(V.priceInputs[0].value)
  
  if (range<=100){
    V.thumbs[0].value=parseInt(V.thumbs[1].value)-100
    const minthumbV=parseInt(V.thumbs[0].value)
    const maxthumbV=parseInt(V.thumbs[1].value) //gibt maxV-100 Wert heraus
    V.progress.style.width=((maxthumbV-minthumbV)/9999)*100 + "%"
    V.progress.style.left=((minthumbV)/9999)*100 + "%"
    
  }
  else{
  V.progress.style.width=((range)/9999)*100 + "%"
  V.progress.style.left=(parseInt(curWert)/9999)*100 + "%"
  }

  if (curWert==""){
    V.thumbs[0].value=0
    V.progress.style.left=0
  }
}



export function thumbPosition(zahlA,zahlB,operator,newValue){
 const PriceGap=V.thumbs[1].value-V.thumbs[0].value



 
 if (PriceGap<=100){
  V.thumbs[zahlA].value= operator=="+" ? parseInt(V.thumbs[zahlB].value)+100 : parseInt(V.thumbs[zahlB].value)-100
  
 }else{
  V.priceInputs[zahlA].value=newValue
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




export function movingText(menuType){ 
  const { SEARCHBARINPUT } = V.MENUS[menuType]
  const placeholderCls = SEARCHBARINPUT.nextElementSibling.classList
  placeholderCls.add("FakePlaceHolderAnimation")

  document.addEventListener("click",function move(event){
    if (event.target.id != SEARCHBARINPUT.id && SEARCHBARINPUT.value == ""){
      placeholderCls.remove("FakePlaceHolderAnimation")
      document.removeEventListener("click",move)
    }
  })
}






// Help

function hideLeftArrow(event){
  const targetSlideId = event.target.dataset.slidemenu
  const targetSlide = document.getElementById(targetSlideId)
  const leftArr = targetSlide.querySelector(".arrowCorner")
  leftArr.classList.add("unvisible")
}




// Help


// at show, the headerTxt is a bit seen. but only the icon should be seen
function hideHeader(slide){
  const changingHeader = slide.querySelector(".changingText")
  if (window.innerWidth > 1060){
    changingHeader.classList.add("opacity-0")
  }
  else{
    changingHeader.classList.remove("opacity-0")
  }
}



// Main
export function show(event,size){ 
  const slideId = event.target.getAttribute("data-slidemenu")
  const slide = document.getElementById(slideId)

  if (event.target.classList != "ButtonDesign" || slide.dataset.state == "open") return // only react to btn-element. hover on child elements of btn will be ignored

  hideHeader(slide) 

  // show a little of the menu
  const new_hovertimer = setTimeout(()=>{
    if(window.innerWidth <= 1060){
      slide.classList.add("openBit_bottom")
    }
    else{
      size == "normal" ? slide.classList.add("openBit_right") : slide.classList.add("openBigBit_right")    
    }    
  },500)

  V.set_HOVERTIMER(new_hovertimer)
}


// Help
function unhideLeftArrow(targetSlide){
  const leftArr = targetSlide.querySelector(".arrowCorner")
  leftArr.classList.remove("unvisible")
}



// Main
export function showNot(event){
  if(event.target.classList != "ButtonDesign") return // only react to btn-element. hover on child elements of btn will be ignored
  V.clear_HOVERTIMER()  // => clearTimeout(HOVERTIMER) will be executed
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
  const count = V.CHOOSEN_CONTENT.children.length  

  if (count > 0) {
    V.DELETE_ALL.classList.remove("d-none")
    V.SUBMIT_BTN.classList.add("ml-140")
    V.DELETE_ALL.innerText = `Alle löschen(${count})` 
  }
  else{
    V.DELETE_ALL.classList.add("d-none")
    V.SUBMIT_BTN.classList.remove("ml-140")
  }
}


// delete all choosen filter options button
export function reset(e){

  if(e.target.id != "alleLöschen"){
    return
  }

  const alle = document.querySelectorAll("#showChoosenFilter p [class*='chosenCross']")
  alle.forEach(filter=>{
    filter.click()
  })
}


// choosing GB-Option, square gets checked, header txt changes, box ist added to first Slide
export function addingSpeicherKap(event){

  if(event.target.name != "speicherKap"){
    return
  }

  document.getElementById("gbChosen")?.remove() //falls andere Bewertung vorhanden,löschen
  const changingSpeicherKap=document.getElementById("changingSpeicherKap")


  //changing Überschrift ändern
  changingSpeicherKap.innerHTML= event.target.nextElementSibling.innerText

  if (event.target.id!="allegb"){
    V.CHOOSEN_CONTENT.innerHTML+= ChosenBoxGenerator("gbChosen",event.target.nextElementSibling.innerText,"speicherKap")
  } 
  
}



// Help

// shift slide without transition, so the change is unvisible for the user 
function shiftSlide(move){
  for (const slide of V.FM_SLIDES){
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


/*
function adjustCM(){
  const curHeight = window.innerHeight
  
  if (V.lastHeight != curHeight && V.defaultWindow_height <= curHeight){
    V.set_lastHeight(curHeight)
    const distance = curHeight - V.defaultWindow_height
    const newMaxResize = V.defaultCM_max_resize + distance
    V.CHOSEN_MARKETS_SELECTIONS.style.maxHeight = newMaxResize + "px"
  }

}
*/


// Main
export function adjustMenuLayout(){
  if (window.innerWidth <= 1060 && V.CUR_POSITION == "RIGHT"){
    shiftSlide("down")
    V.set_CUR_POSITION("BOTTOM")
  }

  else if (window.innerWidth > 1060 && V.CUR_POSITION == "BOTTOM"){
    shiftSlide("up")
    V.set_CUR_POSITION("RIGHT")
  }

  //adjustCM()

}


// Help

function makeMenuVisible(){
  for (const slide of V.FM_SLIDES){
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

      case "ratingChosen":
        resetRating(e)
        break  
      
      case "PriceChoosenToggle":
        resetPriceToggle(e)
        break
      
      case "gbChosen":
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


function resetCMStyles(menuType){
  const { CM_SELECTIONS, MENU, CM } = V.MENUS[menuType]
  MENU.removeAttribute("style")
  CM.removeAttribute("style")
  CM_SELECTIONS.removeAttribute("style")
}


// if chosenMarket is open and bottomSlide changes to rightSlide
// this function adjusts the layout to the rightSlide
function chosenMarketToRight(menuType){
  const { CM_SELECTIONS } = V.MENUS[menuType]
  resetCMStyles(menuType) 
  CM_SELECTIONS.scrollTop = 0
}



// changing chosenMarket layout from right to bottom
function chosenMarketToBottom(menuType){
  const { CM_SELECTIONS, MENU } = V.MENUS[menuType]
  const count = CM_SELECTIONS.children.length
  if (count == 0) return

  // remove settings chosenMarket for rightSlide
  MENU.classList.remove("second-height")
  MENU.classList.add("first-height")

  resetCMStyles(menuType)
  CM_SELECTIONS.scrollTop = 0

}


function change(e,menuType){
  const { OPTIONS } = V.MENUS[menuType]
  OPTIONS.scrollTop = 0

  switch(e.matches){
    case true:
      chosenMarketToBottom(menuType)
      break

    case false:
      chosenMarketToRight(menuType)
      break
  }
}

// if MQ is true(<=1060px) it will change rightMenu to bottomMenu layout
export function changeLayout(e){
  change(e,"märkte")
  change(e,"marken")  
}


// Help

function openingAnimation(){
  requestAnimationFrame(() => {V.RATING_POPUP.classList.replace("closedPopUp","openPopUp")})  
}

function closingAnimation(){
  V.RATING_POPUP.classList.replace("openPopUp", "closedPopUp")
  
  // waiting until closing animation is done
  setTimeout(()=>{
    V.RATING_POPUP.classList.add("d-none")
  },200)
}


// handles showing,not showing of rating popup
// leaving icon or popup starts function after 300ms which will close popup
// entering icon or popup delets the timer
export function enterElem(){
  V.clear_timeout() 

  // user have to hover 300ms, then popup will start opening
  const new_timeout = setTimeout(() => {
    V.RATING_POPUP.classList.remove("d-none")
    openingAnimation()

  },300)

  V.set_timeout(new_timeout)
 
}


export function leaveElem(){
  V.clear_timeout()

  const new_timeout = setTimeout(() => {  
    closingAnimation()

  },300)

  V.set_timeout(new_timeout)
}





function disableVerticalScroll(){
  V.NB.classList.add("adjustPR")
  V.MAIN_DIV.classList.add("adjustPR_main")

  // disable scrollbar
  const html = document.documentElement
  html.style.height = "100%"
  html.style.overflowY = "hidden"

}

function enableVerticalScroll(){  
  V.NB.classList.remove("adjustPR")
  V.MAIN_DIV.classList.remove("adjustPR_main")

  // enable scrollbar
  const html = document.documentElement
  html.style.height = ""
  html.style.overflowY = ""

}



export function openMenu(){

  V.OVERLAY.classList.add("activated")  // black background

  for (const slide of V.FM_SLIDES){
    slide.classList.add("trans") 
  }

  V.FILTERMENU_SLIDE.classList.add("openSlide")  
  
  disableVerticalScroll()
  EvtManager.attachListener("slideInStandard")
}


export function closeMenu(){
  V.OVERLAY.classList.remove("activated")
  V.FILTERMENU_SLIDE.classList.remove("openSlide")

  // wait until animation of closing menu is done
  // then remove trans from all slides and enable vertical scrolling
  setTimeout(() => {
    for (const slide of V.FM_SLIDES){
    slide.classList.remove("trans")
    }
    enableVerticalScroll()
  },400)


  EvtManager.detachListener("slideInStandard")

}






export function addScrollbar(e){
  switch(e.matches){
    case true:
      V.CHOOSENFILTERDIV.classList.add("scrollBox")
      break
    
    case false:
      V.CHOOSENFILTERDIV.classList.remove("scrollBox")
      break
  }
}


// shows if element has scrollbar or not
export function checkScroll(){
  const el = V.CHOOSEN_CONTENT
  if (el.scrollHeight > el.clientHeight){
    V.CHOOSENFILTERDIV.classList.add("has-scroll")
  }
  else{
    V.CHOOSENFILTERDIV.classList.remove("has-scroll")
  }
}



// Help


function incCount(menuType){
  const { COUNTER } = V.MENUS[menuType]
  COUNTER.innerText = parseInt(COUNTER.innerText) + 1
}
function decCount(menuType){
  const { COUNTER } = V.MENUS[menuType]
  COUNTER.innerText = parseInt(COUNTER.innerText) - 1
}


// at right slide chosenMarkets can get bigger at height
function adjustRightSlide(childCount, menuType){
  const { MENU } = V.MENUS[menuType]

  if (childCount == 0){
    MENU.classList.remove("second-height")
    MENU.classList.add("first-height")
  }
  else if (childCount >= 1){
    MENU.classList.remove("first-height")
    MENU.classList.add("second-height")
  }

}


// chosenMarkets has only one height, cant get bigger
// because not much height available
// no third.height like adjustRightSlide()
function adjustBottomSlide(childCount, menuType){
  const { MENU } = V.MENUS[menuType]

  if (childCount == 0){
    MENU.classList.remove("second-height")
    MENU.classList.add("first-height")
  }
  else{
    MENU.classList.remove("first-height")
    MENU.classList.add("second-height")
  }
}



// depending on if bottom or right is used, different handlings are needed
function handleCMOpening(menuType){
  const { CM_SELECTIONS } = V.MENUS[menuType]
  const childCount = CM_SELECTIONS.children.length

  if (V.MQ_MAX1060.matches){
    adjustBottomSlide(childCount, menuType)
  } else {
    adjustRightSlide(childCount, menuType)
  }


}

// only one transition after that transition will be removed
function applyTransition(menu){
  menu.classList.add("smoothTrans")
    
  const onTransitionEnd = () => {
    menu.classList.remove("smoothTrans")
    menu.removeEventListener("transitionend",onTransitionEnd)
  }   
  menu.addEventListener("transitionend",onTransitionEnd)
}

// if 0 boxes available and first box will be added, adding smoothTrans so CM opens with transition
function appendBox(curBoxCopy, menuType){
  const { CM_SELECTIONS, MENU } = V.MENUS[menuType]

  const firstBox = CM_SELECTIONS.children.length == 0
  CM_SELECTIONS.appendChild(curBoxCopy)

  // adding first box it means you have to open CM. 
  // Opens with transition
  if (firstBox) applyTransition(MENU)
  

}


function removeBox(chosenBox, menuType){
  const { CM_SELECTIONS, MENU } = V.MENUS[menuType]

  const lastBox = CM_SELECTIONS.children.length == 1
  chosenBox.remove()

  // removing the last box means you have to close CM.
  // CLoses with transition
  if (lastBox) applyTransition(MENU)
  
}



function addToChosenMarkets(curBox, menuType){
  const { BTN_CLASS } = V.MENUS[menuType]

  const curBoxCopy = curBox.cloneNode(true)
  const title = curBoxCopy.querySelector(".title")
  const btn_copy = curBoxCopy.querySelector(BTN_CLASS)

  curBoxCopy.classList.remove("d-none")
  btn_copy.classList.add("chosenBtn")
  curBoxCopy.classList.add("chosenColor","chosenBorder")
  curBoxCopy.dataset.find = title.innerText                   // when user clicks on Abwählen on original box, selection in chosenMarkets is easier
  title.innerText = title.innerText                           // remove blue highlight
  


  btn_copy.querySelector("span").innerText = "Entfernen"

  
  btn_copy.addEventListener("mouseup",() => {
    removeBox(curBoxCopy, menuType)
    decCount(menuType)
    curBox.querySelector(BTN_CLASS).firstElementChild.innerText = "Auswählen"
    handleCMOpening(menuType)   
  })

  appendBox(curBoxCopy, menuType)
  incCount(menuType)

}




function removeFromChosenMarkets(curBox, menuType){
  const { CM_SELECTIONS } = V.MENUS[menuType]
  const title = curBox.querySelector(".title").innerText
  const chosenBox = CM_SELECTIONS.querySelector(`[data-find='${title}']`)
  removeBox(chosenBox, menuType)
  decCount(menuType)
}




// Main

// select market, debounce of selection-box animation, toggle between 'auswählen' and 'abwählen'
export function toggleSelect(event,menuType){

  const curBox = event.target.closest(".selection-box")
  const btnLabel = event.target.firstElementChild
  
  // animation
  curBox.classList.add("selection-box-no-hover")
  setTimeout(() => curBox.classList.remove("selection-box-no-hover"),100)


  // add or remove from chosenMarkets
  if (btnLabel.innerText === "Auswählen") {
    addToChosenMarkets(curBox, menuType)
    btnLabel.innerText = "Abwählen"
  } else {
    removeFromChosenMarkets(curBox, menuType)
    btnLabel.innerText = "Auswählen"
  }


  handleCMOpening(menuType)

}




// click on all unchosen options
function addMissingOptions(menuType){
  const { OPTIONS_BTNS } = V.MENUS[menuType]

  const btns = OPTIONS_BTNS.filter(span => span.innerText == "Auswählen").map(span => span.parentElement)
  btns.forEach(btn => {
    btn.dispatchEvent(new MouseEvent("mouseup"))
  })


  

}

function removeAllChoosen(menuType){
  const { CM_SELECTIONS, BTN_CLASS } = V.MENUS[menuType]

  const boxes = Array.from(CM_SELECTIONS.children)
  boxes.forEach(box => {
    const btn = box.querySelector(BTN_CLASS)
    btn.dispatchEvent(new MouseEvent("mouseup"))
  })


   
}




// Main

// not all V.markets are choosen => add missing V.markets
// if all V.markets are choosen => delete all
export function chooseAllHandler(menuType){
  const { OPTIONS, CM_SELECTIONS } = V.MENUS[menuType]

  const options = OPTIONS.children.length
  const chosen = CM_SELECTIONS.children.length

  if (chosen < options){
    addMissingOptions(menuType)
  } else if (chosen == options){
    removeAllChoosen(menuType)
  }


}



function highlight(titleEl,title,inputVal){
  const regex = new RegExp(`(${inputVal})`,"i")
  const newtitle = title.replace(regex,'<span class="highlight">$1</span>')
  titleEl.innerHTML = newtitle

}



function noMarketsMsg(menuType){  
  const {OPTIONS, EMPTY_MSG} = V.MENUS[menuType]
  const elExists = !!OPTIONS.querySelector(".selection-box:not(.d-none)")

  if (elExists){
    //V.EMPTY_MSG.hidden = true
    EMPTY_MSG.classList.replace("visible","hidden")
    markSearchRed(false, menuType)
  } else{
    //V.EMPTY_MSG.hidden = false
    EMPTY_MSG.classList.replace("hidden","visible")
    markSearchRed(true, menuType)
  }

  
}

function toggleClearBtn(inputVal, menuType){
  const {CLEAR_BTN} = V.MENUS[menuType]
  if (inputVal.trim() != ""){
    CLEAR_BTN.classList.add("visible")
  }
  else {
    CLEAR_BTN.classList.remove("visible")
  }
}


function showMatches(inputVal, menuType){
  const {OPTIONS} = V.MENUS[menuType]
  const options = Array.from(OPTIONS.children)

  options.forEach(box => {
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


function filterLogic(inputVal, menuType){
  toggleClearBtn(inputVal, menuType)
  showMatches(inputVal, menuType)
  noMarketsMsg(menuType)
}


function safetyCheck(inputVal){
  const max_len = 50
  if (inputVal.length > max_len){
    console.warn('Suchbegriff zu lang — Abbruch aus Sicherheitsgründen.')
    return false
  }
  return true
}

export function filterResults(event, menuType){
  const {clear_INPUT_TIMEOUT, set_INPUT_TIMEOUT} = V.MENUS[menuType]

  const inputVal = event.target.value
  if (!safetyCheck(inputVal)){
    return
  }

  clear_INPUT_TIMEOUT()
  set_INPUT_TIMEOUT(setTimeout(() => filterLogic(inputVal, menuType),100))
}



// executet when mousedown on marketGrip
export function setupResize(e, menuType){
  const { GRIP, MENU, set_startY, set_startHeight } = V.MENUS[menuType]
  e.preventDefault()

  GRIP.classList.add("resizeColor")  // only at resizing this color
  set_startY(e.clientY)
  set_startHeight(parseInt(getComputedStyle(MENU).height,10))

  EvtManager.attachListener(menuType == "märkte" ? "märkte_resize" : "marken_resize")
}   


export function startResize(e, menuType){
  const { MENU } = V.MENUS[menuType]

  const isMarkt = menuType == "märkte"
  const startY = isMarkt ? V.startY : V.startY_MK
  const startHeight = isMarkt ? V.startHeight : V.startHeight_MK
 
  const dY = e.clientY - startY
  MENU.style.flexBasis = (startHeight + dY)  + "px"

}

export function stopResize(menuType){
  const { GRIP } = V.MENUS[menuType]
  GRIP.classList.remove("resizeColor")
  EvtManager.detachListener(menuType == "märkte" ? "märkte_resize" : "marken_resize") 
}



function removeTrans(MENU){
  MENU.addEventListener("transitionend",function handler(){
    MENU.style.transition = ""
    MENU.removeEventListener("transitionend",handler)
  })
}


// Help
function stateCM(cmd, menuType){
  const { MENU } = V.MENUS[menuType]
  scaleDuration(cmd, menuType)
  cmd == "open" ? MENU.classList.remove("hideCM") : MENU.classList.add("hideCM")
  removeTrans(MENU)
}


// transition increasing with height
function transHandler(state, menuType){
  const { CM, MENU, set_LAST_TRANSITION } = V.MENUS[menuType]
  const startOffsetTop = state == "bottom" ? 295 : 580
  const curOffsetTop = CM.offsetTop
  const distance = startOffsetTop - curOffsetTop
  const scaleFactor = state == "bottom" ? 0.005 : 0.001
  const baseTrans = 0.4
  
  const duration = baseTrans + (distance * scaleFactor)
  const trans = `all ${duration}s ease`
  MENU.style.transition = trans
  set_LAST_TRANSITION(trans)
  
}



// adjust durationTime animation depending on size of CM
function scaleDuration(cmd, menuType){
  const { MENU } = V.MENUS[menuType]

  if (cmd == "open"){
    MENU.style.transition = menuType == "märkte" ? V.LAST_TRANSITION : V.LAST_TRANSITIONMK 
  }
  else{
    if (V.MQ_MAX1060.matches){
      transHandler("bottom", menuType)
    }
    else{
      transHandler("right", menuType)
    }
  }

}



function openCM(menuType){
  const { GRIP, CM_HEADER, TOGGLE_CM} = V.MENUS[menuType]
  stateCM("open", menuType)
  GRIP.classList.remove("opacity-0")
  CM_HEADER.classList.remove("opacity-0")
  TOGGLE_CM.classList.replace("fa-caret-up","fa-caret-down")
}

function hideCM(menuType){
  const { GRIP, CM_HEADER, TOGGLE_CM} = V.MENUS[menuType]
  stateCM("close", menuType)
  GRIP.classList.add("opacity-0")
  CM_HEADER.classList.add("opacity-0")
  TOGGLE_CM.classList.replace("fa-caret-down","fa-caret-up") 
}


// click on element with id toggleChosenMarkets, user can open/close 'Ausgewählte Märkte'
export function toggleCM(menuType){
  const {TOGGLE_CM} = V.MENUS[menuType]
  const state = TOGGLE_CM.classList.contains("fa-caret-down")

  switch(state){
    case false:
      openCM(menuType)     
      break
    
    case true:
      hideCM(menuType)
      break
  }
}


