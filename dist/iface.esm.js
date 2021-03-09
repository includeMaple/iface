/*!
 * iface.js v1.0.6
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
 * undefined or null
 * @param {*} val value
 * @return {boolean}
 */
const isDef = function (val) {
  return !(val === undefined || val === null)
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
 * boolean
 * @param {*} val value
 * @return {boolean}
 */
const isBoolean = function (val) {
  return typeof(val) === 'boolean'
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
 * number
 * @param {*} val value
 * @return {boolean}
 */
const isNumber = function (val) {
  return typeof(val) === 'number'
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
 * array
 * @param {*} val value
 */
const isArray = function (val) {
  return Array.isArray(val)
};
/**
 * date
 * @param {*} val value
 */
const isDate = function (val) {
  return Object.prototype.toString.apply(val) === '[object Date]'
};
/**
 * date
 * @param {*} val value
 */
const isJSON = function (val) {
  try {
    val = typeof val === 'string' ? JSON.parse(val) : val;
    if (isArray(val) || isObject(val) && JSON.stringify(val)) return true
  } catch (error) {
    return false
  }
  return false
};
/**
 * iface
 * @param {*} val 
 */
const isIface = function (val) {
  if (!isDef(val)) return false
  if (!val.type) return false
  return val.type === 'Iface'
  // return val.constructor === Iface
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

/**
 * wash opt
 * {
  methods: [{}],
  props: [{}],
  name: ''
} to 
{
  methods: [],
  props: [],
  name: '',
  doc: {
    methods: [{}],
    props: [{}],
  }
}
 */
function washOpt(opt) {
  let doc = {
    methods: [],
    props: []
  };
  let temp = ['methods', 'props', 'name'];
  for (let key of temp) {
    if (opt && isArray(opt[key])) {
      opt[key] = opt[key].map((item, index, arr) => {
        if (isObject(item)) {
          doc[key].push(item);
        } else {
          doc[key].push({
            name: item
          });
        }
        return item.name || item
      });
    }
  }
  return {
    opt,
    doc
  }
}

class CreateConfig {
  constructor (opt) {
    this.opt = {
      newLine: '\n',
      lang: 'javascript',
      type: 'md'
    };
    opt && this.setOptions(opt);
    this.config = this[this.opt.type]();
  }
  setOptions (opt) {
    this.opt = Object.assign({}, this.opt, opt);
  }
  md () {
    return [
      {
        key: 'lev1',
        header: '# ',
        tail: this.opt.newLine
      },
      {
        key: 'lev2',
        header: '## ',
        tail: this.opt.newLine
      },
      {
        key: 'name',
        header: '### ',
        tail: this.opt.newLine
      },
      {
        key: 'params',
        header: '`@params ',
        tail: '`'+this.opt.newLine,
        isArray: true
      },
      {
        key: 'return',
        header: '`@return ',
        tail: '`'+this.opt.newLine,
        isArray: true
      },
      {
        key: 'description',
        header: '',
        tail: this.opt.newLine + this.opt.newLine
      },
      {
        key: 'example',
        header: '```' + this.opt.lang + this.opt.newLine,
        tail: this.opt.newLine + '```' + this.opt.newLine
      }
    ]
  }
}

let config = (new CreateConfig()).config;

// markdown 好后请重构代码
class Render {
  constructor (doc) {
    this.config = config;
    this.doc = doc;
    this.str = '';
  }
  setConfig (config) {
    this.config = config;
  }
  _toString (node) {
    let arr = Object.keys(node);
    let str = '';
    for (let con of this.config) {
      if (arr.indexOf(con.key) >= 0) {
        str = str + con.header + node[con.key] + con.tail;
      }
    }
    return str
  }
  render () {
    for (let key in this.doc) {
      // add name
      this.str += this.config[0].header + key + this.config[0].tail;
      for (let dockey of ['methods', 'props']) {
        // add methods and props
        this.str += this.config[1].header + dockey + this.config[1].tail;
        if (this.doc && this.doc[key] && this.doc[key][dockey]) {
          let itemTemp = this.doc[key][dockey];
          for (let ii of itemTemp) {
            // item
            if (isArray(ii)) {
              for (let iii of ii) {
                this.str += this._toString(iii);
              }
            } else if (isObject(ii)) {
              this.str += this._toString(ii);
            }
            // this.str += this.config[item.key].header + this.doc[key][dockey][item.key] + this.config[item.key].tail
          }
        }
      }
    }
    return this.str
  }
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
  this.type = 'Iface';
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
    addLog.add(INTANCE_WARNING, 'error');
  }
  if (!isDefString(opt.name)) {
    addLog.add('Interface expect name.', 'error');
  }
  // init
  let temp = washOpt(opt);
  // new Interface
  let inter = new forInterface(temp.opt);
  if (!isObject(Iface.all)) Iface.all = {};
  Iface.all[inter.name] = inter;
  if (!isObject(Iface.doc)) Iface.doc = {};
  Iface.doc[inter.name] = temp.doc;
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
      if (!isFunction(obj.constructor[item.split(' ')[1]])) {
      // if (!isFunction(obj[item.split(' ')[1]])) {
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
/**
 * check is interface
 * @param {*} obj 
 * @return {boolean}
 */
Iface.isIface = function(obj) {
  return isIface(obj)
};
Iface.render = function (doc, config) {
  let re = new Render(doc);
  if (config) re.setConfig(config);
  return re.render()
};

export { Iface, addLog, dispatch, getType, isArray, isBoolean, isDate, isDef, isDefString, isFunction, isIface, isJSON, isNumber, isObject, isUndefined, merge };
