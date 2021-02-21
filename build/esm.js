import {configs} from './config'


export default {
  input: configs.entry,
  output: {
    file: configs.out + '.esm.js',
    format: 'esm',
    banner: configs.banner
  },
  plugins: [
  ]
}
