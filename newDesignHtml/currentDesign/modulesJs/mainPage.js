import * as FM from "./Filtermenu/functions.js"
import * as NB from "./navBar/functions.js"
import { EvtManager } from "./eventListener/class.js"


// One time execution functions
NB.updateNavbarLayout(NB.MQ_MAX830)        //  navbar layout
FM.changeLayout(FM.MQ_MAX1060)  //  arrow direction of the menuSlides
FM.addScrollbar(FM.MQ_MAX580)       // Choosenfilter at small screen will have scrollbar
FM.setInitialMenuPosition()         //  Once at start execution to position the menu correct


EvtManager.attachListener("toggleMenu")
EvtManager.attachListener("addToCart")
EvtManager.attachListener("windowHandling")
EvtManager.attachListener("toggleAcc")
EvtManager.attachListener("cube")
EvtManager.attachListener("scrapeRequest")
EvtManager.attachListener("menubar")
EvtManager.attachListener("updateNavbarLayout")

