var TRIM_RE = /^\s+|\s+$/g

function trim(string) {
  return string.replace(TRIM_RE, '')
}

module.exports = trim