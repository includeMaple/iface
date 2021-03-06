import {
  isUndefined, isFunction, isIface, isDefString, isObject,
  addLog,
  merge
} from '../utils/index'

import {washOpt} from './wash'

import {Render} from '../render/render'


const INTANCE_WARNING = `Interface cannot be invoked with 'new'. `
/**
 * crate interface object
 * @param {object} opt {
 *    props: [],
 *    methods: [],
 *    name: {string}
 * }
 */
function forInterface(opt) {
  this.methods = opt.methods || []
  this.props = opt.props || []
  this.base = opt.base || []
  this.name = opt.name
  this.type = 'Iface'
}
/**
 * Interface
 * @param {*} opt methods props name
{methods: [string | Object],props: [],name: ''}
Object:{
  name: String,
  description: String,
  params: String or Array,[String],
  return: String,
  example: String
}
 */
function Iface (opt) {
  // check
  if (this instanceof Iface) {
    addLog.add(INTANCE_WARNING, 'error')
  }
  if (!isDefString(opt.name)) {
    addLog.add('Interface expect name.', 'error')
  }
  // init
  let temp = washOpt(opt)
  // new Interface
  let inter = new forInterface(temp.opt)
  if (!isObject(Iface.all)) Iface.all = {}
  Iface.all[inter.name] = inter
  if (!isObject(Iface.doc)) Iface.doc = {}
  Iface.doc[inter.name] = temp.doc
  inter.constructor = Iface
  return inter
}

/**
 * extend interface
 */
Iface.extends = function () {
  let tempOpt = {
    props: [],
    methods: [],
    base: [],
    name: ''
  }
  for (let i=0; i<arguments.length; i++) {
    let obj = arguments[i]
    if (isIface(obj)) {
      tempOpt.base.push(obj)
    } else {
      tempOpt.name = obj.name || tempOpt.name
    }
    tempOpt.props = merge(tempOpt.props, obj.props || [])
    tempOpt.methods = merge(tempOpt.methods, obj.methods || [])
  }
  return Iface(tempOpt)
}
/**
 * check inferface
 * @param {Object} opt {
 *    iface: [],
 *    obj: []
 * }
//  */
// Iface.ensureMul = function (opt) {
//   let {
//     iface,
//     obj
//   } = opt
//   if (!inter) inter = []
//   if (!obj) obj = []
//   for (let i=0; i<obj.length; i++) {
//     for (let j=0; i<inter.length; j++) {
//       if (!this.ensure(obj[i], inter[j])) return false
//     }
//   }
//   return true
// }
/**
 * check interface
 * @param {object} obj 
 * @param {Iface} iface 
 */
Iface.ensure = function (obj, iface) {
  let {
    props,
    methods
  } = iface

  if (!props) props = []
  if (!methods) methods = []
  for (let item of props) {
    if (item.indexOf('static ') === 0) {
      // static
      if (isUndefined(obj.constructor[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect prop ${item}`)
        return false
      }
    } else if (item.indexOf('class ') === 0){
      // class
      if (isUndefined(obj[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect prop ${item}`)
        return false
      }
    } else {
      // normal
      if (isUndefined(obj[item])){
        addLog.add(`interface ${iface.name} expect prop ${item}`)
        return false
      }
    }
  }
  for (let item of methods) {
    if (item.indexOf('static ') === 0) {
      // static
      if (!isFunction(obj.constructor[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`)
        return false
      }
    } else if (item.indexOf('class ') === 0) {
      // class
      if (!isFunction(obj.constructor[item.split(' ')[1]])) {
      // if (!isFunction(obj[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`)
        return false
      }
    } else {
      // normal
      if (!isFunction(obj[item])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`)
        return false
      }
    }
  }
  return true
}
/**
 * check is interface
 * @param {*} obj 
 * @return {boolean}
 */
Iface.isIface = function(obj) {
  return isIface(obj)
}
Iface.render = function (doc, config) {
  let re = new Render(doc)
  if (config) re.setConfig(config)
  return re.render()
}
export {
  Iface
}
