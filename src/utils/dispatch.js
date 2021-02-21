import {isFunction, isObject} from './typeof'
/**
 * function dispatch
 * @param {string|object} name function name, if object, {header:'h', name: 's'}, use "header + name" as function name
 * @param {*} that this
 * @param {array} params 
 */
export function dispatch(name, that, params=[]) {
  // name is object
  if (isObject(name)) {
    let {
      header,
      tail
    } = name
    let funName = header + tail
    if (that && that[funName]) {
      funName = isFunction(that[funName]) ? header + tail: header + 'Else'
      if (isFunction(that[funName])) return that[funName](...params)
    }
    return false
  }
  // name is string
  if (that && that[name] && isFunction([name])) return that[name](...params)
  return false
}
