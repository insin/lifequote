require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/css/bootstrap-theme.min.css')
require('./style.css')

require('es6-promise').polyfill()
require('whatwg-fetch')

import React from 'react'
import {render} from 'react-dom'

import App from './App'

let zipCodeMatch = /zipCode=(\d{5})/.exec(window.location.href)
let zipCode = (zipCodeMatch != null ? zipCodeMatch[1] : '')

render(<App zipCode={zipCode}/>, document.querySelector('#app'))
