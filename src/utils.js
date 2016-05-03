import path, {sep} from 'path'
import fs from 'fs'

/**
 * check object is string
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
const isString = obj => {
  return toString.call(obj) === '[object String]'
}

/**
 * get files in path
 * @param  {} dir    []
 * @param  {} prefix []
 * @return {}        []
*/
const getFiles = (dir, prefix, filter) => {
  dir = path.normalize(dir)
  if (!fs.existsSync(dir)) {
    return []
  }

  if (!isString(prefix)) {
    filter = prefix
    prefix = ''
  }

  if (filter === true) {
    filter = item => {
      return item[0] !== '.'
    }
  }
  prefix = prefix || ''
  let files = fs.readdirSync(dir)
  let result = []
  files.forEach(item => {
    let stat = fs.statSync(dir + sep + item)
    if (stat.isFile()) {
      if (!filter || filter(item)) {
        result.push(prefix + item)
      }
    } else if (stat.isDirectory()) {
      if (!filter || filter(item, true)) {
        let cFiles = getFiles(dir + sep + item, prefix + item + sep, filter);
        result = result.concat(cFiles)
      }
    }
  })
  return result
}

export default {
  isString,
  getFiles
}
