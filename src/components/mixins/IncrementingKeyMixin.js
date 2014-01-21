/**
 * Gives a component a key which is never the same in 2 subsequent instances.
 * A hack to force Bootstrap modals to re-initialise state when the same one is
 * displayed repeatedly.
 */
var IncrementingKeyMixin = function() {
  var keySeed = 1
  return {
    getDefaultProps: function() {
      return {
        key: keySeed++
      }
    }
  }
}()

module.exports = IncrementingKeyMixin