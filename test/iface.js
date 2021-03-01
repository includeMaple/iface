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
  exFun () {}
}
let stackInterface = Iface({
  methods: ['pop', 'push', 'isEmpty', 'isFull'],
  props: ['length', 'top'],
  name: 'stackInterface'
})
let exStackInterface= Iface({
  methods: ['exFun'],
  props: ['length'],
  name: 'exStackInterface'
})
let exStackInterface2= Iface({
  methods: ['exFuns'],
  props: ['length'],
  name: 'exStackInterface'
})
describe('Stack interface test', function (){
  it('stackInterface', function (){
    expect(Iface.ensure(new Stack(), stackInterface)).to.be.ok
  })
  it('exStackInterface', function () {
    expect(Iface.ensure(new Stack(), exStackInterface)).to.be.ok
  })
  it('not exStackInterface', function () {
    expect(Iface.ensure(new Stack(), exStackInterface2)).to.be.false
  })
})

describe('static function and class function test', function (){
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
    name: 'ifaceTest'
  })
  it('stackInterface', function (){
    expect(Iface.ensure(te, ifaceTest)).to.be.ok
  })
})

describe('type test', function (){
  let ifaceTest = Iface({
    methods: ['static cc', 'class b', 'te'],
    props: ['a'],
    name: 'ifaceTest'
  })
  it('isIface', function (){
    expect(Iface.isIface(ifaceTest)).to.be.ok
  })
  it('isIface not', function () {
    expect(Iface.isIface({})).to.be.false
  })
  it('isIface not', function () {
    expect(Iface.isIface(null)).to.be.false
  })
  it('isIface not', function () {
    expect(Iface.isIface(undefined)).to.be.false
  })
})
