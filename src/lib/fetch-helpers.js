export function checkStatus(response) {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText)
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
