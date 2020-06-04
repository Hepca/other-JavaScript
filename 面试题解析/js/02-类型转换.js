const a = {
    valueOf() {
        return '1'
    },
    toString() {
        return false
    }
}
const b = {
    toString() {
        return true
    }
}
console.log(a + '1')
console.log(b + true)
console.log(a + b)
console.log(a - b)

/**
 * 注意:
 *      valueOf()会把数据类型转换成原始类型
 *      toString()会把数据类型转换为string类型
 * 
 * 不同场景不同优先级:
 *  正常情况下，优先调用toString()
 *  有运算符的情况下valueof()优先级高于toString()
 *  当调用valueOf()方法无法运算后还是会再调用toString()方法
 * 
 * 解释:
 *      第一个是11 是因为取值走valueof 然后进行字符串拼接
        第二个是对象计算会调用tostring，返回的是true+true隐式类型转换就是1+1 就是2
        第三个是valueof本就是1，然后他的那个toString也是true就是成了1+true，就是1true
        第四个是隐式把字符串转数字，就变成1-1就是0 了
 */