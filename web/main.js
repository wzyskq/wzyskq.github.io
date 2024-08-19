const htmLang = document.documentElement.lang;
const rootStyle = document.documentElement.style;
const rootValue = window.getComputedStyle(document.documentElement);

// 页面滚动锁
const preventScroll = function (e) {
    e.preventDefault();
};
function lock() {
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
}
function unlock() {
    document.removeEventListener('wheel', preventScroll, { passive: false });
    document.removeEventListener('touchmove', preventScroll, { passive: false });
}



// web language
reLang()
function reLang(argu) {
    if (argu == 'zh') { localStorage.setItem('lang', 'zh'); }
    else if (argu == 'en') { localStorage.setItem('lang', 'en'); }
    else if (argu == 'default') { localStorage.setItem('lang', 'default'); }

    console.log(localStorage.getItem('lang'));

    if (!localStorage.getItem('lang')) { localStorage.setItem('lang', 'default'); }
    if (localStorage.getItem('lang') == 'default') {
        const language = navigator.language || navigator.userLanguage;
        if (language == 'zh-CN' && htmLang != 'zh') window.location.href = 'zh/index.html';
        if (language != 'zh-CN' && htmLang == 'zh') window.location.href = '../';
    } else if (localStorage.getItem('lang') == 'zh' && htmLang != 'zh') {
        window.location.href = 'zh/index.html';
    } else if (localStorage.getItem('lang') == 'en' && htmLang != 'en') {
        window.location.href = '../';
    }
}




// loader
// 跳过加载: 控制台中输入 localStorage.fast = true;
if (!localStorage.getItem('fast')) { localStorage.setItem('fast', false); }
(localStorage.getItem('fast') == 'true') ? loadOff() : loadOn();

function loadOn() {
    window.lock();
    rootStyle.setProperty('--loader-opacity', 1);
    rootStyle.setProperty('--loader-index', 1000);
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            rootStyle.setProperty('--loader-heart-opacity', 0);
        }, 2000);

        setTimeout(() => {
            rootStyle.setProperty('--loader-welcome-opacity', 1);
        }, 3000);

        setTimeout(() => {
            rootStyle.setProperty('--loader-welcome-opacity', 0);
            if (htmLang == 'zh') {
                new Typewriter({
                    elementId: 'title',
                    text: ['“', '我一直注视着你，', '似近，似远，', '但你永远，', '看不见我......'],
                    duration: 250,
                }).show();
            }
            if (htmLang == 'en') {
                new Typewriter({
                    elementId: 'title',
                    text: ['“', 'いつも見ていた，', '近いようで遠くて，', 'いつだって、', '届かない......'],
                    duration: 250,
                }).show();
            }
        }, 4000);

        setTimeout(() => {
            rootStyle.setProperty('--loader-opacity', 0);
            rootStyle.setProperty('--loader-index', -100);
            window.unlock();
        }, 5000);

    });
}

function loadOff() {
    document.addEventListener('DOMContentLoaded', () => {
        if (htmLang == 'zh') {
            new Typewriter({
                elementId: 'title',
                text: ['“', '我一直注视着你，', '似近，似远，', '但你永远，', '看不见我......'],
                duration: 250,
            }).show();
        }
        if (htmLang == 'en') {
            new Typewriter({
                elementId: 'title',
                text: ['“', 'いつも見ていた，', '近いようで遠くて，', 'いつだって、', '届かない......'],
                duration: 250,
            }).show();
        }

    });
}



// home
class Typewriter {
    /**
     * @param {Object} options
     * @param {string} options.elementId
     * @param {Array<string>} options.text
     * @param {number} [options.duration=250]
     */
    constructor(options) {
        this.elem = document.getElementById(options.elementId);
        this.contentList = options.text;
        this.duration = options.duration || 250;
        this.typeRiterIndex = 0;
        this.currentLine = 0;
    }

    show() {
        let intervalId;

        const typeNextChar = () => {
            if (this.currentLine < this.contentList.length) {
                if (this.typeRiterIndex < this.contentList[this.currentLine].length) {
                    const newCharElement = document.createElement('span');
                    newCharElement.textContent = this.contentList[this.currentLine].charAt(this.typeRiterIndex);
                    // newCharElement.style.opacity = 0;
                    newCharElement.classList.add('fade-in');
                    this.elem.appendChild(newCharElement);
                    this.typeRiterIndex++;
                } else {
                    this.typeRiterIndex = 0;
                    this.elem.appendChild(document.createElement('br')); // 插入换行
                    this.currentLine++;
                }
            } else {
                clearInterval(intervalId);
                this.resetIndices(); // 重置索引
            }
        };

        intervalId = setInterval(typeNextChar.bind(this), this.duration);
    }

    resetIndices() {
        this.typeRiterIndex = 0;
        this.currentLine = 0;
    }

}



// navi
const ribbon = document.querySelector('.ribbon');
let ribbonToBottom = 0;
const tooltip = document.querySelector('.tooltip');
const lang = document.getElementById('lang');
const lang_label = document.getElementsByTagName('label')[0];

const darkMode = document.getElementById('darkMode');

function displayChecked(constName, rootName) {
    if (constName.checked) {
        rootStyle.setProperty(rootName, 'flex');
    } else {
        rootStyle.setProperty(rootName, 'none');
    }
}

// function opacityChecked(constName, rootName) {
//     if (constName.checked) {
//         rootStyle.setProperty(rootName, '1');
//     } else {
//         rootStyle.setProperty(rootName, '0');
//     }
// }

// function darkModeChecked() {
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         darkMode.checked = true;
//     } else {
//         darkMode.checked = false;
//     }
// }

// lang  // 不是 css 用不起，而是 js 更有性价比
window.addEventListener('scroll', () => {
    ribbonToBottom = window.innerHeight - ribbon.getBoundingClientRect().bottom;
    // console.log(ribbonToBottom);
    if (ribbonToBottom > tooltip.offsetHeight + 12) { rootStyle.setProperty('--ribbon-to-bottom', '138px') }
    else { rootStyle.setProperty('--ribbon-to-bottom', '-64px') }
});

window.displayChecked(lang, '--tooltip-display');
lang.addEventListener('change', () => {
    window.displayChecked(lang, '--tooltip-display');
});

lang_label.addEventListener('blur', () => {
    // console.log('blur');
    setTimeout(() => {
        lang.checked = false;
        window.displayChecked(lang, '--tooltip-display');
    }, 100);  // 延时 tooltip 消失，否则无法点到按钮（这个 bug 卡了我好久T_T

});

// darkmode 变换效果已用 css 实现
// darkModeChecked();
// window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', darkModeChecked);
// darkMode.checked = true;

// snow 效果已用 css 实现



// pay 锁定
const pay = document.getElementById('pay');
pay.addEventListener('focus', () => { lock() });
pay.addEventListener('blur', () => { unlock() });



// project data
function fetchData() {
    let jsonUrl = 'web/projects.json';
    (htmLang == 'en') ? jsonUrl : jsonUrl = '../' + jsonUrl;

    return fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

const exh = document.querySelector('.exhibition');
const sty = document.querySelector('head style');
// console.log(exh);


fetchData().then(data => {
    // 将json中的对象按照No.的顺序重新排列
    data.sort((a, b) => a['No.'] - b['No.'])

    let htmText = '';
    let cssText = '';

    for (let item of data) {
        const html = `
        <a href="${item['html']['url']}" target="_blank" class="box">
            <div class="pic"></div>
            <div class="info">
                <h2>${(item['html']['isBeta']) ? `${item['html'][htmLang]['title']}<span class="beta">Beta</span>` : item['html'][htmLang]['title']}</h2>
                <p>${item['html'][htmLang]['intro']}</p>
                <p>${item['html'][htmLang]['type']}</p>
            </div>
        </a>
        `;

        let cssUrl = item['css']['url'];
        (htmLang == 'en') ? cssUrl : cssUrl = '../' + cssUrl;

        const css = `
        #project .exhibition .box:nth-child(${item['No.']}) .pic {
            background-image: url("${cssUrl}");
            background-size: ${item['css']['size']};
            background-position: ${item['css']['pos']};
        }
        `;

        htmText += html;
        cssText += css;
    }

    // console.log(htmText);
    // console.log(cssText);

    exh.innerHTML += htmText;
    sty.insertAdjacentHTML('beforeend', cssText);
});



// copyright
function myTime() {
    let day = document.getElementById('time_day');
    let hour = document.getElementById('time_hour');
    let min = document.getElementById('time_min');
    let sec = document.getElementById('time_sec');

    const ms = Date.now() - new Date(2022, 7, 20, 22, 4).getTime();

    let totSec = Math.trunc(ms / 1000);
    let dd = Math.trunc(totSec / 86400);
    let hh = Math.trunc(totSec % 86400 / 3600);
    let mm = Math.trunc(totSec % 86400 % 3600 / 60);
    let ss = Math.trunc(totSec % 86400 % 3600 % 60);

    // console.log(dd, hh, mm, ss);

    day.innerHTML = dd;
    hour.innerHTML = hh;
    min.innerHTML = mm;
    sec.innerHTML = ss;
}

setInterval(myTime, 300);
