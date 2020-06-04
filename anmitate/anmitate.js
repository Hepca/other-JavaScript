class Jq {
    constructor(arg, root) {
        if (!root) {
            this['preObject'] = [document]
        } else {
            this['preObject'] = root
        }
        if (typeof arg === 'string') {
            let eles = document.querySelectorAll(arg)
            // this.eles = eles
            this.addEles(eles)
        } else if (typeof arg === 'function') {
            // 函数
            document.addEventListener("DOMContentLoaded", arg)
        } else {
            // 对象
            // 1 个或者是多个
            if (typeof arg.length === 'undefined') {
                // 1个对象
                this[0] = arg
                this.length = 1
            } else {
                // 多个
                this.addEles(arg)
            }
        }
        // console.log(this)
    }
    addEles(eles) {
        for (let i = 0; i< eles.length; i++) {
            this[i] = eles[i]
        }
        this.length = eles.length
    }
    click(fn) {
        for (let i =0; i< this.length; i++) {
            this[i].addEventListener("click", fn)
        }
        return new Jq(this)
    }
    on(eventName, fn) {
        // mousemove  mosuedown mouseover
        let reg = /\s+g/
        eventName = eventName.repalce(reg, " ")
        let eventArr = eventName.split(" ")
        // 针对每个节点绑定每个事件
        for (let i = 0; i< this.length; i++) {
            for(let j = 0; j < eventArr.length; j++) {
                this[i].addEventListener(eventArr[j], fn)
            }
        }
    }
    eq(index) {
        // console.log(this[index])
        // return this[index]
        // return this
        return new Jq(this[index], this)
    }
    get(index) {
        return this[index]
    }
    end () {
        return new Jq(this.preObject)
    }
    css(...arg) {
        // 不定参
        if (arg.length === 1) {
             // 1字符串
             if (typeof arg[0] === 'string') {
                 // 获取样式
                 if (arg[0] in $.cssHooks) {
                     $.cssHooks[arg[0].get[this[0]]]
                 }
                 this.getStyle(this[0], arg[0])
             } else {
                  // 2.对象 设置样式
                  // 循环节点
                  for (let i = 0; i < this.length; i++) {
                    // 循环样式对象
                    for (let j in arg[0]) {
                        this.setStyle(this[i], j, arg[0][j])
                    }
                }
             }
        } else {
            // 传入2个参数
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], arg[0],arg[1])
            }

        }
    }
    getStyle(ele, styleName) {
        console.log(styleName, 'ssddsddsddd')
        return getComputedStyle(ele, null)[styleName]
    }
    setStyle(ele, styleName, styleValue) {
        if (typeof styleValue  === 'number' && !(styleName in $.cssNumber)) {
            styleValue = styleValue + "px"
        }
        if (styleName in $.cssHooks) {
            $.cssHooks[styleName].set(ele, styleValue)
        } else {
            ele.style[styleName] = styleValue
        }
    }
    animate(styles, time, fn) {
        for (let i = 0; i < this.length; i++) {
          this[i].style.transition = time / 1000 + 's';
        }
        Object.getOwnPropertyNames(styles).forEach((key) => {
          for (let i = 0; i < this.length; i++) {
            this[i].style[key] = styles[key];
          }
        });
        fn && fn();
        return new Jq(this);
      }
}

$.cssNumber = {


}
$.cssHooks = {}
$.animateLib = {}

function $(arg) {
    return new Jq(arg)
  }