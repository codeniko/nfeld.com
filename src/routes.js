import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import tracker from 'simple-tracker'
import log from 'loglevel'

import Homepage from './components/Homepage'

function setupLogging() {
  tracker.push({
    endpoint: process.env.REACT_APP_API_HOSTNAME + process.env.REACT_APP_API_TRACK_PATH,
    sendCaughtExceptions: true,
    attachClientContext: true,
    devMode: process.env.NODE_ENV !== 'production',
  })
  tracker.logEvent('page_view')

  const originalFactory = log.methodFactory
  // methodName is actually logLevel? hmm
  log.methodFactory = function(methodName, logLevel, loggerName) {
    const defaultHandler = originalFactory(methodName, logLevel, loggerName)
    // send warn, error, and info logs to tracker
    if (methodName === 'warn' || methodName === 'error' || methodName === 'info') {
      return function() {
        // push all args into array and concat together as one message
        const messages = []
        for (let i = 0; i < arguments.length; i++) {
          const arg = arguments[i]
          messages.push(typeof arg === 'object' ? JSON.stringify(arg) : arg)
        }
        defaultHandler.apply(undefined, messages)
        tracker.logMessage(messages.join(' '), methodName)
      }
    } else {
      return defaultHandler
    }
  }

  log.setLevel(process.env.NODE_ENV === 'production' ? log.levels.INFO : log.levels.TRACE)
}

const Routes = (props) => (
  <Router>
    <div>
      {setupLogging()}
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Redirect to='/' />
      </Switch>
    </div>
  </Router>
)

export default Routes
