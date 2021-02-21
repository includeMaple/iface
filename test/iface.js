let Ifaces= require('../dist/iface.cjs.js')
let expect = require('chai').expect;
let {Iface} = Ifaces

class Stack {
  constructor() {
    this.length = 0
    this.top = 0
  }
  pop () {}
  push () {}
  isEmpty () {}
  isFull () {}
}
let stackInterface = Iface({
  methods: ['pop', 'push', 'isEmpty', 'isFull'],
  props: ['length', 'top'],
  name: 'stackInterface'
})
describe('Stack interface test', function (){
  it('stackInterface', function (){
    expect(Iface.ensure(new Stack(), stackInterface)).to.be.ok
  })
  // it('exStackInterface', function () {
  //   expect(Iface.ensure(new ExStack(), exStackInterface)).to.be.ok
  // })
})

// describe('Json test', function () {
//   it ('json jsonInterface', function () {
//     expect(Iface.ensure(new Json, jsonInterface)).to.be.ok
//   })
//   it('json dealInterface', function (){
//     expect(Iface.ensure(new Json(),dealInterface)).to.be.ok
//   })
// })
