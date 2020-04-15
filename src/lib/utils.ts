declare global {
  interface Window {
    Modernizr: any;
    ga: any;
  }
}

export function copy(value: object): object {
  return JSON.parse(JSON.stringify(value))
}

export function range(start: number, end: number): number[] {
  return Array.from({length: (end - start)}, (v, k) => k + start)
}

export function pick(obj: object, keys: string[]): object {
  const ret = {}
  keys.forEach(key => {
    // @ts-ignore
    if (obj[key] !== undefined) ret[key] = obj[key]
  })
  return ret
}

export function getCookie(key: string): string {
  if (window.Modernizr.cookies) {
    const cookie = document.cookie
    const i = cookie.indexOf(key)
    if (i >= 0) {
      let end = cookie.indexOf(';', i + 1)
      end = end < 0 ? cookie.length : end
      return cookie.slice(i + key.length + 1, end)
    }
  }
  return ''
}

export function setCookie(key: string, value: string | number, daysExpiry = 365, path = '/'): boolean {
  if (window.Modernizr.cookies) {
    const date = new Date()
    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (daysExpiry * 86400000)) //24 * 60 * 60 * 1000
    document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=${path}`
    return getCookie(key) !== undefined
  }
  return false
}

export function deleteCookie(key: string, path = '/'): void {
  if (window.Modernizr.cookies) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
  }
}

export function writeToStorage(key: string, value: string | number): boolean {
  if (window.Modernizr.localstorage) {
    localStorage.setItem(key, value.toString())
    return localStorage.getItem(key) === value
  }
  return false
}

export function readFromStorage(key: string): string | null {
  if (window.Modernizr.localstorage) {
    return localStorage.getItem(key)
  }
  return null
}

export function deleteFromStorage(key: string): void {
  window.Modernizr.localstorage && localStorage.removeItem(key)
}
