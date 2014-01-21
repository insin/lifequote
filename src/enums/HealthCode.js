var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var HealthCode = makeEnum(LifeQuoteRefData.HEALTH_CODES, 'title')

module.exports = HealthCode