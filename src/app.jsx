/** @jsx React.DOM */
var LifeQuote = require('LifeQuote')

var zipCodeMatch = /zipCode=(\d{5})/.exec(window.location.href)
var queryParamZipCode = (zipCodeMatch != null ? zipCodeMatch[1] : '')

React.renderComponent(<LifeQuote queryParamZipCode={queryParamZipCode}/>,
                      document.getElementById('lifequote'))
