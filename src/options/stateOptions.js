var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var stateOptions = refDataOptions.bind(null, LifeQuoteRefData.STATE_CODES, 'abbreviation')

module.exports = stateOptions