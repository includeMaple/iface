import babel from 'rollup-plugin-babel';
import {configs} from './config'

export default {
  input: configs.entry,
  output: {
    name: configs.name,
    file: configs.out + '.js',
    format: 'umd',
    banner: configs.banner
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ]
}
