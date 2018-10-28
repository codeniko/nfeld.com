import uuidv4 from 'uuid/v4'

export function checkStatus(response) {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    error.status = response.status
    throw error
  }
}

export function parseJson(response) {
  return response.json()
}

export function parseText(response) {
  return response.text()
}

function createScript(url, id) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.id = id
  script.src = url

  return script
}

function removeScript(id) {
  const script = document.getElementById(id)
  const parent = script.parentNode

  try {
    parent && parent.removeChild(script)
  } catch (e) {
    // do nothing
  }
}

function appendScript(script) {
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)
}

export function loadScript(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const scriptId = uuidv4()
    const script = createScript(url, scriptId)

    const timeoutId = setTimeout(() => {
      reject(new Error(`Script request to ${url} timed out`))

      removeScript(scriptId)
    }, timeout)

    const disableTimeout = timeoutId => clearTimeout(timeoutId)

    script.addEventListener('load', function(e) {
      resolve({ok: true})

      disableTimeout(timeoutId)
      removeScript(scriptId)
    })

    script.addEventListener('error', function(e) {
      reject(new Error(`Script request to ${url} failed ${e}`))

      disableTimeout(timeoutId)
      removeScript(scriptId)
    })

    appendScript(script)
  })
}

