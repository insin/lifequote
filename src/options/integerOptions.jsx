/** @jsx React.DOM */
function integerOptions(start, endInclusive) {
  var options = []
  for (var i = start; i <= endInclusive; i++) {
    options.push(<option value={i}>{i}</option>)
  }
  return options
}

module.exports = integerOptions