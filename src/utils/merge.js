import {getType} from '../utils/index'

/**
 * merge
 */
export const merge = function () {
  let temp
  switch (getType(arguments[0])) {
    case 'array':
      temp = []
      for (let i=0; i<arguments.length; i++) {
        for (let j=0; j<arguments[i].length; j++) {
          if (temp.indexOf(arguments[i][j])<0) {
            temp.push(arguments[i][j])
          }
        }
      }
      break;
    case 'object':
      temp = {}
      for (let i=0; i<arguments.length;i++) {
        Object.assign(temp, arguments[i])
      }
      break;
  }
  return temp;
}
