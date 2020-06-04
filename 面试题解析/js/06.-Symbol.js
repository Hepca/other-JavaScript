(function () {
    var root = this
    var generateName = (function () {
        var postfix = 0
        return function (descString) {
            postfix++
            return '@@' + descString + '_' + postfix
        }
    })
    var SymbolPolyfill = function Symbol(description) {
        // 实现特性：Symbol 函数前不能使用new命令
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is a not constructor')
        // 实现特性: 如果Symbol的参数是一个对象，就会调用该对象的toString，将其转为字符串，然后生成一个Symbol的值
        var descString = description === undefined ? undefined : String(description)
        var symbol = Object.create({
            toString: function () {
                return this._Name_
                // return 'Symbol('+ this._Description__+')'
            },
            valueOf: function () {
                return this
            }
        })

        Object.defineProperties(symbol, {
            '_Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            '_Name_': {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        })
        // 实现特性6: 因为调用方法，返回的是一个新对象，两个对象之间，只要引用不同，就不会相同
        return symbol
    }
    var forMap = {}
    Object.defineProperties(SymbolPolyfill, {
        'for': {
            value: function (description) {
                var descString = description === undefined ? undefined: String(description)
                return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString)
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        'keyFor': {
            value: function (symbol) {
                for (var key in forMap) {
                    if (forMap[key] === symbol) return key
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    })
    root.SymbolPolyfill = SymbolPolyfill
})()