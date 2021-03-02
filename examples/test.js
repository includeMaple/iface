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
class Stack {
  constructor() {
    this.length = 0
    this.top = 0
  }
  pop () {}
  push (val) {}
  isEmpty () {}
  isFull () {}
  exFun () {}
}
let iface = Iface({
  methods: [
    {
      name: 'pop',
      description: '获取栈顶元素',
      return: '栈顶元素',
      example: `
      let stack = new Stack()
      stack.pop()
    `},
    {
      name: 'push',
      description: '入栈',
      params: ['val: 入栈元素'],
      return: 'boolean',
      example: `
      let stack = new Stack()
      stack.push('data')
      `
    }
  ],
  props: [{
    name: 'length',
    description: '返回栈长度'
  }],
  name: 'stackInterface'
})
console.log(Iface.ensure(te, ifaceTest))
console.log(Iface.all)
console.log(Iface.doc)
console.log(Iface.render(Iface.doc))