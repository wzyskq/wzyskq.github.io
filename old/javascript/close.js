function cw() {
    // 关闭当前页面，**注意必须是window.open()打开的页面才有效果**
    window.opener = null;
    window.open('', '_self');
    window.close();
}