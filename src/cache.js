'use strict'

/**
 * memory Cache
 */
export default function cache (key, value, type = 'momery') {
  if (!cache[type]) {
    cache[type] = {}
  }

  // get all cached data
  if (key === undefined) {
    return cache[type]
  }

  // remove all cached data
  if (key === null) {
    cache[type] = {}
    return
  }

  // get
  if (value === undefined) {
    return cache[type][key]
  } else {
  // set
    cache[type][key] = value
    return
  }
}
