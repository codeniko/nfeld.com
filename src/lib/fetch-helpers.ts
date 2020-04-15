import uuidv4 from 'uuid/v4'

export type ResponseError = {
  response: Response;
  status: number;
} & Error

export function checkStatus(response: Response): Response {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.statusText) as ResponseError
    error.response = response
    error.status = response.status
    throw error
  }
}

export function parseJson(response: Response): Promise<object> {
  return response.json()
}

export function parseText(response: Response): Promise<string> {
  return response.text()
}

function createScript(url: string, id: string): HTMLScriptElement {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.id = id
  script.src = url

  return script
}

function removeScript(id: string): void {
  const script = document.getElementById(id)
  let parent = null
  if (script) {
    parent = script.parentNode
  }

  try {
    parent && parent.removeChild(script as Node)
  } catch (e) {
    // do nothing
  }
}

function appendScript(script: Node): void {
  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  }
}


export type LoadScriptResult = {
  ok: boolean;
}
export function loadScript(url: string, timeout = 5000): Promise<LoadScriptResult | Error> {
  return new Promise((resolve, reject) => {
    const scriptId = uuidv4()
    const script = createScript(url, scriptId)

    const timeoutId = setTimeout(() => {
      reject(new Error(`Script request to ${url} timed out`))

      removeScript(scriptId)
    }, timeout)

    const disableTimeout = (timeoutId: NodeJS.Timeout): void => clearTimeout(timeoutId)

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
