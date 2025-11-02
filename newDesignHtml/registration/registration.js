const emailInput= document.getElementById("emailInput");
const placeholder= document.getElementById("placeholder");
const warningMsg= document.getElementById("warningMsg");

emailInput.addEventListener("mousedown",()=>{
    placeholder.classList.add("moveUp");
})




// Help

function validateEmail(){
    const regex= /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]+$/;

    //unvalid
    if (!regex.test(emailInput.value)){
        warningMsg.classList.add("showWarningMsg");
        emailInput.classList.add("redBorder");
    }

    //valid
    else{
        console.log("valid");
        warningMsg.classList.remove("showWarningMsg");
        emailInput.classList.remove("redBorder");
    }
}


// Main
emailInput.addEventListener("blur",()=>{
    if(emailInput.value == ""){
        placeholder.classList.remove("moveUp");
    }
    else{
        validateEmail();
        
    }
    
})


