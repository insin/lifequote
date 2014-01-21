var isZip = function() {
  var ZIP_RE = /^\d{5}(?:-?\d{4})?$/
  return function isZip(value) {
    return ZIP_RE.test(value)
  }
}()

module.exports = isZip