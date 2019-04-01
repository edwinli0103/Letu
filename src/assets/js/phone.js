//rem屏幕适配
;(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    /*DOMContentLoaded文档加载完成不包含图片资源 onload包含图片资源*/
})(document, window);

// 比较两个对象是否相等
Object.prototype.equals = function (object2) {
    for (var propName in this) {
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof this[propName] != typeof object2[propName]) {
            return false;
        }
    }
    for (var propName in object2) {
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof this[propName] != typeof object2[propName]) {
            return false;
        }
        if (!this.hasOwnProperty(propName))
            continue;

        /**REQUIRES Array.equals**/
        if (this[propName] instanceof Array && object2[propName] instanceof Array) {
            if (!this[propName].equals(object2[propName]))
                return false;
        }
        else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
            if (!this[propName].equals(object2[propName]))
                return false;
        }
        else if (this[propName] != object2[propName]) {
            return false;
        }
    }
    return true;
}
Object.defineProperty(Object.prototype, "equals", { enumerable: false });

