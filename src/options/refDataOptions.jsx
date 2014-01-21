/** @jsx React.DOM */
function refDataOptions(refData, optionProp) {
  return refData.map(function(datum) {
    return <option value={datum.code}>{datum[optionProp]}</option>
  })
}

module.exports = refDataOptions