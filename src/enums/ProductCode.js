var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var ProductCode = makeEnum(LifeQuoteRefData.PRODUCT_CODES, 'name')

module.exports = ProductCode