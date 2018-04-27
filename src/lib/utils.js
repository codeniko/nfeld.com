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

export function getCookie(key) {
  if (window.Modernizr.cookies) {
    const cookie = document.cookie
    const i = cookie.indexOf(key)
    if (i >= 0) {
      let end = cookie.indexOf(';', i + 1)
      end = end < 0 ? cookie.length : end
      return cookie.slice(i + key.length + 1, end)
    }
  }
}

export function setCookie(key, value, daysExpiry = 365, path = '/') {
  if (window.Modernizr.cookies) {
    const date = new Date()
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (daysExpiry * 86400000)) //24 * 60 * 60 * 1000
    document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=${path}`
    return getCookie(key) !== undefined
  }
  return false
}

export function deleteCookie(key, path = '/') {
  if (window.Modernizr.cookies) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
  }
}

export function writeToStorage(key, value) {
  if (window.Modernizr.localstorage) {
    localStorage.setItem(key, value)
    return localStorage.getItem(key) === value
  }
  return false
}

export function readFromStorage(key) {
  return window.Modernizr.localstorage && localStorage.getItem(key)
}

export function deleteFromStorage(key) {
  window.Modernizr.localstorage && localStorage.removeItem(key)
}
