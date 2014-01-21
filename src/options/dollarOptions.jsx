/** @jsx React.DOM */
var formatDollars = require('formatDollars')

function dollarOptions(start, endInclusive, step) {
  var options = []
  for (var amount = start; amount <= endInclusive; amount += step) {
    options.push(<option value={amount}>{formatDollars(amount)}</option>)
  }
  return options
}

module.exports = dollarOptions