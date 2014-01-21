var extend = require('extend')

var FormMixin = {
  /**
   * Updates error tooltips on fields which have validation errors.
   */
  updateErrorTooltips: function(prevErrors, newErrors, tooltipOptions) {
    for (var fieldRef in prevErrors) {
      if (typeof newErrors[fieldRef] == 'undefined') {
        $(this.refs[fieldRef].getDOMNode()).tooltip('destroy')
      }
      else if (newErrors[fieldRef] != prevErrors[fieldRef]) {
        $(this.refs[fieldRef].getDOMNode())
          .tooltip('destroy')
          .tooltip(extend({}, tooltipOptions, {title: newErrors[fieldRef]}))
      }
    }
    for (var fieldRef in newErrors) {
      if (typeof prevErrors[fieldRef] == 'undefined') {
        $(this.refs[fieldRef].getDOMNode())
          .tooltip(extend({}, tooltipOptions, {title: newErrors[fieldRef]}))
      }
    }
  }
}

module.exports = FormMixin