import {configs} from './config'


export default {
  input: configs.entry,
  output: {
    file: configs.out + '.cjs.js',
    format: 'cjs',
    banner: configs.banner
  }
}
