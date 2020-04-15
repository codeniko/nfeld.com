import {loadScript, LoadScriptResult} from './fetch-helpers'
import { getCookie, setCookie, readFromStorage, writeToStorage } from './utils'
import uuidv4 from 'uuid/v4'
import querystring from 'querystring'
import log from 'loglevel'

const COOKIE_KEY = 'CID'
const { REACT_APP_GA_ID, REACT_APP_API_HOSTNAME, REACT_APP_API_GA_PATH } = process.env

function fetchAndLoadGtag(): Promise<LoadScriptResult | Error> {
  const endpoint = 'https://www.googletagmanager.com/gtag/js?id=' + REACT_APP_GA_ID
  return loadScript(endpoint)
}

function getCidFromGaCookie(): string {
  const gaCookie = getCookie('_ga')
  if (gaCookie) {
    const cookieSplit = gaCookie.split('.')
    if (cookieSplit && cookieSplit.length === 4) {
      return `${cookieSplit[2]}.${cookieSplit[3]}`
    }
  }
  return ''
}

// Use our API server to log pageview if client's browser is blocking google analytics
function logPageviewOnServerSide(): void {
  // prioritize _ga cookie if set by google analytics previously
  let cid = getCidFromGaCookie() || getCookie(COOKIE_KEY) || readFromStorage(COOKIE_KEY)
  log.debug('existing cid', cid)

  if (!cid) {
    cid = uuidv4()
    log.debug('generated new cid', cid)
  }

  const wasCookieSet = setCookie(COOKIE_KEY, cid) // set/update our cookie with latest expiry date
  const writtenToStorage = writeToStorage(COOKIE_KEY, cid) // store in local storage as a failsafe

  if (!wasCookieSet && !writtenToStorage) {
    log.info('Failed to set cookie and write to storage')
  } else if (!wasCookieSet) {
    log.info('Failed to set cookie')
  } else if (!writtenToStorage) {
    log.info('Failed to write to storage')
  }

  const params = {
    v: 1, // version
    t: 'pageview', // type of hit
    dl: window.location.href, // document url
    dr: document.referrer, // referrer
    ul: (navigator.language || '').toLowerCase(), // user language
    de: document.inputEncoding, // document encoding
    dt: document.title, // document title
    sr: `${window.screen.width}x${window.screen.height}`, // screen resolution
    cid, // client id
    tid: REACT_APP_GA_ID, // tracking id
  }
  Object.keys(params).forEach(key => {
    // @ts-ignore
    ( params[key] === undefined || (typeof params[key] === 'string' && params[key].length === 0) ) && delete params[key]
  }) // remove invalid key/value pairs

  fetch(`${REACT_APP_API_HOSTNAME}${REACT_APP_API_GA_PATH}?${querystring.stringify(params)}`)
    .then(function() {
      log.info('Successfully logged pageview through API')
    })
    .catch(function(ex) {
      log.error('Failed to log pageview through API', ex)
    })
}

// Check if GA is defined, if not, try to refetch gtag, and log pageview through server if request is blocked.
function refetchGtagOrLogThroughServer(): void {
  fetchAndLoadGtag()
    .then(function() {
      log.info('ga refetch success. ga loaded?', window.ga !== undefined) // dont do anything, pageview auto recorded
    })
    .catch(function(ex) {
      log.debug('failed to fetch/load gtag', ex)
      log.info('Logging pageview through API')
      logPageviewOnServerSide()
    })
}

export default {
  refetchGtagOrLogThroughServer,
}
