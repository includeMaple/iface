import {Iface} from '../core/core'
/**
 * undefined or null
 * @param {*} val value
 * @return {boolean}
 */
export const isDef = function (val) {
  return !(val === undefined || val === null)
}

/**
 * string but not ''
 * @param {*} val 
 * @return {boolean}
 */
export const isDefString = function (val) {
  return typeof(val) === 'string' && val.length > 0
}

/**
 * boolean
 * @param {*} val value
 * @return {boolean}
 */
export const isBoolean = function (val) {
  return typeof(val) === 'boolean'
}
/**
 * undefined
 * @param {*} val val
 */
export const isUndefined = function (val) {
  return typeof(val) === 'undefined'
}
/**
 * function
 * @param {*} val value
 * @return {boolean}
 */
export const isFunction = function (val) {
  return typeof(val) === 'function'
}

/**
 * number
 * @param {*} val value
 * @return {boolean}
 */
export const isNumber = function (val) {
  return typeof(val) === 'number'
}

/**
 * object
 * @param {*} val value
 * @return {boolean}
 */
export const isObject = function (val) {
  return Object.prototype.toString.apply(val) === '[object Object]'
}

/**
 * array
 * @param {*} val value
 */
export const isArray = function (val) {
  return Array.isArray(val)
}
/**
 * date
 * @param {*} val value
 */
export const isDate = function (val) {
  return Object.prototype.toString.apply(val) === '[object Date]'
}
/**
 * date
 * @param {*} val value
 */
export const isJSON = function (val) {
  try {
    JSON.stringify(val)
    return true
  } catch (error) {
    return false
  }
}
/**
 * iface
 * @param {*} val 
 */
export const isIface = function (val) {
  return val.constructor === Iface
}

/**
 * return val type
 * @param {*} val
 * @return {string} lower
 */
export const getType = function (val, firstUpper=false) {
  let str = Object.prototype.toString.apply(val).slice(8, -1)
  if (!firstUpper) str = str.toLowerCase()
  return str
}
