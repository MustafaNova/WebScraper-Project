export const LEFTMOVE_DEFAULT = 160
export const MENUBARWIDTH = 1292
export const DEFAULT_PR = 50 // default padding right setting of Navbar
export const MENUBAR = document.querySelector(".menubar")
export const ACC_SLIDE= document.getElementById("accountSlide")
export const OVERLAY= document.querySelector(".overlay")
export const OUTERMENUBAR = document.querySelector(".Outermenubar")
export const MAIN_DIV = document.getElementById("mainContent")
export const NB = document.querySelector(".navBar")
export const NB_SEARCHBAR = document.querySelector(".navBar_searchbar")
export const SCROLLBAR_WIDTH = window.innerWidth - document.documentElement.clientWidth
export const NAVBAR_SEARCHBAR = document.querySelector(".navBar_searchbar")
export const FIRSTLAYER = document.querySelector(".firstLayer")
export const CUBE_CONTAINER = document.querySelector(".cube-container")
export const NB_MENUBTN = document.getElementById("NB_menuBtn")
export const NB_MENUBAR = document.getElementById("NB_menubar")
export const FM_SLIDES = document.getElementsByClassName("standardSlide") // elements
export const PWD_EYE = document.getElementById("passwEye")
export const SEARCHBAR = document.querySelector(".navBar_input")
export const CUBE = document.querySelector(".cube");
export const MENUBAR_RIGHT_ARR = document.getElementById("rightArr")
export const MENUBAR_LEFT_ARR = document.getElementById("leftArr")
export const ACC_OPEN_BTN = document.getElementById("accOpenBtn")
export const ACC_CLOSE_BTN = document.getElementById("accCloseBtn") 

export const CUBE_ARR_UP1 = document.getElementById("cubeArrUp1")
export const CUBE_ARR_DOWN1 = document.getElementById("cubeArrDown1")
export const CUBE_ARR_UP2 = document.getElementById("cubeArrUp2")
export const CUBE_ARR_DOWN2 = document.getElementById("cubeArrDown2")
export const CUBE_ARR_UP3 = document.getElementById("cubeArrUp3")
export const CUBE_ARR_DOWN3 = document.getElementById("cubeArrDown3")
export const CUBE_ARR_UP4 = document.getElementById("cubeArrUp4")
export const CUBE_ARR_DOWN4 = document.getElementById("cubeArrDown4")

export const passwordInput = document.getElementById("login-passw")
export const pwLabel = document.getElementById("aSl-pw-placeholder")
export const emailInput = document.getElementById("login-email")
export const emailLabel = document.getElementById("aSl-email-placeholder")

export const MQ_MAX830 = window.matchMedia("(max-width: 830px)")
export let SECONDLAYER = document.querySelector(".secondLayer")


export let OVERFLOWLEFT = 0
export function reset_OVERFLOWLEFT(){
    OVERFLOWLEFT = 0
}
export function add_OVERFLOWLEFT(value){
    OVERFLOWLEFT+= value
}

export let ANGLE=0
export function add_ANGLE(value){
    ANGLE+= value
}
export function set_ANGLE(value){
    ANGLE = value
}



