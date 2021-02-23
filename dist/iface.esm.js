/*!
 * iface.js v1.0.0
 * (c) 2021-2021 include maple
 * Released under the MIT License.
 */
class AddLog {
  constructor () {
  }
  add (content, type='danger', platforms='console') {
    this.content = content;
    this.type = type;
    this.platforms = platforms;
    this._dispatch();
  }
  _dispatch () {
    dispatch({
      header: this.platforms,
      tail: this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }, this);
  }
  setOptions (opt) {
    if (opt.type) this.type = opt.type;
    if (opt.platforms) this.platforms = opt.platforms;
  }
  consoleInfo() {
    console.log(this.content);
  }
  consoleDanger () {
    console.error(this.content);
  }
  consoleError () {
    throw new Error(this.content)
  }
}
let addLog = new AddLog();

/**
 * merge
 */
const merge = function () {
  let temp;
  switch (getType(arguments[0])) {
    case 'array':
      temp = [];
      for (let i=0; i<arguments.length; i++) {
        for (let j=0; j<arguments[i].length; j++) {
          if (temp.indexOf(arguments[i][j])<0) {
            temp.push(arguments[i][j]);
          }
        }
      }
      break;
    case 'object':
      temp = {};
      for (let i=0; i<arguments.length;i++) {
        Object.assign(temp, arguments[i]);
      }
      break;
  }
  return temp;
};

/**
 * string but not ''
 * @param {*} val 
 * @return {boolean}
 */
const isDefString = function (val) {
  return typeof(val) === 'string' && val.length > 0
};
/**
 * undefined
 * @param {*} val val
 */
const isUndefined = function (val) {
  return typeof(val) === 'undefined'
};
/**
 * function
 * @param {*} val value
 * @return {boolean}
 */
const isFunction = function (val) {
  return typeof(val) === 'function'
};

/**
 * object
 * @param {*} val value
 * @return {boolean}
 */
const isObject = function (val) {
  return Object.prototype.toString.apply(val) === '[object Object]'
};
/**
 * iface
 * @param {*} val 
 */
const isIface = function (val) {
  return val.constructor === Iface
};

/**
 * return val type
 * @param {*} val
 * @return {string} lower
 */
const getType = function (val, firstUpper=false) {
  let str = Object.prototype.toString.apply(val).slice(8, -1);
  if (!firstUpper) str = str.toLowerCase();
  return str
};

/**
 * function dispatch
 * @param {string|object} name function name, if object, {header:'h', name: 's'}, use "header + name" as function name
 * @param {*} that this
 * @param {array} params 
 */
function dispatch(name, that, params=[]) {
  // name is object
  if (isObject(name)) {
    let {
      header,
      tail
    } = name;
    let funName = header + tail;
    if (that && that[funName]) {
      funName = isFunction(that[funName]) ? header + tail: header + 'Else';
      if (isFunction(that[funName])) return that[funName](...params)
    }
    return false
  }
  // name is string
  if (that && that[name] && isFunction([name])) return that[name](...params)
  return false
}

const INTANCE_WARNING = `Interface cannot be invoked with 'new'. `;
/**
 * crate interface object
 * @param {object} opt {
 *    props: [],
 *    methods: [],
 *    name: {string}
 * }
 */
function forInterface(opt) {
  this.methods = opt.methods || [];
  this.props = opt.props || [];
  this.base = opt.base || [];
  this.name = opt.name;
}
/**
 * Interface
 * @param {*} opt 
 */
function Iface (opt) {
  if (this instanceof Iface) {
    addLog.add(INTANCE_WARNING, 'error');
  }
  if (!isDefString(opt.name)) {
    addLog.add('Interface expect name.', 'error');
  }
  let inter = new forInterface(opt);
  if (!isObject(Iface.all)) Iface.all = {};
  Iface.all[inter.name] = inter;
  inter.constructor = Iface;
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
  };
  for (let i=0; i<arguments.length; i++) {
    let obj = arguments[i];
    if (isIface(obj)) {
      tempOpt.base.push(obj);
    } else {
      tempOpt.name = obj.name || tempOpt.name;
    }
    tempOpt.props = merge(tempOpt.props, obj.props || []);
    tempOpt.methods = merge(tempOpt.methods, obj.methods || []);
  }
  return Iface(tempOpt)
};
/**
 * check interface
 * @param {*} obj: object
 * @param {*} iface interface
 * @return {boolean}
 */
Iface.ensure = function (obj, iface) {
  let {
    props,
    methods
  } = iface;

  if (!props) props = [];
  if (!methods) methods = [];
  for (let item of props) {
    if (item.indexOf('static ') === 0) {
      // static
      if (isUndefined(obj.constructor[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect prop ${item}`);
        return false
      }
    } else if (item.indexOf('class ') === 0){
      // class
      if (isUndefined(obj[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect prop ${item}`);
        return false
      }
    } else {
      // normal
      if (isUndefined(obj[item])){
        addLog.add(`interface ${iface.name} expect prop ${item}`);
        return false
      }
    }
  }
  for (let item of methods) {
    if (item.indexOf('static ') === 0) {
      // static
      if (!isFunction(obj.constructor[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`);
        return false
      }
    } else if (item.indexOf('class ') === 0) {
      // class
      if (!isFunction(obj[item.split(' ')[1]])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`);
        return false
      }
    } else {
      // normal
      if (!isFunction(obj[item])) {
        addLog.add(`interface ${iface.name} expect methods ${item}`);
        return false
      }
    }
  }
  return true
};

debugger
console.log('---');
var index = {
  Iface
};

export default index;
