import {Iface} from '../src/index'
// import Iface from '../dist/iface.esm.js'
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
  methods: ['static cc', 'class b', 'te'],
  props: ['a'],
  name: 'stackInterface'
})
console.log(Iface.ensure(te, ifaceTest))
Iface.isIface(te)


