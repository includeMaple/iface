import {dispatch} from './index'
class AddLog {
  constructor () {
  }
  add (content, type='danger', platforms='console') {
    this.content = content
    this.type = type
    this.platforms = platforms
    this._dispatch()
  }
  _dispatch () {
    dispatch({
      header: this.platforms,
      tail: this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }, this)
  }
  setOptions (opt) {
    if (opt.type) this.type = opt.type
    if (opt.platforms) this.platforms = opt.platforms
  }
  consoleInfo() {
    console.log(this.content)
  }
  consoleDanger () {
    console.error(this.content)
  }
  consoleError () {
    throw new Error(this.content)
  }
}
let addLog = new AddLog()

export {
  addLog
}
