import Iface from '../src/index'
console.log(Iface)
console.log(Iface.constructor)
class Test{
  constructor () {
    this.a = 'a'
  }
  te () {}
  static cc() {}
}
Test.b = function () {}

let te = new Test()
let ifaceTest = Iface({
  methods: ['pop', 'push', 'isEmpty', 'isFull'],
  props: ['length', 'top'],
  name: 'stackInterface'
})
Iface.ensure(ifaceTest, te)
