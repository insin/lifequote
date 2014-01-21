var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var productOptions = refDataOptions.bind(null, LifeQuoteRefData.PRODUCT_CODES, 'name')

module.exports = productOptions