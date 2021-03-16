let utils= require('../dist/iface.cjs.js')
let expect = require('chai').expect;
let {isDef, isDefString, isBoolean, isUndefined, isFunction, isNumber,
isObject, isArray, isJSON, isDate, getType, isString, isNull} = utils

describe('type test', function (){
  it('isDef', function (){
    expect(isDef(undefined)).to.be.false
    expect(isDef(null)).to.be.false
    expect(isDef('')).to.be.ok
    expect(isDef({})).to.be.ok
    expect(isDef([])).to.be.ok
  })
  it('isDefString', function () {
    expect(isDefString('')).to.be.false
    expect(isDefString(undefined)).to.be.false
    expect(isDefString(null)).to.be.false
    expect(isDefString(' ')).to.be.true
  })
  it('isString', function () {
    expect(isString('')).to.be.true
    expect(isString(undefined)).to.be.false
    expect(isString(null)).to.be.false
    expect(isString(' ')).to.be.true
  })
  it('isBoolean', function () {
    expect(isBoolean(true)).to.be.true
    expect(isBoolean(false)).to.be.true
    expect(isBoolean(undefined)).to.be.false
    expect(isBoolean(null)).to.be.false
    expect(isBoolean('')).to.be.false
  })
  it('isUndefined', function () {
    expect(isUndefined(undefined)).to.be.ok
    expect(isUndefined(false)).to.be.false
    expect(isUndefined(null)).to.be.false
    expect(isUndefined('')).to.be.false
  })
  it('isNull', function () {
    expect(isNull(null)).to.be.ok
    expect(isNull(false)).to.be.false 
    expect(isNull([])).to.be.false
    expect(isNull('')).to.be.false
    expect(isNull(undefined)).to.be.false
  })
  it('isFunction', function () {
    expect(isFunction(undefined)).to.be.false
    expect(isFunction(false)).to.be.false
    expect(isFunction(null)).to.be.false
    expect(isFunction('')).to.be.false
    expect(isFunction(function () {})).to.be.ok
  })
  it('isNumber', function () {
    expect(isNumber(undefined)).to.be.false
    expect(isNumber(null)).to.be.false
    expect(isNumber('')).to.be.false
    expect(isNumber('1')).to.be.false
    expect(isNumber(1)).to.be.true
  })
  it('isObject', function () {
    expect(isObject(undefined)).to.be.false
    expect(isObject(null)).to.be.false
    expect(isObject('')).to.be.false
    expect(isObject('1')).to.be.false
    expect(isObject({})).to.be.true
  })
  it('isArray', function () {
    expect(isArray(undefined)).to.be.false
    expect(isArray(null)).to.be.false
    expect(isArray('')).to.be.false
    expect(isArray('1')).to.be.false
    expect(isArray([])).to.be.true
  })
  it('isDate', function () {
    expect(isDate(undefined)).to.be.false
    expect(isDate(null)).to.be.false
    expect(isDate('')).to.be.false
    expect(isDate('1')).to.be.false
    expect(isDate(new Date())).to.be.true
  })
  it('isJSON', function () {
    expect(isJSON(undefined)).to.be.false
    expect(isJSON(null)).to.be.false
    expect(isJSON('')).to.be.false
    expect(isJSON('1')).to.be.false
    expect(isJSON([{}])).to.be.true
    expect(isJSON({})).to.be.true
  })
  it('getType', function () {
    expect(getType(undefined)).equal('undefined')
    expect(getType(null)).equal('null')
    expect(getType('')).equal('string')
    expect(getType('1')).equal('string')
    expect(getType(new Date())).equal('date')
  })
})
