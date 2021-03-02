import {CreateConfig} from './config'
import {isObject, isArray} from '../utils/index'

let config = (new CreateConfig()).config

// markdown 好后请重构代码
export class Render {
  constructor (doc) {
    this.config = config
    this.doc = doc
    this.str = ''
  }
  setConfig (config) {
    this.config = config
  }
  _toString (node) {
    let arr = Object.keys(node)
    let str = ''
    for (let con of this.config) {
      if (arr.indexOf(con.key) >= 0) {
        str = str + con.header + node[con.key] + con.tail
      }
    }
    return str
  }
  render () {
    for (let key in this.doc) {
      // add name
      this.str += this.config[0].header + key + this.config[0].tail
      for (let dockey of ['methods', 'props']) {
        // add methods and props
        this.str += this.config[1].header + dockey + this.config[1].tail
        if (this.doc && this.doc[key] && this.doc[key][dockey]) {
          let itemTemp = this.doc[key][dockey]
          for (let ii of itemTemp) {
            // item
            if (isArray(ii)) {
              for (let iii of ii) {
                this.str += this._toString(iii)
              }
            } else if (isObject(ii)) {
              this.str += this._toString(ii)
            }
            // this.str += this.config[item.key].header + this.doc[key][dockey][item.key] + this.config[item.key].tail
          }
        }
      }
    }
    return this.str
  }
}