// 咖啡店
function on() {
    document.getElementById("coffeeshop").style.cssText = "background-color: rgba(0, 0, 0, 0.3); z-index:100";
    document.getElementById("coffeecard").style.opacity = "1";
}
function off() {
    document.getElementById("coffeeshop").style.cssText = "background-color: rgba(0, 0, 0, 0); z-index:-100";
    document.getElementById("coffeecard").style.opacity = "0";
}


//导航栏
function getTop(elem) {
    var elemTop = elem.offsetTop;   //获得elem元素距相对定位的父元素的top
    elem = elem.offsetParent;   //将elem换成起相对定位的父元素
    while (elem != null) {  //只要还有相对定位的父元素 
        elemTop += elem.offsetTop;  //获得父元素 距他父元素的top值,累加到结果中
        elem = elem.offsetParent;   //再次将elem换成他相对定位的父元素上;
    }
    return elemTop;
}

function reloud(num) {
    var gi2 = window.getTop(document.getElementById('ga2'))
    var gi3 = window.getTop(document.getElementById('ga3'))
    var gi4 = window.getTop(document.getElementById('ga4'))
    var gi5 = window.getTop(document.getElementById('ga5'))
    // console.log(gi5)

    if (num == 2) {return gi2}
    else if (num == 3) {return gi3}
    else if (num == 4) {return gi4}
    else {return gi5}
}

window.addEventListener("resize",reloud);
window.reloud();

gicon1.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
gicon2.onclick = function () {
    window.scrollTo({
        top: reloud(2)+10,
        behavior: "smooth"
    });
}
gicon3.onclick = function () {
    window.scrollTo({
        top: reloud(3)-60,
        behavior: "smooth"
    });
}
gicon4.onclick = function () {
    window.scrollTo({
        top: reloud(4)-60,
        behavior: "smooth"
    });
}
gicon5.onclick = function () {
    window.scrollTo({
        top: reloud(5),
        behavior: "smooth"
    });
}


//夜间模式
function NightMode(){
    let NMback = document.getElementById('NightMode');
    let NMbacki = document.getElementById('NMbacki');
    let NMbacki1 = document.getElementsByClassName('bi bi-brightness-high');
    let NMbacki2 = document.getElementsByClassName('bi bi-brightness-high-fill');

    var NMstate = document.querySelector(':root');
    // console.log(NMstate)
    var NMstates = getComputedStyle(NMstate).getPropertyValue('--WholeShadow');
    // console.log(NMstates);
    try {
        let result = NMstates.match(/0, 0, 0, (0.5)/)[1];
        // console.log(result[1]);
        NMstate.style.setProperty('--WholeShadow', 'linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)) ');
        NMback.style.cssText = 'background-color: white;';
        NMbacki.style.cssText = 'color: black;';
        NMbacki2.className = 'bi bi-brightness-high';
    } catch (eer) {
        NMstate.style.setProperty('--WholeShadow', 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) ');
        NMback.style.cssText = 'background-color: gray;';
        NMbacki.style.cssText = 'color: white;';
        NMbacki1.className = 'bi bi-brightness-high-fill';
    }        
}