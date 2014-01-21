var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var State = makeEnum(LifeQuoteRefData.STATE_CODES, 'abbreviation')

module.exports = State