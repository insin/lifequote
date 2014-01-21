// Enums for direct access to codes by name (in CONSTANT_CAPS_STYLE)
function makeEnum(refData, nameProp) {
  var enum_ = {}
  refData.forEach(function(data) {
    enum_[data[nameProp].replace(/\s/g, '_').toUpperCase()] = data.code
  })
  return enum_
}

module.exports = makeEnum