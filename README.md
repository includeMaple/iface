<!-- # 基本功能
## 接口约束和接口检查
core

## 自动生成接口文档
将Iface.all通过config render：
1、render html string
2、集成静态资源服务器，直接生成接口文档html，并且打开界面 

代理是不是能做class的私有非私有

## 抽象类
-->

# what
js接口检查工具，为js定制一份约束契约


<!-- 前端接口文档自动生成工具，便于沟通维护 -->


iface是一个工具，可以作为单元测试的一部分，也可以作为开发文档的一部分，辅助开发，方便后期维护，信息传递


# when
如果你的项目使用传统Javascript类，或者ES6的class，可以使用iface


如果你只是经常使用某个对象，里面有一些属性和方法，但只能通过备注、文档、记忆等记录，长期苦于维护，也可以使用iface


<!-- 如果你想自动生成一份接口文档，可以选择iface -->


如果你使用TypeScript，可以使用TypeScript的interface，当然你仍然可以使用Iface

## 检查类的属性和方法

<!-- ## 检查对象的属性和方法
万物皆对象，你也可以检查对象的属性和方法，特别是单例模式。 -->

# how
## duck type
iface只关心类开放了哪些属性和方法，不关心这些属性和方法怎么实现，如下，定义了一个类Stack，iface不关心Stack没有length和max属性，只关心后续“期待”怎么被使用，所以可以检查length和max属性，而不是get length和set max方法
<!-- 后续类与类的传递也只通过这些开放的接口 -->
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
但显然这集中私有形式都存在问题
* 使用下划线开头作为私有变量，这只是一种约定，实际变量仍然可以在类外访问、修改
* 使用闭包，常用的有立即执行函数，虽然闭包确实能达到私有的效果，但一方面闭包影响性能，另一方面不便于阅读，这显然与private表示的方式大相径庭
* Symbol，我们只是利用了symbol的特性缺实际并不具有可读性，symbol可以作为私有变量也可以作为唯一key的生成方式，如果你在代码里看到这个，只能通过语境上下文判断symbol的用途，另外这个属性也并非真正私有，外部仍然可以访问到
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
注意：接口不能使用new关键字

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
if (stackInterface.constructor === Iface) return 'stackInterface is a interface'
```
