var hasOwn = Object.prototype.hasOwnProperty

function extend(dest) {
  for (var i = 1, l = arguments.length; i < l; i++) {
    var src = arguments[i]
    if (!src || typeof src != 'object') continue
    for (var prop in src) {
      if (!hasOwn.call(src, prop)) continue
      dest[prop] = src[prop]
    }
  }
  return dest
}

module.exports = extend