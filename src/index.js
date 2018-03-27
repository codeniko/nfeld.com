import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

// extensions to native types
const concat = (x, y) => x.concat(y)
const flatMap = (f, xs) => xs.map(f).reduce(concat, [])
// eslint-disable-next-line
Array.prototype.flatMap = function(f) {
  return flatMap(f, this)
}

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
)
registerServiceWorker()
