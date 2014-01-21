var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var Gender = makeEnum(LifeQuoteRefData.GENDER_CODES, 'title')

module.exports = Gender