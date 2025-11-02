// defines
const LEFTMOVE_DEFAULT = 160;
const MENUBARWIDTH = 1292;
const MENUBAR = document.querySelector(".menubar");
const ACC_SLIDE= document.getElementById("accountSlide");
const OVERLAY= document.querySelector(".overlay");
const OUTERMENUBAR = document.querySelector(".Outermenubar");
let OVERFLOWLEFT = 0;
let ANGLE=0;


export const FILTERMENU_SLIDE = document.getElementById("slideInStandard")
export const FM_SLIDES = document.getElementsByClassName("standardSlide") // elements
export const PWD_EYE = document.getElementById("passwEye")
export const SEARCHBAR = document.getElementById("searchbar")
export const CUBE = document.querySelector(".cube");
export const MENU_BTN = document.getElementById("openCloseFilterBtn")
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


class EventListenerManager {

  constructor(){

    // All needed elements for eventlisteners
    this.passwordInput= document.getElementById("login-passw");
    this.pwLabel= document.getElementById("aSl-pw-placeholder");
    this.emailInput= document.getElementById("login-email");
    this.emailLabel= document.getElementById("aSl-email-placeholder");
    


    
    this.eventListeners= {
    "accountSlide" : {
      "movePwUpOnClick": {"element": this.passwordInput, "type": "mousedown", "handler": this.movePwUp.bind(this)},
      "movePwDownOnBlur": {"element": this.passwordInput, "type": "blur", "handler": this.movePwDown.bind(this) },
      "moveEmailUpOnClick": {"element": this.emailInput, "type": "mousedown", "handler": this.moveEmailUp.bind(this)},
      "moveEmailDownOnBlur": {"element": this.emailInput, "type": "blur", "handler": this.moveEmailDown.bind(this) },

    }
    };



  }




  // activate all Listeners from one category
  activateCategoryListeners(category){

    for (let key in this.eventListeners[category]){
      
      const eventListener= this.eventListeners[category][key];
      const element= eventListener["element"];
      const type= eventListener["type"];
      const handler= eventListener["handler"]; 
      element.addEventListener(type,handler);
  
    }
 
  }
  
  // deactivate all Listeners from one category
  deactivateCategoryListeners(category){

    for (let key in this.eventListeners[category]){

      const eventListener= this.eventListeners[category][key];
      const element= eventListener["element"];
      const type= eventListener["type"];
      const handler= eventListener["handler"]; 
      element.removeEventListener(type,handler);
  
    }

  }


  // handler

  movePwUp(){
    this.pwLabel.classList.add("moveLabelUp");
  }

  movePwDown(){
    if (this.passwordInput.value === ""){
      this.pwLabel.classList.remove("moveLabelUp");
    }

  }

  moveEmailUp(){
    this.emailLabel.classList.add("moveLabelUp");
  }

  moveEmailDown(){
     if (this.emailInput.value === ""){
      this.emailLabel.classList.remove("moveLabelUp");
    }

  }
  

}

const eventListenerManager= new EventListenerManager();



//clicking on arrows on the updating button in navbar

export function lastSide(){
  ANGLE+= 90;
  CUBE.style.transform= `rotateX(${ANGLE}deg)`;

}

export function nextSide(){
  ANGLE-= 90;
  CUBE.style.transform = `rotateX(${ANGLE}deg)`; 
  
}


// Help

// checks if hover is during animation
function validState(computed) {

  const matrices = [
   "matrix(1, 0, 0, 1, 0, 0)", // rotateCube
   "matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)", // rotateCube90
   "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)", // rotateCube180
   "matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)"  // rotateCube270
  ];

  if (matrices.includes(computed)){
    return true;
  }

  return false;

}

// get current degree
function getCurrentRotateX(computed){
  switch (computed) { 
   //first cubeSide
   case "matrix(1, 0, 0, 1, 0, 0)":
    return 0;
    
  
   //second cubeside
   case "matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)":
    return -90;
 
  
   //third cubeside
   case "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)":
    return -180;
 
  
   //fourth cubeside
   case "matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)":
    return -270;
  
  };
}



export function stopCubeAnimation(){
  // validation
  const computed = getComputedStyle(CUBE).transform;
  if (!validState(computed)) return;

  
  // save current degree
  ANGLE = getCurrentRotateX(computed);


  // save last animation state
  CUBE.style.transform = computed;
  
  // stop animation
  CUBE.style.animation = "none"
  CUBE.style.transition = "transform 0.5s ease-in-out";
}


export function restartCubeAnimation(){
  const computed= getComputedStyle(CUBE).transform;

  switch (computed) { 
   //first cubeSide
   case "matrix(1, 0, 0, 1, 0, 0)":
    CUBE.style.animation= "rotateCube 16s infinite"
    break;
  
   //second cubeside
   case "matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)":
    CUBE.style.animation = "rotateCube90 16s infinite";
    break;
  
   //third cubeside
   case "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)":
    CUBE.style.animation = "rotateCube180 16s infinite";
    break;
  
   //fourth cubeside
   case "matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1)":
    CUBE.style.animation = "rotateCube270 16s infinite";
    break;
  };
}

// account button click opens accountSlide from right



// Help


//makes left/Right-Arrow visible
function showMenuBarArr(arrow){
  const arrId = (arrow == "right") ? "rightArr" : "leftArr";
  const arr = document.getElementById(arrId);
  
  if (arr.classList.contains("visible")) return;

  arr.classList.remove("unvisible");
  arr.classList.add("visible");
}

// makes left/Right-Arrow unvisible
function hideMenuBarArr(arrow){
  const arrId = (arrow == "right") ? "rightArr" : "leftArr";
  const arr = document.getElementById(arrId);
  
  if (arr.classList.contains("unvisible")) return;

  arr.classList.remove("visible");
  arr.classList.add("unvisible");
}


// Main

//menubar controll for full screen

export function moveMenubarLeft(){

  // calculate overflow on right side
  const OutermenubarWidth = OUTERMENUBAR.clientWidth;

  const overflow = MENUBARWIDTH - OutermenubarWidth - OVERFLOWLEFT;

  // reset
  MENUBAR.classList.remove("moveBarRight");
  MENUBAR.style.transform = "";

  if (overflow <= LEFTMOVE_DEFAULT){

    MENUBAR.style.transform = `translateX(-${OVERFLOWLEFT + overflow}px)`;
    OVERFLOWLEFT+= overflow;

    showMenuBarArr("left");
    hideMenuBarArr("right");


  }
  else{
  
    MENUBAR.style.transform = `translateX(-${OVERFLOWLEFT + LEFTMOVE_DEFAULT}px)`;
    OVERFLOWLEFT+= LEFTMOVE_DEFAULT;

    showMenuBarArr("left");

  }
    
  
  
  



}

// else wenn linke fpeil clickt wie verschieben translateX wert
export function moveMenubarRight(){

  MENUBAR.classList.remove("moveBarLeft");
  
  if (OVERFLOWLEFT <= LEFTMOVE_DEFAULT){
    MENUBAR.style.transform = "translateX(0px)";
    OVERFLOWLEFT = 0;

    showMenuBarArr("right");
    hideMenuBarArr("left");

  }
  else{

    const nextTf = OVERFLOWLEFT - LEFTMOVE_DEFAULT; //decreasing the negative translateX
    MENUBAR.style.transform = `translateX(-${nextTf}px)`;
    OVERFLOWLEFT -= LEFTMOVE_DEFAULT;

    showMenuBarArr("right");

    
  }
  

  
}



// menubar translate to right when Outermenubar gets bigger
export function expandMenubarToRight(){
  // get translateX value
  const str = MENUBAR.style.transform;
  let transxValue = parseFloat(str.replace("translateX(","").replace("px)",""));
  if (isNaN(transxValue)) transxValue = 0;

  //subtract transX value from menubar width
  const menubarNewWidth = MENUBARWIDTH + transxValue; // the overflow width on left side will be subtracted(transXValue ist negativ)
  const OutermenubarWidth = OUTERMENUBAR.clientWidth;

  const freeSpaceRight = OutermenubarWidth - menubarNewWidth;
  if (freeSpaceRight>=1){
    MENUBAR.style.transform = `translateX(${transxValue + freeSpaceRight}px)`;
    OVERFLOWLEFT-= freeSpaceRight;
  }
}





// open/close FilterSlide
export function openCloseFilter(){
  if (MENU_BTN.dataset.canclick == "false") return; // only clos/open if other Slides are not open
  FILTERMENU_SLIDE.classList.toggle("openSlide");
}



// Register Slide

export function openAccSlide(){

  // open Slide, activate black background
  ACC_SLIDE.classList.add("openAccSlide");
  OVERLAY.classList.add("activated");

  eventListenerManager.activateCategoryListeners("accountSlide");




}

export function closeAccSlide(){

  // close Slide, deactivate black background
  ACC_SLIDE.classList.remove("openAccSlide");
  OVERLAY.classList.remove("activated");

  eventListenerManager.deactivateCategoryListeners("accountSlide")

}

// Help

function toggleEye(pwEye){
  if(pwEye.classList.contains("fa-eye")){
    pwEye.classList.remove("fa-eye");
    pwEye.classList.add("fa-eye-slash");
  }
  else{
    pwEye.classList.remove("fa-eye-slash");
    pwEye.classList.add("fa-eye");
    
  }
}


// toggles Password Visibility at loginSlide password input

export function togglePwd(){

  // toggle text visibility
  const pwInput= document.getElementById("login-passw");
  pwInput.type= pwInput.type == "text" ? "password" : "text";
  
  // toggle eye open and closed  
  toggleEye(PWD_EYE);
  
}



