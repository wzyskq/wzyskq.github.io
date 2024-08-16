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



// home
class Typewriter {
    /**
     * Typewriter类构造函数
     * @param {Object} options - 配置对象
     * @param {string} options.elementId - 目标元素ID
     * @param {Array<string>} options.text - 要显示的文本列表
     * @param {number} [options.duration=250] - 淡入时间（毫秒）
     */
    constructor(options) {
        this.elem = document.getElementById(options.elementId); // 通过ID获取目标元素
        this.contentList = options.text; // 文本内容列表
        this.duration = options.duration || 250; // 淡入时间，默认250毫秒
        this.typeRiterIndex = 0; // 当前字符索引
        this.currentLine = 0; // 当前行索引
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

function opacityChecked(constName, rootName) {
    if (constName.checked) {
        rootStyle.setProperty(rootName, '1');
    } else {
        rootStyle.setProperty(rootName, '0');
    }
}

function darkModeChecked() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // console.log("Browser is in dark mode.");
        darkMode.checked = true;
    } else {
        // console.log("Browser is not in dark mode.");
        darkMode.checked = false;
    }
}

// lang  // 不是 css 用不起，而是 js 更有性价比
window.addEventListener('scroll', () => {
    ribbonToBottom = window.innerHeight - ribbon.getBoundingClientRect().bottom;
    // console.log(ribbonToBottom);
    if (ribbonToBottom > 110) { rootStyle.setProperty('--ribbon-to-bottom', '236%') }
    else { rootStyle.setProperty('--ribbon-to-bottom', '-100%') }
});

window.opacityChecked(lang, '--tooltip-opacity');
lang.addEventListener('change', () => {
    window.opacityChecked(lang, '--tooltip-opacity');
});

lang_label.addEventListener('blur', () => {
    // console.log('blur');
    lang.checked = false;
    window.opacityChecked(lang, '--tooltip-opacity');
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



