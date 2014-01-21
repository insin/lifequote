/**
 * Creates a className string including some class names conditionally.
 * @param {string=} staticClassName class name(s) which should always be
 *   included.
 * @param {Object.<string, *>} conditionalClassNames an object mapping class
 *   names to a value which indicates if the class name should be included -
 *   class names will be included if their corresponding value is truthy.
 * @return {string}
 */
function classNames(staticClassName, conditionalClassNames) {
  var names = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    names.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      names.push(className)
    }
  }
  return names.join(' ')
}

module.exports = classNames