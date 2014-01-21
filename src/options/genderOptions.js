var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var genderOptions = refDataOptions.bind(null, LifeQuoteRefData.GENDER_CODES, 'title')

module.exports = genderOptions