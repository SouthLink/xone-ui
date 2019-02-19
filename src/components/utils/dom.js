import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
// const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
// const MOZ_HACK_REGEXP = /^moz([A-Z])/;
// const ieVersion = isServer ? 0 : Number(document.documentMode);

//是否包含指定class
export const hasClass = function(el, cls) {
    if ( !el || !cls ) return false;
    if ( cls.indexOf(' ') !== -1 ) throw new Error('className should not contain space.');
    if ( el.classList ) {
        return el.classList.contains(cls);
    } else {
        return ( ' ' + el.className + ' ' ).indexOf( ' ' + cls + ' ' ) > -1;
    }
};
//添加指定class
export const addClass = function(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};
//移出指定class
export const removeClass = function(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        // eslint-disable-next-line
        el.className = trim(curClass);
    }
}

//遍历子元素
export const getChildNode = function(node, attr) {
    if(!node || !attr) return [];

    let childArr = [];

    if ( node.children ) {
        var count= node.childElementCount;
        for ( let i = 0; i < count; i++  ) {
            let child = node.children[i];
            if ( child.childElementCount !== 0 ) {
                if ( child.getAttribute(attr) ) {
                    let curDom = {
                        id: child.getAttribute(attr),
                        dom: child
                    }
                    childArr.push(curDom)
                }else{
                    childArr = childArr.concat(getChildNode(child, attr))
                }
            } else {
                if ( child.getAttribute(attr) ) {
                    let curDom = {
                        id: child.getAttribute(attr),
                        dom: child
                    }
                    childArr.push(curDom)
                }
            }
        }
    } else {
        return [];
    }

    return childArr;
}

//绑定监听事件
export const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

//移出监听事件
export const off = (function() {
    if (!isServer && document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();