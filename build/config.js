const version = process.env.VERSION || require('../package.json').version

const banner =
'/*!\n' +
' * iface.js v' + version + '\n' +
' * (c) 2021-' + new Date().getFullYear() + ' include maple\n' +
' * Released under the MIT License.\n' +
' */'

export const configs = {
  banner,
  entry: 'src/index.js',
  out: 'dist/iface',
  name: 'iface'
}
