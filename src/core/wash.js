import {isObject,isArray} from '../utils/index'
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
export function washOpt(opt) {
  let doc = {
    methods: [],
    props: []
  }
  let temp = ['methods', 'props', 'name']
  for (let key of temp) {
    if (opt && isArray(opt[key])) {
      opt[key] = opt[key].map((item, index, arr) => {
        if (isObject(item)) {
          doc[key].push(item)
        } else {
          doc[key].push({
            name: item
          })
        }
        return item.name || item
      })
    }
  }
  return {
    opt,
    doc
  }
}
