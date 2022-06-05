function on(){
    document.getElementById("coffeeshop").style.cssText = "background-color: rgba(0, 0, 0, 0.3); z-index:100";
    document.getElementById("coffeecard").style.display= "block";
}
function off(){
    document.getElementById("coffeeshop").style.cssText = "background-color: rgba(0, 0, 0, 0); z-index:-100";
    document.getElementById("coffeecard").style.display= "none";
}