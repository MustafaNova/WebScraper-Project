import * as FM from "../Filtermenu/functions.js"
import * as NB from "../navBar/functions.js"
import * as SR from "../scrapeReq/functions.js"
import { EvtManager } from "./class.js"


EvtManager.menuListeners = {

    slideInStandard: [
      { elements: [FM.FILTER_BTN, FM.PREISE_BTN, FM.BEWERTUNGEN_BTN, FM.SPEICHERKAP_BTN], type: "mouseover", handler: FM.show, params: ["normal"], flag: "includeEvent" },         // show a bit Menu when user hovering on Button
      { elements: [FM.MÄRKTE_BTN, FM.MARKEN_BTN], type: "mouseover", handler: FM.show, params: ["big"], flag: "includeEvent" },                                               // right Menu this elements will show more
      { elements: [FM.FILTER_BTN, FM.PREISE_BTN, FM.BEWERTUNGEN_BTN, FM.SPEICHERKAP_BTN, FM.MÄRKTE_BTN, FM.MARKEN_BTN], type: "mouseout", handler: FM.showNot, flag: "includeEvent" },    // close menu after mouse is not on the btn  
      { elements: [FM.FILTER_BTN, FM.PREISE_BTN, FM.BEWERTUNGEN_BTN, FM.MÄRKTE_BTN, FM.MARKEN_BTN,  FM.SPEICHERKAP_BTN], type: "click", handler: FM.ButtonClickHandling, params: [FM.FILTER_MENU, FM.PREISE_MENU, FM.BEWERTUNGEN_MENU, FM.MÄRKTE_MENU, FM.MARKEN_MENU, FM.SPEICHERKAP_MENU], flag: "useParamPerElement"},  // open and add listeners of slide
      { elements: [FM.CLOSE_FILTER_MENU, FM.CLOSE_PREISE_MENU, FM.CLOSE_BEWERTUNG_MENU, FM.CLOSE_MÄRKTE_MENU, FM.CLOSE_MARKEN_MENU, FM.CLOSE_SPEICHERKAP_MENU], type: "click", handler: FM.ArrowLeftSlide, flag: "includeEvent"},   // handles closing slide
      { element: FM.CHOOSEN_CONTENT, type: "click", handler: FM.removeFilter, flag: "includeEvent" },   // deletes the box on the startSlide which is the choosed option from the user
      { element: FM.FILTER_ACTIONS, type: "click", handler: FM.reset, flag: "includeEvent" },
      { elements: [FM.RATING_INFO, FM.RATING_POPUP], type: "mouseenter", handler: FM.enterElem },
      { elements: [FM.RATING_INFO, FM.RATING_POPUP], type: "mouseleave", handler: FM.leaveElem },
      { element: FM.CHOOSEN_CONTENT, handler: FM.updateDeleteAllCount, param: [{childList: true}], flag: "observer"},
      { element: FM.MQ_MAX580, type:"change", handler: FM.addScrollbar, flag: "includeEvent" },
      { element: FM.CHOOSEN_CONTENT, handler: FM.checkScroll, param: [{childList: true}], flag: "observer"},
      { element: window, type: "resize", handler: FM.checkScroll},
      { element: FM.MQ_MAX1060, type: "change", handler: FM.changeLayout, flag: "includeEvent" },
      
    ],
    
    filter_menu: [
      { element: FM.FILTER_MENU, type: "click", handler: FM.filterMenuHandler, flag: "includeEvent" },
      { element: FM.FILTER_MENU, type: "mousedown", handler: FM.mousedown, flag: "includeEvent" },
      { element: FM.FILTER_MENU, type: "mouseup", handler: FM.mouseup, flag: "includeEvent" },
    ],

    märkte_menu: [
      { element: FM.searchBarInput, type: "input", handler: FM.filterResults, params: ["märkte"], flag: "includeEvent" },
      { element: FM.searchBarInput, type: "focus", handler: FM.movingText, params: ["märkte"] },
      { element: FM.CLEAR_BTN, type: "click", handler: FM.SearchKreuzHandler, params: ["märkte"] },   
      { element: FM.CHOOSE_ALL, type: "click", handler: FM.chooseAllHandler, params: ["märkte"]},
      { elements: FM.BLUE_BTNS_MÄRKTE, type: "mouseup", handler: FM.toggleSelect, params: ["märkte"], flag: "includeEvent"},
      { element: FM.MÄRKTE_ZÄHLER, handler: FM.onCounterChange, param: [{childList: true}], params: ["märkte"], flag: "observer"},
      { element: FM.TOGGLE_CHOSEN_MARKETS, type: "click", handler: FM.toggleCM, params: ["märkte"]},
      { element: FM.MARKET_GRIP, type: "mousedown", handler: FM.setupResize, params: ["märkte"], flag: "includeEvent" }
    ],

    märkte_resize: [
      { element: document, type: "mousemove", handler: FM.startResize, params: ["märkte"], flag: "includeEvent"},
      { element: document, type: "mouseup", handler: FM.stopResize, params: ["märkte"]}
    ],

    marken_menu: [
      { element: FM.searchBarInputMk, type: "input", handler: FM.filterResults, params: ["marken"], flag: "includeEvent" },
      { element: FM.searchBarInputMk, type: "focus", handler: FM.movingText, params: ["marken"] },
      { element: FM.CLEAR_BTNMK, type: "click", handler: FM.SearchKreuzHandler, params: ["marken"] },
      { element: FM.CHOOSE_ALLMK, type: "click", handler: FM.chooseAllHandler, params: ["marken"]}, 
      { elements: FM.BLUE_BTNS_MARKEN, type: "mouseup", handler: FM.toggleSelect, params: ["marken"], flag: "includeEvent"},
      { element: FM.MARKEN_ZÄHLER, handler: FM.onCounterChange, param: [{childList: true}], params: ["marken"], flag: "observer"},
      { element: FM.TOGGLE_CHOSEN_MARKEN, type: "click", handler: FM.toggleCM, params: ["marken"]},
      { element: FM.MARKEN_GRIP, type: "mousedown", handler: FM.setupResize, params: ["marken"], flag: "includeEvent" }
      
    ],

    marken_resize: [
      { element: document, type: "mousemove", handler: FM.startResize, params: ["marken"], flag: "includeEvent"},
      { element: document, type: "mouseup", handler: FM.stopResize, params: ["marken"]}
    ],

    reducedCM_resize: [
      { element: window, type: "resize", handler: FM.reducedCM_handler, params: ["märkte"]}
    ],

    reducedCM_resize_MK: [
      { element: window, type: "resize", handler: FM.reducedCM_handler, params: ["marken"]}
    ],


    preise_menu: [
      //PreiseBox zu id=showChoosenFilter adden
      { element: FM.thumbs[0], type: "mouseup", handler: FM.thumbHandler },
      { element: FM.thumbs[1], type: "mouseup", handler: FM.thumbHandler },
      //Input validierung nach Eingabe
      { element: FM.priceInputs[0], type: "blur", handler: FM.firstpriceInputHandler, flag: "includeEvent" },
      { element: FM.priceInputs[1], type: "blur", handler: FM.secondpriceInputHandler, flag: "includeEvent" },
      //Input validierung bevor angezeigt wird die Eingabe
      { element: FM.priceInputs[0], type: "keydown", handler: FM.priceInputHandlerZero, flag: "includeEvent" },
      { element: FM.priceInputs[1], type: "keydown", handler: FM.priceInputHandlerOne, flag: "includeEvent" },
      //Range Farbe anpassen
      { element: FM.priceInputs[0], type: "input", handler: FM.ThumbColorHandlerOne, flag: "includeEvent" },
      { element: FM.priceInputs[1], type: "input", handler: FM.ThumbColorHandlerTwo, flag: "includeEvent" },
      //thumb Position anpassen
      { element: FM.thumbs[0], type: "input", handler: FM.thumbPositionHandlerOne, flag: "includeEvent" },
      { element: FM.thumbs[1], type: "input", handler: FM.thumbPositionHandlerTwo, flag: "includeEvent" },
      { element: FM.SALE_ITEMS_BTN, type: "click", handler: FM.toggle, flag: "includeEvent"}      // toggle animation will start and choosenbox 'reduzierte Artikel' will be added
    ],

    bewertungen_menu: [
      {element: FM.BEWERTUNGEN_MENU, type: "click", handler: FM.addingChosen, params: ["rating"], flag: "includeEvent"},    // user can choose starsRating. Header will change and StartSlide new stars Box will be added
    ],

    speicherKap_menu: [
      {element: FM.SPEICHERKAP_MENU, type: "click", handler: FM.addingChosen, params: ["gb"], flag: "includeEvent"},
    ],

    accountSlide: [
      { element: NB.PWD_EYE, type: "click", handler: NB.togglePwd },
      { element: NB.passwordInput, type: "mousedown", handler: NB.movePwUp },
      { element: NB.passwordInput, type: "blur", handler: NB.movePwDown },
      { element: NB.emailInput, type: "mousedown", handler: NB.moveEmailUp },
      { element: NB.emailInput, type: "blur", handler: NB.moveEmailDown },
    ],

    toggleMenu: [
      { element: FM.MENU_BTN, type: "click", handler: FM.openMenu},       // opens menu
      { element: FM.CLOSEMENU, type: "click", handler: FM.closeMenu}      // close menu
    ],

    toggleAcc: [
      { element: NB.ACC_OPEN_BTN, type: "click", handler: NB.openAccSlide},   // open accSlide
      { element: NB.ACC_CLOSE_BTN, type: "click", handler: NB.closeAccSlide}, // close accSlide

    ],

    windowHandling: [
      { element: window, type: "resize", handler: FM.adjustMenuLayout },   // at 1060px filterMenu switches position betweeen right and bottom: bottomPos if smaller then 1060px, rightPos if bigger then 1060px
      { element: window, type: "resize", handler: NB.expandMenubarToRight },  // if small screen and menubar right arrow all possible clicked, when screen gets bigger menubar expands to the right
    ],

    cube: [
      { elements: [NB.CUBE_ARR_DOWN1, NB.CUBE_ARR_DOWN2, NB.CUBE_ARR_DOWN3, NB.CUBE_ARR_DOWN4], type: "click", handler: NB.nextSide },  // click on DownArrow(nexSlide)
      { elements: [NB.CUBE_ARR_UP1, NB.CUBE_ARR_UP2, NB.CUBE_ARR_UP3, NB.CUBE_ARR_UP4], type: "click", handler: NB.lastSide },          // click on UpArrow(lastSlide)
      { element: NB.CUBE, type: "mouseenter", handler: NB.stopCubeAnimation },  // stop cube rotation animation, if user hovers on cube
      { element: NB.CUBE, type: "mouseleave", handler: NB.restartCubeAnimation} // restart cube rotation animation, after user stops hovering
    ],

    scrapeRequest: [
      { element: SR.SUBMIT_FILTER, type: "click", handler: SR.startScraping },  // start scaping with filters if user clicks on submit
      { element: NB.SEARCHBAR, type: "keydown", handler: SR.sendScrapeReq, flag: "includeEvent"}  // start scraping without filters if user writes non-empty value in searchbar
    ],

    menubar: [
      { element: NB.MENUBAR_LEFT_ARR, type: "click", handler: NB.moveMenubarRight}, // click on left Arrow categories will move to right
      { element: NB.MENUBAR_RIGHT_ARR, type: "click", handler: NB.moveMenubarLeft}  // click on right Arrow categories will move to left
    ],

    updateNavbarLayout: [
      {element: NB.MQ_MAX830, type: "change", handler: NB.updateNavbarLayout, flag: "includeEvent"} // updates navbar Layout at window-width: 830px
    ],

}




