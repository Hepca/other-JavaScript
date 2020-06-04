const fn = function (a, b) {
    const obj = {
        func:(a, b) => {
            console.log(this, arguments, obj.func.prototype, a, b)
        }
    }
    return obj
}
const obj = fn(1, 2)
obj.func(3)
new obj.func(4)

/**
 * 注意:箭头函数没有this
 * 解释：1.因为箭头函数没有this，它的this指向上一层指向，所以第一个this指向windows
 *      2.arguments 这里应该是fn里传的1，2
 *      3.箭头函数不绑定this指向，它内部this指向其实就是父作用域this指向，由于fn是window调用
 *          所以指向window，然后箭头函数没有arguments，所以打印arguments其实也是父级
 *          所以是1，2
 *      4.然后箭头函数没有prototype属性，后面a b 分别是3 和 undefined，因为值传了一个参数3
 *           所以a 为3 b 为undefined 最好一个箭头函数无法作为构造函数使用，所以new的时候会抛出
 *          一个错误，没有原型应该和它不能作为构造函数使用是有关系的
 *
 */