import { EvtManager } from "../eventListener/class.js"
import { 
   passwordInput, pwLabel, emailInput, emailLabel, add_OVERFLOWLEFT, reset_OVERFLOWLEFT, LEFTMOVE_DEFAULT, MENUBARWIDTH, DEFAULT_PR, MENUBAR, ACC_SLIDE, OVERLAY, OUTERMENUBAR, MAIN_DIV, NB, NB_SEARCHBAR, SCROLLBAR_WIDTH, SECONDLAYER, NAVBAR_SEARCHBAR, FIRSTLAYER, CUBE_CONTAINER, NB_MENUBTN, NB_MENUBAR, OVERFLOWLEFT, ANGLE, FM_SLIDES, PWD_EYE, SEARCHBAR, CUBE, MENUBAR_RIGHT_ARR, MENUBAR_LEFT_ARR, ACC_OPEN_BTN, ACC_CLOSE_BTN, CUBE_ARR_UP1, CUBE_ARR_DOWN1, CUBE_ARR_UP2, CUBE_ARR_DOWN2, CUBE_ARR_UP3, CUBE_ARR_DOWN3, CUBE_ARR_UP4, CUBE_ARR_DOWN4 
   ,add_ANGLE, set_ANGLE
} from "./variables.js"
export * from "./variables.js" 



//clicking on arrows on the updating button in navbar

export function lastSide(){
  add_ANGLE(90)
  CUBE.style.transform= `rotateX(${ANGLE}deg)`;

}

export function nextSide(){
  add_ANGLE(-90)
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
  //ANGLE = getCurrentRotateX(computed);
  set_ANGLE(getCurrentRotateX(computed))

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

  arr.classList.remove("unvisible", "noPointer");
  arr.classList.add("visible");
}

// makes left/Right-Arrow unvisible
function hideMenuBarArr(arrow){
  const arrId = (arrow == "right") ? "rightArr" : "leftArr";
  const arr = document.getElementById(arrId);
  
  if (arr.classList.contains("unvisible")) return;

  arr.classList.remove("visible");
  arr.classList.add("unvisible", "noPointer");

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
    //OVERFLOWLEFT+= overflow;
    add_OVERFLOWLEFT(overflow)

    showMenuBarArr("left");
    hideMenuBarArr("right");


  }
  else{
  
    MENUBAR.style.transform = `translateX(-${OVERFLOWLEFT + LEFTMOVE_DEFAULT}px)`;
    //OVERFLOWLEFT+= LEFTMOVE_DEFAULT;
    add_OVERFLOWLEFT(LEFTMOVE_DEFAULT)

    showMenuBarArr("left");

  }
    

}

// else wenn linke fpeil clickt wie verschieben translateX wert
export function moveMenubarRight(){

  MENUBAR.classList.remove("moveBarLeft");
  
  if (OVERFLOWLEFT <= LEFTMOVE_DEFAULT){
    MENUBAR.style.transform = "translateX(0px)";
    //OVERFLOWLEFT = 0;
    reset_OVERFLOWLEFT()

    showMenuBarArr("right");
    hideMenuBarArr("left");

  }
  else{

    const nextTf = OVERFLOWLEFT - LEFTMOVE_DEFAULT; //decreasing the negative translateX
    MENUBAR.style.transform = `translateX(-${nextTf}px)`;
    //OVERFLOWLEFT -= LEFTMOVE_DEFAULT;
    add_OVERFLOWLEFT(-LEFTMOVE_DEFAULT)

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
    //OVERFLOWLEFT-= freeSpaceRight;
    add_OVERFLOWLEFT(-freeSpaceRight)
  }
}




// Help



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




// Register Slide

export function openAccSlide(){

  disableVerticalScroll()
  ACC_SLIDE.classList.add("openAccSlide")
  OVERLAY.classList.add("activated")     // activate black background
  EvtManager.attachListener("accountSlide")


}

export function closeAccSlide(){

  enableVerticalScroll()
  ACC_SLIDE.classList.remove("openAccSlide")
  OVERLAY.classList.remove("activated")     // deactivate black background
  EvtManager.detachListener("accountSlide")
}





// updates Navbar Layout at browser width 830px
export function updateNavbarLayout(e){

  switch(e.matches){

    case true: 
      [NB_MENUBAR, NB_MENUBTN].forEach(el => el.classList.add("d-none"))
      SECONDLAYER.appendChild(NAVBAR_SEARCHBAR)
      break;
        
    case false:
      [NB_MENUBAR, NB_MENUBTN].forEach(el => el.classList.remove("d-none"))
      FIRSTLAYER.insertBefore(NAVBAR_SEARCHBAR, CUBE_CONTAINER)
      break;
    }
}





export function movePwUp(){
  pwLabel.classList.add("moveLabelUp");
}

export function movePwDown(){
  if (passwordInput.value == ""){
    pwLabel.classList.remove("moveLabelUp");
  }

}

export function moveEmailUp(){
  emailLabel.classList.add("moveLabelUp");
}

export function moveEmailDown(){
  if (emailInput.value == ""){
    emailLabel.classList.remove("moveLabelUp");
  }

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


// click on eye changes eye icon and the visibility of the password
export function togglePwd(){

  // toggle text visibility
  const pwInput= document.getElementById("login-passw");
  pwInput.type= pwInput.type == "text" ? "password" : "text";
  
  // toggle eye open and closed  
  toggleEye(PWD_EYE);
  
}