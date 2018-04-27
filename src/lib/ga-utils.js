import { loadScript } from './fetch-helpers'
import { getCookie, setCookie, readFromStorage, writeToStorage } from './utils'
import uuidv4 from 'uuid/v4'

const COOKIE_KEY = 'CID'
const { REACT_APP_GA_ID, REACT_APP_API_HOSTNAME, REACT_APP_API_GA_PATH } = process.env

function fetchAndLoadGtag() {
  const endpoint = 'https://www.googletagmanager.com/gtag/js?id=' + REACT_APP_GA_ID
  return loadScript(endpoint)
}

function getCidFromGaCookie() {
  const gaCookie = getCookie('_ga')
  if (gaCookie) {
    const cookieSplit = gaCookie.split('.')
    if (cookieSplit && cookieSplit.length === 4) {
      return `${cookieSplit[2]}.${cookieSplit[3]}`
    }
  }
}

// Use our API server to log pageview if client's browser is blocking google analytics
function logPageviewOnServerSide() {
  // prioritize _ga cookie if set by google analytics previously
  let cid = getCidFromGaCookie() || getCookie(COOKIE_KEY) || readFromStorage(COOKIE_KEY)
  console.debug('existing cid', cid)

  if (!cid) {
    cid = uuidv4()
    console.debug('generated new cid', cid)
  }

  const wasCookieSet = setCookie(COOKIE_KEY, cid) // set/update our cookie with latest expiry date
  const writtenToStorage = writeToStorage(COOKIE_KEY, cid) // store in local storage as a failsafe

  if (!wasCookieSet && !writtenToStorage) {
    console.info('Failed to set cookie and write to storage')
  } else if (!wasCookieSet) {
    console.info('Failed to set cookie')
  } else if (!writtenToStorage) {
    console.info('Failed to write to storage')
  }

  fetch(`${REACT_APP_API_HOSTNAME}${REACT_APP_API_GA_PATH}?v=1&tid=${REACT_APP_GA_ID}&cid=${cid}&t=pageview&dp=${window.location.pathname}&dh=${window.location.hostname || window.location.host}`)
    .then(function() {
      console.info('Successfully logged pageview through API')
    })
    .catch(function(ex) {
      console.error('Failed to log pageview through API', ex)
    })
}

// Check if GA is defined, if not, try to refetch gtag, and log pageview through server if request is blocked.
function refetchGtagOrLogThroughServer() {
  fetchAndLoadGtag()
    .then(function() {
      console.info('ga refetch success. ga loaded?', window.ga !== undefined) // dont do anything, pageview auto recorded
    })
    .catch(function(ex) {
      console.debug('failed to fetch/load gtag', ex)
      console.info('Logging pageview through API')
      logPageviewOnServerSide()
    })
}

export default {
  refetchGtagOrLogThroughServer,
}
