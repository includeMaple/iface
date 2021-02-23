// module.exports = {
//   presets: [
//       '@babel/preset-env', 
//       {
//         "modules": false,
//         "useBuiltIns": "usage",
//         "corejs": "3"
//       }
//   ],
//   "env": {
//     "debug": {
//       "sourceMaps": "inline",
//       "retainLines": true
//     }
//   }
// };

module.exports = {
  "presets": ["@babel/preset-env"],
  "env": {
    "debug": {
      "sourceMaps": "inline",
      "retainLines": true
    }
  }
}
