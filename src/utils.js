import {BootstrapDevice} from './enums'

/**
 * Determines the active Bootstrap 3 device class based on device width or
 * current window width.
 * @return {BootstrapDevice}
 */
export function bsDevice() {
  let width = (window.innerWidth > 0 ? window.innerWidth : window.screen.width)
  if (width < 768) return BootstrapDevice.XS
  if (width < 992) return BootstrapDevice.SM
  if (width < 1200) return BootstrapDevice.MD
  return BootstrapDevice.LG
}

/**
 * From Underscore.js 1.5.2
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  return function() {
    context = this
    args = arguments
    timestamp = new Date()
    let later = () => {
      let last = (new Date()) - timestamp
      if (last < wait) {
        timeout = setTimeout(later, wait - last)
      }
      else {
        timeout = null
        if (!immediate) { result = func.apply(context, args) }
      }
    }
    let callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) { result = func.apply(context, args) }
    return result
  }
}

export function formatDollars(dollars) {
  return `$${dollars.toLocaleString()}`
}

const JSON_CONTENT_TYPE_CHECK = /application\/json/

/**
 * Create and throw an error with an error response.
 */
function errorResponse(response, message = '') {
  let error = new Error(`${response.statusText}${message && `: ${message}`}`)
  error.response = response
  throw error
}

/**
 * Throws an error if a window.fetch response has a non-2XX status code, using a
 * 'message' property from response JSON if present, otherwise using the
 * response status and text.
 * For successful responses, returns a JSON promise or the response itself based
 * on the content-type header.
 */
export function handleResponse(response) {
  let isJSON = JSON_CONTENT_TYPE_CHECK.test(response.headers.get('content-type'))
  if (response.ok) {
    return isJSON ? response.json() : response
  }
  if (isJSON) {
    return response.json().then(json => errorResponse(response, json.error))
  }
  else {
    return response.text().then(text => errorResponse(response, text))
  }
}

const ZIP_RE = /^\d{5}(?:-?\d{4})?$/

export function isZip(value) {
  return ZIP_RE.test(value)
}
