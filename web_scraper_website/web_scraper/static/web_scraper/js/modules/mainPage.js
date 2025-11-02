import * as FM from "../lib/Filtermenu.js"

// FILTERMENU

// show a bit Menu when user hovering on Button
FM.FILTER_BTN.addEventListener("mouseover",(e) => FM.show(e,"normal"))
FM.FILTER_BTN.addEventListener("mouseout",(e) => FM.showNot(e))

FM.PREISE_BTN.addEventListener("mouseover",(e) => FM.show(e,"normal"))
FM.PREISE_BTN.addEventListener("mouseout",(e) => FM.showNot(e))

FM.BEWERTUNGEN_BTN.addEventListener("mouseover",(e) => FM.show(e,"normal"))
FM.BEWERTUNGEN_BTN.addEventListener("mouseout",(e) => FM.showNot(e))

FM.MÄRKTE_BTN.addEventListener("mouseover",(e) => FM.show(e,"big"))
FM.MÄRKTE_BTN.addEventListener("mouseout",(e) => FM.showNot(e))

FM.MARKEN_BTN.addEventListener("mouseover",(e) => FM.show(e,"big"))
FM.MARKEN_BTN.addEventListener("mouseout",(e) => FM.showNot(e))

FM.SPEICHERKAP_BTN.addEventListener("mouseover",(e) => FM.show(e,"normal"))
FM.SPEICHERKAP_BTN.addEventListener("mouseout",(e) => FM.showNot(e))


// onclick von obigen auch hier machen eventlistener
// weiter schauen was noch in html für fkt gibt und alle hier eventlistener machen


// open Menus and add needed eventListeners
FM.FILTER_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.FILTER_MENU))
FM.PREISE_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.PREISE_MENU))
FM.BEWERTUNGEN_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.BEWERTUNGEN_MENU))
FM.MÄRKTE_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.MÄRKTE_MENU))
FM.MARKEN_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.MARKEN_MENU))
FM.SPEICHERKAP_BTN.addEventListener("click",() => FM.ButtonClickHandling(FM.SPEICHERKAP_MENU))


// close Menus
FM.CLOSE_FILTER_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))
FM.CLOSE_PREISE_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))
FM.CLOSE_BEWERTUNG_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))
FM.CLOSE_MÄRKTE_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))
FM.CLOSE_MARKEN_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))
FM.CLOSE_SPEICHERKAP_MENU.addEventListener("click",(e) => FM.ArrowLeftSlide(e))


FM.SALE_ITEMS_BTN.addEventListener("click",(e) => FM.toggle(e))



// user can choose starsRating. Header will change and StartSlide new stars Box will be added
FM.BEWERTUNGEN_MENU.addEventListener("click",(e) =>{
    if (!e.target.hasAttribute("data-stars")) return    // Only react to click on radio btn
    FM.addingRating(e)
})



// deletes the box on the startSlide which is the choosen Option from the user
FM.CHOOSENFILTERDIV.addEventListener("click",(e) =>{
    if (e.target.tagName !== "I") return

    switch(e.target.parentElement.id){

        case "filterChoosen":
            FM.resetFilter(e)
            break
        
        case "PriceChoosen":
            FM.resetPrice(e)
            break

        case "RatingChoosen":
            FM.resetRating(e)
            break  
        
        case "PriceChoosenToggle":
            FM.resetPriceToggle(e)
            break
        
        case "SpeicherKapChoosen":
            FM.resetSpeicherKap(e)
            break
        
        case "markenChoosen":
            FM.resetMarken(e)
            break
        
        case "märkteChoosen":
            FM.resetMärkte(e)
            break
            
    }

})



// toggle button for choosing every market/brand
// or deleting all choosen markets/brands
FM.TOGGLE_SWITCH_MÄRKTE.addEventListener("click",(e) => FM.checken(e))
FM.TOGGLE_SWITCH_MARKEN.addEventListener("click", (e) => FM.checkenMk(e))

// click on trashcan deletes all choosen markets/brands
FM.TRASHCAN_MÄRKTE.addEventListener("click",(e) => FM.deleteAll())
FM.TRASHCAN_MARKEN.addEventListener("click",(e) => FM.deleteAllMk())



// click at one box, check the box and give it green color
FM.MÄRKTEDIV.addEventListener("click",(e) => {
    if(e.target.dataset.menubox == "märkte"){
        FM.selectBox(e.target,FM.MÄRKTE_ZÄHLER,FM.MEINE_MÄRKTE,FM.TOGGLE_SWITCH_MÄRKTE,FM.SHOWMORE_TXT)        
    }
})

FM.MARKENDIV.addEventListener("click",(e) => {
    if(e.target.dataset.menubox == "marken"){
        FM.selectBox(e.target,FM.MARKEN_ZÄHLER,FM.MEINE_MARKEN,FM.TOGGLE_SWITCH_MARKEN,FM.SHOWMORE_TXT_MK)        
    }
})




// click at cross of choosen box. then it will uncheck the choosen box, 
// remove it from choosen markets/brands
// remove green color from market/brand
FM.MEINE_MÄRKTE.addEventListener("click",(e) => {
    if (e.target.tagName == "I"){
        FM.deleteBox(e.target.parentElement,FM.TOGGLE_SWITCH_MÄRKTE,FM.MÄRKTE_ZÄHLER,FM.SHOWMORE_TXT)
    }
})

FM.MEINE_MARKEN.addEventListener("click",(e) => {
    if (e.target.tagName == "I"){
        FM.deleteBox(e.target.parentElement,FM.TOGGLE_SWITCH_MARKEN,FM.MARKEN_ZÄHLER,FM.SHOWMORE_TXT_MK)
    }
})





// choosing GB-Option, square gets checked, header txt changes, box ist added to first Slide
FM.SPEICHERKAP_MENU.addEventListener("click", (e) => {
    if (e.target.name == "speicherKap"){
        FM.addingSpeicherKap(e)
    }
})


// delete all choosen filter options button
FM.FILTER_ACTIONS.addEventListener("click",(e) => {
    if(e.target.id == "alleLöschen"){
        FM.reset()
    }
})




// NAVBAR

// NB => Navbar
import * as NB from "../lib/navBar.js"

// menubar

// click on left Arrow categories will move to right
NB.MENUBAR_LEFT_ARR.addEventListener("click",() => NB.moveMenubarRight())

// click on right Arrow categories will move to left
NB.MENUBAR_RIGHT_ARR.addEventListener("click",() => NB.moveMenubarLeft())


// Cube


// Cube has 4 sides. from every side you can get to next or last side
// with click on DownArrow(nexSlide) or UpArrow(lastSlide)
NB.CUBE_ARR_DOWN1.addEventListener("click",() => NB.nextSide())
NB.CUBE_ARR_UP1.addEventListener("click",() => NB.lastSide())

NB.CUBE_ARR_DOWN2.addEventListener("click",() => NB.nextSide())
NB.CUBE_ARR_UP2.addEventListener("click",() => NB.lastSide())

NB.CUBE_ARR_DOWN3.addEventListener("click",() => NB.nextSide())
NB.CUBE_ARR_UP3.addEventListener("click",() => NB.lastSide())

NB.CUBE_ARR_DOWN4.addEventListener("click",() => NB.nextSide())
NB.CUBE_ARR_UP4.addEventListener("click",() => NB.lastSide())




// Cube animation

// stop cube rotation, if user hovers on cube
NB.CUBE.addEventListener("mouseenter",()=> NB.stopCubeAnimation());

// restart cube rotation, after user stops hovering
NB.CUBE.addEventListener("mouseleave",()=>NB.restartCubeAnimation());





// small screen when it gets bigger, the menubar expands to right if needed
window.addEventListener("resize",() => NB.expandMenubarToRight());



// Filter Slide

// Btn with which you can open/close FilterMenu
NB.MENU_BTN.addEventListener("click",() => NB.openCloseFilter())


// Account Slide

NB.ACC_OPEN_BTN.addEventListener("click",() => NB.openAccSlide())  // open account Slide
NB.ACC_CLOSE_BTN.addEventListener("click",() => NB.closeAccSlide())    // close account Slide

// click on eye can change the visibility of the password in input
NB.PWD_EYE.addEventListener("click",() => NB.togglePwd())


//if searchbar is focused, close filterSlide
NB.SEARCHBAR.addEventListener("focus",()=>{

  // if Slides except firstSlide are opened, canclick="false".
  // Click on ArrowLeft at the Slides sets it to "true" again
  // But searchbar focus closes Slides and ArrowLeft ist not clicked, so canclick = "false"
  // set to "true", MENU_BTN is enabled
  NB.MENU_BTN.dataset.canclick = "true"

  for (const Slide of NB.FM_SLIDES){
    Slide.classList.remove("openSlide")
  }
})




// scraping requests
import * as SR from "../lib/scrapeReq.js"

// start scaping with filters if user clicks on submit
SR.SUBMIT_FILTER.addEventListener("click",() => {
    SR.startScraping()
})


// start scraping without filters if user writes non-empty value in searchbar
NB.SEARCHBAR.addEventListener("keydown",(e)=>{
    SR.sendScrapeReq(e)
})