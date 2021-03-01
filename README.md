
[![Github Releases](https://img.shields.io/npm/l/iface.svg)](https://github.com/includeMaple/iface) 
[![Github Releases](https://img.shields.io/npm/v/iface.svg)](https://github.com/includeMaple/iface)
[![Github Releases](https://img.shields.io/npm/dm/iface.svg)](https://github.com/includeMaple/iface)
[![](https://travis-ci.org/includeMaple/iface.svg?branch=main)](https://travis-ci.org/includeMaple/iface)


<!--
功能：
1、接口约束与接口检查（基本功能）core（从datatool抽离出来，datatool快弄完！！重要，弄完要把之前xml、md、json的代码整理下）
2、自动生成接口文档从all到render（一期，2月底前完成！！！）
3、集成静态资源服务器，直接生成接口文档html，并且打开界面，静态资源服务器要重改（二期，静态资源服务器，项目结构重新调整，中文有bug，etag不知道怎么回事现在也还有bug，定位下！！！node http回头重新看下）
4、抽象类要不要做？？（再定）
5、代理是不是能做class的私有非私有??

注意：typescript注定成为主流，后续这个专注接口自动生成：
1、简单的生成html（一期）
2、把markdown生成html的代码重构下，确保通用性？？？（快速过一下编译原理）


应用：使用场景！！！
1、面向对象开发
2、自动生成接口文档（html or其他格式）
3、接口调试？？？？？python那个工具看下J！！！饼不要太大，deno注意下


markdown 拆解（尽量21年，不要过分纠结编译原理，可以重构代码的）：
1、接口interface
2、数据结构与算法js：把账号找回来重新去做题，C++做英文版，不要逃避！！
3、文本的解析：把现在的config拆开，做继承，以github md的为基础，图片和文件问题，先按照最简单的，做目录结构，一旦放在一个文件里，忍不住删
4、文本的渲染
5、静态资源服务器，与上述步骤不能耦合，必须能直接拆分
6、vscode看下，源码能看就看，e只是工具，工作不是这个就别研究，pc的功能5可以完全替代，想想an，后面方向应该是看下deno，注意进展，人生苦短，不要浪费


markdwon前提：
1、语法高亮源码看下
2、vue的diff再重新看下，函数为什么要拆成这样？？？
3、编译原理可以等后面重构
4、数据结构与算法注意开放的接口


打包工具不要过多研究，想想deno，这个后面注定要被淘汰
其实deno只要集成下界面？？是不是直接是个浏览器，直接是个clint？？


-->

# what
js接口检查工具，为js定制一份约束契约。


iface是一个工具，可以作为单元测试的一部分，也可以作为开发文档的一部分，辅助开发，方便后期维护，信息传递。


# why
面向接口而非实现编程，这意味着当两个类实现了同样的接口就可以相互替换，类变成了可替换的零部件。


我们只关心一个类的接口，而不关心他的实现，程序员可以自行发挥，只要最终提供了接口。


# when
如果你的项目使用传统Javascript类，或者ES6的class，可以使用iface


如果你只是经常使用某个对象，里面有一些属性和方法，但只能通过备注、文档、记忆等记录，长期苦于维护，也可以使用iface


如果你使用TypeScript，可以使用TypeScript的interface，当然你仍然可以使用Iface


# how
## duck type
iface只关心类开放了哪些属性和方法，不关心这些属性和方法怎么实现，如下，定义了一个类Stack，iface不关心Stack没有length和max属性，只关心后续“期待”怎么被使用，所以可以检查length和max属性，而不是get length和set max方法
```javascript
export class Stack {
  constructor (max) {
    this._data = []
    this._length = 0
    this._max = max
  }
  pop () {
  }
  push (val) {
  }
  isEmpty () {
  }
  isFull () {
  }
  get length () {
    return this._length
  }
  set length (val) {
    return
  }
  get max () {
    return this._max
  }
  set max (val) {
    return this._max
  }
}
```

## 私有变量
Javasript与其他语言相比，没有天然的public、private、protected，我们在使用私有变量通常有以下几个方式
* 约定使用下划线开头为私有变量/属性
* 使用闭包（立即执行函数）
* ES6可以使用Symbol
<<<<<<< HEAD
但显然这几种私有形式都存在问题
=======


但显然这几种私有形式都存在问题


>>>>>>> b3636d082b36c87ab4afdd54dbc531ee47797314
* 使用下划线开头作为私有变量，这只是一种约定，实际变量仍然可以在类外访问、修改
* 使用闭包，常用的有立即执行函数，虽然闭包确实能达到私有的效果，但一方面闭包影响性能，另一方面不便于阅读，这显然与private表示的方式大相径庭
* Symbol，我们只是利用了symbol的特性，实际并不具有可读性，symbol可以作为私有变量也可以作为唯一key的生成方式，如果你在代码里看到这个，只能通过语境上下文判断symbol的用途，另外这个属性也并非真正私有，外部仍然可以访问到

介于以上几点，Iface也没有使用public、private、protected关键字，我们推荐只关心最后这个类开放出来的接口，而不关心私有变量

# 使用
## 定义接口
```javascript
let stackInterface = Iface({
  methods: ['pop', 'push', 'isEmpty', 'isFull'],
  props: ['length', 'top'],
  name: 'stackInterface'
})
```
注意：接口不能使用new关键字，接口只能实现，不能被实例化


## 接口继承
```javascript
let exStackInterface = Iface.extends(stackInterface, {
  methods: ['clear', 'join'],
  name: 'exStackInterface'
})
```

## 静态方法与类方法
```javascript
let jsonInterface = Iface({
  methods: ['static stringify', 'static parse', 'toJson'],
  name: 'jsonInterface'
})
let iface = Iface({
  methods: ['class extends', 'class ensure'],
  props: ['class all'],
  name: 'iface'
})
```

## 接口检查
Iface.ensure(检查对象, 接口)，检查通过返回true
```javascript
Iface.ensure(new Stack(), stackInterface)
```
## 查看所有接口
```javascript
Iface.all
```
## 类型判断
```javascript
let stackInterface = Iface({
  methods: ['pop', 'push', 'isEmpty', 'isFull'],
  props: ['length', 'top'],
  name: 'stackInterface'
})
Iface.isIface(stackInterface)
if (stackInterface.constructor === Iface) return 'stackInterface is a interface'
```

## 接口与抽象类
如果你用过其他面向对象语言，应该已经看出这里接口的不同之处：没有实际实现，只是做了一次定义（定义后会将接口信息写入all），需要ensure手动检查


Iface虽然有构造函数，但不能用new，因为接口与抽象类都不能被实例化，不过抽象类可以达到代码的复用，基于这点，我们可以自己定义一个抽象类做接口工作，暂时忽略代码复用（python没有interface，但有抽象类）
