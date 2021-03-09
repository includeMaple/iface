/*!
 * iface.js v1.0.6
 * (c) 2021-2021 include maple
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.iface = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var AddLog = /*#__PURE__*/function () {
    function AddLog() {
      _classCallCheck(this, AddLog);
    }

    _createClass(AddLog, [{
      key: "add",
      value: function add(content) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';
        var platforms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'console';
        this.content = content;
        this.type = type;
        this.platforms = platforms;

        this._dispatch();
      }
    }, {
      key: "_dispatch",
      value: function _dispatch() {
        dispatch({
          header: this.platforms,
          tail: this.type.charAt(0).toUpperCase() + this.type.slice(1)
        }, this);
      }
    }, {
      key: "setOptions",
      value: function setOptions(opt) {
        if (opt.type) this.type = opt.type;
        if (opt.platforms) this.platforms = opt.platforms;
      }
    }, {
      key: "consoleInfo",
      value: function consoleInfo() {
        console.log(this.content);
      }
    }, {
      key: "consoleDanger",
      value: function consoleDanger() {
        console.error(this.content);
      }
    }, {
      key: "consoleError",
      value: function consoleError() {
        throw new Error(this.content);
      }
    }]);

    return AddLog;
  }();

  var addLog = new AddLog();

  /**
   * merge
   */

  var merge = function merge() {
    var temp;

    switch (getType(arguments[0])) {
      case 'array':
        temp = [];

        for (var i = 0; i < arguments.length; i++) {
          for (var j = 0; j < arguments[i].length; j++) {
            if (temp.indexOf(arguments[i][j]) < 0) {
              temp.push(arguments[i][j]);
            }
          }
        }

        break;

      case 'object':
        temp = {};

        for (var _i = 0; _i < arguments.length; _i++) {
          Object.assign(temp, arguments[_i]);
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
  var isDef = function isDef(val) {
    return !(val === undefined || val === null);
  };
  /**
   * string but not ''
   * @param {*} val 
   * @return {boolean}
   */

  var isDefString = function isDefString(val) {
    return typeof val === 'string' && val.length > 0;
  };
  /**
   * boolean
   * @param {*} val value
   * @return {boolean}
   */

  var isBoolean = function isBoolean(val) {
    return typeof val === 'boolean';
  };
  /**
   * undefined
   * @param {*} val val
   */

  var isUndefined = function isUndefined(val) {
    return typeof val === 'undefined';
  };
  /**
   * function
   * @param {*} val value
   * @return {boolean}
   */

  var isFunction = function isFunction(val) {
    return typeof val === 'function';
  };
  /**
   * number
   * @param {*} val value
   * @return {boolean}
   */

  var isNumber = function isNumber(val) {
    return typeof val === 'number';
  };
  /**
   * object
   * @param {*} val value
   * @return {boolean}
   */

  var isObject = function isObject(val) {
    return Object.prototype.toString.apply(val) === '[object Object]';
  };
  /**
   * array
   * @param {*} val value
   */

  var isArray = function isArray(val) {
    return Array.isArray(val);
  };
  /**
   * date
   * @param {*} val value
   */

  var isDate = function isDate(val) {
    return Object.prototype.toString.apply(val) === '[object Date]';
  };
  /**
   * date
   * @param {*} val value
   */

  var isJSON = function isJSON(val) {
    try {
      val = typeof val === 'string' ? JSON.parse(val) : val;
      if (isArray(val) || isObject(val) && JSON.stringify(val)) return true;
    } catch (error) {
      return false;
    }

    return false;
  };
  /**
   * iface
   * @param {*} val 
   */

  var isIface = function isIface(val) {
    if (!isDef(val)) return false;
    if (!val.type) return false;
    return val.type === 'Iface'; // return val.constructor === Iface
  };
  /**
   * return val type
   * @param {*} val
   * @return {string} lower
   */

  var getType = function getType(val) {
    var firstUpper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var str = Object.prototype.toString.apply(val).slice(8, -1);
    if (!firstUpper) str = str.toLowerCase();
    return str;
  };

  /**
   * function dispatch
   * @param {string|object} name function name, if object, {header:'h', name: 's'}, use "header + name" as function name
   * @param {*} that this
   * @param {array} params 
   */

  function dispatch(name, that) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    // name is object
    if (isObject(name)) {
      var header = name.header,
          tail = name.tail;
      var funName = header + tail;

      if (that && that[funName]) {
        funName = isFunction(that[funName]) ? header + tail : header + 'Else';
        if (isFunction(that[funName])) return that[funName].apply(that, _toConsumableArray(params));
      }

      return false;
    } // name is string


    if (that && that[name] && isFunction([name])) return that[name].apply(that, _toConsumableArray(params));
    return false;
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
    var doc = {
      methods: [],
      props: []
    };
    var temp = ['methods', 'props', 'name'];

    var _loop = function _loop() {
      var key = _temp[_i];

      if (opt && isArray(opt[key])) {
        opt[key] = opt[key].map(function (item, index, arr) {
          if (isObject(item)) {
            doc[key].push(item);
          } else {
            doc[key].push({
              name: item
            });
          }

          return item.name || item;
        });
      }
    };

    for (var _i = 0, _temp = temp; _i < _temp.length; _i++) {
      _loop();
    }

    return {
      opt: opt,
      doc: doc
    };
  }

  var CreateConfig = /*#__PURE__*/function () {
    function CreateConfig(opt) {
      _classCallCheck(this, CreateConfig);

      this.opt = {
        newLine: '\n',
        lang: 'javascript',
        type: 'md'
      };
      opt && this.setOptions(opt);
      this.config = this[this.opt.type]();
    }

    _createClass(CreateConfig, [{
      key: "setOptions",
      value: function setOptions(opt) {
        this.opt = Object.assign({}, this.opt, opt);
      }
    }, {
      key: "md",
      value: function md() {
        return [{
          key: 'lev1',
          header: '# ',
          tail: this.opt.newLine
        }, {
          key: 'lev2',
          header: '## ',
          tail: this.opt.newLine
        }, {
          key: 'name',
          header: '### ',
          tail: this.opt.newLine
        }, {
          key: 'params',
          header: '`@params ',
          tail: '`' + this.opt.newLine,
          isArray: true
        }, {
          key: 'return',
          header: '`@return ',
          tail: '`' + this.opt.newLine,
          isArray: true
        }, {
          key: 'description',
          header: '',
          tail: this.opt.newLine + this.opt.newLine
        }, {
          key: 'example',
          header: '```' + this.opt.lang + this.opt.newLine,
          tail: this.opt.newLine + '```' + this.opt.newLine
        }];
      }
    }]);

    return CreateConfig;
  }();

  var config = new CreateConfig().config; // markdown 好后请重构代码

  var Render = /*#__PURE__*/function () {
    function Render(doc) {
      _classCallCheck(this, Render);

      this.config = config;
      this.doc = doc;
      this.str = '';
    }

    _createClass(Render, [{
      key: "setConfig",
      value: function setConfig(config) {
        this.config = config;
      }
    }, {
      key: "_toString",
      value: function _toString(node) {
        var arr = Object.keys(node);
        var str = '';

        var _iterator = _createForOfIteratorHelper(this.config),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var con = _step.value;

            if (arr.indexOf(con.key) >= 0) {
              str = str + con.header + node[con.key] + con.tail;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return str;
      }
    }, {
      key: "render",
      value: function render() {
        for (var key in this.doc) {
          // add name
          this.str += this.config[0].header + key + this.config[0].tail;

          for (var _i = 0, _arr = ['methods', 'props']; _i < _arr.length; _i++) {
            var dockey = _arr[_i];
            // add methods and props
            this.str += this.config[1].header + dockey + this.config[1].tail;

            if (this.doc && this.doc[key] && this.doc[key][dockey]) {
              var itemTemp = this.doc[key][dockey];

              var _iterator2 = _createForOfIteratorHelper(itemTemp),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var ii = _step2.value;

                  // item
                  if (isArray(ii)) {
                    var _iterator3 = _createForOfIteratorHelper(ii),
                        _step3;

                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        var iii = _step3.value;
                        this.str += this._toString(iii);
                      }
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                  } else if (isObject(ii)) {
                    this.str += this._toString(ii);
                  } // this.str += this.config[item.key].header + this.doc[key][dockey][item.key] + this.config[item.key].tail

                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }

        return this.str;
      }
    }]);

    return Render;
  }();

  var INTANCE_WARNING = "Interface cannot be invoked with 'new'. ";
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


  function Iface(opt) {
    // check
    if (this instanceof Iface) {
      addLog.add(INTANCE_WARNING, 'error');
    }

    if (!isDefString(opt.name)) {
      addLog.add('Interface expect name.', 'error');
    } // init


    var temp = washOpt(opt); // new Interface

    var inter = new forInterface(temp.opt);
    if (!isObject(Iface.all)) Iface.all = {};
    Iface.all[inter.name] = inter;
    if (!isObject(Iface.doc)) Iface.doc = {};
    Iface.doc[inter.name] = temp.doc;
    inter.constructor = Iface;
    return inter;
  }
  /**
   * extend interface
   */


  Iface["extends"] = function () {
    var tempOpt = {
      props: [],
      methods: [],
      base: [],
      name: ''
    };

    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];

      if (isIface(obj)) {
        tempOpt.base.push(obj);
      } else {
        tempOpt.name = obj.name || tempOpt.name;
      }

      tempOpt.props = merge(tempOpt.props, obj.props || []);
      tempOpt.methods = merge(tempOpt.methods, obj.methods || []);
    }

    return Iface(tempOpt);
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
    var props = iface.props,
        methods = iface.methods;
    if (!props) props = [];
    if (!methods) methods = [];

    var _iterator = _createForOfIteratorHelper(props),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (item.indexOf('static ') === 0) {
          // static
          if (isUndefined(obj.constructor[item.split(' ')[1]])) {
            addLog.add("interface ".concat(iface.name, " expect prop ").concat(item));
            return false;
          }
        } else if (item.indexOf('class ') === 0) {
          // class
          if (isUndefined(obj[item.split(' ')[1]])) {
            addLog.add("interface ".concat(iface.name, " expect prop ").concat(item));
            return false;
          }
        } else {
          // normal
          if (isUndefined(obj[item])) {
            addLog.add("interface ".concat(iface.name, " expect prop ").concat(item));
            return false;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = _createForOfIteratorHelper(methods),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _item = _step2.value;

        if (_item.indexOf('static ') === 0) {
          // static
          if (!isFunction(obj.constructor[_item.split(' ')[1]])) {
            addLog.add("interface ".concat(iface.name, " expect methods ").concat(_item));
            return false;
          }
        } else if (_item.indexOf('class ') === 0) {
          // class
          if (!isFunction(obj.constructor[_item.split(' ')[1]])) {
            // if (!isFunction(obj[item.split(' ')[1]])) {
            addLog.add("interface ".concat(iface.name, " expect methods ").concat(_item));
            return false;
          }
        } else {
          // normal
          if (!isFunction(obj[_item])) {
            addLog.add("interface ".concat(iface.name, " expect methods ").concat(_item));
            return false;
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return true;
  };
  /**
   * check is interface
   * @param {*} obj 
   * @return {boolean}
   */


  Iface.isIface = function (obj) {
    return isIface(obj);
  };

  Iface.render = function (doc, config) {
    var re = new Render(doc);
    if (config) re.setConfig(config);
    return re.render();
  };

  exports.Iface = Iface;
  exports.addLog = addLog;
  exports.dispatch = dispatch;
  exports.getType = getType;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isDef = isDef;
  exports.isDefString = isDefString;
  exports.isFunction = isFunction;
  exports.isIface = isIface;
  exports.isJSON = isJSON;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isUndefined = isUndefined;
  exports.merge = merge;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
