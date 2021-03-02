export class CreateConfig {
  constructor (opt) {
    this.opt = {
      newLine: '\n',
      lang: 'javascript',
      type: 'md'
    }
    opt && this.setOptions(opt)
    this.config = this[this.opt.type]()
  }
  setOptions (opt) {
    this.opt = Object.assign({}, this.opt, opt)
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