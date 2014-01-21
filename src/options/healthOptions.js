var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var healthOptions = refDataOptions.bind(null, LifeQuoteRefData.HEALTH_CODES, 'title')

module.exports = healthOptions