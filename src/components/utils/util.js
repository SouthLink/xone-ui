// 公共组件依赖函数

// 节流
const throttle = (fn, delay) => {
  let last = 0,
  timer = null;
  return function() {
    let context = this,
    args = arguments,
    now = +new Date();
    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function() {
         last = now;
         fn.apply(context, args);
      }, delay)
    } else {
      last = now;
     fn.apply(context, args);
    }
  }
}

// 深拷贝
const deepClone = (obj) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Function
  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}


export {
  throttle,
  deepClone,
}