function fn(n ,o) {
    console.log(o)
    return {
        fn: function (m) {
            return fn(m, n)
        }
    }
}
const a = fn(0)
a.fn(1)
a.fn(2)
a.fn(3)

const b = fn(0).fn(1)
b.fn(2)
b.fn(3)
const c = fn(0).fn(1).fn(2).fn(3)