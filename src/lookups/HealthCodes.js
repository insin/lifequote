var LifeQuoteRefData = require('LifeQuoteRefData')

var makeLookup = require('makeLookup')

var HealthCodes = makeLookup(LifeQuoteRefData.HEALTH_CODES)

module.exports = HealthCodes