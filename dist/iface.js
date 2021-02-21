/*!
 * iface.js v1.0.0
 * (c) 2021-2021 include maple
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.array.concat.js'), require('core-js/modules/es.array.index-of.js'), require('core-js/modules/es.function.name.js'), require('core-js/modules/es.regexp.exec.js'), require('core-js/modules/es.string.split.js'), require('core-js/modules/es.array.slice.js'), require('core-js/modules/es.object.assign.js'), require('core-js/modules/es.array.is-array.js'), require('core-js/modules/es.date.to-string.js'), require('core-js/modules/es.object.to-string.js'), require('core-js/modules/es.regexp.to-string.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.concat.js', 'core-js/modules/es.array.index-of.js', 'core-js/modules/es.function.name.js', 'core-js/modules/es.regexp.exec.js', 'core-js/modules/es.string.split.js', 'core-js/modules/es.array.slice.js', 'core-js/modules/es.object.assign.js', 'core-js/modules/es.array.is-array.js', 'core-js/modules/es.date.to-string.js', 'core-js/modules/es.object.to-string.js', 'core-js/modules/es.regexp.to-string.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.dataTools = factory());
}(this, (function () { 'use strict';

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
   * string but not ''
   * @param {*} val 
   * @return {boolean}
   */

  var isDefString = function isDefString(val) {
    return typeof val === 'string' && val.length > 0;
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
   * object
   * @param {*} val value
   * @return {boolean}
   */

  var isObject = function isObject(val) {
    return Object.prototype.toString.apply(val) === '[object Object]';
  };
  /**
   * iface
   * @param {*} val 
   */

  var isIface = function isIface(val) {
    return val.constructor === Iface;
  };
  /**
   * return val type
   * @param {*} val
   * @return {string} lower
   */

  var getType = function getType(val) {
    var firstUpper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var str = Object.prototype.toString.apply(val).slice(8, -1).toLowerCase();

    if (firstUpper) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }

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
  }
  /**
   * Interface
   * @param {*} opt 
   */


  function Iface(opt) {
    if (this instanceof Iface) {
      addLog.add(INTANCE_WARNING, 'error');
    }

    if (!isDefString(opt.name)) {
      addLog.add('Interface expect name.', 'error');
    }

    var inter = new forInterface(opt);
    if (!isObject(Iface.all)) Iface.all = {};
    Iface.all[inter.name] = inter;
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
   * check interface
   * @param {*} obj: object
   * @param {*} iface interface
   * @return {boolean}
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
          if (!isFunction(obj[_item.split(' ')[1]])) {
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

  var index = {
    Iface: Iface
  };

  return index;

})));
