export function copy(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value))
}

export function range(start, end) {
  return Array.from({length: (end - start)}, (v, k) => k + start)
}

export function pick(obj, keys) {
  const ret = {}
  keys.forEach(key => {
    if (obj[key] !== undefined) ret[key] = obj[key]
  })
  return ret
}
