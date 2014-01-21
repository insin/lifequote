// Code -> Ref Data Lookups
function makeLookup(refData) {
  var lookup = {}
  refData.forEach(function(data) {
    lookup[data.code] = data
  })
  return lookup
}

module.exports = makeLookup