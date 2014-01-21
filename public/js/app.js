require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"BootstrapDevice":[function(require,module,exports){
module.exports=require('kEc4QK');
},{}],"kEc4QK":[function(require,module,exports){
/**
 * Bootstrap 3 device classes.
 * @enum {number}
 */
var BootstrapDevice = {
  XS: 0
, SM: 1
, MD: 2
, LG: 3
}

module.exports = BootstrapDevice
},{}],"eA1VlO":[function(require,module,exports){
/** @jsx React.DOM */
var handlerProps =
  ['handleShow', 'handleShown', 'handleHide', 'handleHidden']

var bsModalEvents = {
  handleShow: 'show.bs.modal'
, handleShown: 'shown.bs.modal'
, handleHide: 'hide.bs.modal'
, handleHidden: 'hidden.bs.modal'
}

var BootstrapModalMixin = {
  propTypes: {
    handleShow: React.PropTypes.func
  , handleShown: React.PropTypes.func
  , handleHide: React.PropTypes.func
  , handleHidden: React.PropTypes.func
  , backdrop: React.PropTypes.bool
  , keyboard: React.PropTypes.bool
  , show: React.PropTypes.bool
  , remote: React.PropTypes.string
  }

, getDefaultProps: function() {
    return {
      backdrop: true
    , keyboard: true
    , show: true
    , remote: ''
    }
  }

, componentDidMount: function() {
    var $modal = $(this.getDOMNode()).modal({
      backdrop: this.props.backdrop
    , keyboard: this.props.keyboard
    , show: this.props.show
    , remote: this.props.remote
    })
    handlerProps.forEach(function(prop) {
      if (this[prop]) {
        $modal.on(bsModalEvents[prop], this[prop])
      }
      if (this.props[prop]) {
        $modal.on(bsModalEvents[prop], this.props[prop])
      }
    }.bind(this))
  }

, componentWillUnmount: function() {
    var $modal = $(this.getDOMNode())
    handlerProps.forEach(function(prop) {
      if (this[prop]) {
        $modal.off(bsModalEvents[prop], this[prop])
      }
      if (this.props[prop]) {
        $modal.off(bsModalEvents[prop], this.props[prop])
      }
    }.bind(this))
  }

, hide: function() {
    $(this.getDOMNode()).modal('hide')
  }

, show: function() {
    $(this.getDOMNode()).modal('show')
  }

, toggle: function() {
    $(this.getDOMNode()).modal('toggle')
  }

, renderCloseButton: function() {
    return React.DOM.button(
      {type:"button",
      className:"close",
      onClick:this.hide,
      dangerouslySetInnerHTML:{__html: '&times'}}
    )
  }
}

module.exports = BootstrapModalMixin
},{}],"BootstrapModalMixin":[function(require,module,exports){
module.exports=require('eA1VlO');
},{}],"CallYouModal":[function(require,module,exports){
module.exports=require('QyOA6C');
},{}],"QyOA6C":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var ContactForm = require('ContactForm')
var GlobalModal = require('GlobalModal')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var CallYouModal = React.createClass({displayName: 'CallYouModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      sent: false
    }
  }

, render: function() {
    var content, footer
    if (!this.state.sent) {
      content = React.DOM.div(null, 
        React.DOM.p(null, React.DOM.strong(null, "Thank you for your interest in life insurance.")),
        React.DOM.p(null, "One of our experienced agents will be happy to talk to you about your life insurance needs. Simply tell us when you’d like to be contacted, and we’ll call you."),
        React.DOM.p(null, React.DOM.strong(null, "Please fill out the following fields")),
        ContactForm( {ref:"contactForm", email:false, errorDisplay:"tooltip",
          initialData:this.props.contactInfo}
        )
      )
      footer = React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleSubmit}, "Submit")
    }
    else {
      content = React.DOM.div(null, 
        React.DOM.p(null, "Thank you for contacting us. One of our agents will be in touch with you shortly.")
      )
      footer = React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.hide}, "Close")
    }
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "We’ll call you")
          ),
          React.DOM.div( {className:"modal-body"}, 
            content
         ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            footer
          )
        )
      )
    )
  }

, handleSubmit: function() {
    var data = this.refs.contactForm.getFormData()
    if (data !== null) {
      this.props.handleSend(data, function(err) {
        if (err) {
          this.props.handleSetNextGlobalModal(GlobalModal.SERVICE_UNAVAILABLE)
          return this.hide()
        }
        this.setState({sent: true})
      }.bind(this))
    }
  }
})

module.exports = CallYouModal
},{"BootstrapModalMixin":"eA1VlO","ContactForm":"5fSavl","GlobalModal":"OEJzib","IncrementingKeyMixin":"5bP6aZ"}],"5fSavl":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapDevice = require('BootstrapDevice')
var FormMixin = require('FormMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')

var bsDevice = require('bsDevice')
var $c = require('classNames')
var extend = require('extend')
var stateOptions = require('stateOptions')
var trim = require('trim')
var isZip = require('isZip')

var ContactForm = React.createClass({displayName: 'ContactForm',
  mixins: [FormMixin]

, propTypes: {
    email: React.PropTypes.bool
  , question: React.PropTypes.bool
  , errorDisplay: React.PropTypes.oneOf(['text', 'tooltip']).required
  , initialData: React.PropTypes.object
  }

, getDefaultProps: function() {
    return {
      email: true
    , question: false
    , initialData: {}
    }
  }

, getInitialState: function() {
    return {errors: {}}
  }

, componentWillUpdate: function(nextProps, nextState) {
    if (this.props.errorDisplay == 'tooltip') {
      this.updateErrorTooltips(this.state.errors, nextState.errors, {
        placement: bsDevice() >= BootstrapDevice.MD ? 'auto right' : 'bottom'
      , trigger: 'hover click'
      , animation: false
      , container: 'body'
      })
    }
  }

  /**
   * Given a field reference name, returns the reference name for display of
   * error message for that field.
   * @param {string} fieldRef
   */
, getErrorRef: function(fieldRef) {
    return fieldRef + '-error'
  }

, getFieldRefs: function() {
    var fieldRefs = ['firstName', 'lastName', 'phoneNmbr', 'address', 'city', 'stateCode', 'zipCode']
    if (this.props.email) fieldRefs.push('emailAddr')
    if (this.props.question) fieldRefs.push('question')
    return fieldRefs
  }

, getFormData: function() {
    var data = {}
      , errors = {}
    this.getFieldRefs().forEach(function(fieldRef) {
      data[fieldRef] = trim(this.refs[fieldRef].getDOMNode().value)
      if (!data[fieldRef]) {
        errors[fieldRef] = 'This field is required'
      }
    }.bind(this))
    if (!('phoneNmbr' in errors)) {
      if (/[^-\d]/.test(data.phoneNmbr)) {
        errors.phoneNmbr = 'Invalid characters in phone number'
      }
      else if (data.phoneNmbr.replace(/-/g, '').length < 10) {
        errors.phoneNmbr = 'Must contain at least 10 digits'
      }
    }
    if (!('zipCode' in errors) && !isZip(data.zipCode)) {
      errors.zipCode = 'Must be 5 digts or 5+4 digits'
    }
    if (this.props.email && !('emailAddr' in errors)  && !validator.isEmail(data.emailAddr)) {
      errors.emailAddr = 'Must be a valid email address'
    }
    this.setState({errors: errors})

    for (var error in errors) {
      return null
    }
    data.stateCode = Number(data.stateCode)
    data.currentCustomer = this.refs.currentCustomerYes.getDOMNode().checked ? 'Yes' : 'No'
    return data
  }

, getDefaultValue: function(fieldRef, initialDefaultData) {
    return (fieldRef in this.props.initialData
            ? this.props.initialData[fieldRef]
            : initialDefaultData)
  }

, render: function() {
    return React.DOM.div( {className:"form-horizontal"}, 
      this.textInput('firstName', 'First Name'),
      this.textInput('lastName', 'Last Name'),
      this.textInput('phoneNmbr', 'Phone number'),
      this.props.email && this.textInput('emailAddr', 'Email'),
      this.props.question && this.textarea('question', 'Question'),
      this.textInput('address', 'Address'),
      this.textInput('city', 'City'),
      this.select('stateCode', 'State', stateOptions),
      this.textInput('zipCode', 'Zip Code'),
      this.radioInlines('currentCustomer'
       , 'Are you currently a ' + LifeQuoteConstants.COMPANY + ' Customer?'
       , ['Yes', 'No']
       , {defaultValue: 'No'}
       )
    )
  }

, textInput: function(id, label, kwargs) {
    kwargs = extend({defaultValue: ''}, kwargs)
    var input =
      React.DOM.input( {type:"text", className:"form-control", id:id, ref:id,
        defaultValue:this.getDefaultValue(id, kwargs.defaultValue)}
      )
    return this.formField(id, label, input, kwargs)
  }

, textarea: function(id, label, kwargs) {
    kwargs = extend({defaultValue: ''}, kwargs)
    var textarea =
      React.DOM.textarea( {className:"form-control", id:id, ref:id,
        defaultValue:this.getDefaultValue(id, kwargs.defaultValue)}
      )
    return this.formField(id, label, textarea)
  }

, select: function(id, label, values, kwargs) {
    kwargs = extend({defaultValue: values[0]}, kwargs)
    var options
    if (typeof values == 'function') {
      options = values()
    }
    else {
      options = values.map(function(value) {
        return React.DOM.option( {value:value}, value)
      })
    }
    var select =
      React.DOM.select( {className:"form-control", id:id, ref:id,
        defaultValue:this.getDefaultValue(id, kwargs.defaultValue)}
      , 
        options
      )
    return this.formField(id, label, select, kwargs)
  }

, radioInlines: function(id, label, values, kwargs) {
    kwargs = extend({defaultValue: values[0]}, kwargs)
    var defaultValue = this.getDefaultValue(id, kwargs.defaultValue)
    var radios = values.map(function(value) {
      return React.DOM.label( {className:"radio-inline"}, 
        React.DOM.input( {type:"radio", ref:id + value, name:id, value:value,
          defaultChecked:value === defaultValue}
        ),
        value
      )
    })
    return this.formField(id, label, radios, kwargs)
  }

, formField: function(id, label, field, kwargs) {
    var fieldColClass = 'col-sm-6'
      , hasError = (id in this.state.errors)
      , errorDisplay
    if (this.props.errorDisplay == 'text') {
      fieldColClass = 'col-sm-4'
      errorDisplay = React.DOM.div( {className:"col-sm-4 help-text"}, 
        React.DOM.p( {className:"form-control-static"}, 
          hasError && this.state.errors[id]
        )
      )
    }
    return React.DOM.div( {className:$c('form-group', {'has-error': hasError})}, 
      React.DOM.label( {htmlFor:id, className:"col-sm-4 control-label"}, label),
      React.DOM.div( {className:fieldColClass}, 
        field
      ),
      errorDisplay
    )
  }
})

module.exports = ContactForm
},{"BootstrapDevice":"kEc4QK","FormMixin":"4yKS9i","LifeQuoteConstants":"azwgh7","bsDevice":"+EgEH7","classNames":"/ujzRj","extend":"7t16SC","isZip":"LWSQNP","stateOptions":"JYeLZl","trim":"aYnlO3"}],"ContactForm":[function(require,module,exports){
module.exports=require('5fSavl');
},{}],"LeLoe6":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var ContactForm = require('ContactForm')
var GlobalModal = require('GlobalModal')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var EmailUsModal = React.createClass({displayName: 'EmailUsModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      sent: false
    }
  }

, render: function() {
    var content, footer
    if (!this.state.sent) {
      content = React.DOM.div(null, 
        React.DOM.p(null, React.DOM.strong(null, "Thank you for your interest in life insurance.")),
        React.DOM.p(null, "One of our experienced agents will be happy to answer all your questions. Enter your name, email, and the question you’d like to ask, and an agent will respond within 24 hours."),
        React.DOM.p(null, React.DOM.strong(null, "Please fill out the following fields")),
        ContactForm( {ref:"contactForm", question:true, errorDisplay:"tooltip",
          initialData:this.props.contactInfo}
        )
      )
      footer = React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleSubmit}, "Submit")
    }
    else {
      content = React.DOM.div(null, 
        React.DOM.p(null, "Thank you for contacting us. One of our agents will be in touch with you shortly.")
      )
      footer = React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.hide}, "Close")
    }
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Email us")
          ),
          React.DOM.div( {className:"modal-body"}, 
            content
         ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            footer
          )
        )
      )
    )
  }

, handleSubmit: function() {
    var data = this.refs.contactForm.getFormData()
    if (data !== null) {
      this.props.handleSend(data, function(err) {
        if (err) {
          this.props.handleSetNextGlobalModal(GlobalModal.SERVICE_UNAVAILABLE)
          return this.hide()
        }
        this.setState({sent: true})
      }.bind(this))
    }
  }
})

module.exports = EmailUsModal
},{"BootstrapModalMixin":"eA1VlO","ContactForm":"5fSavl","GlobalModal":"OEJzib","IncrementingKeyMixin":"5bP6aZ"}],"EmailUsModal":[function(require,module,exports){
module.exports=require('LeLoe6');
},{}],"FormMixin":[function(require,module,exports){
module.exports=require('4yKS9i');
},{}],"4yKS9i":[function(require,module,exports){
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
},{"extend":"7t16SC"}],"GWU2ps":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var Gender = makeEnum(LifeQuoteRefData.GENDER_CODES, 'title')

module.exports = Gender
},{"LifeQuoteRefData":"EW9yYw","makeEnum":"rpALGJ"}],"Gender":[function(require,module,exports){
module.exports=require('GWU2ps');
},{}],"u6nxnG":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeLookup = require('makeLookup')

var Genders = makeLookup(LifeQuoteRefData.GENDER_CODES)

module.exports = Genders
},{"LifeQuoteRefData":"EW9yYw","makeLookup":"n2iJBF"}],"Genders":[function(require,module,exports){
module.exports=require('u6nxnG');
},{}],"6xU4O1":[function(require,module,exports){
/** @jsx React.DOM */
var Gender = require('Gender')
var GeneralInfoModal = require('GeneralInfoModal')
var HealthCode = require('HealthCode')
var HealthCodeModal = require('HealthCodeModal')
var LifeQuoteConstants = require('LifeQuoteConstants')
var NeedsCalculatorModal = require('NeedsCalculatorModal')
var PermanentInsuranceModal = require('PermanentInsuranceModal')
var PolicyAdvisorModal = require('PolicyAdvisorModal')
var ProductCode = require('ProductCode')
var State = require('State')

var $c = require('classNames')
var debounce = require('debounce')
var dollarOptions = require('dollarOptions')
var genderOptions = require('genderOptions')
var healthOptions = require('healthOptions')
var integerOptions = require('integerOptions')
var isZip = require('isZip')
var productOptions = require('productOptions')
var stateOptions = require('stateOptions')

var GeneralInfo = React.createClass({displayName: 'GeneralInfo',
  getInitialState: function() {
    return {
      errors: {}
    , modal: null
    }
  }

, defaults: {
    gender: Gender.MALE
  , age: 35
  , stateCode: State.AL
  , coverage: 250000
  , productCode: ProductCode.TERM
  , healthCode: HealthCode.EXCELLENT
  }

, setActiveModal: function(modal, e) {
    if (e) e.preventDefault()
    this.setState({modal: modal})
  }

, render: function() {
    var modal
    if (this.state.modal === GeneralInfoModal.NEEDS_CALCULATOR)
        modal = NeedsCalculatorModal(
                  {handleAccept:this.handleAcceptCoverage,
                  handleHidden:this.handleModalHidden}
                )
    else if (this.state.modal === GeneralInfoModal.POLICY_ADVISOR)
        modal = PolicyAdvisorModal(
                  {handleSelectProductCode:this.handleSelectProductCode,
                  handleHidden:this.handleModalHidden}
                )
    else if (this.state.modal === GeneralInfoModal.HEALTH_CODE)
        modal = HealthCodeModal(
                  {handleAccept:this.handleAcceptHealthCode,
                  handleHidden:this.handleModalHidden}
                )
    else if (this.state.modal === GeneralInfoModal.PERMANENT_INSURANCE)
        modal = PermanentInsuranceModal(
                  {handleShowGlobalModal:this.handleShowGlobalModal,
                  handleHidden:this.handleModalHidden}
                )

    return React.DOM.div(null, React.DOM.form( {className:"form-horizontal", role:"form"}, 
      React.DOM.div( {className:"panel-body"}, 
        React.DOM.p(null, React.DOM.strong(null, "Simply enter your information for a no-obligation quote.")),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"gender", className:"col-sm-4 control-label"}, "Gender"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"gender", id:"gender", defaultValue:this.props.initialData.gender || this.defaults.gender}, 
              genderOptions()
            )
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"age", className:"col-sm-4 control-label"}, "Age"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"age", id:"age", defaultValue:this.props.initialData.age || this.defaults.age}, 
              integerOptions(25, 70)
            )
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"stateCode", className:"col-sm-4 control-label"}, "State"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"stateCode", id:"stateCode", defaultValue:this.props.initialData.stateCode || this.defaults.stateCode}, 
              stateOptions()
            )
          )
        ),
        React.DOM.div( {className:$c('form-group', {'has-error': 'zipCode' in this.state.errors})}, 
          React.DOM.label( {htmlFor:"zipCode", className:"col-sm-4 control-label"}, "Zip Code"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.input( {className:"form-control", ref:"zipCode", type:"text", id:"zipCode",
              defaultValue:this.props.initialData.zipCode,
              onChange:debounce(this.handleZipChange, 250)}
            )
          ),
          React.DOM.div( {className:"col-sm-4 help-text"}, 
            React.DOM.p( {className:"form-control-static"}, 
              'zipCode' in this.state.errors && this.state.errors.zipCode
            )
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {className:"col-sm-4 control-label"}, "Do you use tobacco products?"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.label( {className:"radio-inline"}, React.DOM.input( {ref:"tobaccoYes", type:"radio", name:"tobacco", defaultChecked:'tobacco' in this.props.initialData && this.props.initialData.tobacco}), " Yes"),
            React.DOM.label( {className:"radio-inline"}, React.DOM.input( {ref:"tobaccoNo", type:"radio", name:"tobacco", defaultChecked:'tobacco' in this.props.initialData ? !this.props.initialData.tobacco : true}), " No")
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"coverage", className:"col-sm-4 control-label"}, "Amount of coverage"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"coverage", id:"coverage", defaultValue:this.props.initialData.coverage || this.defaults.coverage}, 
              dollarOptions(100000, 950000, 50000).concat(dollarOptions(1000000, 3000000, 500000))
            )
          ),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.p( {className:"form-control-static"}, 
              React.DOM.a( {href:"#needscalculator", onClick:this.setActiveModal.bind(null, GeneralInfoModal.NEEDS_CALCULATOR)}, "How much do you need?")
            )
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"productCode", className:"col-sm-4 control-label"}, "Type of coverage"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"productCode", id:"productCode", defaultValue:this.props.initialData.productCode || this.defaults.productCode}, 
              productOptions()
            )
          ),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.p( {className:"form-control-static"}, 
              React.DOM.a( {href:"#policyadvisor", onClick:this.setActiveModal.bind(null, GeneralInfoModal.POLICY_ADVISOR)}, "What kind should you buy?")
            )
          )
        ),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.label( {htmlFor:"healthCode", className:"col-sm-4 control-label"}, "Health category"),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.select( {className:"form-control", ref:"healthCode", id:"healthCode", defaultValue:this.props.initialData.healthCode || this.defaults.healthCode}, 
              healthOptions()
            )
          ),
          React.DOM.div( {className:"col-sm-4"}, 
            React.DOM.p( {className:"form-control-static"}, 
              React.DOM.a( {href:"#healthCode", onClick:this.setActiveModal.bind(null, GeneralInfoModal.HEALTH_CODE)}, "What’s your category?")
            )
          )
        ),
        React.DOM.p(null, React.DOM.strong(null, "Privacy Policy")),
        React.DOM.p(null, "Please read our ", React.DOM.a( {href:LifeQuoteConstants.PRIVACY_POLICY_URL, target:"_blank"}, "privacy policy ", React.DOM.span( {className:"glyphicon glyphicon-share"})), " which explains how we use and protect your personal information."),
        React.DOM.div( {className:"form-group"}, 
          React.DOM.div( {className:"col-sm-8 col-sm-offset-4"}, 
            React.DOM.div( {className:"checkbox"}, 
              React.DOM.label(null, React.DOM.input( {ref:"reviewed", type:"checkbox", defaultChecked:'reviewed' in this.props.initialData && this.props.initialData.reviewed}), " I have reviewed the privacy policy and want to continue")
            )
          )
        ),
        React.DOM.p(null, React.DOM.strong(null, "Thanks for helping us provide you with a more accurate quote."))
      ),
      React.DOM.div( {className:"panel-footer"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-sm-12"}, 
            React.DOM.button( {type:"button", className:"btn btn-default pull-left", disabled:this.props.loading, onClick:this.handleReset}, "Reset"),
            React.DOM.button( {type:"button", className:"btn btn-primary pull-right", disabled:this.props.loading, onClick:this.handleGetQuote}, "Get Quote")
          )
        )
      )
    ),
    modal
    )
  }

, handleZipChange: function() {
    var zipCode = this.refs.zipCode.getDOMNode().value
    if (!zipCode) {
      this.setState({errors: {zipCode: 'A Zip code is required'}})
      return false
    }
    else if (!isZip(zipCode)) {
      this.setState({errors: {zipCode: 'Zip code must be 5 digts or 5+4 digits'}})
      return false
    }
    else {
      this.setState({errors: {}})
      return true
    }
  }

, handleAcceptCoverage: function(coverage) {
    this.refs.coverage.getDOMNode().value =
        Math.min(Math.max(coverage, 100000), 3000000)
  }


, handleSelectProductCode: function(productCode) {
    if (productCode) {
      this.refs.productCode.getDOMNode().value = productCode
    }
  }

, handleAcceptHealthCode: function(healthCode) {
    this.refs.healthCode.getDOMNode().value = healthCode
  }

, handleShowGlobalModal: function(globalModal) {
    this.props.handleShowGlobalModal(globalModal)
  }

, handleModalHidden: function() {
    this.setState({modal: null})
  }

, handleReset: function() {
    ;['gender', 'age', 'stateCode', 'coverage','productCode', 'healthCode']
    .forEach(function(ref) {
      this.refs[ref].getDOMNode().value = this.defaults[ref]
    }.bind(this))
    this.refs.zipCode.getDOMNode().value = this.props.queryParamZipCode
    this.refs.tobaccoNo.getDOMNode().checked = true
    this.refs.reviewed.getDOMNode().checked = false
    this.setState({
      errors: {}
    })
  }

, handleGetQuote: function() {
    if (this.refs.productCode.getDOMNode().value == ProductCode.PERMANENT) {
      return this.setActiveModal(GeneralInfoModal.PERMANENT_INSURANCE)
    }
    if (!this.handleZipChange()) return
    if (!this.refs.reviewed.getDOMNode().checked) {
      return alert('You must indicate that you have read our privacy policy before proceeding.')
    }
    this.props.handleGetQuote({
      gender: this.refs.gender.getDOMNode().value
    , age: Number(this.refs.age.getDOMNode().value)
    , stateCode: Number(this.refs.stateCode.getDOMNode().value)
    , zipCode: this.refs.zipCode.getDOMNode().value
    , tobacco: this.refs.tobaccoYes.getDOMNode().checked
    , coverage: Number(this.refs.coverage.getDOMNode().value)
    , productCode: Number(this.refs.productCode.getDOMNode().value)
    , healthCode: Number(this.refs.healthCode.getDOMNode().value)
    , reviewed: this.refs.reviewed.getDOMNode().checked
    })
  }
})

module.exports = GeneralInfo
},{"Gender":"GWU2ps","GeneralInfoModal":"bKFzYX","HealthCode":"uDmr2N","HealthCodeModal":"xLOxD3","LifeQuoteConstants":"azwgh7","NeedsCalculatorModal":"YqLxNS","PermanentInsuranceModal":"sK3ilI","PolicyAdvisorModal":"cDtRTm","ProductCode":"YPQRNA","State":"JptrYI","classNames":"/ujzRj","debounce":"dIngGn","dollarOptions":"z30rCL","genderOptions":"uYZj4l","healthOptions":"f6839E","integerOptions":"hVA4Ia","isZip":"LWSQNP","productOptions":"dNQISB","stateOptions":"JYeLZl"}],"GeneralInfo":[function(require,module,exports){
module.exports=require('6xU4O1');
},{}],"bKFzYX":[function(require,module,exports){
var GeneralInfoModal = {
  NEEDS_CALCULATOR: 1
, POLICY_ADVISOR: 2
, HEALTH_CODE: 3
, PERMANENT_INSURANCE: 4
}

module.exports = GeneralInfoModal
},{}],"GeneralInfoModal":[function(require,module,exports){
module.exports=require('bKFzYX');
},{}],"GlobalModal":[function(require,module,exports){
module.exports=require('OEJzib');
},{}],"OEJzib":[function(require,module,exports){
var GlobalModal = {
  WE_CALL_YOU: 1
, EMAIL_US: 2
, Q_AND_A: 3
, SERVICE_UNAVAILABLE: 4
}

module.exports = GlobalModal
},{}],"HealthCode":[function(require,module,exports){
module.exports=require('uDmr2N');
},{}],"uDmr2N":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var HealthCode = makeEnum(LifeQuoteRefData.HEALTH_CODES, 'title')

module.exports = HealthCode
},{"LifeQuoteRefData":"EW9yYw","makeEnum":"rpALGJ"}],"xLOxD3":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var HealthCodes = require('HealthCodes')
var HealthCode = require('HealthCode')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')
var RadioSelect = require('RadioSelect')

var integerOptions = require('integerOptions')

var HealthCodeModal = React.createClass({displayName: 'HealthCodeModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      suggestedHealthCode: null
    , data: {}
    , errors: {}
    }
  }

, handleReset: function() {
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 11].forEach(function(num) {
      this.refs['question' + num].reset()
    }.bind(this))
    this.refs.heightFeet.getDOMNode().selectedIndex = 0
    this.refs.heightInches.getDOMNode().selectedIndex = 0
    this.refs.weight.getDOMNode().value = ''
  }

, handleGetCategory: function() {
    var data = {}
    for (var i = 1; i <= 9; i++) {
      var radios = this.refs['question' + i]
      if (radios.state.selectedIndex === null) {
        radios.getDOMNode().parentNode.scrollIntoView()
        return alert('Please answer Question #' + i)
      }
      data['question' + i] = radios.state.selectedIndex
    }
    if (this.refs.weight.getDOMNode().value == '') {
      this.refs.weight.getDOMNode().parentNode.scrollIntoView()
      return alert('Please fill in your height and weight')
    }
    data.heightFeet = this.refs.heightFeet.getDOMNode().value
    data.heightInches = this.refs.heightInches.getDOMNode().value
    data.weight = this.refs.weight.getDOMNode().value
    if (this.refs.question11.state.selectedIndex === null) {
      this.refs.question11.getDOMNode().parentNode.scrollIntoView()
      return alert('Please answer Question #11')
    }
    data.question11 = this.refs.question11.state.selectedIndex

    // TODO Calculate category
    console.info(data)

    this.setState({
      data: data
    , suggestedHealthCode: HealthCode.GOOD
    })
  }

, handleBack: function() {
    this.setState({suggestedHealthCode: null})
  }

, handleAccept: function() {
    this.props.handleAccept(this.state.suggestedHealthCode)
    this.hide()
  }

, render: function() {
    var body, footer
    if (this.state.suggestedHealthCode == null) {
      body = React.DOM.div(null, 
        React.DOM.p(null, "Pricing for life insurance is based on an overall picture of your health, among other factors. By answering the brief medical questions to help estimate your health category, we can provide you with a more accurate quote. " ),
        React.DOM.p(null, "Your information will not be recorded or saved in any way. All questions are required."),
        React.DOM.form( {ref:"form", role:"form"}, 
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "1. When was the last time you used tobacco?"),
          RadioSelect( {ref:"question1", selectedIndex:this.state.data.question1,
            labels:['Never' , 'None in the last 36 months', 'None in the last 12 months', 'Within the last 12 months']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "2. When was the last time you were treated for alcohol or drug abuse?"),
          RadioSelect( {ref:"question2", selectedIndex:this.state.data.question2,
            labels:['Never', 'Within the last 10 years', '10 or more years ago']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "3. Do you have any DUI convictions?"),
          RadioSelect( {ref:"question3", selectedIndex:this.state.data.question3,
            labels:['No', 'Yes, less than 5 years ago', 'Yes, more than 5 years ago']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "4. How many moving violations have you been convicted of in the last 3 years?"),
          RadioSelect( {ref:"question4", selectedIndex:this.state.data.question4,
            labels:['None or 1', '2', '3 or more', '6 or more']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "5. Do you have parents or siblings that died from cancer, cardiac disease or diabetes?"),
          RadioSelect( {ref:"question5", selectedIndex:this.state.data.question5,
            labels:['None', 'Yes, only 1 parent or sibling prior to age 60', 'Yes, only 1 parent or sibling between ages 61-65', 'More than 1 parent or sibling']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "6. Do you have a history of diabetes, cardiac disease, cancer or stroke?"),
          RadioSelect( {ref:"question6", selectedIndex:this.state.data.question6, labels:['No', 'Yes']})
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "7. Are you taking any medication for high blood pressure?"),
          RadioSelect( {ref:"question7", selectedIndex:this.state.data.question7,
            labels:['No', 'Yes and I am under the age of 50', 'Yes and I am age 50 or over']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "8. What was your last blood pressure reading?"),
          RadioSelect( {ref:"question8", selectedIndex:this.state.data.question8,
            labels:["I don’t know", 'Less than or equal to 140/78', 'Between 140/78 and 140/90 and I am less than age 50', 'Between 140/78 and 150/92 and I am older than 50', '151/93 and higher']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "9. What was your last cholesterol reading?"),
          RadioSelect( {ref:"question9", selectedIndex:this.state.data.question9,
            labels:['I don’t know', 'Less than 210', 'Between 211 and 250', '251-400', '401 or higher']}
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "10. What is your current height and weight?"),
          React.DOM.div( {className:"form-horizontal"}, 
            React.DOM.div( {className:"form-group"}, 
              React.DOM.label( {className:"col-sm-2 control-label", htmlFor:"heightFeet"}, "Feet"),
              React.DOM.div( {className:"col-sm-3"}, 
                React.DOM.select( {id:"heightFeet", ref:"heightFeet", className:"form-control", defaultValue:this.state.data.heightFeet}, integerOptions(4, 6))
              ),
              React.DOM.label( {className:"col-sm-2 control-label", htmlFor:"heightInches"}, "Inches"),
              React.DOM.div( {className:"col-sm-3"}, 
                React.DOM.select( {id:"heightInches", ref:"heightInches", className:"form-control", defaultValue:this.state.data.heightInches}, integerOptions(0, 11))
              )
            ),
            React.DOM.div( {className:"form-group"}, 
              React.DOM.label( {className:"col-sm-2 control-label", htmlFor:"weight"}, "Weight"),
              React.DOM.div( {className:"col-sm-3"}, 
                React.DOM.div( {className:"input-group"}, 
                  React.DOM.input( {type:"text", id:"weight", ref:"weight", className:"form-control", defaultValue:this.state.data.weight}),
                  React.DOM.span( {className:"input-group-addon"}, "lbs")
                )
              )
            )
          )
        ),
        React.DOM.div( {className:"modal-form-group"}, 
          React.DOM.label(null, "11. Do you pilot an airplane or helicpoter?"),
          RadioSelect( {ref:"question11", selectedIndex:this.state.data.question11, labels:['No', 'Yes']})
        )
        ),
        React.DOM.div( {className:"footnotes"}, 
          React.DOM.p(null, "It’s important to know this tool is a guide to the most common underwriting questions, and does not represent every scenario. When you apply for coverage, you will be asked to fill out a full application."),
          React.DOM.p(null, "This estimated health category is not guaranteed.  Your final underwriting class will be determined by the results of any examinations, laboratory results, medical history, and non-medical information developed during the underwriting process. " )
        )
      )
      footer = React.DOM.div(null, 
        React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleReset}, "Reset"),
        React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleGetCategory}, "Get your category")
      )
    }
    else {
      body = React.DOM.p(null, 
        " Based on the information provided, your estimated health category is: ", React.DOM.strong(null, HealthCodes[this.state.suggestedHealthCode].title)
      )
      footer = React.DOM.div(null, 
        React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleBack}, "Back"),
        React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleAccept}, "Accept")
      )
    }

    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Determine your health category")
          ),
          React.DOM.div( {className:"modal-body", style:{height: 500, overflowY: 'scroll'}}, 
            body
          ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            footer
          )
        )
      )
    )
  }
})

module.exports = HealthCodeModal
},{"BootstrapModalMixin":"eA1VlO","HealthCode":"uDmr2N","HealthCodes":"4dsKtx","IncrementingKeyMixin":"5bP6aZ","LifeQuoteConstants":"azwgh7","RadioSelect":"Aoobe9","integerOptions":"hVA4Ia"}],"HealthCodeModal":[function(require,module,exports){
module.exports=require('xLOxD3');
},{}],"4dsKtx":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeLookup = require('makeLookup')

var HealthCodes = makeLookup(LifeQuoteRefData.HEALTH_CODES)

module.exports = HealthCodes
},{"LifeQuoteRefData":"EW9yYw","makeLookup":"n2iJBF"}],"HealthCodes":[function(require,module,exports){
module.exports=require('4dsKtx');
},{}],"6p/K6o":[function(require,module,exports){
/**
 * Displays a help icon which displays help as a popover on hover. This
 * component should only have text as its child content.
 * @jsx React.DOM
 */
var HelpIcon = React.createClass({displayName: 'HelpIcon',
  getDefaultProps: function() {
    return {
      glyphicon: 'question-sign'
    , container: 'body'
    , animation: false
    , trigger: 'hover click'
    , placement: 'auto right'
    }
  }

, render: function() {
    return React.DOM.span( {style:{cursor: 'help'}, className:'glyphicon glyphicon-' + this.props.glyphicon})
  }

, componentDidMount: function() {
    $(this.getDOMNode()).popover({
      content: this.props.children
    , container: this.props.container
    , animation: this.props.animation
    , trigger: this.props.trigger
    , placement: this.props.placement
    })
  }
})

module.exports = HelpIcon
},{}],"HelpIcon":[function(require,module,exports){
module.exports=require('6p/K6o');
},{}],"IncrementingKeyMixin":[function(require,module,exports){
module.exports=require('5bP6aZ');
},{}],"5bP6aZ":[function(require,module,exports){
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
},{}],"LeadService":[function(require,module,exports){
module.exports=require('5uuTKF');
},{}],"5uuTKF":[function(require,module,exports){
function done(cb) {
  return function(data) {
    cb(null, data)
  }
}

function fail(cb) {
  return function(xhr, textStatus, errorThrown) {
    cb({xhr: xhr, textStatus: textStatus, errorThrown: errorThrown})
  }
}

function request(method, params, cb) {
  var url = params
    , data
  if (typeof params == 'object') {
    url = params.url
    if ('data' in params) data = params.data
  }
  var jqConfig = {
    type: method
  , contentType: 'application/json'
  , dataType: 'json'
  , url: url
  }
  if (typeof data != 'undefined') {
    jqConfig.data = JSON.stringify(data)
  }
  $.ajax(jqConfig).then(done(cb), fail(cb))
}

var post = request.bind(null, 'POST')
  , put = request.bind(null, 'PUT')

var LeadService = {
  createLead: function(cb) {
    post('/api/lead/', cb)
  }

, updateLead: function(data, cb) {
    put({url: '/api/lead', data: data}, cb)
  }

, calculateQuote: function(data, cb) {
    post({url: '/api/quote', data: data}, cb)
  }
}

// Mock service calls if we're running off the filesystem
if (window.location.protocol == 'file:') {
  var delay = function() { return 500 + (Math.random() * 1000) }

  LeadService = {
    createLead: function(cb) {
      setTimeout(cb.bind(null, null, {id: new Date().valueOf().toString()}), delay())
    }

  , updateLead: function(data, cb) {
      setTimeout(cb.bind(null, null), delay())
    }

  , calculateQuote: function(data, cb) {
      setTimeout(cb.bind(null, null, {
        payments:[
          {term: 10, annualPayment: 450.0, monthlyPayment: 45.0}
        , {term: 20, annualPayment: 450.0, monthlyPayment: 45.0}
        , {term: 30, annualPayment: 450.0, monthlyPayment: 45.0}
        ]
      }), delay())
    }
  }
}

module.exports = LeadService
},{}],"LifeQuote":[function(require,module,exports){
module.exports=require('eKx8f8');
},{}],"eKx8f8":[function(require,module,exports){
/** @jsx React.DOM */
var CallYouModal = require('CallYouModal')
var EmailUsModal = require('EmailUsModal')
var GeneralInfo = require('GeneralInfo')
var GlobalModal = require('GlobalModal')
var LeadService = require('LeadService')
var LifeQuoteConstants = require('LifeQuoteConstants')
var QAndAModal = require('QAndAModal')
var QuoteInfo = require('QuoteInfo')
var SendQuote = require('SendQuote')
var ServiceUnavailableModal = require('ServiceUnavailableModal')
var States = require('States')
var Step = require('Step')
var TTFN = require('TTFN')
var WTFN = require('WTFN')

var $c = require('classNames')
var extend = require('extend')

var LifeQuote = React.createClass({displayName: 'LifeQuote',
  getInitialState: function() {
    return {
      step: Step.GENERAL_INFO
    , loading: false
    , modal: null
    , nextModal: null
    , generalInfo: {
        zipCode: this.props.queryParamZipCode
      }
    , payments: {}
    , contactInfo: {
        zipCode: this.props.queryParamZipCode
      }
    , lead: null
    }
  }

, setActiveStep: function(step) {
    this.setState({step: step})
  }

, setActiveModal: function(modal, e) {
    if (e) e.preventDefault()
    this.setState({modal: modal})
  }

, setNextModal: function(modal) {
    this.setState({nextModal: modal})
  }

, render: function() {
    var content
    if (this.state.step === Step.GENERAL_INFO)
      content = GeneralInfo(
                  {queryParamZipCode:this.props.queryParamZipCode,
                  initialData:this.state.generalInfo,
                  handleReset:this.handleReset,
                  handleGetQuote:this.handleGetQuote,
                  handleShowGlobalModal:this.setActiveModal,
                  loading:this.state.loading}
                )
    else if (this.state.step === Step.QUOTE_INFO)
      content = QuoteInfo(
                  {generalInfo:this.state.generalInfo,
                  payments:this.state.payments,
                  setActiveStep:this.setActiveStep}
                )
    else if (this.state.step === Step.SEND_QUOTE)
      content = SendQuote(
                  {contactInfo:this.state.contactInfo,
                  setActiveStep:this.setActiveStep,
                  handleSend:this.handleSend,
                  handleShowGlobalModal:this.setActiveModal,
                  loading:this.state.loading}
                )
    else if (this.state.step === Step.TTFN)
      content = (JSON.stringify(this.state).toLowerCase().indexOf('react') == -1
                 ? TTFN(null)
                 : WTFN(null))

    var modal
    if (this.state.modal === GlobalModal.WE_CALL_YOU)
      modal = CallYouModal(
                {contactInfo:this.state.contactInfo,
                handleHidden:this.handleModalHidden,
                handleSend:this.handleSend,
                handleSetNextGlobalModal:this.setNextModal}
              )
    else if (this.state.modal === GlobalModal.EMAIL_US)
      modal = EmailUsModal(
                {contactInfo:this.state.contactInfo,
                handleHidden:this.handleModalHidden,
                handleSend:this.handleSend,
                handleSetNextGlobalModal:this.setNextModal}
              )
    else if (this.state.modal === GlobalModal.Q_AND_A)
      modal = QAndAModal( {handleHidden:this.handleModalHidden})
    else if (this.state.modal === GlobalModal.SERVICE_UNAVAILABLE)
      modal = ServiceUnavailableModal( {handleHidden:this.handleModalHidden})

    return React.DOM.div( {className:this.state.loading ? 'loading' : ''}, 
      React.DOM.div( {className:"row"}, 
        React.DOM.div( {className:"col-sm-9"}, 
          React.DOM.div( {className:"quote-progress clearfix"}, 
            React.DOM.div( {className:$c('col-sm-4', {active: this.state.step === Step.GENERAL_INFO})}, 
              React.DOM.span( {className:"step-number"}, "1"),' ',
              React.DOM.span( {className:"step-name"}, "General Information")
            ),
            React.DOM.div( {className:$c('col-sm-4', {active: this.state.step === Step.QUOTE_INFO})}, 
              React.DOM.span( {className:"step-number"}, "2"),' ',
              React.DOM.span( {className:"step-name"}, "Get your quote")
            ),
            React.DOM.div( {className:$c('col-sm-4', {active: this.state.step === Step.SEND_QUOTE})}, 
              React.DOM.span( {className:"step-number"}, "3"),' ',
              React.DOM.span( {className:"step-name"}, "Send your quote to an agent")
            )
          ),
          React.DOM.div( {className:"panel panel-default"}, 
            content
          )
        ),
        React.DOM.div( {className:"col-sm-3"}, 
          React.DOM.h3( {className:"text-center"}, "Need Assistance?"),
          React.DOM.div( {className:"list-group"}, 
            React.DOM.a( {className:"list-group-item", href:"#callcontact", onClick:this.setActiveModal.bind(null, GlobalModal.WE_CALL_YOU)}, 
              React.DOM.h4( {className:"list-group-item-heading"}, React.DOM.span( {className:"glyphicon glyphicon-phone-alt"}), " We’ll call you"),
              React.DOM.p( {className:"list-group-item-text"}, "Need assistance? A licensed representative will contact you.")
            ),
            React.DOM.a( {className:"list-group-item", href:"#questioncontact", onClick:this.setActiveModal.bind(null, GlobalModal.EMAIL_US)}, 
              React.DOM.h4( {className:"list-group-item-heading"}, React.DOM.span( {className:"glyphicon glyphicon-envelope"}), " Email us"),
              React.DOM.p( {className:"list-group-item-text"}, "Have a specific question? We will get right back to you via email.")
            ),
            React.DOM.a( {className:"list-group-item", href:"#qanda", onClick:this.setActiveModal.bind(null, GlobalModal.Q_AND_A)}, 
              React.DOM.h4( {className:"list-group-item-heading"}, React.DOM.span( {className:"glyphicon glyphicon-info-sign"}), " Questions ", '&', " Answers"),
              React.DOM.p( {className:"list-group-item-text"}, "Look here for answers to commonly-asked questions.")
            )
          ),
          React.DOM.p( {className:"text-center"}, 
            React.DOM.a( {href:LifeQuoteConstants.LOCAL_SALES_AGENT_URL, target:"_blank"}, "Find a Local Sales Agent ", React.DOM.span( {className:"glyphicon glyphicon-share"}))
          )
        )
      ),
      modal
    )
  }

, handleModalHidden: function() {
    if (this.state.nextModal !== null) {
      this.setState({
        modal: this.state.nextModal
      , nextModal: null
      })
    }
    else {
      this.setState({modal: null})
    }
  }

, handleCreateLead: function(next, handleError) {
    LeadService.createLead(function(err, lead) {
      if (err) return handleError(err)
      this.setState({lead: lead})
      next(lead)
    }.bind(this))
  }

, handleGetQuote: function(generalInfo) {
    this.setState({
      generalInfo: generalInfo
    , contactInfo: extend({}, this.state.contactInfo, {
        stateCode: generalInfo.stateCode
      , zipCode: generalInfo.zipCode
      })
    , loading: true
    })

    var handleError = function(err) {
      this.setState({
        loading: false
      , modal: GlobalModal.SERVICE_UNAVAILABLE
      })
    }.bind(this)

    var getQuote = function(lead) {
      if (lead === null) return this.handleCreateLead(getQuote, handleError)

      var data = extend({}, {leadId: lead.id}, generalInfo)

      LeadService.calculateQuote(data, function(err, quote) {
        if (err) return handleError(err)
        this.setState({
          loading: false
        , payments: quote.payments
        , step: Step.QUOTE_INFO
        })
      }.bind(this))
    }.bind(this)

    getQuote(this.state.lead)
  }

, handleSend: function(contactInfo, cb) {
    var updatedContactInfo = extend({}, this.state.contactInfo, contactInfo)
    this.setState({
      contactInfo: updatedContactInfo
    , loading: true
    })

    var handleError = function(err) {
      this.setState({loading: false})
      cb(err)
    }.bind(this)

    var updateLead = function(lead) {
      if (lead === null) return this.handleCreateLead(updateLead, handleError)

      var data = {
        id: lead.id
      , firstName: contactInfo.firstName
      , lastName: contactInfo.lastName
      , phoneNmbr: contactInfo.phoneNmbr
      , address: contactInfo.address + ' ' +
                 contactInfo.city + ', ' +
                 States[contactInfo.stateCode].abbreviation
      , stateCode: contactInfo.stateCode
      , zipCode: contactInfo.zipCode
      , currentCustomer: contactInfo.currentCustomer == 'Yes'
      }
      if (contactInfo.emailAddr) data.emailAddr = contactInfo.emailAddr
      if (contactInfo.question) data.question = contactInfo.question

      LeadService.updateLead(data, function(err) {
        if (err) return handleError(err)
        this.setState({loading: false})
        cb(null)
      }.bind(this))
    }.bind(this)

    updateLead(this.state.lead)
  }
})

module.exports = LifeQuote
},{"CallYouModal":"QyOA6C","EmailUsModal":"LeLoe6","GeneralInfo":"6xU4O1","GlobalModal":"OEJzib","LeadService":"5uuTKF","LifeQuoteConstants":"azwgh7","QAndAModal":"Nxhbab","QuoteInfo":"qxxOo8","SendQuote":"dlFddt","ServiceUnavailableModal":"idTqBC","States":"9qL0JL","Step":"TP65+d","TTFN":"WSQpzT","WTFN":"fpzDSp","classNames":"/ujzRj","extend":"7t16SC"}],"LifeQuoteConstants":[function(require,module,exports){
module.exports=require('azwgh7');
},{}],"azwgh7":[function(require,module,exports){
var COMPANY = 'Merry Widow Insurance Co.'
  , PRIVACY_POLICY_URL = 'http://example.com/privacy_policy'
  , LOCAL_SALES_AGENT_URL = 'http://example.com/find_sales_office'
  , LIFE_INSURANCE_PRODUCTS_URL = 'http://example.com/life_insurance_products'

var LifeQuoteConstants = {
  COMPANY: COMPANY
, PRIVACY_POLICY_URL: PRIVACY_POLICY_URL
, LOCAL_SALES_AGENT_URL: LOCAL_SALES_AGENT_URL
, LIFE_INSURANCE_PRODUCTS_URL: LIFE_INSURANCE_PRODUCTS_URL
}

module.exports = LifeQuoteConstants
},{}],"LifeQuoteRefData":[function(require,module,exports){
module.exports=require('EW9yYw');
},{}],"EW9yYw":[function(require,module,exports){
var STATE_CODES = [
  {code: 1,  abbreviation: 'AL', name: 'Alabama'}
, {code: 2,  abbreviation: 'AK', name: 'Alaska'}
, {code: 4,  abbreviation: 'AZ', name: 'Arizona'}
, {code: 5,  abbreviation: 'AR', name: 'Arkansas'}
, {code: 6,  abbreviation: 'CA', name: 'California'}
, {code: 8,  abbreviation: 'CO', name: 'Connecticut'}
, {code: 10, abbreviation: 'DE', name: 'Delaware'}
, {code: 11, abbreviation: 'DC', name: 'District of Columbia'}
, {code: 12, abbreviation: 'FL', name: 'Florida'}
, {code: 13, abbreviation: 'GA', name: 'Georgia'}
, {code: 15, abbreviation: 'HI', name: 'Hawaii'}
, {code: 16, abbreviation: 'ID', name: 'Idaho'}
, {code: 17, abbreviation: 'IL', name: 'Illinois'}
, {code: 18, abbreviation: 'IN', name: 'Indiana'}
, {code: 19, abbreviation: 'IA', name: 'Iowa'}
, {code: 20, abbreviation: 'KS', name: 'Kansas'}
, {code: 21, abbreviation: 'KY', name: 'Kentucky'}
, {code: 22, abbreviation: 'LA', name: 'Louisiana'}
, {code: 23, abbreviation: 'ME', name: 'Maine'}
, {code: 24, abbreviation: 'MD', name: 'Maryland'}
, {code: 25, abbreviation: 'MA', name: 'Massachusetts'}
, {code: 26, abbreviation: 'MI', name: 'Michigan'}
, {code: 27, abbreviation: 'MN', name: 'Minnesota'}
, {code: 28, abbreviation: 'MS', name: 'Mississippi'}
, {code: 29, abbreviation: 'MO', name: 'Missouri'}
, {code: 30, abbreviation: 'MT', name: 'Montana'}
, {code: 31, abbreviation: 'NE', name: 'Nebraska'}
, {code: 32, abbreviation: 'NV', name: 'Nevada'}
, {code: 33, abbreviation: 'NH', name: 'New Hampshire'}
, {code: 34, abbreviation: 'NJ', name: 'New Jersey'}
, {code: 35, abbreviation: 'NM', name: 'New Mexico'}
, {code: 36, abbreviation: 'NY', name: 'New York'}
, {code: 37, abbreviation: 'NC', name: 'North Carolina'}
, {code: 38, abbreviation: 'ND', name: 'North Dakota'}
, {code: 39, abbreviation: 'OH', name: 'Ohio'}
, {code: 40, abbreviation: 'OK', name: 'Oklahoma'}
, {code: 41, abbreviation: 'OR', name: 'Oregon'}
, {code: 42, abbreviation: 'PA', name: 'Pennsylvania'}
, {code: 44, abbreviation: 'RI', name: 'Rhode Island'}
, {code: 45, abbreviation: 'SC', name: 'South Carolina'}
, {code: 46, abbreviation: 'SD', name: 'South Dakota'}
, {code: 47, abbreviation: 'TN', name: 'Tennessee'}
, {code: 48, abbreviation: 'TX', name: 'Texas'}
, {code: 49, abbreviation: 'UT', name: 'Utah'}
, {code: 50, abbreviation: 'VT', name: 'Vermont'}
, {code: 51, abbreviation: 'VA', name: 'Virginia'}
, {code: 53, abbreviation: 'WA', name: 'Washington'}
, {code: 54, abbreviation: 'WV', name: 'West Virginia'}
, {code: 55, abbreviation: 'WI', name: 'Wisconsin'}
, {code: 56, abbreviation: 'WY', name: 'Wyoming'}
]

var PRODUCT_CODES = [
  {code: 1, name: 'Term'}
, {code: 2, name: 'Permanent'}
]

var HEALTH_CODES =  [
  {code: 1, title: 'Fair'}
, {code: 2, title: 'Good'}
, {code: 3, title: 'Very Good'}
, {code: 4, title: 'Excellent'}
]

var GENDER_CODES = [
  {code: 'F', title: 'Female'}
, {code: 'M', title: 'Male'}
]

var LifeQuoteRefData = {
  STATE_CODES: STATE_CODES
, PRODUCT_CODES: PRODUCT_CODES
, HEALTH_CODES: HEALTH_CODES
, GENDER_CODES: GENDER_CODES
}

module.exports = LifeQuoteRefData
},{}],"YqLxNS":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapDevice = require('BootstrapDevice')
var BootstrapModalMixin = require('BootstrapModalMixin')
var FormMixin = require('FormMixin')
var HelpIcon = require('HelpIcon')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var $c = require('classNames')
var bsDevice = require('bsDevice')
var formatDollars = require('formatDollars')
var trim = require('trim')

var NeedsCalculatorModal = React.createClass({displayName: 'NeedsCalculatorModal',
  mixins: [BootstrapModalMixin, FormMixin, IncrementingKeyMixin]

, fields: {
    'monthlyNetIncome': 'isFloat'
  , 'outstandingMortgageOrRent': 'isFloat'
  , 'currentOutstandingDebts': 'isFloat'
  , 'estCollegeExpensePerChild': 'isFloat'
  , 'estFinalExpenses': 'isFloat'
  , 'currentLiquidAssets': 'isFloat'
  , 'personallyOwnedInsurance': 'isFloat'
  , 'yearsIncomeProvided': 'isInt'
  , 'numCollegeChildren': 'isInt'
  }

, errorMessages: {
    'isFloat': 'Please enter a dollar amount'
  , 'isInt': 'Please enter a number'
  }

, getInitialState: function() {
    return {
      suggestedCoverage: null
    , data: {}
    , errors: {}
    }
  }

, componentWillUpdate: function(nextProps, nextState) {
    this.updateErrorTooltips(this.state.errors, nextState.errors, {
      placement: bsDevice() >= BootstrapDevice.MD ? 'auto right' : 'bottom'
    , trigger: 'hover click'
    , animation: false
    , container: 'body'
    })
  }

, handleReset: function() {
    for (var fieldRef in this.fieldRefs) {
      this.refs[fieldRef].getDOMNode().value = ''
    }
    this.setState({
      data: {}
    , errors: {}
    })
  }

, handleCalculate: function() {
    var data = {}
      , errors = {}
    for (var fieldRef in this.fields) {
      data[fieldRef] = trim(this.refs[fieldRef].getDOMNode().value)
      if (!data[fieldRef]) {
        errors[fieldRef] = 'This field is required'
        continue
      }
      var validation = this.fields[fieldRef]
      if (!validator[validation](data[fieldRef])) {
        errors[fieldRef] = this.errorMessages[validation]
      }
    }
    this.setState({errors: errors})

    var isValid = true
    for (var fieldRef in errors) {
      isValid = false
      break
    }

    if (isValid) {
      // TODO Calculate suggested amount
      console.info(data)

      this.setState({
        data: data
      , suggestedCoverage: 100000
      })
    }
  }

, handleBack: function() {
    this.setState({suggestedCoverage: null})
  }

, handleAccept: function() {
    this.props.handleAccept(this.state.suggestedCoverage)
    this.hide()
  }

, render: function() {
    var body, footer
    if (this.state.suggestedCoverage === null) {
      body = React.DOM.div(null, 
        React.DOM.p(null, "Our needs calculator lets you estimate how much life insurance you may need in addition to the amount you may already own."),
        React.DOM.form( {ref:"form", className:"form-horizontal", role:"form"}, 
          this.renderDollarField('monthlyNetIncome', 'Monthly net income',
            HelpIcon(null, 
              " After-tax earnings per month "
            )
          ),
          this.renderIntegerField('yearsIncomeProvided', 'Number of years you wish to provide income',
            HelpIcon(null, 
              " This number is how many years you would like to generate income for your family members or beneficiaries in order to cover expenses identified. "+
              "Most experts recommend a minimum of 3-5 years. "
            )
          ),
          this.renderDollarField('outstandingMortgageOrRent', 'Outstanding mortgage or rent payments',
            HelpIcon(null, 
              " Include mortgage balance and home equity loan balances. "+
              "Or, determine the sufficient amount for 10 years, or 120 months, of rent. "
            )
          ),
          this.renderDollarField('currentOutstandingDebts', 'Current outstanding debts',
            HelpIcon(null, 
              " Include credit cards, installment credit or other loan debts, such as school and auto. "
            )
          ),
          this.renderIntegerField('numCollegeChildren', 'Number of children to attend college',
            HelpIcon(null, 
              " Number of children who have yet to enter college. This would not include children who have completed college. "+
              "Children who do not require college funding do not need to be included here. "
            )
          ),
          this.renderDollarField('estCollegeExpensePerChild', 'Estimated college expenses per child',
            HelpIcon(null, 
              " Four years at a private institution averages $129,228. "+
              "Four years at a public institution averages $54,356. "+
              "Costs include tuition fees, room and board as reported by the College Board, New York 2007. "
            )
          ),
          this.renderDollarField('estFinalExpenses', 'Estimated final expenses',
            HelpIcon(null, 
              " Final expense costs are the costs associated with a funeral or final estate settlement costs. "+
              "A typical burial costs between $8,000 and $12,000. "
            ),
            {placeholder: '10,000'}
          ),
          this.renderDollarField('currentLiquidAssets', 'Current liquid assets',
            HelpIcon(null, 
              " Liquid assets would include savings and investments, but would not include a 401K or real estate such as a house. "
            )
          ),
          this.renderDollarField('personallyOwnedInsurance', 'Personally owned life insurance',
            HelpIcon(null, 
              " This number should equal the total amount of coverage on your life, including coverage from any individual policies. "
            )
          )
        )
      )
      footer = React.DOM.div(null, 
        React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleReset}, "Reset"),
        React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleCalculate}, "Calculate")
      )
    }
    else {
      body = React.DOM.div(null, 
        React.DOM.p(null, "Based on the information entered, you need a total of ", React.DOM.strong(null, formatDollars(this.state.suggestedCoverage)), " in order to cover your life insurance needs."),
        React.DOM.p(null, React.DOM.strong(null, "Note:"), " This calculation does not incorporate any assumptions about investment results, estate taxes or inflation.")
      )
      footer = React.DOM.div(null, 
        React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleBack}, "Back"),
        React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleAccept}, "Accept")
      )
    }

    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Needs Calculator")
          ),
          React.DOM.div( {className:"modal-body"}, 
            body
          ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            footer
          )
        )
      )
    )
  }

, renderDollarField: function(id, label, help, kwargs) {
    return this.renderField(id, label, help,
      React.DOM.div( {className:"input-group"}, 
        React.DOM.span( {className:"input-group-addon"}, "$"),
        React.DOM.input( {type:"text", className:"form-control", ref:id, id:id,
          defaultValue:this.state.data[id] || '',
          placeholder:kwargs && kwargs.placeholder || ''}
        )
      )
    )
  }

, renderIntegerField: function(id, label, help) {
    return this.renderField(id, label, help,
      React.DOM.input( {type:"text", className:"form-control", ref:id, id:id,
        defaultValue:this.state.data[id] || ''}
      )
    )
  }

, renderField: function(id, label, help, field) {
    return React.DOM.div( {className:$c('form-group', {'has-error': id in this.state.errors})}, 
      React.DOM.label( {htmlFor:id, className:"col-sm-8 control-label"}, label),
      React.DOM.div( {className:"col-sm-3"}, 
        field
      ),
      React.DOM.div( {className:"col-sm-1"}, 
        React.DOM.p( {className:"form-control-static"}, 
          help
        )
      )
    )
  }
})

module.exports = NeedsCalculatorModal
},{"BootstrapDevice":"kEc4QK","BootstrapModalMixin":"eA1VlO","FormMixin":"4yKS9i","HelpIcon":"6p/K6o","IncrementingKeyMixin":"5bP6aZ","bsDevice":"+EgEH7","classNames":"/ujzRj","formatDollars":"uBeo01","trim":"aYnlO3"}],"NeedsCalculatorModal":[function(require,module,exports){
module.exports=require('YqLxNS');
},{}],"sK3ilI":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var GlobalModal = require('GlobalModal')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')

var PermanentInsuranceModal = React.createClass({displayName: 'PermanentInsuranceModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      globalModal: null
    }
  }

, render: function() {
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Permanent Insurance")
          ),
          React.DOM.div( {className:"modal-body"}, 
            React.DOM.p(null, React.DOM.strong(null, "Thanks for your interest in permanent life insurance.")),
            React.DOM.p(null, "The best way to get a quote for permanent life insurance is to speak directly with one of our experienced agents. There are several ways to get in touch with your local agent:"),
            React.DOM.p( {className:"text-center"}, 
              React.DOM.a( {href:LifeQuoteConstants.LOCAL_SALES_AGENT_URL, className:"btn btn-default"}, "Find your local agent ", React.DOM.span( {className:"glyphicon glyphicon-share"})),
              ' ',
              React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleShowGlobalModal.bind(null, GlobalModal.WE_CALL_YOU)}, "We’ll call you"),
              ' ',
              React.DOM.button( {type:"button", className:"btn btn-default", onClick:this.handleShowGlobalModal.bind(null, GlobalModal.EMAIL_US)}, "Email us")
            )
          )
        )
      )
    )
  }

, handleShowGlobalModal: function(globalModal) {
    this.setState({globalModal: globalModal})
    this.hide()
  }

, handleHidden: function() {
    if (this.state.globalModal !== null) {
      this.props.handleShowGlobalModal(this.state.globalModal)
    }
  }
})

module.exports = PermanentInsuranceModal
},{"BootstrapModalMixin":"eA1VlO","GlobalModal":"OEJzib","IncrementingKeyMixin":"5bP6aZ","LifeQuoteConstants":"azwgh7"}],"PermanentInsuranceModal":[function(require,module,exports){
module.exports=require('sK3ilI');
},{}],"cDtRTm":[function(require,module,exports){
/** @jsx React.DOM */
var LifeQuoteRefData = require('LifeQuoteRefData')

var BootstrapModalMixin = require('BootstrapModalMixin')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var PolicyAdvisorModal = React.createClass({displayName: 'PolicyAdvisorModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      policyCode: null
    }
  }

, handleChange: function(e) {
    this.setState({policyCode: e.target.value})
  }

, handleReturnToQuote: function() {
    this.props.handleSelectProductCode(Number(this.state.policyCode))
    this.hide()
  }

, render: function() {
    var radios = LifeQuoteRefData.PRODUCT_CODES.map(function(product) {
      return React.DOM.label( {className:"radio-inline"}, 
        React.DOM.input( {type:"radio", name:"policyCode", value:product.code, onChange:this.handleChange}), product.name
      )
    }.bind(this))
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Policy Advisor")
          ),
          React.DOM.div( {className:"modal-body", style:{height: 500, overflowY: 'scroll'}}, 
            React.DOM.p(null, React.DOM.strong(null, "What kind of life insurance policy should you buy?")),
            React.DOM.p(null, "That depends on your needs and budget. A good first step is to determine if your needs are temporary or permanent. For example, a mortgage is a temporary need, because your mortgage will eventually be paid off. Funds for final expenses are permanent, because the need will never go away."),
            React.DOM.table( {className:"table table-bordered"}, 
              React.DOM.thead(null, 
                React.DOM.tr(null, 
                  React.DOM.th(null, "Temporary Needs"),
                  React.DOM.th(null, "Permanent Needs")
                )
              ),
              React.DOM.tbody(null, 
                React.DOM.tr(null, 
                  React.DOM.td(null, "Mortgage"),
                  React.DOM.td(null, "Income replacement")
                ),
                React.DOM.tr(null, 
                  React.DOM.td(null, "College education"),
                  React.DOM.td(null, "Final expenses")
                ),
                React.DOM.tr(null, 
                  React.DOM.td(null, "Child care"),
                  React.DOM.td(null, "Emergency fund")
                )
              )
            ),
            React.DOM.p(null, "Generally speaking, term life insurance is a good fit for people with temporary needs, such as protecting a mortgage or covering costs associated with raising children, such as daily child care. Initially, it’s usually the least expensive coverage you can buy."),
            React.DOM.p(null, "Many people have permanent needs, such as paying for final expenses and replacing income should a breadwinner die prematurely. Permanent insurance lasts for the lifetime of the insured."),

            React.DOM.p(null, React.DOM.strong(null, "What’s the difference between term and permanent life insurance?")),
            React.DOM.table( {className:"table table-bordered"}, 
              React.DOM.thead(null, 
                React.DOM.tr(null, 
                  React.DOM.th(null, "Term"),
                  React.DOM.th(null, "Permanent")
                )
              ),
              React.DOM.tbody(null, 
                React.DOM.tr(null, 
                  React.DOM.td(null, "Lowest initial cost"),
                  React.DOM.td(null, "Fixed premiums")
                ),
                React.DOM.tr(null, 
                  React.DOM.td(null, "More coverage per dollar"),
                  React.DOM.td(null, "Cash value accumulation")
                ),
                React.DOM.tr(null, 
                  React.DOM.td(null, "Premiums will increase after initial term period"),
                  React.DOM.td(null, "Guaranteed cash value")
                ),
                React.DOM.tr(null, 
                  React.DOM.td(null, "Coverage is not permanent(2)"),
                  React.DOM.td(null, "Coverage for life(1), as long as premiums are paid")
                )
              )
            ),

            React.DOM.p(null, React.DOM.strong(null, "Term life insurance")),
            React.DOM.p(null, "Term insurance provides coverage for a specific period of time, such as 10, 20 or 30 years. If you die during that period, the beneficiary you name on your policy receives the death benefit amount. When the term ends, so does your protection, unless you select a term policy that gives you the option of renewing your coverage."),
            React.DOM.p(null, "Term policies don’t build cash value as most permanent life insurance products do. Because of this fact, when you buy a term policy you’re paying for pure protection. So most of the time, term insurance is the least expensive kind of coverage you can buy."),

            React.DOM.p(null, React.DOM.strong(null, "Permanent life insurance")),
            React.DOM.p(null, "Permanent policies provide protection for your entire life by paying a sum to your beneficiary upon your death(1). Most permanent policies build cash value over time, and you can access this cash value for emergencies, opportunities or planned life events such as a college education or retirement."),
            React.DOM.p(null, "There are different types of permanent policies. Whole life policies usually offer level premiums and strong, traditional guarantees, such as a schedule of guaranteed values. Universal life policies normally offer flexible features, such as the ability to change your coverage amount or your payment schedule after you purchase the policy. A variation on universal life, variable universal life allows you to invest your policy’s cash values in fixed accounts and sub-accounts that have the potential to earn market returns. " ),
            React.DOM.p(null, "Finally, single payment whole life is a type of life insurance you buy with one payment. Because the death benefit is higher than the single payment, this kind of life insurance is often a good fit for people looking to transfer wealth."),

            React.DOM.div( {className:"footnotes"}, 
              React.DOM.p(null, "(1) Many permanent policies endow at age 121."),
              React.DOM.p(null, "(2) Some term policies offer the option to continue coverage at the end of the level term period. In most cases, premiums will increase annually as you age.")
            )
          ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            radios,
            React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.handleReturnToQuote}, "Return to quote")
          )
        )
      )
    )
  }
})

module.exports = PolicyAdvisorModal
},{"BootstrapModalMixin":"eA1VlO","IncrementingKeyMixin":"5bP6aZ","LifeQuoteRefData":"EW9yYw"}],"PolicyAdvisorModal":[function(require,module,exports){
module.exports=require('cDtRTm');
},{}],"YPQRNA":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var ProductCode = makeEnum(LifeQuoteRefData.PRODUCT_CODES, 'name')

module.exports = ProductCode
},{"LifeQuoteRefData":"EW9yYw","makeEnum":"rpALGJ"}],"ProductCode":[function(require,module,exports){
module.exports=require('YPQRNA');
},{}],"Pa81WE":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeLookup = require('makeLookup')

var ProductCodes = makeLookup(LifeQuoteRefData.PRODUCT_CODES)

module.exports = ProductCodes
},{"LifeQuoteRefData":"EW9yYw","makeLookup":"n2iJBF"}],"ProductCodes":[function(require,module,exports){
module.exports=require('Pa81WE');
},{}],"Nxhbab":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var QAndAModal = React.createClass({displayName: 'QAndAModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, render: function() {
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 
            this.renderCloseButton(),
            React.DOM.strong(null, "Questions ", '&', " Answers")
          ),
          React.DOM.div( {className:"modal-body"}, 
            React.DOM.p( {className:"question"}, "Why do you ask for my gender and age?"),
            React.DOM.p(null, "Pricing for life insurance is based on mortality, or in other words, the prediction of how long you will live. That prediction is based on many factors, including your age and gender. Obviously, if you are older, you will likely pass away before someone who is substantially younger. And gender plays a role because statistically speaking, women are likely to live longer than men."),
            React.DOM.p( {className:"question"}, "Why do you ask if I use tobacco products?"),
            React.DOM.p(null, "Pricing for life insurance is based on a prediction of how long you will live. Statistics show people who use tobacco products have a higher mortality rate – or a higher likelihood of passing away sooner – than non-smokers."),
            React.DOM.p( {className:"question"}, "What’s an underwriting class?"),
            React.DOM.p(null, "An underwriting class is a general classification that describes your overall health. These classifications have names like ‘Elite Preferred’ for the healthiest individuals and ‘Standard’ for individuals with generally good health. Your underwriting class directly impacts the price you will pay for coverage, because healthy people tend to live longer."),
            React.DOM.p(null, "The medical questions we ask here help you arrive at an estimated underwriting class, which is then used to calculate your quote. Your answers to the medical questions are not saved in any way.")
          ),
          React.DOM.div( {className:"modal-footer", style:{marginTop: 0}}, 
            React.DOM.button( {type:"button", className:"btn btn-primary", onClick:this.hide}, "Return to quote")
          )
        )
      )
    )
  }
})

module.exports = QAndAModal
},{"BootstrapModalMixin":"eA1VlO","IncrementingKeyMixin":"5bP6aZ"}],"QAndAModal":[function(require,module,exports){
module.exports=require('Nxhbab');
},{}],"QuoteInfo":[function(require,module,exports){
module.exports=require('qxxOo8');
},{}],"qxxOo8":[function(require,module,exports){
/** @jsx React.DOM */
var Genders = require('Genders')
var HealthCodes = require('HealthCodes')
var ProductCodes = require('ProductCodes')
var States = require('States')
var Step = require('Step')

var formatDollars = require('formatDollars')

var QuoteInfo = React.createClass({displayName: 'QuoteInfo',
  render: function() {
    var headerRow = [React.DOM.th(null)]
      , annualRow = [React.DOM.th(null, "Annual")]
      , monthlyRow = [React.DOM.th(null, "Monthly")]
    this.props.payments.forEach(function(payment) {
      headerRow.push(React.DOM.th(null, payment.term, " year"))
      annualRow.push(React.DOM.td(null, payment.annualPayment.toFixed(2)))
      monthlyRow.push(React.DOM.td(null, payment.monthlyPayment.toFixed(2)))
    })
    return React.DOM.div(null, 
      React.DOM.div( {className:"panel-body"}, 
        React.DOM.p(null, "Congratulations! You’ve just taken the first step toward securing your loved ones’ financial future. Your life insurance quote is below. What’s next? Forward your quote to one of our experienced agents who will walk you through the application process."),
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-sm-6"}, 
            React.DOM.h3(null, "Your Information"),
            React.DOM.table( {className:"table table-bordered"}, 
              React.DOM.tbody(null, 
                React.DOM.tr(null, 
                  React.DOM.th(null, "Gender"),
                  React.DOM.td(null, Genders[this.props.generalInfo.gender].title)
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "Age"),
                  React.DOM.td(null, this.props.generalInfo.age)
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "State"),
                  React.DOM.td(null, States[this.props.generalInfo.stateCode].abbreviation)
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "Tobacco Use"),
                  React.DOM.td(null, this.props.generalInfo.tobacco ? 'Smoker' : 'Non Smoker')
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "Amount of coverage"),
                  React.DOM.td(null, formatDollars(this.props.generalInfo.coverage))
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "Type of coverage"),
                  React.DOM.td(null, ProductCodes[this.props.generalInfo.productCode].name)
                ),
                React.DOM.tr(null, 
                  React.DOM.th(null, "Underwriting class"),
                  React.DOM.td(null, HealthCodes[this.props.generalInfo.healthCode].title)
                )
              )
            )
          ),
          React.DOM.div( {className:"col-sm-6"}, 
            React.DOM.h3(null, "Term"),
            React.DOM.table( {className:"table table-bordered"}, 
              React.DOM.thead(null, 
                React.DOM.tr(null, 
                  headerRow
                )
              ),
              React.DOM.tbody(null, 
                React.DOM.tr(null, 
                  annualRow
                ),
                React.DOM.tr(null, 
                  monthlyRow
                )
              )
            )
          )
        )
      ),
      React.DOM.div( {className:"panel-footer"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-sm-12"}, 
            React.DOM.button( {type:"button", className:"btn btn-default pull-left", onClick:this.props.setActiveStep.bind(null, Step.GENERAL_INFO)}, "Edit"),
            React.DOM.button( {type:"button", className:"btn btn-primary pull-right", onClick:this.props.setActiveStep.bind(null, Step.SEND_QUOTE)}, "Forward to Agent")
          )
        )
      )
    )
  }
})

module.exports = QuoteInfo
},{"Genders":"u6nxnG","HealthCodes":"4dsKtx","ProductCodes":"Pa81WE","States":"9qL0JL","Step":"TP65+d","formatDollars":"uBeo01"}],"Aoobe9":[function(require,module,exports){
/**
 * Displays a list of radio buttons with the given labels and manages tracking
 * of the selected index and label.
 * @jsx React.DOM
 */
var RadioSelect = React.createClass({displayName: 'RadioSelect',
  getInitialState: function() {
    var hasSelectedIndex = (typeof this.props.selectedIndex != 'undefined')
    return {
      selectedIndex: (hasSelectedIndex ? this.props.selectedIndex: null)
    , selectedLabel: (hasSelectedIndex ? this.props.labels[this.props.selectedIndex] : null)
    }
  }

, render: function() {
    var radios = this.props.labels.map(function(label, i) {
      return React.DOM.div( {className:"radio"}, 
        React.DOM.label(null, 
          React.DOM.input( {type:"radio",
            ref:this.props.ref + '_' + i,
            name:this.props.ref,
            value:i,
            checked:this.state.selectedIndex === i,
            onChange:this.handleChange.bind(this, i, label)}),
          label
        )
      )
    }.bind(this))
    return React.DOM.div(null, radios)
  }

, handleChange: function(i, label) {
    this.setState({
      selectedIndex: i
    , selectedLabel: label
    })
  }

, reset: function() {
    this.setState({
      selectedIndex: null
    , selectedLabel: null
    })
  }
})

module.exports = RadioSelect
},{}],"RadioSelect":[function(require,module,exports){
module.exports=require('Aoobe9');
},{}],"SendQuote":[function(require,module,exports){
module.exports=require('dlFddt');
},{}],"dlFddt":[function(require,module,exports){
/** @jsx React.DOM */
var ContactForm = require('ContactForm')
var GlobalModal = require('GlobalModal')
var Step = require('Step')

var SendQuote = React.createClass({displayName: 'SendQuote',
  render: function() {
    return React.DOM.form( {className:"form-horizontal", role:"form"}, 
      React.DOM.div( {className:"panel-body"}, 
        React.DOM.p(null, "One of our experienced agents will be happy to talk to you about your life insurance needs, and will be with you every step of the way when you purchase your policy. Simply tell us when you’d like to be contacted, and we’ll call you."),
        ContactForm( {ref:"contactForm", errorDisplay:"text",
          initialData:this.props.contactInfo}
        )
      ),
      React.DOM.div( {className:"panel-footer"}, 
        React.DOM.div( {className:"row"}, 
          React.DOM.div( {className:"col-sm-12"}, 
            React.DOM.button( {type:"button", className:"btn btn-default pull-left", onClick:this.props.setActiveStep.bind(null, Step.QUOTE_INFO), disabled:this.props.loading}, "Back to Results"),
            React.DOM.button( {type:"button", className:"btn btn-primary pull-right", onClick:this.handleSend, disabled:this.props.loading}, "Send")
          )
        )
      )
    )
  }

, handleSend: function() {
    var data = this.refs.contactForm.getFormData()
    if (data !== null) {
      this.props.handleSend(data, function(err) {
        if (err) {
          return this.props.handleShowGlobalModal(GlobalModal.SERVICE_UNAVAILABLE)
        }
        this.props.setActiveStep(Step.TTFN)
      }.bind(this))
    }
  }
})

module.exports = SendQuote
},{"ContactForm":"5fSavl","GlobalModal":"OEJzib","Step":"TP65+d"}],"ServiceUnavailableModal":[function(require,module,exports){
module.exports=require('idTqBC');
},{}],"idTqBC":[function(require,module,exports){
/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')

var ServiceUnavailableModal = React.createClass({displayName: 'ServiceUnavailableModal',
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, render: function() {
    return React.DOM.div( {className:"modal fade"}, 
      React.DOM.div( {className:"modal-dialog"}, 
        React.DOM.div( {className:"modal-content"}, 
          React.DOM.div( {className:"modal-header"}, 

            this.renderCloseButton(),
            React.DOM.strong(null, "Service Unavailable")
          ),
          React.DOM.div( {className:"modal-body"}, 
            " Thank you for your interest in a life insurance quote. Unfortunately, our service is temporarily unavailable as we work to enhance your experience. To obtain a quote, please ", React.DOM.a( {href:LifeQuoteConstants.LOCAL_SALES_AGENT_URL}, "contact one of our experienced representatives ", React.DOM.span( {className:"glyphicon glyphicon-share"})), " directly. "
          )
        )
      )
    )
  }
})

module.exports = ServiceUnavailableModal
},{"BootstrapModalMixin":"eA1VlO","IncrementingKeyMixin":"5bP6aZ","LifeQuoteConstants":"azwgh7"}],"State":[function(require,module,exports){
module.exports=require('JptrYI');
},{}],"JptrYI":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeEnum = require('makeEnum')

var State = makeEnum(LifeQuoteRefData.STATE_CODES, 'abbreviation')

module.exports = State
},{"LifeQuoteRefData":"EW9yYw","makeEnum":"rpALGJ"}],"9qL0JL":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var makeLookup = require('makeLookup')

var States = makeLookup(LifeQuoteRefData.STATE_CODES)

module.exports = States
},{"LifeQuoteRefData":"EW9yYw","makeLookup":"n2iJBF"}],"States":[function(require,module,exports){
module.exports=require('9qL0JL');
},{}],"Step":[function(require,module,exports){
module.exports=require('TP65+d');
},{}],"TP65+d":[function(require,module,exports){
var Step = {
  GENERAL_INFO: 1
, QUOTE_INFO: 2
, SEND_QUOTE: 3
, TTFN: 4
}

module.exports = Step
},{}],"WSQpzT":[function(require,module,exports){
/** @jsx React.DOM */
var LifeQuoteConstants = require('LifeQuoteConstants')

var TTFN = React.createClass({displayName: 'TTFN',
  render: function() {
    return React.DOM.div(null, 
      React.DOM.div( {className:"panel-body"}, 
        React.DOM.p(null, React.DOM.strong(null, "Thanks for sending us your quote")),
        React.DOM.p(null, "One of our agents will be in touch with you shortly to talk about next steps."),
        React.DOM.a( {href:LifeQuoteConstants.LIFE_INSURANCE_PRODUCTS_URL, className:"btn btn-default"}, "Learn More ", React.DOM.span( {className:"glyphicon glyphicon-share"}))
      )
    )
  }
})

module.exports = TTFN
},{"LifeQuoteConstants":"azwgh7"}],"TTFN":[function(require,module,exports){
module.exports=require('WSQpzT');
},{}],"fpzDSp":[function(require,module,exports){
/** @jsx React.DOM */
var WTFN = React.createClass({displayName: 'WTFN',
  render: function() {
    return React.DOM.div(null, React.DOM.a( {href:"http://facebook.github.io/react", target:"_blank"}, 
      React.DOM.div( {className:"panel-body react"}, 
        React.DOM.img( {src:"img/react_logo.png"})
      )
    ))
  }
})

module.exports = WTFN
},{}],"WTFN":[function(require,module,exports){
module.exports=require('fpzDSp');
},{}],"bsDevice":[function(require,module,exports){
module.exports=require('+EgEH7');
},{}],"+EgEH7":[function(require,module,exports){
var BootstrapDevice = require('BootstrapDevice')

/**
 * Determines the active Bootstrap 3 device class based on device width or
 * current window width.
 * @return {BootstrapDevice}
 */
function bsDevice() {
  var width = (window.innerWidth > 0 ? window.innerWidth : screen.width)
  if (width < 768) return BootstrapDevice.XS
  if (width < 992) return BootstrapDevice.SM
  if (width < 1200) return BootstrapDevice.MD
  return BootstrapDevice.LG
}

module.exports = bsDevice
},{"BootstrapDevice":"kEc4QK"}],"/ujzRj":[function(require,module,exports){
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
},{}],"classNames":[function(require,module,exports){
module.exports=require('/ujzRj');
},{}],"dIngGn":[function(require,module,exports){
/**
 * From Underscore.js 1.5.2
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result
  return function() {
    context = this
    args = arguments
    timestamp = new Date()
    var later = function() {
      var last = (new Date()) - timestamp
      if (last < wait) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) result = func.apply(context, args)
      }
    };
    var callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) result = func.apply(context, args)
    return result
  }
}

module.exports = debounce
},{}],"debounce":[function(require,module,exports){
module.exports=require('dIngGn');
},{}],"z30rCL":[function(require,module,exports){
/** @jsx React.DOM */
var formatDollars = require('formatDollars')

function dollarOptions(start, endInclusive, step) {
  var options = []
  for (var amount = start; amount <= endInclusive; amount += step) {
    options.push(React.DOM.option( {value:amount}, formatDollars(amount)))
  }
  return options
}

module.exports = dollarOptions
},{"formatDollars":"uBeo01"}],"dollarOptions":[function(require,module,exports){
module.exports=require('z30rCL');
},{}],"7t16SC":[function(require,module,exports){
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
},{}],"extend":[function(require,module,exports){
module.exports=require('7t16SC');
},{}],81:[function(require,module,exports){
/** @jsx React.DOM */
var LifeQuote = require('LifeQuote')

var zipCodeMatch = /zipCode=(\d{5})/.exec(window.location.href)
var queryParamZipCode = (zipCodeMatch != null ? zipCodeMatch[1] : '')

React.renderComponent(LifeQuote( {queryParamZipCode:queryParamZipCode}),
                      document.getElementById('lifequote'))

},{"LifeQuote":"eKx8f8"}],"formatDollars":[function(require,module,exports){
module.exports=require('uBeo01');
},{}],"uBeo01":[function(require,module,exports){
function formatDollars(dollars) {
  return '$' + dollars.toLocaleString()
}

module.exports = formatDollars
},{}],"uYZj4l":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var genderOptions = refDataOptions.bind(null, LifeQuoteRefData.GENDER_CODES, 'title')

module.exports = genderOptions
},{"LifeQuoteRefData":"EW9yYw","refDataOptions":"H0+oIr"}],"genderOptions":[function(require,module,exports){
module.exports=require('uYZj4l');
},{}],"f6839E":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var healthOptions = refDataOptions.bind(null, LifeQuoteRefData.HEALTH_CODES, 'title')

module.exports = healthOptions
},{"LifeQuoteRefData":"EW9yYw","refDataOptions":"H0+oIr"}],"healthOptions":[function(require,module,exports){
module.exports=require('f6839E');
},{}],"integerOptions":[function(require,module,exports){
module.exports=require('hVA4Ia');
},{}],"hVA4Ia":[function(require,module,exports){
/** @jsx React.DOM */
function integerOptions(start, endInclusive) {
  var options = []
  for (var i = start; i <= endInclusive; i++) {
    options.push(React.DOM.option( {value:i}, i))
  }
  return options
}

module.exports = integerOptions
},{}],"isZip":[function(require,module,exports){
module.exports=require('LWSQNP');
},{}],"LWSQNP":[function(require,module,exports){
var isZip = function() {
  var ZIP_RE = /^\d{5}(?:-?\d{4})?$/
  return function isZip(value) {
    return ZIP_RE.test(value)
  }
}()

module.exports = isZip
},{}],"makeEnum":[function(require,module,exports){
module.exports=require('rpALGJ');
},{}],"rpALGJ":[function(require,module,exports){
// Enums for direct access to codes by name (in CONSTANT_CAPS_STYLE)
function makeEnum(refData, nameProp) {
  var enum_ = {}
  refData.forEach(function(data) {
    enum_[data[nameProp].replace(/\s/g, '_').toUpperCase()] = data.code
  })
  return enum_
}

module.exports = makeEnum
},{}],"makeLookup":[function(require,module,exports){
module.exports=require('n2iJBF');
},{}],"n2iJBF":[function(require,module,exports){
// Code -> Ref Data Lookups
function makeLookup(refData) {
  var lookup = {}
  refData.forEach(function(data) {
    lookup[data.code] = data
  })
  return lookup
}

module.exports = makeLookup
},{}],"productOptions":[function(require,module,exports){
module.exports=require('dNQISB');
},{}],"dNQISB":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var productOptions = refDataOptions.bind(null, LifeQuoteRefData.PRODUCT_CODES, 'name')

module.exports = productOptions
},{"LifeQuoteRefData":"EW9yYw","refDataOptions":"H0+oIr"}],"refDataOptions":[function(require,module,exports){
module.exports=require('H0+oIr');
},{}],"H0+oIr":[function(require,module,exports){
/** @jsx React.DOM */
function refDataOptions(refData, optionProp) {
  return refData.map(function(datum) {
    return React.DOM.option( {value:datum.code}, datum[optionProp])
  })
}

module.exports = refDataOptions
},{}],"JYeLZl":[function(require,module,exports){
var LifeQuoteRefData = require('LifeQuoteRefData')

var refDataOptions = require('refDataOptions')

var stateOptions = refDataOptions.bind(null, LifeQuoteRefData.STATE_CODES, 'abbreviation')

module.exports = stateOptions
},{"LifeQuoteRefData":"EW9yYw","refDataOptions":"H0+oIr"}],"stateOptions":[function(require,module,exports){
module.exports=require('JYeLZl');
},{}],"aYnlO3":[function(require,module,exports){
var TRIM_RE = /^\s+|\s+$/g

function trim(string) {
  return string.replace(TRIM_RE, '')
}

module.exports = trim
},{}],"trim":[function(require,module,exports){
module.exports=require('aYnlO3');
},{}]},{},[81])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcY29kZVxcamF2YXNjcmlwdFxccmVhY3RcXGxpZmVxdW90ZVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvQm9vdHN0cmFwRGV2aWNlLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0Jvb3RzdHJhcE1vZGFsTWl4aW4uanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvQ2FsbFlvdU1vZGFsLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0NvbnRhY3RGb3JtLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0VtYWlsVXNNb2RhbC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9Gb3JtTWl4aW4uanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvR2VuZGVyLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0dlbmRlcnMuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvR2VuZXJhbEluZm8uanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvR2VuZXJhbEluZm9Nb2RhbC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9HbG9iYWxNb2RhbC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9IZWFsdGhDb2RlLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0hlYWx0aENvZGVNb2RhbC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9IZWFsdGhDb2Rlcy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9IZWxwSWNvbi5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9JbmNyZW1lbnRpbmdLZXlNaXhpbi5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9MZWFkU2VydmljZS5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9MaWZlUXVvdGUuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvTGlmZVF1b3RlQ29uc3RhbnRzLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL0xpZmVRdW90ZVJlZkRhdGEuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvTmVlZHNDYWxjdWxhdG9yTW9kYWwuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvUGVybWFuZW50SW5zdXJhbmNlTW9kYWwuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvUG9saWN5QWR2aXNvck1vZGFsLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL1Byb2R1Y3RDb2RlLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL1Byb2R1Y3RDb2Rlcy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9RQW5kQU1vZGFsLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL1F1b3RlSW5mby5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9SYWRpb1NlbGVjdC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9TZW5kUXVvdGUuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvU2VydmljZVVuYXZhaWxhYmxlTW9kYWwuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvU3RhdGUuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvU3RhdGVzLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL1N0ZXAuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvVFRGTi5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9XVEZOLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL2JzRGV2aWNlLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL2NsYXNzTmFtZXMuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvZGVib3VuY2UuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvZG9sbGFyT3B0aW9ucy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9leHRlbmQuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvZmFrZV9jZmFhNDA1MC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9mb3JtYXREb2xsYXJzLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL2dlbmRlck9wdGlvbnMuanMiLCJDOi9jb2RlL2phdmFzY3JpcHQvcmVhY3QvbGlmZXF1b3RlL2J1aWxkL21vZHVsZXMvaGVhbHRoT3B0aW9ucy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9pbnRlZ2VyT3B0aW9ucy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9pc1ppcC5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9tYWtlRW51bS5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy9tYWtlTG9va3VwLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL3Byb2R1Y3RPcHRpb25zLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL3JlZkRhdGFPcHRpb25zLmpzIiwiQzovY29kZS9qYXZhc2NyaXB0L3JlYWN0L2xpZmVxdW90ZS9idWlsZC9tb2R1bGVzL3N0YXRlT3B0aW9ucy5qcyIsIkM6L2NvZGUvamF2YXNjcmlwdC9yZWFjdC9saWZlcXVvdGUvYnVpbGQvbW9kdWxlcy90cmltLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEJvb3RzdHJhcCAzIGRldmljZSBjbGFzc2VzLlxuICogQGVudW0ge251bWJlcn1cbiAqL1xudmFyIEJvb3RzdHJhcERldmljZSA9IHtcbiAgWFM6IDBcbiwgU006IDFcbiwgTUQ6IDJcbiwgTEc6IDNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb290c3RyYXBEZXZpY2UiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBoYW5kbGVyUHJvcHMgPVxuICBbJ2hhbmRsZVNob3cnLCAnaGFuZGxlU2hvd24nLCAnaGFuZGxlSGlkZScsICdoYW5kbGVIaWRkZW4nXVxuXG52YXIgYnNNb2RhbEV2ZW50cyA9IHtcbiAgaGFuZGxlU2hvdzogJ3Nob3cuYnMubW9kYWwnXG4sIGhhbmRsZVNob3duOiAnc2hvd24uYnMubW9kYWwnXG4sIGhhbmRsZUhpZGU6ICdoaWRlLmJzLm1vZGFsJ1xuLCBoYW5kbGVIaWRkZW46ICdoaWRkZW4uYnMubW9kYWwnXG59XG5cbnZhciBCb290c3RyYXBNb2RhbE1peGluID0ge1xuICBwcm9wVHlwZXM6IHtcbiAgICBoYW5kbGVTaG93OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAsIGhhbmRsZVNob3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAsIGhhbmRsZUhpZGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICwgaGFuZGxlSGlkZGVuOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAsIGJhY2tkcm9wOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICAsIGtleWJvYXJkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICAsIHNob3c6IFJlYWN0LlByb3BUeXBlcy5ib29sXG4gICwgcmVtb3RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gIH1cblxuLCBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZHJvcDogdHJ1ZVxuICAgICwga2V5Ym9hcmQ6IHRydWVcbiAgICAsIHNob3c6IHRydWVcbiAgICAsIHJlbW90ZTogJydcbiAgICB9XG4gIH1cblxuLCBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRtb2RhbCA9ICQodGhpcy5nZXRET01Ob2RlKCkpLm1vZGFsKHtcbiAgICAgIGJhY2tkcm9wOiB0aGlzLnByb3BzLmJhY2tkcm9wXG4gICAgLCBrZXlib2FyZDogdGhpcy5wcm9wcy5rZXlib2FyZFxuICAgICwgc2hvdzogdGhpcy5wcm9wcy5zaG93XG4gICAgLCByZW1vdGU6IHRoaXMucHJvcHMucmVtb3RlXG4gICAgfSlcbiAgICBoYW5kbGVyUHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAodGhpc1twcm9wXSkge1xuICAgICAgICAkbW9kYWwub24oYnNNb2RhbEV2ZW50c1twcm9wXSwgdGhpc1twcm9wXSlcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzW3Byb3BdKSB7XG4gICAgICAgICRtb2RhbC5vbihic01vZGFsRXZlbnRzW3Byb3BdLCB0aGlzLnByb3BzW3Byb3BdKVxuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSlcbiAgfVxuXG4sIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG1vZGFsID0gJCh0aGlzLmdldERPTU5vZGUoKSlcbiAgICBoYW5kbGVyUHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAodGhpc1twcm9wXSkge1xuICAgICAgICAkbW9kYWwub2ZmKGJzTW9kYWxFdmVudHNbcHJvcF0sIHRoaXNbcHJvcF0pXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wc1twcm9wXSkge1xuICAgICAgICAkbW9kYWwub2ZmKGJzTW9kYWxFdmVudHNbcHJvcF0sIHRoaXMucHJvcHNbcHJvcF0pXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG5cbiwgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLmdldERPTU5vZGUoKSkubW9kYWwoJ2hpZGUnKVxuICB9XG5cbiwgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzLmdldERPTU5vZGUoKSkubW9kYWwoJ3Nob3cnKVxuICB9XG5cbiwgdG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMuZ2V0RE9NTm9kZSgpKS5tb2RhbCgndG9nZ2xlJylcbiAgfVxuXG4sIHJlbmRlckNsb3NlQnV0dG9uOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmJ1dHRvbihcbiAgICAgIHt0eXBlOlwiYnV0dG9uXCIsXG4gICAgICBjbGFzc05hbWU6XCJjbG9zZVwiLFxuICAgICAgb25DbGljazp0aGlzLmhpZGUsXG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDp7X19odG1sOiAnJnRpbWVzJ319XG4gICAgKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwTW9kYWxNaXhpbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIEJvb3RzdHJhcE1vZGFsTWl4aW4gPSByZXF1aXJlKCdCb290c3RyYXBNb2RhbE1peGluJylcbnZhciBDb250YWN0Rm9ybSA9IHJlcXVpcmUoJ0NvbnRhY3RGb3JtJylcbnZhciBHbG9iYWxNb2RhbCA9IHJlcXVpcmUoJ0dsb2JhbE1vZGFsJylcbnZhciBJbmNyZW1lbnRpbmdLZXlNaXhpbiA9IHJlcXVpcmUoJ0luY3JlbWVudGluZ0tleU1peGluJylcblxudmFyIENhbGxZb3VNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0NhbGxZb3VNb2RhbCcsXG4gIG1peGluczogW0Jvb3RzdHJhcE1vZGFsTWl4aW4sIEluY3JlbWVudGluZ0tleU1peGluXVxuXG4sIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbnQ6IGZhbHNlXG4gICAgfVxuICB9XG5cbiwgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGVudCwgZm9vdGVyXG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlbnQpIHtcbiAgICAgIGNvbnRlbnQgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBSZWFjdC5ET00uc3Ryb25nKG51bGwsIFwiVGhhbmsgeW91IGZvciB5b3VyIGludGVyZXN0IGluIGxpZmUgaW5zdXJhbmNlLlwiKSksXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiT25lIG9mIG91ciBleHBlcmllbmNlZCBhZ2VudHMgd2lsbCBiZSBoYXBweSB0byB0YWxrIHRvIHlvdSBhYm91dCB5b3VyIGxpZmUgaW5zdXJhbmNlIG5lZWRzLiBTaW1wbHkgdGVsbCB1cyB3aGVuIHlvdeKAmWQgbGlrZSB0byBiZSBjb250YWN0ZWQsIGFuZCB3ZeKAmWxsIGNhbGwgeW91LlwiKSxcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlBsZWFzZSBmaWxsIG91dCB0aGUgZm9sbG93aW5nIGZpZWxkc1wiKSksXG4gICAgICAgIENvbnRhY3RGb3JtKCB7cmVmOlwiY29udGFjdEZvcm1cIiwgZW1haWw6ZmFsc2UsIGVycm9yRGlzcGxheTpcInRvb2x0aXBcIixcbiAgICAgICAgICBpbml0aWFsRGF0YTp0aGlzLnByb3BzLmNvbnRhY3RJbmZvfVxuICAgICAgICApXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhhbmRsZVN1Ym1pdH0sIFwiU3VibWl0XCIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29udGVudCA9IFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiVGhhbmsgeW91IGZvciBjb250YWN0aW5nIHVzLiBPbmUgb2Ygb3VyIGFnZW50cyB3aWxsIGJlIGluIHRvdWNoIHdpdGggeW91IHNob3J0bHkuXCIpXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhpZGV9LCBcIkNsb3NlXCIpXG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwgZmFkZVwifSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZGlhbG9nXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWNvbnRlbnRcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1oZWFkZXJcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIldl4oCZbGwgY2FsbCB5b3VcIilcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1ib2R5XCJ9LCBcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWZvb3RlclwiLCBzdHlsZTp7bWFyZ2luVG9wOiAwfX0sIFxuICAgICAgICAgICAgZm9vdGVyXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG5cbiwgaGFuZGxlU3VibWl0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMucmVmcy5jb250YWN0Rm9ybS5nZXRGb3JtRGF0YSgpXG4gICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucHJvcHMuaGFuZGxlU2VuZChkYXRhLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlU2V0TmV4dEdsb2JhbE1vZGFsKEdsb2JhbE1vZGFsLlNFUlZJQ0VfVU5BVkFJTEFCTEUpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VudDogdHJ1ZX0pXG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxZb3VNb2RhbCIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIEJvb3RzdHJhcERldmljZSA9IHJlcXVpcmUoJ0Jvb3RzdHJhcERldmljZScpXG52YXIgRm9ybU1peGluID0gcmVxdWlyZSgnRm9ybU1peGluJylcbnZhciBMaWZlUXVvdGVDb25zdGFudHMgPSByZXF1aXJlKCdMaWZlUXVvdGVDb25zdGFudHMnKVxuXG52YXIgYnNEZXZpY2UgPSByZXF1aXJlKCdic0RldmljZScpXG52YXIgJGMgPSByZXF1aXJlKCdjbGFzc05hbWVzJylcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKVxudmFyIHN0YXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3N0YXRlT3B0aW9ucycpXG52YXIgdHJpbSA9IHJlcXVpcmUoJ3RyaW0nKVxudmFyIGlzWmlwID0gcmVxdWlyZSgnaXNaaXAnKVxuXG52YXIgQ29udGFjdEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDb250YWN0Rm9ybScsXG4gIG1peGluczogW0Zvcm1NaXhpbl1cblxuLCBwcm9wVHlwZXM6IHtcbiAgICBlbWFpbDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgLCBxdWVzdGlvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgLCBlcnJvckRpc3BsYXk6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3RleHQnLCAndG9vbHRpcCddKS5yZXF1aXJlZFxuICAsIGluaXRpYWxEYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gIH1cblxuLCBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlbWFpbDogdHJ1ZVxuICAgICwgcXVlc3Rpb246IGZhbHNlXG4gICAgLCBpbml0aWFsRGF0YToge31cbiAgICB9XG4gIH1cblxuLCBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7ZXJyb3JzOiB7fX1cbiAgfVxuXG4sIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZXJyb3JEaXNwbGF5ID09ICd0b29sdGlwJykge1xuICAgICAgdGhpcy51cGRhdGVFcnJvclRvb2x0aXBzKHRoaXMuc3RhdGUuZXJyb3JzLCBuZXh0U3RhdGUuZXJyb3JzLCB7XG4gICAgICAgIHBsYWNlbWVudDogYnNEZXZpY2UoKSA+PSBCb290c3RyYXBEZXZpY2UuTUQgPyAnYXV0byByaWdodCcgOiAnYm90dG9tJ1xuICAgICAgLCB0cmlnZ2VyOiAnaG92ZXIgY2xpY2snXG4gICAgICAsIGFuaW1hdGlvbjogZmFsc2VcbiAgICAgICwgY29udGFpbmVyOiAnYm9keSdcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgZmllbGQgcmVmZXJlbmNlIG5hbWUsIHJldHVybnMgdGhlIHJlZmVyZW5jZSBuYW1lIGZvciBkaXNwbGF5IG9mXG4gICAqIGVycm9yIG1lc3NhZ2UgZm9yIHRoYXQgZmllbGQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFJlZlxuICAgKi9cbiwgZ2V0RXJyb3JSZWY6IGZ1bmN0aW9uKGZpZWxkUmVmKSB7XG4gICAgcmV0dXJuIGZpZWxkUmVmICsgJy1lcnJvcidcbiAgfVxuXG4sIGdldEZpZWxkUmVmczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpZWxkUmVmcyA9IFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3Bob25lTm1icicsICdhZGRyZXNzJywgJ2NpdHknLCAnc3RhdGVDb2RlJywgJ3ppcENvZGUnXVxuICAgIGlmICh0aGlzLnByb3BzLmVtYWlsKSBmaWVsZFJlZnMucHVzaCgnZW1haWxBZGRyJylcbiAgICBpZiAodGhpcy5wcm9wcy5xdWVzdGlvbikgZmllbGRSZWZzLnB1c2goJ3F1ZXN0aW9uJylcbiAgICByZXR1cm4gZmllbGRSZWZzXG4gIH1cblxuLCBnZXRGb3JtRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEgPSB7fVxuICAgICAgLCBlcnJvcnMgPSB7fVxuICAgIHRoaXMuZ2V0RmllbGRSZWZzKCkuZm9yRWFjaChmdW5jdGlvbihmaWVsZFJlZikge1xuICAgICAgZGF0YVtmaWVsZFJlZl0gPSB0cmltKHRoaXMucmVmc1tmaWVsZFJlZl0uZ2V0RE9NTm9kZSgpLnZhbHVlKVxuICAgICAgaWYgKCFkYXRhW2ZpZWxkUmVmXSkge1xuICAgICAgICBlcnJvcnNbZmllbGRSZWZdID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKVxuICAgIGlmICghKCdwaG9uZU5tYnInIGluIGVycm9ycykpIHtcbiAgICAgIGlmICgvW14tXFxkXS8udGVzdChkYXRhLnBob25lTm1icikpIHtcbiAgICAgICAgZXJyb3JzLnBob25lTm1iciA9ICdJbnZhbGlkIGNoYXJhY3RlcnMgaW4gcGhvbmUgbnVtYmVyJ1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGF0YS5waG9uZU5tYnIucmVwbGFjZSgvLS9nLCAnJykubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgZXJyb3JzLnBob25lTm1iciA9ICdNdXN0IGNvbnRhaW4gYXQgbGVhc3QgMTAgZGlnaXRzJ1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoISgnemlwQ29kZScgaW4gZXJyb3JzKSAmJiAhaXNaaXAoZGF0YS56aXBDb2RlKSkge1xuICAgICAgZXJyb3JzLnppcENvZGUgPSAnTXVzdCBiZSA1IGRpZ3RzIG9yIDUrNCBkaWdpdHMnXG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmVtYWlsICYmICEoJ2VtYWlsQWRkcicgaW4gZXJyb3JzKSAgJiYgIXZhbGlkYXRvci5pc0VtYWlsKGRhdGEuZW1haWxBZGRyKSkge1xuICAgICAgZXJyb3JzLmVtYWlsQWRkciA9ICdNdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzcydcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JzOiBlcnJvcnN9KVxuXG4gICAgZm9yICh2YXIgZXJyb3IgaW4gZXJyb3JzKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBkYXRhLnN0YXRlQ29kZSA9IE51bWJlcihkYXRhLnN0YXRlQ29kZSlcbiAgICBkYXRhLmN1cnJlbnRDdXN0b21lciA9IHRoaXMucmVmcy5jdXJyZW50Q3VzdG9tZXJZZXMuZ2V0RE9NTm9kZSgpLmNoZWNrZWQgPyAnWWVzJyA6ICdObydcbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiwgZ2V0RGVmYXVsdFZhbHVlOiBmdW5jdGlvbihmaWVsZFJlZiwgaW5pdGlhbERlZmF1bHREYXRhKSB7XG4gICAgcmV0dXJuIChmaWVsZFJlZiBpbiB0aGlzLnByb3BzLmluaXRpYWxEYXRhXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMuaW5pdGlhbERhdGFbZmllbGRSZWZdXG4gICAgICAgICAgICA6IGluaXRpYWxEZWZhdWx0RGF0YSlcbiAgfVxuXG4sIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb3JtLWhvcml6b250YWxcIn0sIFxuICAgICAgdGhpcy50ZXh0SW5wdXQoJ2ZpcnN0TmFtZScsICdGaXJzdCBOYW1lJyksXG4gICAgICB0aGlzLnRleHRJbnB1dCgnbGFzdE5hbWUnLCAnTGFzdCBOYW1lJyksXG4gICAgICB0aGlzLnRleHRJbnB1dCgncGhvbmVObWJyJywgJ1Bob25lIG51bWJlcicpLFxuICAgICAgdGhpcy5wcm9wcy5lbWFpbCAmJiB0aGlzLnRleHRJbnB1dCgnZW1haWxBZGRyJywgJ0VtYWlsJyksXG4gICAgICB0aGlzLnByb3BzLnF1ZXN0aW9uICYmIHRoaXMudGV4dGFyZWEoJ3F1ZXN0aW9uJywgJ1F1ZXN0aW9uJyksXG4gICAgICB0aGlzLnRleHRJbnB1dCgnYWRkcmVzcycsICdBZGRyZXNzJyksXG4gICAgICB0aGlzLnRleHRJbnB1dCgnY2l0eScsICdDaXR5JyksXG4gICAgICB0aGlzLnNlbGVjdCgnc3RhdGVDb2RlJywgJ1N0YXRlJywgc3RhdGVPcHRpb25zKSxcbiAgICAgIHRoaXMudGV4dElucHV0KCd6aXBDb2RlJywgJ1ppcCBDb2RlJyksXG4gICAgICB0aGlzLnJhZGlvSW5saW5lcygnY3VycmVudEN1c3RvbWVyJ1xuICAgICAgICwgJ0FyZSB5b3UgY3VycmVudGx5IGEgJyArIExpZmVRdW90ZUNvbnN0YW50cy5DT01QQU5ZICsgJyBDdXN0b21lcj8nXG4gICAgICAgLCBbJ1llcycsICdObyddXG4gICAgICAgLCB7ZGVmYXVsdFZhbHVlOiAnTm8nfVxuICAgICAgIClcbiAgICApXG4gIH1cblxuLCB0ZXh0SW5wdXQ6IGZ1bmN0aW9uKGlkLCBsYWJlbCwga3dhcmdzKSB7XG4gICAga3dhcmdzID0gZXh0ZW5kKHtkZWZhdWx0VmFsdWU6ICcnfSwga3dhcmdzKVxuICAgIHZhciBpbnB1dCA9XG4gICAgICBSZWFjdC5ET00uaW5wdXQoIHt0eXBlOlwidGV4dFwiLCBjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2xcIiwgaWQ6aWQsIHJlZjppZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOnRoaXMuZ2V0RGVmYXVsdFZhbHVlKGlkLCBrd2FyZ3MuZGVmYXVsdFZhbHVlKX1cbiAgICAgIClcbiAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQoaWQsIGxhYmVsLCBpbnB1dCwga3dhcmdzKVxuICB9XG5cbiwgdGV4dGFyZWE6IGZ1bmN0aW9uKGlkLCBsYWJlbCwga3dhcmdzKSB7XG4gICAga3dhcmdzID0gZXh0ZW5kKHtkZWZhdWx0VmFsdWU6ICcnfSwga3dhcmdzKVxuICAgIHZhciB0ZXh0YXJlYSA9XG4gICAgICBSZWFjdC5ET00udGV4dGFyZWEoIHtjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2xcIiwgaWQ6aWQsIHJlZjppZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOnRoaXMuZ2V0RGVmYXVsdFZhbHVlKGlkLCBrd2FyZ3MuZGVmYXVsdFZhbHVlKX1cbiAgICAgIClcbiAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQoaWQsIGxhYmVsLCB0ZXh0YXJlYSlcbiAgfVxuXG4sIHNlbGVjdDogZnVuY3Rpb24oaWQsIGxhYmVsLCB2YWx1ZXMsIGt3YXJncykge1xuICAgIGt3YXJncyA9IGV4dGVuZCh7ZGVmYXVsdFZhbHVlOiB2YWx1ZXNbMF19LCBrd2FyZ3MpXG4gICAgdmFyIG9wdGlvbnNcbiAgICBpZiAodHlwZW9mIHZhbHVlcyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zID0gdmFsdWVzKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvcHRpb25zID0gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gUmVhY3QuRE9NLm9wdGlvbigge3ZhbHVlOnZhbHVlfSwgdmFsdWUpXG4gICAgICB9KVxuICAgIH1cbiAgICB2YXIgc2VsZWN0ID1cbiAgICAgIFJlYWN0LkRPTS5zZWxlY3QoIHtjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2xcIiwgaWQ6aWQsIHJlZjppZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOnRoaXMuZ2V0RGVmYXVsdFZhbHVlKGlkLCBrd2FyZ3MuZGVmYXVsdFZhbHVlKX1cbiAgICAgICwgXG4gICAgICAgIG9wdGlvbnNcbiAgICAgIClcbiAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQoaWQsIGxhYmVsLCBzZWxlY3QsIGt3YXJncylcbiAgfVxuXG4sIHJhZGlvSW5saW5lczogZnVuY3Rpb24oaWQsIGxhYmVsLCB2YWx1ZXMsIGt3YXJncykge1xuICAgIGt3YXJncyA9IGV4dGVuZCh7ZGVmYXVsdFZhbHVlOiB2YWx1ZXNbMF19LCBrd2FyZ3MpXG4gICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKGlkLCBrd2FyZ3MuZGVmYXVsdFZhbHVlKVxuICAgIHZhciByYWRpb3MgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gUmVhY3QuRE9NLmxhYmVsKCB7Y2xhc3NOYW1lOlwicmFkaW8taW5saW5lXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInJhZGlvXCIsIHJlZjppZCArIHZhbHVlLCBuYW1lOmlkLCB2YWx1ZTp2YWx1ZSxcbiAgICAgICAgICBkZWZhdWx0Q2hlY2tlZDp2YWx1ZSA9PT0gZGVmYXVsdFZhbHVlfVxuICAgICAgICApLFxuICAgICAgICB2YWx1ZVxuICAgICAgKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuZm9ybUZpZWxkKGlkLCBsYWJlbCwgcmFkaW9zLCBrd2FyZ3MpXG4gIH1cblxuLCBmb3JtRmllbGQ6IGZ1bmN0aW9uKGlkLCBsYWJlbCwgZmllbGQsIGt3YXJncykge1xuICAgIHZhciBmaWVsZENvbENsYXNzID0gJ2NvbC1zbS02J1xuICAgICAgLCBoYXNFcnJvciA9IChpZCBpbiB0aGlzLnN0YXRlLmVycm9ycylcbiAgICAgICwgZXJyb3JEaXNwbGF5XG4gICAgaWYgKHRoaXMucHJvcHMuZXJyb3JEaXNwbGF5ID09ICd0ZXh0Jykge1xuICAgICAgZmllbGRDb2xDbGFzcyA9ICdjb2wtc20tNCdcbiAgICAgIGVycm9yRGlzcGxheSA9IFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNCBoZWxwLXRleHRcIn0sIFxuICAgICAgICBSZWFjdC5ET00ucCgge2NsYXNzTmFtZTpcImZvcm0tY29udHJvbC1zdGF0aWNcIn0sIFxuICAgICAgICAgIGhhc0Vycm9yICYmIHRoaXMuc3RhdGUuZXJyb3JzW2lkXVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOiRjKCdmb3JtLWdyb3VwJywgeydoYXMtZXJyb3InOiBoYXNFcnJvcn0pfSwgXG4gICAgICBSZWFjdC5ET00ubGFiZWwoIHtodG1sRm9yOmlkLCBjbGFzc05hbWU6XCJjb2wtc20tNCBjb250cm9sLWxhYmVsXCJ9LCBsYWJlbCksXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOmZpZWxkQ29sQ2xhc3N9LCBcbiAgICAgICAgZmllbGRcbiAgICAgICksXG4gICAgICBlcnJvckRpc3BsYXlcbiAgICApXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFjdEZvcm0iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBCb290c3RyYXBNb2RhbE1peGluID0gcmVxdWlyZSgnQm9vdHN0cmFwTW9kYWxNaXhpbicpXG52YXIgQ29udGFjdEZvcm0gPSByZXF1aXJlKCdDb250YWN0Rm9ybScpXG52YXIgR2xvYmFsTW9kYWwgPSByZXF1aXJlKCdHbG9iYWxNb2RhbCcpXG52YXIgSW5jcmVtZW50aW5nS2V5TWl4aW4gPSByZXF1aXJlKCdJbmNyZW1lbnRpbmdLZXlNaXhpbicpXG5cbnZhciBFbWFpbFVzTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdFbWFpbFVzTW9kYWwnLFxuICBtaXhpbnM6IFtCb290c3RyYXBNb2RhbE1peGluLCBJbmNyZW1lbnRpbmdLZXlNaXhpbl1cblxuLCBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZW50OiBmYWxzZVxuICAgIH1cbiAgfVxuXG4sIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRlbnQsIGZvb3RlclxuICAgIGlmICghdGhpcy5zdGF0ZS5zZW50KSB7XG4gICAgICBjb250ZW50ID0gUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlRoYW5rIHlvdSBmb3IgeW91ciBpbnRlcmVzdCBpbiBsaWZlIGluc3VyYW5jZS5cIikpLFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIk9uZSBvZiBvdXIgZXhwZXJpZW5jZWQgYWdlbnRzIHdpbGwgYmUgaGFwcHkgdG8gYW5zd2VyIGFsbCB5b3VyIHF1ZXN0aW9ucy4gRW50ZXIgeW91ciBuYW1lLCBlbWFpbCwgYW5kIHRoZSBxdWVzdGlvbiB5b3XigJlkIGxpa2UgdG8gYXNrLCBhbmQgYW4gYWdlbnQgd2lsbCByZXNwb25kIHdpdGhpbiAyNCBob3Vycy5cIiksXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJQbGVhc2UgZmlsbCBvdXQgdGhlIGZvbGxvd2luZyBmaWVsZHNcIikpLFxuICAgICAgICBDb250YWN0Rm9ybSgge3JlZjpcImNvbnRhY3RGb3JtXCIsIHF1ZXN0aW9uOnRydWUsIGVycm9yRGlzcGxheTpcInRvb2x0aXBcIixcbiAgICAgICAgICBpbml0aWFsRGF0YTp0aGlzLnByb3BzLmNvbnRhY3RJbmZvfVxuICAgICAgICApXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhhbmRsZVN1Ym1pdH0sIFwiU3VibWl0XCIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29udGVudCA9IFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiVGhhbmsgeW91IGZvciBjb250YWN0aW5nIHVzLiBPbmUgb2Ygb3VyIGFnZW50cyB3aWxsIGJlIGluIHRvdWNoIHdpdGggeW91IHNob3J0bHkuXCIpXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhpZGV9LCBcIkNsb3NlXCIpXG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwgZmFkZVwifSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZGlhbG9nXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWNvbnRlbnRcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1oZWFkZXJcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIkVtYWlsIHVzXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtYm9keVwifSwgXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb290ZXJcIiwgc3R5bGU6e21hcmdpblRvcDogMH19LCBcbiAgICAgICAgICAgIGZvb3RlclxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4sIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLnJlZnMuY29udGFjdEZvcm0uZ2V0Rm9ybURhdGEoKVxuICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByb3BzLmhhbmRsZVNlbmQoZGF0YSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVNldE5leHRHbG9iYWxNb2RhbChHbG9iYWxNb2RhbC5TRVJWSUNFX1VOQVZBSUxBQkxFKVxuICAgICAgICAgIHJldHVybiB0aGlzLmhpZGUoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbnQ6IHRydWV9KVxuICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBFbWFpbFVzTW9kYWwiLCJ2YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJylcblxudmFyIEZvcm1NaXhpbiA9IHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgZXJyb3IgdG9vbHRpcHMgb24gZmllbGRzIHdoaWNoIGhhdmUgdmFsaWRhdGlvbiBlcnJvcnMuXG4gICAqL1xuICB1cGRhdGVFcnJvclRvb2x0aXBzOiBmdW5jdGlvbihwcmV2RXJyb3JzLCBuZXdFcnJvcnMsIHRvb2x0aXBPcHRpb25zKSB7XG4gICAgZm9yICh2YXIgZmllbGRSZWYgaW4gcHJldkVycm9ycykge1xuICAgICAgaWYgKHR5cGVvZiBuZXdFcnJvcnNbZmllbGRSZWZdID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICQodGhpcy5yZWZzW2ZpZWxkUmVmXS5nZXRET01Ob2RlKCkpLnRvb2x0aXAoJ2Rlc3Ryb3knKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAobmV3RXJyb3JzW2ZpZWxkUmVmXSAhPSBwcmV2RXJyb3JzW2ZpZWxkUmVmXSkge1xuICAgICAgICAkKHRoaXMucmVmc1tmaWVsZFJlZl0uZ2V0RE9NTm9kZSgpKVxuICAgICAgICAgIC50b29sdGlwKCdkZXN0cm95JylcbiAgICAgICAgICAudG9vbHRpcChleHRlbmQoe30sIHRvb2x0aXBPcHRpb25zLCB7dGl0bGU6IG5ld0Vycm9yc1tmaWVsZFJlZl19KSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgZmllbGRSZWYgaW4gbmV3RXJyb3JzKSB7XG4gICAgICBpZiAodHlwZW9mIHByZXZFcnJvcnNbZmllbGRSZWZdID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICQodGhpcy5yZWZzW2ZpZWxkUmVmXS5nZXRET01Ob2RlKCkpXG4gICAgICAgICAgLnRvb2x0aXAoZXh0ZW5kKHt9LCB0b29sdGlwT3B0aW9ucywge3RpdGxlOiBuZXdFcnJvcnNbZmllbGRSZWZdfSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybU1peGluIiwidmFyIExpZmVRdW90ZVJlZkRhdGEgPSByZXF1aXJlKCdMaWZlUXVvdGVSZWZEYXRhJylcblxudmFyIG1ha2VFbnVtID0gcmVxdWlyZSgnbWFrZUVudW0nKVxuXG52YXIgR2VuZGVyID0gbWFrZUVudW0oTGlmZVF1b3RlUmVmRGF0YS5HRU5ERVJfQ09ERVMsICd0aXRsZScpXG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZGVyIiwidmFyIExpZmVRdW90ZVJlZkRhdGEgPSByZXF1aXJlKCdMaWZlUXVvdGVSZWZEYXRhJylcblxudmFyIG1ha2VMb29rdXAgPSByZXF1aXJlKCdtYWtlTG9va3VwJylcblxudmFyIEdlbmRlcnMgPSBtYWtlTG9va3VwKExpZmVRdW90ZVJlZkRhdGEuR0VOREVSX0NPREVTKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmRlcnMiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBHZW5kZXIgPSByZXF1aXJlKCdHZW5kZXInKVxudmFyIEdlbmVyYWxJbmZvTW9kYWwgPSByZXF1aXJlKCdHZW5lcmFsSW5mb01vZGFsJylcbnZhciBIZWFsdGhDb2RlID0gcmVxdWlyZSgnSGVhbHRoQ29kZScpXG52YXIgSGVhbHRoQ29kZU1vZGFsID0gcmVxdWlyZSgnSGVhbHRoQ29kZU1vZGFsJylcbnZhciBMaWZlUXVvdGVDb25zdGFudHMgPSByZXF1aXJlKCdMaWZlUXVvdGVDb25zdGFudHMnKVxudmFyIE5lZWRzQ2FsY3VsYXRvck1vZGFsID0gcmVxdWlyZSgnTmVlZHNDYWxjdWxhdG9yTW9kYWwnKVxudmFyIFBlcm1hbmVudEluc3VyYW5jZU1vZGFsID0gcmVxdWlyZSgnUGVybWFuZW50SW5zdXJhbmNlTW9kYWwnKVxudmFyIFBvbGljeUFkdmlzb3JNb2RhbCA9IHJlcXVpcmUoJ1BvbGljeUFkdmlzb3JNb2RhbCcpXG52YXIgUHJvZHVjdENvZGUgPSByZXF1aXJlKCdQcm9kdWN0Q29kZScpXG52YXIgU3RhdGUgPSByZXF1aXJlKCdTdGF0ZScpXG5cbnZhciAkYyA9IHJlcXVpcmUoJ2NsYXNzTmFtZXMnKVxudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnZGVib3VuY2UnKVxudmFyIGRvbGxhck9wdGlvbnMgPSByZXF1aXJlKCdkb2xsYXJPcHRpb25zJylcbnZhciBnZW5kZXJPcHRpb25zID0gcmVxdWlyZSgnZ2VuZGVyT3B0aW9ucycpXG52YXIgaGVhbHRoT3B0aW9ucyA9IHJlcXVpcmUoJ2hlYWx0aE9wdGlvbnMnKVxudmFyIGludGVnZXJPcHRpb25zID0gcmVxdWlyZSgnaW50ZWdlck9wdGlvbnMnKVxudmFyIGlzWmlwID0gcmVxdWlyZSgnaXNaaXAnKVxudmFyIHByb2R1Y3RPcHRpb25zID0gcmVxdWlyZSgncHJvZHVjdE9wdGlvbnMnKVxudmFyIHN0YXRlT3B0aW9ucyA9IHJlcXVpcmUoJ3N0YXRlT3B0aW9ucycpXG5cbnZhciBHZW5lcmFsSW5mbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0dlbmVyYWxJbmZvJyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3JzOiB7fVxuICAgICwgbW9kYWw6IG51bGxcbiAgICB9XG4gIH1cblxuLCBkZWZhdWx0czoge1xuICAgIGdlbmRlcjogR2VuZGVyLk1BTEVcbiAgLCBhZ2U6IDM1XG4gICwgc3RhdGVDb2RlOiBTdGF0ZS5BTFxuICAsIGNvdmVyYWdlOiAyNTAwMDBcbiAgLCBwcm9kdWN0Q29kZTogUHJvZHVjdENvZGUuVEVSTVxuICAsIGhlYWx0aENvZGU6IEhlYWx0aENvZGUuRVhDRUxMRU5UXG4gIH1cblxuLCBzZXRBY3RpdmVNb2RhbDogZnVuY3Rpb24obW9kYWwsIGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IG1vZGFsfSlcbiAgfVxuXG4sIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGFsXG4gICAgaWYgKHRoaXMuc3RhdGUubW9kYWwgPT09IEdlbmVyYWxJbmZvTW9kYWwuTkVFRFNfQ0FMQ1VMQVRPUilcbiAgICAgICAgbW9kYWwgPSBOZWVkc0NhbGN1bGF0b3JNb2RhbChcbiAgICAgICAgICAgICAgICAgIHtoYW5kbGVBY2NlcHQ6dGhpcy5oYW5kbGVBY2NlcHRDb3ZlcmFnZSxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZUhpZGRlbjp0aGlzLmhhbmRsZU1vZGFsSGlkZGVufVxuICAgICAgICAgICAgICAgIClcbiAgICBlbHNlIGlmICh0aGlzLnN0YXRlLm1vZGFsID09PSBHZW5lcmFsSW5mb01vZGFsLlBPTElDWV9BRFZJU09SKVxuICAgICAgICBtb2RhbCA9IFBvbGljeUFkdmlzb3JNb2RhbChcbiAgICAgICAgICAgICAgICAgIHtoYW5kbGVTZWxlY3RQcm9kdWN0Q29kZTp0aGlzLmhhbmRsZVNlbGVjdFByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgICAgICAgaGFuZGxlSGlkZGVuOnRoaXMuaGFuZGxlTW9kYWxIaWRkZW59XG4gICAgICAgICAgICAgICAgKVxuICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUubW9kYWwgPT09IEdlbmVyYWxJbmZvTW9kYWwuSEVBTFRIX0NPREUpXG4gICAgICAgIG1vZGFsID0gSGVhbHRoQ29kZU1vZGFsKFxuICAgICAgICAgICAgICAgICAge2hhbmRsZUFjY2VwdDp0aGlzLmhhbmRsZUFjY2VwdEhlYWx0aENvZGUsXG4gICAgICAgICAgICAgICAgICBoYW5kbGVIaWRkZW46dGhpcy5oYW5kbGVNb2RhbEhpZGRlbn1cbiAgICAgICAgICAgICAgICApXG4gICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5tb2RhbCA9PT0gR2VuZXJhbEluZm9Nb2RhbC5QRVJNQU5FTlRfSU5TVVJBTkNFKVxuICAgICAgICBtb2RhbCA9IFBlcm1hbmVudEluc3VyYW5jZU1vZGFsKFxuICAgICAgICAgICAgICAgICAge2hhbmRsZVNob3dHbG9iYWxNb2RhbDp0aGlzLmhhbmRsZVNob3dHbG9iYWxNb2RhbCxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZUhpZGRlbjp0aGlzLmhhbmRsZU1vZGFsSGlkZGVufVxuICAgICAgICAgICAgICAgIClcblxuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwsIFJlYWN0LkRPTS5mb3JtKCB7Y2xhc3NOYW1lOlwiZm9ybS1ob3Jpem9udGFsXCIsIHJvbGU6XCJmb3JtXCJ9LCBcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwYW5lbC1ib2R5XCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlNpbXBseSBlbnRlciB5b3VyIGluZm9ybWF0aW9uIGZvciBhIG5vLW9ibGlnYXRpb24gcXVvdGUuXCIpKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2h0bWxGb3I6XCJnZW5kZXJcIiwgY2xhc3NOYW1lOlwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwifSwgXCJHZW5kZXJcIiksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS00XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zZWxlY3QoIHtjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2xcIiwgcmVmOlwiZ2VuZGVyXCIsIGlkOlwiZ2VuZGVyXCIsIGRlZmF1bHRWYWx1ZTp0aGlzLnByb3BzLmluaXRpYWxEYXRhLmdlbmRlciB8fCB0aGlzLmRlZmF1bHRzLmdlbmRlcn0sIFxuICAgICAgICAgICAgICBnZW5kZXJPcHRpb25zKClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoIHtodG1sRm9yOlwiYWdlXCIsIGNsYXNzTmFtZTpcImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIn0sIFwiQWdlXCIpLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc2VsZWN0KCB7Y2xhc3NOYW1lOlwiZm9ybS1jb250cm9sXCIsIHJlZjpcImFnZVwiLCBpZDpcImFnZVwiLCBkZWZhdWx0VmFsdWU6dGhpcy5wcm9wcy5pbml0aWFsRGF0YS5hZ2UgfHwgdGhpcy5kZWZhdWx0cy5hZ2V9LCBcbiAgICAgICAgICAgICAgaW50ZWdlck9wdGlvbnMoMjUsIDcwKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2h0bWxGb3I6XCJzdGF0ZUNvZGVcIiwgY2xhc3NOYW1lOlwiY29sLXNtLTQgY29udHJvbC1sYWJlbFwifSwgXCJTdGF0ZVwiKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY29sLXNtLTRcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLnNlbGVjdCgge2NsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCByZWY6XCJzdGF0ZUNvZGVcIiwgaWQ6XCJzdGF0ZUNvZGVcIiwgZGVmYXVsdFZhbHVlOnRoaXMucHJvcHMuaW5pdGlhbERhdGEuc3RhdGVDb2RlIHx8IHRoaXMuZGVmYXVsdHMuc3RhdGVDb2RlfSwgXG4gICAgICAgICAgICAgIHN0YXRlT3B0aW9ucygpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOiRjKCdmb3JtLWdyb3VwJywgeydoYXMtZXJyb3InOiAnemlwQ29kZScgaW4gdGhpcy5zdGF0ZS5lcnJvcnN9KX0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2h0bWxGb3I6XCJ6aXBDb2RlXCIsIGNsYXNzTmFtZTpcImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIn0sIFwiWmlwIENvZGVcIiksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS00XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCgge2NsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCByZWY6XCJ6aXBDb2RlXCIsIHR5cGU6XCJ0ZXh0XCIsIGlkOlwiemlwQ29kZVwiLFxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6dGhpcy5wcm9wcy5pbml0aWFsRGF0YS56aXBDb2RlLFxuICAgICAgICAgICAgICBvbkNoYW5nZTpkZWJvdW5jZSh0aGlzLmhhbmRsZVppcENoYW5nZSwgMjUwKX1cbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNCBoZWxwLXRleHRcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLnAoIHtjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2wtc3RhdGljXCJ9LCBcbiAgICAgICAgICAgICAgJ3ppcENvZGUnIGluIHRoaXMuc3RhdGUuZXJyb3JzICYmIHRoaXMuc3RhdGUuZXJyb3JzLnppcENvZGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoIHtjbGFzc05hbWU6XCJjb2wtc20tNCBjb250cm9sLWxhYmVsXCJ9LCBcIkRvIHlvdSB1c2UgdG9iYWNjbyBwcm9kdWN0cz9cIiksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS00XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2NsYXNzTmFtZTpcInJhZGlvLWlubGluZVwifSwgUmVhY3QuRE9NLmlucHV0KCB7cmVmOlwidG9iYWNjb1llc1wiLCB0eXBlOlwicmFkaW9cIiwgbmFtZTpcInRvYmFjY29cIiwgZGVmYXVsdENoZWNrZWQ6J3RvYmFjY28nIGluIHRoaXMucHJvcHMuaW5pdGlhbERhdGEgJiYgdGhpcy5wcm9wcy5pbml0aWFsRGF0YS50b2JhY2NvfSksIFwiIFllc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2NsYXNzTmFtZTpcInJhZGlvLWlubGluZVwifSwgUmVhY3QuRE9NLmlucHV0KCB7cmVmOlwidG9iYWNjb05vXCIsIHR5cGU6XCJyYWRpb1wiLCBuYW1lOlwidG9iYWNjb1wiLCBkZWZhdWx0Q2hlY2tlZDondG9iYWNjbycgaW4gdGhpcy5wcm9wcy5pbml0aWFsRGF0YSA/ICF0aGlzLnByb3BzLmluaXRpYWxEYXRhLnRvYmFjY28gOiB0cnVlfSksIFwiIE5vXCIpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKCB7aHRtbEZvcjpcImNvdmVyYWdlXCIsIGNsYXNzTmFtZTpcImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIn0sIFwiQW1vdW50IG9mIGNvdmVyYWdlXCIpLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc2VsZWN0KCB7Y2xhc3NOYW1lOlwiZm9ybS1jb250cm9sXCIsIHJlZjpcImNvdmVyYWdlXCIsIGlkOlwiY292ZXJhZ2VcIiwgZGVmYXVsdFZhbHVlOnRoaXMucHJvcHMuaW5pdGlhbERhdGEuY292ZXJhZ2UgfHwgdGhpcy5kZWZhdWx0cy5jb3ZlcmFnZX0sIFxuICAgICAgICAgICAgICBkb2xsYXJPcHRpb25zKDEwMDAwMCwgOTUwMDAwLCA1MDAwMCkuY29uY2F0KGRvbGxhck9wdGlvbnMoMTAwMDAwMCwgMzAwMDAwMCwgNTAwMDAwKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00ucCgge2NsYXNzTmFtZTpcImZvcm0tY29udHJvbC1zdGF0aWNcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uYSgge2hyZWY6XCIjbmVlZHNjYWxjdWxhdG9yXCIsIG9uQ2xpY2s6dGhpcy5zZXRBY3RpdmVNb2RhbC5iaW5kKG51bGwsIEdlbmVyYWxJbmZvTW9kYWwuTkVFRFNfQ0FMQ1VMQVRPUil9LCBcIkhvdyBtdWNoIGRvIHlvdSBuZWVkP1wiKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2h0bWxGb3I6XCJwcm9kdWN0Q29kZVwiLCBjbGFzc05hbWU6XCJjb2wtc20tNCBjb250cm9sLWxhYmVsXCJ9LCBcIlR5cGUgb2YgY292ZXJhZ2VcIiksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS00XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zZWxlY3QoIHtjbGFzc05hbWU6XCJmb3JtLWNvbnRyb2xcIiwgcmVmOlwicHJvZHVjdENvZGVcIiwgaWQ6XCJwcm9kdWN0Q29kZVwiLCBkZWZhdWx0VmFsdWU6dGhpcy5wcm9wcy5pbml0aWFsRGF0YS5wcm9kdWN0Q29kZSB8fCB0aGlzLmRlZmF1bHRzLnByb2R1Y3RDb2RlfSwgXG4gICAgICAgICAgICAgIHByb2R1Y3RPcHRpb25zKClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00ucCgge2NsYXNzTmFtZTpcImZvcm0tY29udHJvbC1zdGF0aWNcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uYSgge2hyZWY6XCIjcG9saWN5YWR2aXNvclwiLCBvbkNsaWNrOnRoaXMuc2V0QWN0aXZlTW9kYWwuYmluZChudWxsLCBHZW5lcmFsSW5mb01vZGFsLlBPTElDWV9BRFZJU09SKX0sIFwiV2hhdCBraW5kIHNob3VsZCB5b3UgYnV5P1wiKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCgge2h0bWxGb3I6XCJoZWFsdGhDb2RlXCIsIGNsYXNzTmFtZTpcImNvbC1zbS00IGNvbnRyb2wtbGFiZWxcIn0sIFwiSGVhbHRoIGNhdGVnb3J5XCIpLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc2VsZWN0KCB7Y2xhc3NOYW1lOlwiZm9ybS1jb250cm9sXCIsIHJlZjpcImhlYWx0aENvZGVcIiwgaWQ6XCJoZWFsdGhDb2RlXCIsIGRlZmF1bHRWYWx1ZTp0aGlzLnByb3BzLmluaXRpYWxEYXRhLmhlYWx0aENvZGUgfHwgdGhpcy5kZWZhdWx0cy5oZWFsdGhDb2RlfSwgXG4gICAgICAgICAgICAgIGhlYWx0aE9wdGlvbnMoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS00XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwiZm9ybS1jb250cm9sLXN0YXRpY1wifSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5hKCB7aHJlZjpcIiNoZWFsdGhDb2RlXCIsIG9uQ2xpY2s6dGhpcy5zZXRBY3RpdmVNb2RhbC5iaW5kKG51bGwsIEdlbmVyYWxJbmZvTW9kYWwuSEVBTFRIX0NPREUpfSwgXCJXaGF04oCZcyB5b3VyIGNhdGVnb3J5P1wiKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlByaXZhY3kgUG9saWN5XCIpKSxcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJQbGVhc2UgcmVhZCBvdXIgXCIsIFJlYWN0LkRPTS5hKCB7aHJlZjpMaWZlUXVvdGVDb25zdGFudHMuUFJJVkFDWV9QT0xJQ1lfVVJMLCB0YXJnZXQ6XCJfYmxhbmtcIn0sIFwicHJpdmFjeSBwb2xpY3kgXCIsIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1zaGFyZVwifSkpLCBcIiB3aGljaCBleHBsYWlucyBob3cgd2UgdXNlIGFuZCBwcm90ZWN0IHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24uXCIpLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS04IGNvbC1zbS1vZmZzZXQtNFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY2hlY2tib3hcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgUmVhY3QuRE9NLmlucHV0KCB7cmVmOlwicmV2aWV3ZWRcIiwgdHlwZTpcImNoZWNrYm94XCIsIGRlZmF1bHRDaGVja2VkOidyZXZpZXdlZCcgaW4gdGhpcy5wcm9wcy5pbml0aWFsRGF0YSAmJiB0aGlzLnByb3BzLmluaXRpYWxEYXRhLnJldmlld2VkfSksIFwiIEkgaGF2ZSByZXZpZXdlZCB0aGUgcHJpdmFjeSBwb2xpY3kgYW5kIHdhbnQgdG8gY29udGludWVcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJUaGFua3MgZm9yIGhlbHBpbmcgdXMgcHJvdmlkZSB5b3Ugd2l0aCBhIG1vcmUgYWNjdXJhdGUgcXVvdGUuXCIpKVxuICAgICAgKSxcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwYW5lbC1mb290ZXJcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicm93XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY29sLXNtLTEyXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tZGVmYXVsdCBwdWxsLWxlZnRcIiwgZGlzYWJsZWQ6dGhpcy5wcm9wcy5sb2FkaW5nLCBvbkNsaWNrOnRoaXMuaGFuZGxlUmVzZXR9LCBcIlJlc2V0XCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiwgZGlzYWJsZWQ6dGhpcy5wcm9wcy5sb2FkaW5nLCBvbkNsaWNrOnRoaXMuaGFuZGxlR2V0UXVvdGV9LCBcIkdldCBRdW90ZVwiKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICksXG4gICAgbW9kYWxcbiAgICApXG4gIH1cblxuLCBoYW5kbGVaaXBDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB6aXBDb2RlID0gdGhpcy5yZWZzLnppcENvZGUuZ2V0RE9NTm9kZSgpLnZhbHVlXG4gICAgaWYgKCF6aXBDb2RlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcnM6IHt6aXBDb2RlOiAnQSBaaXAgY29kZSBpcyByZXF1aXJlZCd9fSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBlbHNlIGlmICghaXNaaXAoemlwQ29kZSkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yczoge3ppcENvZGU6ICdaaXAgY29kZSBtdXN0IGJlIDUgZGlndHMgb3IgNSs0IGRpZ2l0cyd9fSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yczoge319KVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuLCBoYW5kbGVBY2NlcHRDb3ZlcmFnZTogZnVuY3Rpb24oY292ZXJhZ2UpIHtcbiAgICB0aGlzLnJlZnMuY292ZXJhZ2UuZ2V0RE9NTm9kZSgpLnZhbHVlID1cbiAgICAgICAgTWF0aC5taW4oTWF0aC5tYXgoY292ZXJhZ2UsIDEwMDAwMCksIDMwMDAwMDApXG4gIH1cblxuXG4sIGhhbmRsZVNlbGVjdFByb2R1Y3RDb2RlOiBmdW5jdGlvbihwcm9kdWN0Q29kZSkge1xuICAgIGlmIChwcm9kdWN0Q29kZSkge1xuICAgICAgdGhpcy5yZWZzLnByb2R1Y3RDb2RlLmdldERPTU5vZGUoKS52YWx1ZSA9IHByb2R1Y3RDb2RlXG4gICAgfVxuICB9XG5cbiwgaGFuZGxlQWNjZXB0SGVhbHRoQ29kZTogZnVuY3Rpb24oaGVhbHRoQ29kZSkge1xuICAgIHRoaXMucmVmcy5oZWFsdGhDb2RlLmdldERPTU5vZGUoKS52YWx1ZSA9IGhlYWx0aENvZGVcbiAgfVxuXG4sIGhhbmRsZVNob3dHbG9iYWxNb2RhbDogZnVuY3Rpb24oZ2xvYmFsTW9kYWwpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZVNob3dHbG9iYWxNb2RhbChnbG9iYWxNb2RhbClcbiAgfVxuXG4sIGhhbmRsZU1vZGFsSGlkZGVuOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttb2RhbDogbnVsbH0pXG4gIH1cblxuLCBoYW5kbGVSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgO1snZ2VuZGVyJywgJ2FnZScsICdzdGF0ZUNvZGUnLCAnY292ZXJhZ2UnLCdwcm9kdWN0Q29kZScsICdoZWFsdGhDb2RlJ11cbiAgICAuZm9yRWFjaChmdW5jdGlvbihyZWYpIHtcbiAgICAgIHRoaXMucmVmc1tyZWZdLmdldERPTU5vZGUoKS52YWx1ZSA9IHRoaXMuZGVmYXVsdHNbcmVmXVxuICAgIH0uYmluZCh0aGlzKSlcbiAgICB0aGlzLnJlZnMuemlwQ29kZS5nZXRET01Ob2RlKCkudmFsdWUgPSB0aGlzLnByb3BzLnF1ZXJ5UGFyYW1aaXBDb2RlXG4gICAgdGhpcy5yZWZzLnRvYmFjY29Oby5nZXRET01Ob2RlKCkuY2hlY2tlZCA9IHRydWVcbiAgICB0aGlzLnJlZnMucmV2aWV3ZWQuZ2V0RE9NTm9kZSgpLmNoZWNrZWQgPSBmYWxzZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZXJyb3JzOiB7fVxuICAgIH0pXG4gIH1cblxuLCBoYW5kbGVHZXRRdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVmcy5wcm9kdWN0Q29kZS5nZXRET01Ob2RlKCkudmFsdWUgPT0gUHJvZHVjdENvZGUuUEVSTUFORU5UKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRBY3RpdmVNb2RhbChHZW5lcmFsSW5mb01vZGFsLlBFUk1BTkVOVF9JTlNVUkFOQ0UpXG4gICAgfVxuICAgIGlmICghdGhpcy5oYW5kbGVaaXBDaGFuZ2UoKSkgcmV0dXJuXG4gICAgaWYgKCF0aGlzLnJlZnMucmV2aWV3ZWQuZ2V0RE9NTm9kZSgpLmNoZWNrZWQpIHtcbiAgICAgIHJldHVybiBhbGVydCgnWW91IG11c3QgaW5kaWNhdGUgdGhhdCB5b3UgaGF2ZSByZWFkIG91ciBwcml2YWN5IHBvbGljeSBiZWZvcmUgcHJvY2VlZGluZy4nKVxuICAgIH1cbiAgICB0aGlzLnByb3BzLmhhbmRsZUdldFF1b3RlKHtcbiAgICAgIGdlbmRlcjogdGhpcy5yZWZzLmdlbmRlci5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAsIGFnZTogTnVtYmVyKHRoaXMucmVmcy5hZ2UuZ2V0RE9NTm9kZSgpLnZhbHVlKVxuICAgICwgc3RhdGVDb2RlOiBOdW1iZXIodGhpcy5yZWZzLnN0YXRlQ29kZS5nZXRET01Ob2RlKCkudmFsdWUpXG4gICAgLCB6aXBDb2RlOiB0aGlzLnJlZnMuemlwQ29kZS5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAsIHRvYmFjY286IHRoaXMucmVmcy50b2JhY2NvWWVzLmdldERPTU5vZGUoKS5jaGVja2VkXG4gICAgLCBjb3ZlcmFnZTogTnVtYmVyKHRoaXMucmVmcy5jb3ZlcmFnZS5nZXRET01Ob2RlKCkudmFsdWUpXG4gICAgLCBwcm9kdWN0Q29kZTogTnVtYmVyKHRoaXMucmVmcy5wcm9kdWN0Q29kZS5nZXRET01Ob2RlKCkudmFsdWUpXG4gICAgLCBoZWFsdGhDb2RlOiBOdW1iZXIodGhpcy5yZWZzLmhlYWx0aENvZGUuZ2V0RE9NTm9kZSgpLnZhbHVlKVxuICAgICwgcmV2aWV3ZWQ6IHRoaXMucmVmcy5yZXZpZXdlZC5nZXRET01Ob2RlKCkuY2hlY2tlZFxuICAgIH0pXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhbEluZm8iLCJ2YXIgR2VuZXJhbEluZm9Nb2RhbCA9IHtcbiAgTkVFRFNfQ0FMQ1VMQVRPUjogMVxuLCBQT0xJQ1lfQURWSVNPUjogMlxuLCBIRUFMVEhfQ09ERTogM1xuLCBQRVJNQU5FTlRfSU5TVVJBTkNFOiA0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhbEluZm9Nb2RhbCIsInZhciBHbG9iYWxNb2RhbCA9IHtcbiAgV0VfQ0FMTF9ZT1U6IDFcbiwgRU1BSUxfVVM6IDJcbiwgUV9BTkRfQTogM1xuLCBTRVJWSUNFX1VOQVZBSUxBQkxFOiA0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2xvYmFsTW9kYWwiLCJ2YXIgTGlmZVF1b3RlUmVmRGF0YSA9IHJlcXVpcmUoJ0xpZmVRdW90ZVJlZkRhdGEnKVxuXG52YXIgbWFrZUVudW0gPSByZXF1aXJlKCdtYWtlRW51bScpXG5cbnZhciBIZWFsdGhDb2RlID0gbWFrZUVudW0oTGlmZVF1b3RlUmVmRGF0YS5IRUFMVEhfQ09ERVMsICd0aXRsZScpXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhbHRoQ29kZSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIEJvb3RzdHJhcE1vZGFsTWl4aW4gPSByZXF1aXJlKCdCb290c3RyYXBNb2RhbE1peGluJylcbnZhciBIZWFsdGhDb2RlcyA9IHJlcXVpcmUoJ0hlYWx0aENvZGVzJylcbnZhciBIZWFsdGhDb2RlID0gcmVxdWlyZSgnSGVhbHRoQ29kZScpXG52YXIgSW5jcmVtZW50aW5nS2V5TWl4aW4gPSByZXF1aXJlKCdJbmNyZW1lbnRpbmdLZXlNaXhpbicpXG52YXIgTGlmZVF1b3RlQ29uc3RhbnRzID0gcmVxdWlyZSgnTGlmZVF1b3RlQ29uc3RhbnRzJylcbnZhciBSYWRpb1NlbGVjdCA9IHJlcXVpcmUoJ1JhZGlvU2VsZWN0JylcblxudmFyIGludGVnZXJPcHRpb25zID0gcmVxdWlyZSgnaW50ZWdlck9wdGlvbnMnKVxuXG52YXIgSGVhbHRoQ29kZU1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnSGVhbHRoQ29kZU1vZGFsJyxcbiAgbWl4aW5zOiBbQm9vdHN0cmFwTW9kYWxNaXhpbiwgSW5jcmVtZW50aW5nS2V5TWl4aW5dXG5cbiwgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VnZ2VzdGVkSGVhbHRoQ29kZTogbnVsbFxuICAgICwgZGF0YToge31cbiAgICAsIGVycm9yczoge31cbiAgICB9XG4gIH1cblxuLCBoYW5kbGVSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgO1sxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMV0uZm9yRWFjaChmdW5jdGlvbihudW0pIHtcbiAgICAgIHRoaXMucmVmc1sncXVlc3Rpb24nICsgbnVtXS5yZXNldCgpXG4gICAgfS5iaW5kKHRoaXMpKVxuICAgIHRoaXMucmVmcy5oZWlnaHRGZWV0LmdldERPTU5vZGUoKS5zZWxlY3RlZEluZGV4ID0gMFxuICAgIHRoaXMucmVmcy5oZWlnaHRJbmNoZXMuZ2V0RE9NTm9kZSgpLnNlbGVjdGVkSW5kZXggPSAwXG4gICAgdGhpcy5yZWZzLndlaWdodC5nZXRET01Ob2RlKCkudmFsdWUgPSAnJ1xuICB9XG5cbiwgaGFuZGxlR2V0Q2F0ZWdvcnk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0ge31cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA5OyBpKyspIHtcbiAgICAgIHZhciByYWRpb3MgPSB0aGlzLnJlZnNbJ3F1ZXN0aW9uJyArIGldXG4gICAgICBpZiAocmFkaW9zLnN0YXRlLnNlbGVjdGVkSW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgcmFkaW9zLmdldERPTU5vZGUoKS5wYXJlbnROb2RlLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgcmV0dXJuIGFsZXJ0KCdQbGVhc2UgYW5zd2VyIFF1ZXN0aW9uICMnICsgaSlcbiAgICAgIH1cbiAgICAgIGRhdGFbJ3F1ZXN0aW9uJyArIGldID0gcmFkaW9zLnN0YXRlLnNlbGVjdGVkSW5kZXhcbiAgICB9XG4gICAgaWYgKHRoaXMucmVmcy53ZWlnaHQuZ2V0RE9NTm9kZSgpLnZhbHVlID09ICcnKSB7XG4gICAgICB0aGlzLnJlZnMud2VpZ2h0LmdldERPTU5vZGUoKS5wYXJlbnROb2RlLnNjcm9sbEludG9WaWV3KClcbiAgICAgIHJldHVybiBhbGVydCgnUGxlYXNlIGZpbGwgaW4geW91ciBoZWlnaHQgYW5kIHdlaWdodCcpXG4gICAgfVxuICAgIGRhdGEuaGVpZ2h0RmVldCA9IHRoaXMucmVmcy5oZWlnaHRGZWV0LmdldERPTU5vZGUoKS52YWx1ZVxuICAgIGRhdGEuaGVpZ2h0SW5jaGVzID0gdGhpcy5yZWZzLmhlaWdodEluY2hlcy5nZXRET01Ob2RlKCkudmFsdWVcbiAgICBkYXRhLndlaWdodCA9IHRoaXMucmVmcy53ZWlnaHQuZ2V0RE9NTm9kZSgpLnZhbHVlXG4gICAgaWYgKHRoaXMucmVmcy5xdWVzdGlvbjExLnN0YXRlLnNlbGVjdGVkSW5kZXggPT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVmcy5xdWVzdGlvbjExLmdldERPTU5vZGUoKS5wYXJlbnROb2RlLnNjcm9sbEludG9WaWV3KClcbiAgICAgIHJldHVybiBhbGVydCgnUGxlYXNlIGFuc3dlciBRdWVzdGlvbiAjMTEnKVxuICAgIH1cbiAgICBkYXRhLnF1ZXN0aW9uMTEgPSB0aGlzLnJlZnMucXVlc3Rpb24xMS5zdGF0ZS5zZWxlY3RlZEluZGV4XG5cbiAgICAvLyBUT0RPIENhbGN1bGF0ZSBjYXRlZ29yeVxuICAgIGNvbnNvbGUuaW5mbyhkYXRhKVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgLCBzdWdnZXN0ZWRIZWFsdGhDb2RlOiBIZWFsdGhDb2RlLkdPT0RcbiAgICB9KVxuICB9XG5cbiwgaGFuZGxlQmFjazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c3VnZ2VzdGVkSGVhbHRoQ29kZTogbnVsbH0pXG4gIH1cblxuLCBoYW5kbGVBY2NlcHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMuaGFuZGxlQWNjZXB0KHRoaXMuc3RhdGUuc3VnZ2VzdGVkSGVhbHRoQ29kZSlcbiAgICB0aGlzLmhpZGUoKVxuICB9XG5cbiwgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9keSwgZm9vdGVyXG4gICAgaWYgKHRoaXMuc3RhdGUuc3VnZ2VzdGVkSGVhbHRoQ29kZSA9PSBudWxsKSB7XG4gICAgICBib2R5ID0gUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJQcmljaW5nIGZvciBsaWZlIGluc3VyYW5jZSBpcyBiYXNlZCBvbiBhbiBvdmVyYWxsIHBpY3R1cmUgb2YgeW91ciBoZWFsdGgsIGFtb25nIG90aGVyIGZhY3RvcnMuIEJ5IGFuc3dlcmluZyB0aGUgYnJpZWYgbWVkaWNhbCBxdWVzdGlvbnMgdG8gaGVscCBlc3RpbWF0ZSB5b3VyIGhlYWx0aCBjYXRlZ29yeSwgd2UgY2FuIHByb3ZpZGUgeW91IHdpdGggYSBtb3JlIGFjY3VyYXRlIHF1b3RlLiBcIiApLFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIllvdXIgaW5mb3JtYXRpb24gd2lsbCBub3QgYmUgcmVjb3JkZWQgb3Igc2F2ZWQgaW4gYW55IHdheS4gQWxsIHF1ZXN0aW9ucyBhcmUgcmVxdWlyZWQuXCIpLFxuICAgICAgICBSZWFjdC5ET00uZm9ybSgge3JlZjpcImZvcm1cIiwgcm9sZTpcImZvcm1cIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFwiMS4gV2hlbiB3YXMgdGhlIGxhc3QgdGltZSB5b3UgdXNlZCB0b2JhY2NvP1wiKSxcbiAgICAgICAgICBSYWRpb1NlbGVjdCgge3JlZjpcInF1ZXN0aW9uMVwiLCBzZWxlY3RlZEluZGV4OnRoaXMuc3RhdGUuZGF0YS5xdWVzdGlvbjEsXG4gICAgICAgICAgICBsYWJlbHM6WydOZXZlcicgLCAnTm9uZSBpbiB0aGUgbGFzdCAzNiBtb250aHMnLCAnTm9uZSBpbiB0aGUgbGFzdCAxMiBtb250aHMnLCAnV2l0aGluIHRoZSBsYXN0IDEyIG1vbnRocyddfVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbChudWxsLCBcIjIuIFdoZW4gd2FzIHRoZSBsYXN0IHRpbWUgeW91IHdlcmUgdHJlYXRlZCBmb3IgYWxjb2hvbCBvciBkcnVnIGFidXNlP1wiKSxcbiAgICAgICAgICBSYWRpb1NlbGVjdCgge3JlZjpcInF1ZXN0aW9uMlwiLCBzZWxlY3RlZEluZGV4OnRoaXMuc3RhdGUuZGF0YS5xdWVzdGlvbjIsXG4gICAgICAgICAgICBsYWJlbHM6WydOZXZlcicsICdXaXRoaW4gdGhlIGxhc3QgMTAgeWVhcnMnLCAnMTAgb3IgbW9yZSB5ZWFycyBhZ28nXX1cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCIzLiBEbyB5b3UgaGF2ZSBhbnkgRFVJIGNvbnZpY3Rpb25zP1wiKSxcbiAgICAgICAgICBSYWRpb1NlbGVjdCgge3JlZjpcInF1ZXN0aW9uM1wiLCBzZWxlY3RlZEluZGV4OnRoaXMuc3RhdGUuZGF0YS5xdWVzdGlvbjMsXG4gICAgICAgICAgICBsYWJlbHM6WydObycsICdZZXMsIGxlc3MgdGhhbiA1IHllYXJzIGFnbycsICdZZXMsIG1vcmUgdGhhbiA1IHllYXJzIGFnbyddfVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbChudWxsLCBcIjQuIEhvdyBtYW55IG1vdmluZyB2aW9sYXRpb25zIGhhdmUgeW91IGJlZW4gY29udmljdGVkIG9mIGluIHRoZSBsYXN0IDMgeWVhcnM/XCIpLFxuICAgICAgICAgIFJhZGlvU2VsZWN0KCB7cmVmOlwicXVlc3Rpb240XCIsIHNlbGVjdGVkSW5kZXg6dGhpcy5zdGF0ZS5kYXRhLnF1ZXN0aW9uNCxcbiAgICAgICAgICAgIGxhYmVsczpbJ05vbmUgb3IgMScsICcyJywgJzMgb3IgbW9yZScsICc2IG9yIG1vcmUnXX1cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCI1LiBEbyB5b3UgaGF2ZSBwYXJlbnRzIG9yIHNpYmxpbmdzIHRoYXQgZGllZCBmcm9tIGNhbmNlciwgY2FyZGlhYyBkaXNlYXNlIG9yIGRpYWJldGVzP1wiKSxcbiAgICAgICAgICBSYWRpb1NlbGVjdCgge3JlZjpcInF1ZXN0aW9uNVwiLCBzZWxlY3RlZEluZGV4OnRoaXMuc3RhdGUuZGF0YS5xdWVzdGlvbjUsXG4gICAgICAgICAgICBsYWJlbHM6WydOb25lJywgJ1llcywgb25seSAxIHBhcmVudCBvciBzaWJsaW5nIHByaW9yIHRvIGFnZSA2MCcsICdZZXMsIG9ubHkgMSBwYXJlbnQgb3Igc2libGluZyBiZXR3ZWVuIGFnZXMgNjEtNjUnLCAnTW9yZSB0aGFuIDEgcGFyZW50IG9yIHNpYmxpbmcnXX1cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCI2LiBEbyB5b3UgaGF2ZSBhIGhpc3Rvcnkgb2YgZGlhYmV0ZXMsIGNhcmRpYWMgZGlzZWFzZSwgY2FuY2VyIG9yIHN0cm9rZT9cIiksXG4gICAgICAgICAgUmFkaW9TZWxlY3QoIHtyZWY6XCJxdWVzdGlvbjZcIiwgc2VsZWN0ZWRJbmRleDp0aGlzLnN0YXRlLmRhdGEucXVlc3Rpb242LCBsYWJlbHM6WydObycsICdZZXMnXX0pXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCI3LiBBcmUgeW91IHRha2luZyBhbnkgbWVkaWNhdGlvbiBmb3IgaGlnaCBibG9vZCBwcmVzc3VyZT9cIiksXG4gICAgICAgICAgUmFkaW9TZWxlY3QoIHtyZWY6XCJxdWVzdGlvbjdcIiwgc2VsZWN0ZWRJbmRleDp0aGlzLnN0YXRlLmRhdGEucXVlc3Rpb243LFxuICAgICAgICAgICAgbGFiZWxzOlsnTm8nLCAnWWVzIGFuZCBJIGFtIHVuZGVyIHRoZSBhZ2Ugb2YgNTAnLCAnWWVzIGFuZCBJIGFtIGFnZSA1MCBvciBvdmVyJ119XG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFwiOC4gV2hhdCB3YXMgeW91ciBsYXN0IGJsb29kIHByZXNzdXJlIHJlYWRpbmc/XCIpLFxuICAgICAgICAgIFJhZGlvU2VsZWN0KCB7cmVmOlwicXVlc3Rpb244XCIsIHNlbGVjdGVkSW5kZXg6dGhpcy5zdGF0ZS5kYXRhLnF1ZXN0aW9uOCxcbiAgICAgICAgICAgIGxhYmVsczpbXCJJIGRvbuKAmXQga25vd1wiLCAnTGVzcyB0aGFuIG9yIGVxdWFsIHRvIDE0MC83OCcsICdCZXR3ZWVuIDE0MC83OCBhbmQgMTQwLzkwIGFuZCBJIGFtIGxlc3MgdGhhbiBhZ2UgNTAnLCAnQmV0d2VlbiAxNDAvNzggYW5kIDE1MC85MiBhbmQgSSBhbSBvbGRlciB0aGFuIDUwJywgJzE1MS85MyBhbmQgaGlnaGVyJ119XG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFwiOS4gV2hhdCB3YXMgeW91ciBsYXN0IGNob2xlc3Rlcm9sIHJlYWRpbmc/XCIpLFxuICAgICAgICAgIFJhZGlvU2VsZWN0KCB7cmVmOlwicXVlc3Rpb245XCIsIHNlbGVjdGVkSW5kZXg6dGhpcy5zdGF0ZS5kYXRhLnF1ZXN0aW9uOSxcbiAgICAgICAgICAgIGxhYmVsczpbJ0kgZG9u4oCZdCBrbm93JywgJ0xlc3MgdGhhbiAyMTAnLCAnQmV0d2VlbiAyMTEgYW5kIDI1MCcsICcyNTEtNDAwJywgJzQwMSBvciBoaWdoZXInXX1cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCIxMC4gV2hhdCBpcyB5b3VyIGN1cnJlbnQgaGVpZ2h0IGFuZCB3ZWlnaHQ/XCIpLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb3JtLWhvcml6b250YWxcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoIHtjbGFzc05hbWU6XCJjb2wtc20tMiBjb250cm9sLWxhYmVsXCIsIGh0bWxGb3I6XCJoZWlnaHRGZWV0XCJ9LCBcIkZlZXRcIiksXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tM1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnNlbGVjdCgge2lkOlwiaGVpZ2h0RmVldFwiLCByZWY6XCJoZWlnaHRGZWV0XCIsIGNsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCBkZWZhdWx0VmFsdWU6dGhpcy5zdGF0ZS5kYXRhLmhlaWdodEZlZXR9LCBpbnRlZ2VyT3B0aW9ucyg0LCA2KSlcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKCB7Y2xhc3NOYW1lOlwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiLCBodG1sRm9yOlwiaGVpZ2h0SW5jaGVzXCJ9LCBcIkluY2hlc1wiKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS0zXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uc2VsZWN0KCB7aWQ6XCJoZWlnaHRJbmNoZXNcIiwgcmVmOlwiaGVpZ2h0SW5jaGVzXCIsIGNsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCBkZWZhdWx0VmFsdWU6dGhpcy5zdGF0ZS5kYXRhLmhlaWdodEluY2hlc30sIGludGVnZXJPcHRpb25zKDAsIDExKSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKCB7Y2xhc3NOYW1lOlwiY29sLXNtLTIgY29udHJvbC1sYWJlbFwiLCBodG1sRm9yOlwid2VpZ2h0XCJ9LCBcIldlaWdodFwiKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS0zXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiaW5wdXQtZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgaWQ6XCJ3ZWlnaHRcIiwgcmVmOlwid2VpZ2h0XCIsIGNsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCBkZWZhdWx0VmFsdWU6dGhpcy5zdGF0ZS5kYXRhLndlaWdodH0pLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJpbnB1dC1ncm91cC1hZGRvblwifSwgXCJsYnNcIilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXCIxMS4gRG8geW91IHBpbG90IGFuIGFpcnBsYW5lIG9yIGhlbGljcG90ZXI/XCIpLFxuICAgICAgICAgIFJhZGlvU2VsZWN0KCB7cmVmOlwicXVlc3Rpb24xMVwiLCBzZWxlY3RlZEluZGV4OnRoaXMuc3RhdGUuZGF0YS5xdWVzdGlvbjExLCBsYWJlbHM6WydObycsICdZZXMnXX0pXG4gICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImZvb3Rub3Rlc1wifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJJdOKAmXMgaW1wb3J0YW50IHRvIGtub3cgdGhpcyB0b29sIGlzIGEgZ3VpZGUgdG8gdGhlIG1vc3QgY29tbW9uIHVuZGVyd3JpdGluZyBxdWVzdGlvbnMsIGFuZCBkb2VzIG5vdCByZXByZXNlbnQgZXZlcnkgc2NlbmFyaW8uIFdoZW4geW91IGFwcGx5IGZvciBjb3ZlcmFnZSwgeW91IHdpbGwgYmUgYXNrZWQgdG8gZmlsbCBvdXQgYSBmdWxsIGFwcGxpY2F0aW9uLlwiKSxcbiAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlRoaXMgZXN0aW1hdGVkIGhlYWx0aCBjYXRlZ29yeSBpcyBub3QgZ3VhcmFudGVlZC7CoCBZb3VyIGZpbmFsIHVuZGVyd3JpdGluZyBjbGFzcyB3aWxsIGJlIGRldGVybWluZWQgYnkgdGhlIHJlc3VsdHMgb2YgYW55IGV4YW1pbmF0aW9ucywgbGFib3JhdG9yeSByZXN1bHRzLCBtZWRpY2FsIGhpc3RvcnksIGFuZCBub24tbWVkaWNhbCBpbmZvcm1hdGlvbiBkZXZlbG9wZWQgZHVyaW5nIHRoZSB1bmRlcndyaXRpbmcgcHJvY2Vzcy4gXCIgKVxuICAgICAgICApXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLWRlZmF1bHRcIiwgb25DbGljazp0aGlzLmhhbmRsZVJlc2V0fSwgXCJSZXNldFwiKSxcbiAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1wcmltYXJ5XCIsIG9uQ2xpY2s6dGhpcy5oYW5kbGVHZXRDYXRlZ29yeX0sIFwiR2V0IHlvdXIgY2F0ZWdvcnlcIilcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBib2R5ID0gUmVhY3QuRE9NLnAobnVsbCwgXG4gICAgICAgIFwiIEJhc2VkIG9uIHRoZSBpbmZvcm1hdGlvbiBwcm92aWRlZCwgeW91ciBlc3RpbWF0ZWQgaGVhbHRoIGNhdGVnb3J5IGlzOiBcIiwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBIZWFsdGhDb2Rlc1t0aGlzLnN0YXRlLnN1Z2dlc3RlZEhlYWx0aENvZGVdLnRpdGxlKVxuICAgICAgKVxuICAgICAgZm9vdGVyID0gUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1kZWZhdWx0XCIsIG9uQ2xpY2s6dGhpcy5oYW5kbGVCYWNrfSwgXCJCYWNrXCIpLFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhhbmRsZUFjY2VwdH0sIFwiQWNjZXB0XCIpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbCBmYWRlXCJ9LCBcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1kaWFsb2dcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtY29udGVudFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWhlYWRlclwifSwgXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNsb3NlQnV0dG9uKCksXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Ryb25nKG51bGwsIFwiRGV0ZXJtaW5lIHlvdXIgaGVhbHRoIGNhdGVnb3J5XCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtYm9keVwiLCBzdHlsZTp7aGVpZ2h0OiA1MDAsIG92ZXJmbG93WTogJ3Njcm9sbCd9fSwgXG4gICAgICAgICAgICBib2R5XG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9vdGVyXCIsIHN0eWxlOnttYXJnaW5Ub3A6IDB9fSwgXG4gICAgICAgICAgICBmb290ZXJcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gSGVhbHRoQ29kZU1vZGFsIiwidmFyIExpZmVRdW90ZVJlZkRhdGEgPSByZXF1aXJlKCdMaWZlUXVvdGVSZWZEYXRhJylcblxudmFyIG1ha2VMb29rdXAgPSByZXF1aXJlKCdtYWtlTG9va3VwJylcblxudmFyIEhlYWx0aENvZGVzID0gbWFrZUxvb2t1cChMaWZlUXVvdGVSZWZEYXRhLkhFQUxUSF9DT0RFUylcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFsdGhDb2RlcyIsIi8qKlxuICogRGlzcGxheXMgYSBoZWxwIGljb24gd2hpY2ggZGlzcGxheXMgaGVscCBhcyBhIHBvcG92ZXIgb24gaG92ZXIuIFRoaXNcbiAqIGNvbXBvbmVudCBzaG91bGQgb25seSBoYXZlIHRleHQgYXMgaXRzIGNoaWxkIGNvbnRlbnQuXG4gKiBAanN4IFJlYWN0LkRPTVxuICovXG52YXIgSGVscEljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdIZWxwSWNvbicsXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdseXBoaWNvbjogJ3F1ZXN0aW9uLXNpZ24nXG4gICAgLCBjb250YWluZXI6ICdib2R5J1xuICAgICwgYW5pbWF0aW9uOiBmYWxzZVxuICAgICwgdHJpZ2dlcjogJ2hvdmVyIGNsaWNrJ1xuICAgICwgcGxhY2VtZW50OiAnYXV0byByaWdodCdcbiAgICB9XG4gIH1cblxuLCByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uc3Bhbigge3N0eWxlOntjdXJzb3I6ICdoZWxwJ30sIGNsYXNzTmFtZTonZ2x5cGhpY29uIGdseXBoaWNvbi0nICsgdGhpcy5wcm9wcy5nbHlwaGljb259KVxuICB9XG5cbiwgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICQodGhpcy5nZXRET01Ob2RlKCkpLnBvcG92ZXIoe1xuICAgICAgY29udGVudDogdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICwgY29udGFpbmVyOiB0aGlzLnByb3BzLmNvbnRhaW5lclxuICAgICwgYW5pbWF0aW9uOiB0aGlzLnByb3BzLmFuaW1hdGlvblxuICAgICwgdHJpZ2dlcjogdGhpcy5wcm9wcy50cmlnZ2VyXG4gICAgLCBwbGFjZW1lbnQ6IHRoaXMucHJvcHMucGxhY2VtZW50XG4gICAgfSlcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBIZWxwSWNvbiIsIi8qKlxuICogR2l2ZXMgYSBjb21wb25lbnQgYSBrZXkgd2hpY2ggaXMgbmV2ZXIgdGhlIHNhbWUgaW4gMiBzdWJzZXF1ZW50IGluc3RhbmNlcy5cbiAqIEEgaGFjayB0byBmb3JjZSBCb290c3RyYXAgbW9kYWxzIHRvIHJlLWluaXRpYWxpc2Ugc3RhdGUgd2hlbiB0aGUgc2FtZSBvbmUgaXNcbiAqIGRpc3BsYXllZCByZXBlYXRlZGx5LlxuICovXG52YXIgSW5jcmVtZW50aW5nS2V5TWl4aW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGtleVNlZWQgPSAxXG4gIHJldHVybiB7XG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleToga2V5U2VlZCsrXG4gICAgICB9XG4gICAgfVxuICB9XG59KClcblxubW9kdWxlLmV4cG9ydHMgPSBJbmNyZW1lbnRpbmdLZXlNaXhpbiIsImZ1bmN0aW9uIGRvbmUoY2IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjYihudWxsLCBkYXRhKVxuICB9XG59XG5cbmZ1bmN0aW9uIGZhaWwoY2IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICBjYih7eGhyOiB4aHIsIHRleHRTdGF0dXM6IHRleHRTdGF0dXMsIGVycm9yVGhyb3duOiBlcnJvclRocm93bn0pXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVxdWVzdChtZXRob2QsIHBhcmFtcywgY2IpIHtcbiAgdmFyIHVybCA9IHBhcmFtc1xuICAgICwgZGF0YVxuICBpZiAodHlwZW9mIHBhcmFtcyA9PSAnb2JqZWN0Jykge1xuICAgIHVybCA9IHBhcmFtcy51cmxcbiAgICBpZiAoJ2RhdGEnIGluIHBhcmFtcykgZGF0YSA9IHBhcmFtcy5kYXRhXG4gIH1cbiAgdmFyIGpxQ29uZmlnID0ge1xuICAgIHR5cGU6IG1ldGhvZFxuICAsIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbidcbiAgLCBkYXRhVHlwZTogJ2pzb24nXG4gICwgdXJsOiB1cmxcbiAgfVxuICBpZiAodHlwZW9mIGRhdGEgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBqcUNvbmZpZy5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgfVxuICAkLmFqYXgoanFDb25maWcpLnRoZW4oZG9uZShjYiksIGZhaWwoY2IpKVxufVxuXG52YXIgcG9zdCA9IHJlcXVlc3QuYmluZChudWxsLCAnUE9TVCcpXG4gICwgcHV0ID0gcmVxdWVzdC5iaW5kKG51bGwsICdQVVQnKVxuXG52YXIgTGVhZFNlcnZpY2UgPSB7XG4gIGNyZWF0ZUxlYWQ6IGZ1bmN0aW9uKGNiKSB7XG4gICAgcG9zdCgnL2FwaS9sZWFkLycsIGNiKVxuICB9XG5cbiwgdXBkYXRlTGVhZDogZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICBwdXQoe3VybDogJy9hcGkvbGVhZCcsIGRhdGE6IGRhdGF9LCBjYilcbiAgfVxuXG4sIGNhbGN1bGF0ZVF1b3RlOiBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgIHBvc3Qoe3VybDogJy9hcGkvcXVvdGUnLCBkYXRhOiBkYXRhfSwgY2IpXG4gIH1cbn1cblxuLy8gTW9jayBzZXJ2aWNlIGNhbGxzIGlmIHdlJ3JlIHJ1bm5pbmcgb2ZmIHRoZSBmaWxlc3lzdGVtXG5pZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09ICdmaWxlOicpIHtcbiAgdmFyIGRlbGF5ID0gZnVuY3Rpb24oKSB7IHJldHVybiA1MDAgKyAoTWF0aC5yYW5kb20oKSAqIDEwMDApIH1cblxuICBMZWFkU2VydmljZSA9IHtcbiAgICBjcmVhdGVMZWFkOiBmdW5jdGlvbihjYikge1xuICAgICAgc2V0VGltZW91dChjYi5iaW5kKG51bGwsIG51bGwsIHtpZDogbmV3IERhdGUoKS52YWx1ZU9mKCkudG9TdHJpbmcoKX0pLCBkZWxheSgpKVxuICAgIH1cblxuICAsIHVwZGF0ZUxlYWQ6IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgICBzZXRUaW1lb3V0KGNiLmJpbmQobnVsbCwgbnVsbCksIGRlbGF5KCkpXG4gICAgfVxuXG4gICwgY2FsY3VsYXRlUXVvdGU6IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgICBzZXRUaW1lb3V0KGNiLmJpbmQobnVsbCwgbnVsbCwge1xuICAgICAgICBwYXltZW50czpbXG4gICAgICAgICAge3Rlcm06IDEwLCBhbm51YWxQYXltZW50OiA0NTAuMCwgbW9udGhseVBheW1lbnQ6IDQ1LjB9XG4gICAgICAgICwge3Rlcm06IDIwLCBhbm51YWxQYXltZW50OiA0NTAuMCwgbW9udGhseVBheW1lbnQ6IDQ1LjB9XG4gICAgICAgICwge3Rlcm06IDMwLCBhbm51YWxQYXltZW50OiA0NTAuMCwgbW9udGhseVBheW1lbnQ6IDQ1LjB9XG4gICAgICAgIF1cbiAgICAgIH0pLCBkZWxheSgpKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExlYWRTZXJ2aWNlIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQ2FsbFlvdU1vZGFsID0gcmVxdWlyZSgnQ2FsbFlvdU1vZGFsJylcbnZhciBFbWFpbFVzTW9kYWwgPSByZXF1aXJlKCdFbWFpbFVzTW9kYWwnKVxudmFyIEdlbmVyYWxJbmZvID0gcmVxdWlyZSgnR2VuZXJhbEluZm8nKVxudmFyIEdsb2JhbE1vZGFsID0gcmVxdWlyZSgnR2xvYmFsTW9kYWwnKVxudmFyIExlYWRTZXJ2aWNlID0gcmVxdWlyZSgnTGVhZFNlcnZpY2UnKVxudmFyIExpZmVRdW90ZUNvbnN0YW50cyA9IHJlcXVpcmUoJ0xpZmVRdW90ZUNvbnN0YW50cycpXG52YXIgUUFuZEFNb2RhbCA9IHJlcXVpcmUoJ1FBbmRBTW9kYWwnKVxudmFyIFF1b3RlSW5mbyA9IHJlcXVpcmUoJ1F1b3RlSW5mbycpXG52YXIgU2VuZFF1b3RlID0gcmVxdWlyZSgnU2VuZFF1b3RlJylcbnZhciBTZXJ2aWNlVW5hdmFpbGFibGVNb2RhbCA9IHJlcXVpcmUoJ1NlcnZpY2VVbmF2YWlsYWJsZU1vZGFsJylcbnZhciBTdGF0ZXMgPSByZXF1aXJlKCdTdGF0ZXMnKVxudmFyIFN0ZXAgPSByZXF1aXJlKCdTdGVwJylcbnZhciBUVEZOID0gcmVxdWlyZSgnVFRGTicpXG52YXIgV1RGTiA9IHJlcXVpcmUoJ1dURk4nKVxuXG52YXIgJGMgPSByZXF1aXJlKCdjbGFzc05hbWVzJylcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKVxuXG52YXIgTGlmZVF1b3RlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTGlmZVF1b3RlJyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RlcDogU3RlcC5HRU5FUkFMX0lORk9cbiAgICAsIGxvYWRpbmc6IGZhbHNlXG4gICAgLCBtb2RhbDogbnVsbFxuICAgICwgbmV4dE1vZGFsOiBudWxsXG4gICAgLCBnZW5lcmFsSW5mbzoge1xuICAgICAgICB6aXBDb2RlOiB0aGlzLnByb3BzLnF1ZXJ5UGFyYW1aaXBDb2RlXG4gICAgICB9XG4gICAgLCBwYXltZW50czoge31cbiAgICAsIGNvbnRhY3RJbmZvOiB7XG4gICAgICAgIHppcENvZGU6IHRoaXMucHJvcHMucXVlcnlQYXJhbVppcENvZGVcbiAgICAgIH1cbiAgICAsIGxlYWQ6IG51bGxcbiAgICB9XG4gIH1cblxuLCBzZXRBY3RpdmVTdGVwOiBmdW5jdGlvbihzdGVwKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c3RlcDogc3RlcH0pXG4gIH1cblxuLCBzZXRBY3RpdmVNb2RhbDogZnVuY3Rpb24obW9kYWwsIGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWw6IG1vZGFsfSlcbiAgfVxuXG4sIHNldE5leHRNb2RhbDogZnVuY3Rpb24obW9kYWwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtuZXh0TW9kYWw6IG1vZGFsfSlcbiAgfVxuXG4sIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRlbnRcbiAgICBpZiAodGhpcy5zdGF0ZS5zdGVwID09PSBTdGVwLkdFTkVSQUxfSU5GTylcbiAgICAgIGNvbnRlbnQgPSBHZW5lcmFsSW5mbyhcbiAgICAgICAgICAgICAgICAgIHtxdWVyeVBhcmFtWmlwQ29kZTp0aGlzLnByb3BzLnF1ZXJ5UGFyYW1aaXBDb2RlLFxuICAgICAgICAgICAgICAgICAgaW5pdGlhbERhdGE6dGhpcy5zdGF0ZS5nZW5lcmFsSW5mbyxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZVJlc2V0OnRoaXMuaGFuZGxlUmVzZXQsXG4gICAgICAgICAgICAgICAgICBoYW5kbGVHZXRRdW90ZTp0aGlzLmhhbmRsZUdldFF1b3RlLFxuICAgICAgICAgICAgICAgICAgaGFuZGxlU2hvd0dsb2JhbE1vZGFsOnRoaXMuc2V0QWN0aXZlTW9kYWwsXG4gICAgICAgICAgICAgICAgICBsb2FkaW5nOnRoaXMuc3RhdGUubG9hZGluZ31cbiAgICAgICAgICAgICAgICApXG4gICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5zdGVwID09PSBTdGVwLlFVT1RFX0lORk8pXG4gICAgICBjb250ZW50ID0gUXVvdGVJbmZvKFxuICAgICAgICAgICAgICAgICAge2dlbmVyYWxJbmZvOnRoaXMuc3RhdGUuZ2VuZXJhbEluZm8sXG4gICAgICAgICAgICAgICAgICBwYXltZW50czp0aGlzLnN0YXRlLnBheW1lbnRzLFxuICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlU3RlcDp0aGlzLnNldEFjdGl2ZVN0ZXB9XG4gICAgICAgICAgICAgICAgKVxuICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RlcCA9PT0gU3RlcC5TRU5EX1FVT1RFKVxuICAgICAgY29udGVudCA9IFNlbmRRdW90ZShcbiAgICAgICAgICAgICAgICAgIHtjb250YWN0SW5mbzp0aGlzLnN0YXRlLmNvbnRhY3RJbmZvLFxuICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlU3RlcDp0aGlzLnNldEFjdGl2ZVN0ZXAsXG4gICAgICAgICAgICAgICAgICBoYW5kbGVTZW5kOnRoaXMuaGFuZGxlU2VuZCxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZVNob3dHbG9iYWxNb2RhbDp0aGlzLnNldEFjdGl2ZU1vZGFsLFxuICAgICAgICAgICAgICAgICAgbG9hZGluZzp0aGlzLnN0YXRlLmxvYWRpbmd9XG4gICAgICAgICAgICAgICAgKVxuICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuc3RlcCA9PT0gU3RlcC5UVEZOKVxuICAgICAgY29udGVudCA9IChKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3JlYWN0JykgPT0gLTFcbiAgICAgICAgICAgICAgICAgPyBUVEZOKG51bGwpXG4gICAgICAgICAgICAgICAgIDogV1RGTihudWxsKSlcblxuICAgIHZhciBtb2RhbFxuICAgIGlmICh0aGlzLnN0YXRlLm1vZGFsID09PSBHbG9iYWxNb2RhbC5XRV9DQUxMX1lPVSlcbiAgICAgIG1vZGFsID0gQ2FsbFlvdU1vZGFsKFxuICAgICAgICAgICAgICAgIHtjb250YWN0SW5mbzp0aGlzLnN0YXRlLmNvbnRhY3RJbmZvLFxuICAgICAgICAgICAgICAgIGhhbmRsZUhpZGRlbjp0aGlzLmhhbmRsZU1vZGFsSGlkZGVuLFxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmQ6dGhpcy5oYW5kbGVTZW5kLFxuICAgICAgICAgICAgICAgIGhhbmRsZVNldE5leHRHbG9iYWxNb2RhbDp0aGlzLnNldE5leHRNb2RhbH1cbiAgICAgICAgICAgICAgKVxuICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUubW9kYWwgPT09IEdsb2JhbE1vZGFsLkVNQUlMX1VTKVxuICAgICAgbW9kYWwgPSBFbWFpbFVzTW9kYWwoXG4gICAgICAgICAgICAgICAge2NvbnRhY3RJbmZvOnRoaXMuc3RhdGUuY29udGFjdEluZm8sXG4gICAgICAgICAgICAgICAgaGFuZGxlSGlkZGVuOnRoaXMuaGFuZGxlTW9kYWxIaWRkZW4sXG4gICAgICAgICAgICAgICAgaGFuZGxlU2VuZDp0aGlzLmhhbmRsZVNlbmQsXG4gICAgICAgICAgICAgICAgaGFuZGxlU2V0TmV4dEdsb2JhbE1vZGFsOnRoaXMuc2V0TmV4dE1vZGFsfVxuICAgICAgICAgICAgICApXG4gICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5tb2RhbCA9PT0gR2xvYmFsTW9kYWwuUV9BTkRfQSlcbiAgICAgIG1vZGFsID0gUUFuZEFNb2RhbCgge2hhbmRsZUhpZGRlbjp0aGlzLmhhbmRsZU1vZGFsSGlkZGVufSlcbiAgICBlbHNlIGlmICh0aGlzLnN0YXRlLm1vZGFsID09PSBHbG9iYWxNb2RhbC5TRVJWSUNFX1VOQVZBSUxBQkxFKVxuICAgICAgbW9kYWwgPSBTZXJ2aWNlVW5hdmFpbGFibGVNb2RhbCgge2hhbmRsZUhpZGRlbjp0aGlzLmhhbmRsZU1vZGFsSGlkZGVufSlcblxuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOnRoaXMuc3RhdGUubG9hZGluZyA/ICdsb2FkaW5nJyA6ICcnfSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicm93XCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImNvbC1zbS05XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicXVvdGUtcHJvZ3Jlc3MgY2xlYXJmaXhcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTokYygnY29sLXNtLTQnLCB7YWN0aXZlOiB0aGlzLnN0YXRlLnN0ZXAgPT09IFN0ZXAuR0VORVJBTF9JTkZPfSl9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJzdGVwLW51bWJlclwifSwgXCIxXCIpLCcgJyxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJzdGVwLW5hbWVcIn0sIFwiR2VuZXJhbCBJbmZvcm1hdGlvblwiKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6JGMoJ2NvbC1zbS00Jywge2FjdGl2ZTogdGhpcy5zdGF0ZS5zdGVwID09PSBTdGVwLlFVT1RFX0lORk99KX0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcInN0ZXAtbnVtYmVyXCJ9LCBcIjJcIiksJyAnLFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcInN0ZXAtbmFtZVwifSwgXCJHZXQgeW91ciBxdW90ZVwiKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6JGMoJ2NvbC1zbS00Jywge2FjdGl2ZTogdGhpcy5zdGF0ZS5zdGVwID09PSBTdGVwLlNFTkRfUVVPVEV9KX0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcInN0ZXAtbnVtYmVyXCJ9LCBcIjNcIiksJyAnLFxuICAgICAgICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcInN0ZXAtbmFtZVwifSwgXCJTZW5kIHlvdXIgcXVvdGUgdG8gYW4gYWdlbnRcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCJ9LCBcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tM1wifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmgzKCB7Y2xhc3NOYW1lOlwidGV4dC1jZW50ZXJcIn0sIFwiTmVlZCBBc3Npc3RhbmNlP1wiKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibGlzdC1ncm91cFwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYSgge2NsYXNzTmFtZTpcImxpc3QtZ3JvdXAtaXRlbVwiLCBocmVmOlwiI2NhbGxjb250YWN0XCIsIG9uQ2xpY2s6dGhpcy5zZXRBY3RpdmVNb2RhbC5iaW5kKG51bGwsIEdsb2JhbE1vZGFsLldFX0NBTExfWU9VKX0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uaDQoIHtjbGFzc05hbWU6XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wifSwgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJnbHlwaGljb24gZ2x5cGhpY29uLXBob25lLWFsdFwifSksIFwiIFdl4oCZbGwgY2FsbCB5b3VcIiksXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwibGlzdC1ncm91cC1pdGVtLXRleHRcIn0sIFwiTmVlZCBhc3Npc3RhbmNlPyBBIGxpY2Vuc2VkIHJlcHJlc2VudGF0aXZlIHdpbGwgY29udGFjdCB5b3UuXCIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmEoIHtjbGFzc05hbWU6XCJsaXN0LWdyb3VwLWl0ZW1cIiwgaHJlZjpcIiNxdWVzdGlvbmNvbnRhY3RcIiwgb25DbGljazp0aGlzLnNldEFjdGl2ZU1vZGFsLmJpbmQobnVsbCwgR2xvYmFsTW9kYWwuRU1BSUxfVVMpfSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5oNCgge2NsYXNzTmFtZTpcImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXCJ9LCBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImdseXBoaWNvbiBnbHlwaGljb24tZW52ZWxvcGVcIn0pLCBcIiBFbWFpbCB1c1wiKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnAoIHtjbGFzc05hbWU6XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwifSwgXCJIYXZlIGEgc3BlY2lmaWMgcXVlc3Rpb24/IFdlIHdpbGwgZ2V0IHJpZ2h0IGJhY2sgdG8geW91IHZpYSBlbWFpbC5cIilcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5ET00uYSgge2NsYXNzTmFtZTpcImxpc3QtZ3JvdXAtaXRlbVwiLCBocmVmOlwiI3FhbmRhXCIsIG9uQ2xpY2s6dGhpcy5zZXRBY3RpdmVNb2RhbC5iaW5kKG51bGwsIEdsb2JhbE1vZGFsLlFfQU5EX0EpfSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5oNCgge2NsYXNzTmFtZTpcImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXCJ9LCBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImdseXBoaWNvbiBnbHlwaGljb24taW5mby1zaWduXCJ9KSwgXCIgUXVlc3Rpb25zIFwiLCAnJicsIFwiIEFuc3dlcnNcIiksXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwibGlzdC1ncm91cC1pdGVtLXRleHRcIn0sIFwiTG9vayBoZXJlIGZvciBhbnN3ZXJzIHRvIGNvbW1vbmx5LWFza2VkIHF1ZXN0aW9ucy5cIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwidGV4dC1jZW50ZXJcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmEoIHtocmVmOkxpZmVRdW90ZUNvbnN0YW50cy5MT0NBTF9TQUxFU19BR0VOVF9VUkwsIHRhcmdldDpcIl9ibGFua1wifSwgXCJGaW5kIGEgTG9jYWwgU2FsZXMgQWdlbnQgXCIsIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1zaGFyZVwifSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgbW9kYWxcbiAgICApXG4gIH1cblxuLCBoYW5kbGVNb2RhbEhpZGRlbjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUubmV4dE1vZGFsICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbW9kYWw6IHRoaXMuc3RhdGUubmV4dE1vZGFsXG4gICAgICAsIG5leHRNb2RhbDogbnVsbFxuICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHttb2RhbDogbnVsbH0pXG4gICAgfVxuICB9XG5cbiwgaGFuZGxlQ3JlYXRlTGVhZDogZnVuY3Rpb24obmV4dCwgaGFuZGxlRXJyb3IpIHtcbiAgICBMZWFkU2VydmljZS5jcmVhdGVMZWFkKGZ1bmN0aW9uKGVyciwgbGVhZCkge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGhhbmRsZUVycm9yKGVycilcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2xlYWQ6IGxlYWR9KVxuICAgICAgbmV4dChsZWFkKVxuICAgIH0uYmluZCh0aGlzKSlcbiAgfVxuXG4sIGhhbmRsZUdldFF1b3RlOiBmdW5jdGlvbihnZW5lcmFsSW5mbykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZ2VuZXJhbEluZm86IGdlbmVyYWxJbmZvXG4gICAgLCBjb250YWN0SW5mbzogZXh0ZW5kKHt9LCB0aGlzLnN0YXRlLmNvbnRhY3RJbmZvLCB7XG4gICAgICAgIHN0YXRlQ29kZTogZ2VuZXJhbEluZm8uc3RhdGVDb2RlXG4gICAgICAsIHppcENvZGU6IGdlbmVyYWxJbmZvLnppcENvZGVcbiAgICAgIH0pXG4gICAgLCBsb2FkaW5nOiB0cnVlXG4gICAgfSlcblxuICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAsIG1vZGFsOiBHbG9iYWxNb2RhbC5TRVJWSUNFX1VOQVZBSUxBQkxFXG4gICAgICB9KVxuICAgIH0uYmluZCh0aGlzKVxuXG4gICAgdmFyIGdldFF1b3RlID0gZnVuY3Rpb24obGVhZCkge1xuICAgICAgaWYgKGxlYWQgPT09IG51bGwpIHJldHVybiB0aGlzLmhhbmRsZUNyZWF0ZUxlYWQoZ2V0UXVvdGUsIGhhbmRsZUVycm9yKVxuXG4gICAgICB2YXIgZGF0YSA9IGV4dGVuZCh7fSwge2xlYWRJZDogbGVhZC5pZH0sIGdlbmVyYWxJbmZvKVxuXG4gICAgICBMZWFkU2VydmljZS5jYWxjdWxhdGVRdW90ZShkYXRhLCBmdW5jdGlvbihlcnIsIHF1b3RlKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBoYW5kbGVFcnJvcihlcnIpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICwgcGF5bWVudHM6IHF1b3RlLnBheW1lbnRzXG4gICAgICAgICwgc3RlcDogU3RlcC5RVU9URV9JTkZPXG4gICAgICAgIH0pXG4gICAgICB9LmJpbmQodGhpcykpXG4gICAgfS5iaW5kKHRoaXMpXG5cbiAgICBnZXRRdW90ZSh0aGlzLnN0YXRlLmxlYWQpXG4gIH1cblxuLCBoYW5kbGVTZW5kOiBmdW5jdGlvbihjb250YWN0SW5mbywgY2IpIHtcbiAgICB2YXIgdXBkYXRlZENvbnRhY3RJbmZvID0gZXh0ZW5kKHt9LCB0aGlzLnN0YXRlLmNvbnRhY3RJbmZvLCBjb250YWN0SW5mbylcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbnRhY3RJbmZvOiB1cGRhdGVkQ29udGFjdEluZm9cbiAgICAsIGxvYWRpbmc6IHRydWVcbiAgICB9KVxuXG4gICAgdmFyIGhhbmRsZUVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOiBmYWxzZX0pXG4gICAgICBjYihlcnIpXG4gICAgfS5iaW5kKHRoaXMpXG5cbiAgICB2YXIgdXBkYXRlTGVhZCA9IGZ1bmN0aW9uKGxlYWQpIHtcbiAgICAgIGlmIChsZWFkID09PSBudWxsKSByZXR1cm4gdGhpcy5oYW5kbGVDcmVhdGVMZWFkKHVwZGF0ZUxlYWQsIGhhbmRsZUVycm9yKVxuXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgaWQ6IGxlYWQuaWRcbiAgICAgICwgZmlyc3ROYW1lOiBjb250YWN0SW5mby5maXJzdE5hbWVcbiAgICAgICwgbGFzdE5hbWU6IGNvbnRhY3RJbmZvLmxhc3ROYW1lXG4gICAgICAsIHBob25lTm1icjogY29udGFjdEluZm8ucGhvbmVObWJyXG4gICAgICAsIGFkZHJlc3M6IGNvbnRhY3RJbmZvLmFkZHJlc3MgKyAnICcgK1xuICAgICAgICAgICAgICAgICBjb250YWN0SW5mby5jaXR5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgIFN0YXRlc1tjb250YWN0SW5mby5zdGF0ZUNvZGVdLmFiYnJldmlhdGlvblxuICAgICAgLCBzdGF0ZUNvZGU6IGNvbnRhY3RJbmZvLnN0YXRlQ29kZVxuICAgICAgLCB6aXBDb2RlOiBjb250YWN0SW5mby56aXBDb2RlXG4gICAgICAsIGN1cnJlbnRDdXN0b21lcjogY29udGFjdEluZm8uY3VycmVudEN1c3RvbWVyID09ICdZZXMnXG4gICAgICB9XG4gICAgICBpZiAoY29udGFjdEluZm8uZW1haWxBZGRyKSBkYXRhLmVtYWlsQWRkciA9IGNvbnRhY3RJbmZvLmVtYWlsQWRkclxuICAgICAgaWYgKGNvbnRhY3RJbmZvLnF1ZXN0aW9uKSBkYXRhLnF1ZXN0aW9uID0gY29udGFjdEluZm8ucXVlc3Rpb25cblxuICAgICAgTGVhZFNlcnZpY2UudXBkYXRlTGVhZChkYXRhLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGhhbmRsZUVycm9yKGVycilcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzogZmFsc2V9KVxuICAgICAgICBjYihudWxsKVxuICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0uYmluZCh0aGlzKVxuXG4gICAgdXBkYXRlTGVhZCh0aGlzLnN0YXRlLmxlYWQpXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTGlmZVF1b3RlIiwidmFyIENPTVBBTlkgPSAnTWVycnkgV2lkb3cgSW5zdXJhbmNlIENvLidcbiAgLCBQUklWQUNZX1BPTElDWV9VUkwgPSAnaHR0cDovL2V4YW1wbGUuY29tL3ByaXZhY3lfcG9saWN5J1xuICAsIExPQ0FMX1NBTEVTX0FHRU5UX1VSTCA9ICdodHRwOi8vZXhhbXBsZS5jb20vZmluZF9zYWxlc19vZmZpY2UnXG4gICwgTElGRV9JTlNVUkFOQ0VfUFJPRFVDVFNfVVJMID0gJ2h0dHA6Ly9leGFtcGxlLmNvbS9saWZlX2luc3VyYW5jZV9wcm9kdWN0cydcblxudmFyIExpZmVRdW90ZUNvbnN0YW50cyA9IHtcbiAgQ09NUEFOWTogQ09NUEFOWVxuLCBQUklWQUNZX1BPTElDWV9VUkw6IFBSSVZBQ1lfUE9MSUNZX1VSTFxuLCBMT0NBTF9TQUxFU19BR0VOVF9VUkw6IExPQ0FMX1NBTEVTX0FHRU5UX1VSTFxuLCBMSUZFX0lOU1VSQU5DRV9QUk9EVUNUU19VUkw6IExJRkVfSU5TVVJBTkNFX1BST0RVQ1RTX1VSTFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpZmVRdW90ZUNvbnN0YW50cyIsInZhciBTVEFURV9DT0RFUyA9IFtcbiAge2NvZGU6IDEsICBhYmJyZXZpYXRpb246ICdBTCcsIG5hbWU6ICdBbGFiYW1hJ31cbiwge2NvZGU6IDIsICBhYmJyZXZpYXRpb246ICdBSycsIG5hbWU6ICdBbGFza2EnfVxuLCB7Y29kZTogNCwgIGFiYnJldmlhdGlvbjogJ0FaJywgbmFtZTogJ0FyaXpvbmEnfVxuLCB7Y29kZTogNSwgIGFiYnJldmlhdGlvbjogJ0FSJywgbmFtZTogJ0Fya2Fuc2FzJ31cbiwge2NvZGU6IDYsICBhYmJyZXZpYXRpb246ICdDQScsIG5hbWU6ICdDYWxpZm9ybmlhJ31cbiwge2NvZGU6IDgsICBhYmJyZXZpYXRpb246ICdDTycsIG5hbWU6ICdDb25uZWN0aWN1dCd9XG4sIHtjb2RlOiAxMCwgYWJicmV2aWF0aW9uOiAnREUnLCBuYW1lOiAnRGVsYXdhcmUnfVxuLCB7Y29kZTogMTEsIGFiYnJldmlhdGlvbjogJ0RDJywgbmFtZTogJ0Rpc3RyaWN0IG9mIENvbHVtYmlhJ31cbiwge2NvZGU6IDEyLCBhYmJyZXZpYXRpb246ICdGTCcsIG5hbWU6ICdGbG9yaWRhJ31cbiwge2NvZGU6IDEzLCBhYmJyZXZpYXRpb246ICdHQScsIG5hbWU6ICdHZW9yZ2lhJ31cbiwge2NvZGU6IDE1LCBhYmJyZXZpYXRpb246ICdISScsIG5hbWU6ICdIYXdhaWknfVxuLCB7Y29kZTogMTYsIGFiYnJldmlhdGlvbjogJ0lEJywgbmFtZTogJ0lkYWhvJ31cbiwge2NvZGU6IDE3LCBhYmJyZXZpYXRpb246ICdJTCcsIG5hbWU6ICdJbGxpbm9pcyd9XG4sIHtjb2RlOiAxOCwgYWJicmV2aWF0aW9uOiAnSU4nLCBuYW1lOiAnSW5kaWFuYSd9XG4sIHtjb2RlOiAxOSwgYWJicmV2aWF0aW9uOiAnSUEnLCBuYW1lOiAnSW93YSd9XG4sIHtjb2RlOiAyMCwgYWJicmV2aWF0aW9uOiAnS1MnLCBuYW1lOiAnS2Fuc2FzJ31cbiwge2NvZGU6IDIxLCBhYmJyZXZpYXRpb246ICdLWScsIG5hbWU6ICdLZW50dWNreSd9XG4sIHtjb2RlOiAyMiwgYWJicmV2aWF0aW9uOiAnTEEnLCBuYW1lOiAnTG91aXNpYW5hJ31cbiwge2NvZGU6IDIzLCBhYmJyZXZpYXRpb246ICdNRScsIG5hbWU6ICdNYWluZSd9XG4sIHtjb2RlOiAyNCwgYWJicmV2aWF0aW9uOiAnTUQnLCBuYW1lOiAnTWFyeWxhbmQnfVxuLCB7Y29kZTogMjUsIGFiYnJldmlhdGlvbjogJ01BJywgbmFtZTogJ01hc3NhY2h1c2V0dHMnfVxuLCB7Y29kZTogMjYsIGFiYnJldmlhdGlvbjogJ01JJywgbmFtZTogJ01pY2hpZ2FuJ31cbiwge2NvZGU6IDI3LCBhYmJyZXZpYXRpb246ICdNTicsIG5hbWU6ICdNaW5uZXNvdGEnfVxuLCB7Y29kZTogMjgsIGFiYnJldmlhdGlvbjogJ01TJywgbmFtZTogJ01pc3Npc3NpcHBpJ31cbiwge2NvZGU6IDI5LCBhYmJyZXZpYXRpb246ICdNTycsIG5hbWU6ICdNaXNzb3VyaSd9XG4sIHtjb2RlOiAzMCwgYWJicmV2aWF0aW9uOiAnTVQnLCBuYW1lOiAnTW9udGFuYSd9XG4sIHtjb2RlOiAzMSwgYWJicmV2aWF0aW9uOiAnTkUnLCBuYW1lOiAnTmVicmFza2EnfVxuLCB7Y29kZTogMzIsIGFiYnJldmlhdGlvbjogJ05WJywgbmFtZTogJ05ldmFkYSd9XG4sIHtjb2RlOiAzMywgYWJicmV2aWF0aW9uOiAnTkgnLCBuYW1lOiAnTmV3IEhhbXBzaGlyZSd9XG4sIHtjb2RlOiAzNCwgYWJicmV2aWF0aW9uOiAnTkonLCBuYW1lOiAnTmV3IEplcnNleSd9XG4sIHtjb2RlOiAzNSwgYWJicmV2aWF0aW9uOiAnTk0nLCBuYW1lOiAnTmV3IE1leGljbyd9XG4sIHtjb2RlOiAzNiwgYWJicmV2aWF0aW9uOiAnTlknLCBuYW1lOiAnTmV3IFlvcmsnfVxuLCB7Y29kZTogMzcsIGFiYnJldmlhdGlvbjogJ05DJywgbmFtZTogJ05vcnRoIENhcm9saW5hJ31cbiwge2NvZGU6IDM4LCBhYmJyZXZpYXRpb246ICdORCcsIG5hbWU6ICdOb3J0aCBEYWtvdGEnfVxuLCB7Y29kZTogMzksIGFiYnJldmlhdGlvbjogJ09IJywgbmFtZTogJ09oaW8nfVxuLCB7Y29kZTogNDAsIGFiYnJldmlhdGlvbjogJ09LJywgbmFtZTogJ09rbGFob21hJ31cbiwge2NvZGU6IDQxLCBhYmJyZXZpYXRpb246ICdPUicsIG5hbWU6ICdPcmVnb24nfVxuLCB7Y29kZTogNDIsIGFiYnJldmlhdGlvbjogJ1BBJywgbmFtZTogJ1Blbm5zeWx2YW5pYSd9XG4sIHtjb2RlOiA0NCwgYWJicmV2aWF0aW9uOiAnUkknLCBuYW1lOiAnUmhvZGUgSXNsYW5kJ31cbiwge2NvZGU6IDQ1LCBhYmJyZXZpYXRpb246ICdTQycsIG5hbWU6ICdTb3V0aCBDYXJvbGluYSd9XG4sIHtjb2RlOiA0NiwgYWJicmV2aWF0aW9uOiAnU0QnLCBuYW1lOiAnU291dGggRGFrb3RhJ31cbiwge2NvZGU6IDQ3LCBhYmJyZXZpYXRpb246ICdUTicsIG5hbWU6ICdUZW5uZXNzZWUnfVxuLCB7Y29kZTogNDgsIGFiYnJldmlhdGlvbjogJ1RYJywgbmFtZTogJ1RleGFzJ31cbiwge2NvZGU6IDQ5LCBhYmJyZXZpYXRpb246ICdVVCcsIG5hbWU6ICdVdGFoJ31cbiwge2NvZGU6IDUwLCBhYmJyZXZpYXRpb246ICdWVCcsIG5hbWU6ICdWZXJtb250J31cbiwge2NvZGU6IDUxLCBhYmJyZXZpYXRpb246ICdWQScsIG5hbWU6ICdWaXJnaW5pYSd9XG4sIHtjb2RlOiA1MywgYWJicmV2aWF0aW9uOiAnV0EnLCBuYW1lOiAnV2FzaGluZ3Rvbid9XG4sIHtjb2RlOiA1NCwgYWJicmV2aWF0aW9uOiAnV1YnLCBuYW1lOiAnV2VzdCBWaXJnaW5pYSd9XG4sIHtjb2RlOiA1NSwgYWJicmV2aWF0aW9uOiAnV0knLCBuYW1lOiAnV2lzY29uc2luJ31cbiwge2NvZGU6IDU2LCBhYmJyZXZpYXRpb246ICdXWScsIG5hbWU6ICdXeW9taW5nJ31cbl1cblxudmFyIFBST0RVQ1RfQ09ERVMgPSBbXG4gIHtjb2RlOiAxLCBuYW1lOiAnVGVybSd9XG4sIHtjb2RlOiAyLCBuYW1lOiAnUGVybWFuZW50J31cbl1cblxudmFyIEhFQUxUSF9DT0RFUyA9ICBbXG4gIHtjb2RlOiAxLCB0aXRsZTogJ0ZhaXInfVxuLCB7Y29kZTogMiwgdGl0bGU6ICdHb29kJ31cbiwge2NvZGU6IDMsIHRpdGxlOiAnVmVyeSBHb29kJ31cbiwge2NvZGU6IDQsIHRpdGxlOiAnRXhjZWxsZW50J31cbl1cblxudmFyIEdFTkRFUl9DT0RFUyA9IFtcbiAge2NvZGU6ICdGJywgdGl0bGU6ICdGZW1hbGUnfVxuLCB7Y29kZTogJ00nLCB0aXRsZTogJ01hbGUnfVxuXVxuXG52YXIgTGlmZVF1b3RlUmVmRGF0YSA9IHtcbiAgU1RBVEVfQ09ERVM6IFNUQVRFX0NPREVTXG4sIFBST0RVQ1RfQ09ERVM6IFBST0RVQ1RfQ09ERVNcbiwgSEVBTFRIX0NPREVTOiBIRUFMVEhfQ09ERVNcbiwgR0VOREVSX0NPREVTOiBHRU5ERVJfQ09ERVNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaWZlUXVvdGVSZWZEYXRhIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQm9vdHN0cmFwRGV2aWNlID0gcmVxdWlyZSgnQm9vdHN0cmFwRGV2aWNlJylcbnZhciBCb290c3RyYXBNb2RhbE1peGluID0gcmVxdWlyZSgnQm9vdHN0cmFwTW9kYWxNaXhpbicpXG52YXIgRm9ybU1peGluID0gcmVxdWlyZSgnRm9ybU1peGluJylcbnZhciBIZWxwSWNvbiA9IHJlcXVpcmUoJ0hlbHBJY29uJylcbnZhciBJbmNyZW1lbnRpbmdLZXlNaXhpbiA9IHJlcXVpcmUoJ0luY3JlbWVudGluZ0tleU1peGluJylcblxudmFyICRjID0gcmVxdWlyZSgnY2xhc3NOYW1lcycpXG52YXIgYnNEZXZpY2UgPSByZXF1aXJlKCdic0RldmljZScpXG52YXIgZm9ybWF0RG9sbGFycyA9IHJlcXVpcmUoJ2Zvcm1hdERvbGxhcnMnKVxudmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcblxudmFyIE5lZWRzQ2FsY3VsYXRvck1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTmVlZHNDYWxjdWxhdG9yTW9kYWwnLFxuICBtaXhpbnM6IFtCb290c3RyYXBNb2RhbE1peGluLCBGb3JtTWl4aW4sIEluY3JlbWVudGluZ0tleU1peGluXVxuXG4sIGZpZWxkczoge1xuICAgICdtb250aGx5TmV0SW5jb21lJzogJ2lzRmxvYXQnXG4gICwgJ291dHN0YW5kaW5nTW9ydGdhZ2VPclJlbnQnOiAnaXNGbG9hdCdcbiAgLCAnY3VycmVudE91dHN0YW5kaW5nRGVidHMnOiAnaXNGbG9hdCdcbiAgLCAnZXN0Q29sbGVnZUV4cGVuc2VQZXJDaGlsZCc6ICdpc0Zsb2F0J1xuICAsICdlc3RGaW5hbEV4cGVuc2VzJzogJ2lzRmxvYXQnXG4gICwgJ2N1cnJlbnRMaXF1aWRBc3NldHMnOiAnaXNGbG9hdCdcbiAgLCAncGVyc29uYWxseU93bmVkSW5zdXJhbmNlJzogJ2lzRmxvYXQnXG4gICwgJ3llYXJzSW5jb21lUHJvdmlkZWQnOiAnaXNJbnQnXG4gICwgJ251bUNvbGxlZ2VDaGlsZHJlbic6ICdpc0ludCdcbiAgfVxuXG4sIGVycm9yTWVzc2FnZXM6IHtcbiAgICAnaXNGbG9hdCc6ICdQbGVhc2UgZW50ZXIgYSBkb2xsYXIgYW1vdW50J1xuICAsICdpc0ludCc6ICdQbGVhc2UgZW50ZXIgYSBudW1iZXInXG4gIH1cblxuLCBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdWdnZXN0ZWRDb3ZlcmFnZTogbnVsbFxuICAgICwgZGF0YToge31cbiAgICAsIGVycm9yczoge31cbiAgICB9XG4gIH1cblxuLCBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHRoaXMudXBkYXRlRXJyb3JUb29sdGlwcyh0aGlzLnN0YXRlLmVycm9ycywgbmV4dFN0YXRlLmVycm9ycywge1xuICAgICAgcGxhY2VtZW50OiBic0RldmljZSgpID49IEJvb3RzdHJhcERldmljZS5NRCA/ICdhdXRvIHJpZ2h0JyA6ICdib3R0b20nXG4gICAgLCB0cmlnZ2VyOiAnaG92ZXIgY2xpY2snXG4gICAgLCBhbmltYXRpb246IGZhbHNlXG4gICAgLCBjb250YWluZXI6ICdib2R5J1xuICAgIH0pXG4gIH1cblxuLCBoYW5kbGVSZXNldDogZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgZmllbGRSZWYgaW4gdGhpcy5maWVsZFJlZnMpIHtcbiAgICAgIHRoaXMucmVmc1tmaWVsZFJlZl0uZ2V0RE9NTm9kZSgpLnZhbHVlID0gJydcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiB7fVxuICAgICwgZXJyb3JzOiB7fVxuICAgIH0pXG4gIH1cblxuLCBoYW5kbGVDYWxjdWxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0ge31cbiAgICAgICwgZXJyb3JzID0ge31cbiAgICBmb3IgKHZhciBmaWVsZFJlZiBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgZGF0YVtmaWVsZFJlZl0gPSB0cmltKHRoaXMucmVmc1tmaWVsZFJlZl0uZ2V0RE9NTm9kZSgpLnZhbHVlKVxuICAgICAgaWYgKCFkYXRhW2ZpZWxkUmVmXSkge1xuICAgICAgICBlcnJvcnNbZmllbGRSZWZdID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB2YXIgdmFsaWRhdGlvbiA9IHRoaXMuZmllbGRzW2ZpZWxkUmVmXVxuICAgICAgaWYgKCF2YWxpZGF0b3JbdmFsaWRhdGlvbl0oZGF0YVtmaWVsZFJlZl0pKSB7XG4gICAgICAgIGVycm9yc1tmaWVsZFJlZl0gPSB0aGlzLmVycm9yTWVzc2FnZXNbdmFsaWRhdGlvbl1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JzOiBlcnJvcnN9KVxuXG4gICAgdmFyIGlzVmFsaWQgPSB0cnVlXG4gICAgZm9yICh2YXIgZmllbGRSZWYgaW4gZXJyb3JzKSB7XG4gICAgICBpc1ZhbGlkID0gZmFsc2VcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIC8vIFRPRE8gQ2FsY3VsYXRlIHN1Z2dlc3RlZCBhbW91bnRcbiAgICAgIGNvbnNvbGUuaW5mbyhkYXRhKVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgLCBzdWdnZXN0ZWRDb3ZlcmFnZTogMTAwMDAwXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4sIGhhbmRsZUJhY2s6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3N1Z2dlc3RlZENvdmVyYWdlOiBudWxsfSlcbiAgfVxuXG4sIGhhbmRsZUFjY2VwdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5oYW5kbGVBY2NlcHQodGhpcy5zdGF0ZS5zdWdnZXN0ZWRDb3ZlcmFnZSlcbiAgICB0aGlzLmhpZGUoKVxuICB9XG5cbiwgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9keSwgZm9vdGVyXG4gICAgaWYgKHRoaXMuc3RhdGUuc3VnZ2VzdGVkQ292ZXJhZ2UgPT09IG51bGwpIHtcbiAgICAgIGJvZHkgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIk91ciBuZWVkcyBjYWxjdWxhdG9yIGxldHMgeW91IGVzdGltYXRlIGhvdyBtdWNoIGxpZmUgaW5zdXJhbmNlIHlvdSBtYXkgbmVlZCBpbiBhZGRpdGlvbiB0byB0aGUgYW1vdW50IHlvdSBtYXkgYWxyZWFkeSBvd24uXCIpLFxuICAgICAgICBSZWFjdC5ET00uZm9ybSgge3JlZjpcImZvcm1cIiwgY2xhc3NOYW1lOlwiZm9ybS1ob3Jpem9udGFsXCIsIHJvbGU6XCJmb3JtXCJ9LCBcbiAgICAgICAgICB0aGlzLnJlbmRlckRvbGxhckZpZWxkKCdtb250aGx5TmV0SW5jb21lJywgJ01vbnRobHkgbmV0IGluY29tZScsXG4gICAgICAgICAgICBIZWxwSWNvbihudWxsLCBcbiAgICAgICAgICAgICAgXCIgQWZ0ZXItdGF4IGVhcm5pbmdzIHBlciBtb250aCBcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgdGhpcy5yZW5kZXJJbnRlZ2VyRmllbGQoJ3llYXJzSW5jb21lUHJvdmlkZWQnLCAnTnVtYmVyIG9mIHllYXJzIHlvdSB3aXNoIHRvIHByb3ZpZGUgaW5jb21lJyxcbiAgICAgICAgICAgIEhlbHBJY29uKG51bGwsIFxuICAgICAgICAgICAgICBcIiBUaGlzIG51bWJlciBpcyBob3cgbWFueSB5ZWFycyB5b3Ugd291bGQgbGlrZSB0byBnZW5lcmF0ZSBpbmNvbWUgZm9yIHlvdXIgZmFtaWx5IG1lbWJlcnMgb3IgYmVuZWZpY2lhcmllcyBpbiBvcmRlciB0byBjb3ZlciBleHBlbnNlcyBpZGVudGlmaWVkLiBcIitcbiAgICAgICAgICAgICAgXCJNb3N0IGV4cGVydHMgcmVjb21tZW5kIGEgbWluaW11bSBvZiAzLTUgeWVhcnMuIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICB0aGlzLnJlbmRlckRvbGxhckZpZWxkKCdvdXRzdGFuZGluZ01vcnRnYWdlT3JSZW50JywgJ091dHN0YW5kaW5nIG1vcnRnYWdlIG9yIHJlbnQgcGF5bWVudHMnLFxuICAgICAgICAgICAgSGVscEljb24obnVsbCwgXG4gICAgICAgICAgICAgIFwiIEluY2x1ZGUgbW9ydGdhZ2UgYmFsYW5jZSBhbmQgaG9tZSBlcXVpdHkgbG9hbiBiYWxhbmNlcy4gXCIrXG4gICAgICAgICAgICAgIFwiT3IsIGRldGVybWluZSB0aGUgc3VmZmljaWVudCBhbW91bnQgZm9yIDEwIHllYXJzLCBvciAxMjAgbW9udGhzLCBvZiByZW50LiBcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgdGhpcy5yZW5kZXJEb2xsYXJGaWVsZCgnY3VycmVudE91dHN0YW5kaW5nRGVidHMnLCAnQ3VycmVudCBvdXRzdGFuZGluZyBkZWJ0cycsXG4gICAgICAgICAgICBIZWxwSWNvbihudWxsLCBcbiAgICAgICAgICAgICAgXCIgSW5jbHVkZSBjcmVkaXQgY2FyZHMsIGluc3RhbGxtZW50IGNyZWRpdCBvciBvdGhlciBsb2FuIGRlYnRzLCBzdWNoIGFzIHNjaG9vbCBhbmQgYXV0by4gXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIHRoaXMucmVuZGVySW50ZWdlckZpZWxkKCdudW1Db2xsZWdlQ2hpbGRyZW4nLCAnTnVtYmVyIG9mIGNoaWxkcmVuIHRvIGF0dGVuZCBjb2xsZWdlJyxcbiAgICAgICAgICAgIEhlbHBJY29uKG51bGwsIFxuICAgICAgICAgICAgICBcIiBOdW1iZXIgb2YgY2hpbGRyZW4gd2hvIGhhdmUgeWV0IHRvIGVudGVyIGNvbGxlZ2UuIFRoaXMgd291bGQgbm90IGluY2x1ZGUgY2hpbGRyZW4gd2hvIGhhdmUgY29tcGxldGVkIGNvbGxlZ2UuIFwiK1xuICAgICAgICAgICAgICBcIkNoaWxkcmVuIHdobyBkbyBub3QgcmVxdWlyZSBjb2xsZWdlIGZ1bmRpbmcgZG8gbm90IG5lZWQgdG8gYmUgaW5jbHVkZWQgaGVyZS4gXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIHRoaXMucmVuZGVyRG9sbGFyRmllbGQoJ2VzdENvbGxlZ2VFeHBlbnNlUGVyQ2hpbGQnLCAnRXN0aW1hdGVkIGNvbGxlZ2UgZXhwZW5zZXMgcGVyIGNoaWxkJyxcbiAgICAgICAgICAgIEhlbHBJY29uKG51bGwsIFxuICAgICAgICAgICAgICBcIiBGb3VyIHllYXJzIGF0IGEgcHJpdmF0ZSBpbnN0aXR1dGlvbiBhdmVyYWdlcyAkMTI5LDIyOC4gXCIrXG4gICAgICAgICAgICAgIFwiRm91ciB5ZWFycyBhdCBhIHB1YmxpYyBpbnN0aXR1dGlvbiBhdmVyYWdlcyAkNTQsMzU2LiBcIitcbiAgICAgICAgICAgICAgXCJDb3N0cyBpbmNsdWRlIHR1aXRpb24gZmVlcywgcm9vbSBhbmQgYm9hcmQgYXMgcmVwb3J0ZWQgYnkgdGhlIENvbGxlZ2UgQm9hcmQsIE5ldyBZb3JrIDIwMDcuIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICB0aGlzLnJlbmRlckRvbGxhckZpZWxkKCdlc3RGaW5hbEV4cGVuc2VzJywgJ0VzdGltYXRlZCBmaW5hbCBleHBlbnNlcycsXG4gICAgICAgICAgICBIZWxwSWNvbihudWxsLCBcbiAgICAgICAgICAgICAgXCIgRmluYWwgZXhwZW5zZSBjb3N0cyBhcmUgdGhlIGNvc3RzIGFzc29jaWF0ZWQgd2l0aCBhIGZ1bmVyYWwgb3IgZmluYWwgZXN0YXRlIHNldHRsZW1lbnQgY29zdHMuIFwiK1xuICAgICAgICAgICAgICBcIkEgdHlwaWNhbCBidXJpYWwgY29zdHMgYmV0d2VlbiAkOCwwMDAgYW5kICQxMiwwMDAuIFwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAge3BsYWNlaG9sZGVyOiAnMTAsMDAwJ31cbiAgICAgICAgICApLFxuICAgICAgICAgIHRoaXMucmVuZGVyRG9sbGFyRmllbGQoJ2N1cnJlbnRMaXF1aWRBc3NldHMnLCAnQ3VycmVudCBsaXF1aWQgYXNzZXRzJyxcbiAgICAgICAgICAgIEhlbHBJY29uKG51bGwsIFxuICAgICAgICAgICAgICBcIiBMaXF1aWQgYXNzZXRzIHdvdWxkIGluY2x1ZGUgc2F2aW5ncyBhbmQgaW52ZXN0bWVudHMsIGJ1dCB3b3VsZCBub3QgaW5jbHVkZSBhIDQwMUsgb3IgcmVhbCBlc3RhdGUgc3VjaCBhcyBhIGhvdXNlLiBcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgdGhpcy5yZW5kZXJEb2xsYXJGaWVsZCgncGVyc29uYWxseU93bmVkSW5zdXJhbmNlJywgJ1BlcnNvbmFsbHkgb3duZWQgbGlmZSBpbnN1cmFuY2UnLFxuICAgICAgICAgICAgSGVscEljb24obnVsbCwgXG4gICAgICAgICAgICAgIFwiIFRoaXMgbnVtYmVyIHNob3VsZCBlcXVhbCB0aGUgdG90YWwgYW1vdW50IG9mIGNvdmVyYWdlIG9uIHlvdXIgbGlmZSwgaW5jbHVkaW5nIGNvdmVyYWdlIGZyb20gYW55IGluZGl2aWR1YWwgcG9saWNpZXMuIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLWRlZmF1bHRcIiwgb25DbGljazp0aGlzLmhhbmRsZVJlc2V0fSwgXCJSZXNldFwiKSxcbiAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1wcmltYXJ5XCIsIG9uQ2xpY2s6dGhpcy5oYW5kbGVDYWxjdWxhdGV9LCBcIkNhbGN1bGF0ZVwiKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJvZHkgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIkJhc2VkIG9uIHRoZSBpbmZvcm1hdGlvbiBlbnRlcmVkLCB5b3UgbmVlZCBhIHRvdGFsIG9mIFwiLCBSZWFjdC5ET00uc3Ryb25nKG51bGwsIGZvcm1hdERvbGxhcnModGhpcy5zdGF0ZS5zdWdnZXN0ZWRDb3ZlcmFnZSkpLCBcIiBpbiBvcmRlciB0byBjb3ZlciB5b3VyIGxpZmUgaW5zdXJhbmNlIG5lZWRzLlwiKSxcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIk5vdGU6XCIpLCBcIiBUaGlzIGNhbGN1bGF0aW9uIGRvZXMgbm90IGluY29ycG9yYXRlIGFueSBhc3N1bXB0aW9ucyBhYm91dCBpbnZlc3RtZW50IHJlc3VsdHMsIGVzdGF0ZSB0YXhlcyBvciBpbmZsYXRpb24uXCIpXG4gICAgICApXG4gICAgICBmb290ZXIgPSBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLWRlZmF1bHRcIiwgb25DbGljazp0aGlzLmhhbmRsZUJhY2t9LCBcIkJhY2tcIiksXG4gICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tcHJpbWFyeVwiLCBvbkNsaWNrOnRoaXMuaGFuZGxlQWNjZXB0fSwgXCJBY2NlcHRcIilcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsIGZhZGVcIn0sIFxuICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWRpYWxvZ1wifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1jb250ZW50XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtaGVhZGVyXCJ9LCBcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2xvc2VCdXR0b24oKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJOZWVkcyBDYWxjdWxhdG9yXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtYm9keVwifSwgXG4gICAgICAgICAgICBib2R5XG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9vdGVyXCIsIHN0eWxlOnttYXJnaW5Ub3A6IDB9fSwgXG4gICAgICAgICAgICBmb290ZXJcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gIH1cblxuLCByZW5kZXJEb2xsYXJGaWVsZDogZnVuY3Rpb24oaWQsIGxhYmVsLCBoZWxwLCBrd2FyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJGaWVsZChpZCwgbGFiZWwsIGhlbHAsXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiaW5wdXQtZ3JvdXBcIn0sIFxuICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImlucHV0LWdyb3VwLWFkZG9uXCJ9LCBcIiRcIiksXG4gICAgICAgIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIGNsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCByZWY6aWQsIGlkOmlkLFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTp0aGlzLnN0YXRlLmRhdGFbaWRdIHx8ICcnLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOmt3YXJncyAmJiBrd2FyZ3MucGxhY2Vob2xkZXIgfHwgJyd9XG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gIH1cblxuLCByZW5kZXJJbnRlZ2VyRmllbGQ6IGZ1bmN0aW9uKGlkLCBsYWJlbCwgaGVscCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlckZpZWxkKGlkLCBsYWJlbCwgaGVscCxcbiAgICAgIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIGNsYXNzTmFtZTpcImZvcm0tY29udHJvbFwiLCByZWY6aWQsIGlkOmlkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6dGhpcy5zdGF0ZS5kYXRhW2lkXSB8fCAnJ31cbiAgICAgIClcbiAgICApXG4gIH1cblxuLCByZW5kZXJGaWVsZDogZnVuY3Rpb24oaWQsIGxhYmVsLCBoZWxwLCBmaWVsZCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOiRjKCdmb3JtLWdyb3VwJywgeydoYXMtZXJyb3InOiBpZCBpbiB0aGlzLnN0YXRlLmVycm9yc30pfSwgXG4gICAgICBSZWFjdC5ET00ubGFiZWwoIHtodG1sRm9yOmlkLCBjbGFzc05hbWU6XCJjb2wtc20tOCBjb250cm9sLWxhYmVsXCJ9LCBsYWJlbCksXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY29sLXNtLTNcIn0sIFxuICAgICAgICBmaWVsZFxuICAgICAgKSxcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tMVwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwiZm9ybS1jb250cm9sLXN0YXRpY1wifSwgXG4gICAgICAgICAgaGVscFxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5lZWRzQ2FsY3VsYXRvck1vZGFsIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQm9vdHN0cmFwTW9kYWxNaXhpbiA9IHJlcXVpcmUoJ0Jvb3RzdHJhcE1vZGFsTWl4aW4nKVxudmFyIEdsb2JhbE1vZGFsID0gcmVxdWlyZSgnR2xvYmFsTW9kYWwnKVxudmFyIEluY3JlbWVudGluZ0tleU1peGluID0gcmVxdWlyZSgnSW5jcmVtZW50aW5nS2V5TWl4aW4nKVxudmFyIExpZmVRdW90ZUNvbnN0YW50cyA9IHJlcXVpcmUoJ0xpZmVRdW90ZUNvbnN0YW50cycpXG5cbnZhciBQZXJtYW5lbnRJbnN1cmFuY2VNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Blcm1hbmVudEluc3VyYW5jZU1vZGFsJyxcbiAgbWl4aW5zOiBbQm9vdHN0cmFwTW9kYWxNaXhpbiwgSW5jcmVtZW50aW5nS2V5TWl4aW5dXG5cbiwgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2xvYmFsTW9kYWw6IG51bGxcbiAgICB9XG4gIH1cblxuLCByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwgZmFkZVwifSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZGlhbG9nXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWNvbnRlbnRcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1oZWFkZXJcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlBlcm1hbmVudCBJbnN1cmFuY2VcIilcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1ib2R5XCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJUaGFua3MgZm9yIHlvdXIgaW50ZXJlc3QgaW4gcGVybWFuZW50IGxpZmUgaW5zdXJhbmNlLlwiKSksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlRoZSBiZXN0IHdheSB0byBnZXQgYSBxdW90ZSBmb3IgcGVybWFuZW50IGxpZmUgaW5zdXJhbmNlIGlzIHRvIHNwZWFrIGRpcmVjdGx5IHdpdGggb25lIG9mIG91ciBleHBlcmllbmNlZCBhZ2VudHMuIFRoZXJlIGFyZSBzZXZlcmFsIHdheXMgdG8gZ2V0IGluIHRvdWNoIHdpdGggeW91ciBsb2NhbCBhZ2VudDpcIiksXG4gICAgICAgICAgICBSZWFjdC5ET00ucCgge2NsYXNzTmFtZTpcInRleHQtY2VudGVyXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmEoIHtocmVmOkxpZmVRdW90ZUNvbnN0YW50cy5MT0NBTF9TQUxFU19BR0VOVF9VUkwsIGNsYXNzTmFtZTpcImJ0biBidG4tZGVmYXVsdFwifSwgXCJGaW5kIHlvdXIgbG9jYWwgYWdlbnQgXCIsIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwiZ2x5cGhpY29uIGdseXBoaWNvbi1zaGFyZVwifSkpLFxuICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tZGVmYXVsdFwiLCBvbkNsaWNrOnRoaXMuaGFuZGxlU2hvd0dsb2JhbE1vZGFsLmJpbmQobnVsbCwgR2xvYmFsTW9kYWwuV0VfQ0FMTF9ZT1UpfSwgXCJXZeKAmWxsIGNhbGwgeW91XCIpLFxuICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tZGVmYXVsdFwiLCBvbkNsaWNrOnRoaXMuaGFuZGxlU2hvd0dsb2JhbE1vZGFsLmJpbmQobnVsbCwgR2xvYmFsTW9kYWwuRU1BSUxfVVMpfSwgXCJFbWFpbCB1c1wiKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4sIGhhbmRsZVNob3dHbG9iYWxNb2RhbDogZnVuY3Rpb24oZ2xvYmFsTW9kYWwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtnbG9iYWxNb2RhbDogZ2xvYmFsTW9kYWx9KVxuICAgIHRoaXMuaGlkZSgpXG4gIH1cblxuLCBoYW5kbGVIaWRkZW46IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmdsb2JhbE1vZGFsICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnByb3BzLmhhbmRsZVNob3dHbG9iYWxNb2RhbCh0aGlzLnN0YXRlLmdsb2JhbE1vZGFsKVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBQZXJtYW5lbnRJbnN1cmFuY2VNb2RhbCIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIExpZmVRdW90ZVJlZkRhdGEgPSByZXF1aXJlKCdMaWZlUXVvdGVSZWZEYXRhJylcblxudmFyIEJvb3RzdHJhcE1vZGFsTWl4aW4gPSByZXF1aXJlKCdCb290c3RyYXBNb2RhbE1peGluJylcbnZhciBJbmNyZW1lbnRpbmdLZXlNaXhpbiA9IHJlcXVpcmUoJ0luY3JlbWVudGluZ0tleU1peGluJylcblxudmFyIFBvbGljeUFkdmlzb3JNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1BvbGljeUFkdmlzb3JNb2RhbCcsXG4gIG1peGluczogW0Jvb3RzdHJhcE1vZGFsTWl4aW4sIEluY3JlbWVudGluZ0tleU1peGluXVxuXG4sIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvbGljeUNvZGU6IG51bGxcbiAgICB9XG4gIH1cblxuLCBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtwb2xpY3lDb2RlOiBlLnRhcmdldC52YWx1ZX0pXG4gIH1cblxuLCBoYW5kbGVSZXR1cm5Ub1F1b3RlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLmhhbmRsZVNlbGVjdFByb2R1Y3RDb2RlKE51bWJlcih0aGlzLnN0YXRlLnBvbGljeUNvZGUpKVxuICAgIHRoaXMuaGlkZSgpXG4gIH1cblxuLCByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByYWRpb3MgPSBMaWZlUXVvdGVSZWZEYXRhLlBST0RVQ1RfQ09ERVMubWFwKGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICAgIHJldHVybiBSZWFjdC5ET00ubGFiZWwoIHtjbGFzc05hbWU6XCJyYWRpby1pbmxpbmVcIn0sIFxuICAgICAgICBSZWFjdC5ET00uaW5wdXQoIHt0eXBlOlwicmFkaW9cIiwgbmFtZTpcInBvbGljeUNvZGVcIiwgdmFsdWU6cHJvZHVjdC5jb2RlLCBvbkNoYW5nZTp0aGlzLmhhbmRsZUNoYW5nZX0pLCBwcm9kdWN0Lm5hbWVcbiAgICAgIClcbiAgICB9LmJpbmQodGhpcykpXG4gICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbCBmYWRlXCJ9LCBcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1kaWFsb2dcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtY29udGVudFwifSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWhlYWRlclwifSwgXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNsb3NlQnV0dG9uKCksXG4gICAgICAgICAgICBSZWFjdC5ET00uc3Ryb25nKG51bGwsIFwiUG9saWN5IEFkdmlzb3JcIilcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1ib2R5XCIsIHN0eWxlOntoZWlnaHQ6IDUwMCwgb3ZlcmZsb3dZOiAnc2Nyb2xsJ319LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJXaGF0IGtpbmQgb2YgbGlmZSBpbnN1cmFuY2UgcG9saWN5IHNob3VsZCB5b3UgYnV5P1wiKSksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlRoYXQgZGVwZW5kcyBvbiB5b3VyIG5lZWRzIGFuZCBidWRnZXQuIEEgZ29vZCBmaXJzdCBzdGVwIGlzIHRvIGRldGVybWluZSBpZiB5b3VyIG5lZWRzIGFyZSB0ZW1wb3Jhcnkgb3IgcGVybWFuZW50LiBGb3IgZXhhbXBsZSwgYSBtb3J0Z2FnZSBpcyBhIHRlbXBvcmFyeSBuZWVkLCBiZWNhdXNlIHlvdXIgbW9ydGdhZ2Ugd2lsbCBldmVudHVhbGx5IGJlIHBhaWQgb2ZmLiBGdW5kcyBmb3IgZmluYWwgZXhwZW5zZXMgYXJlIHBlcm1hbmVudCwgYmVjYXVzZSB0aGUgbmVlZCB3aWxsIG5ldmVyIGdvIGF3YXkuXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnRhYmxlKCB7Y2xhc3NOYW1lOlwidGFibGUgdGFibGUtYm9yZGVyZWRcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00udGhlYWQobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsIFwiVGVtcG9yYXJ5IE5lZWRzXCIpLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsIFwiUGVybWFuZW50IE5lZWRzXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBSZWFjdC5ET00udGJvZHkobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFwiTW9ydGdhZ2VcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgXCJJbmNvbWUgcmVwbGFjZW1lbnRcIilcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIkNvbGxlZ2UgZWR1Y2F0aW9uXCIpLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFwiRmluYWwgZXhwZW5zZXNcIilcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIkNoaWxkIGNhcmVcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgXCJFbWVyZ2VuY3kgZnVuZFwiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiR2VuZXJhbGx5IHNwZWFraW5nLCB0ZXJtIGxpZmUgaW5zdXJhbmNlIGlzIGEgZ29vZCBmaXQgZm9yIHBlb3BsZSB3aXRoIHRlbXBvcmFyeSBuZWVkcywgc3VjaCBhcyBwcm90ZWN0aW5nIGEgbW9ydGdhZ2Ugb3IgY292ZXJpbmcgY29zdHMgYXNzb2NpYXRlZCB3aXRoIHJhaXNpbmcgY2hpbGRyZW4sIHN1Y2ggYXMgZGFpbHkgY2hpbGQgY2FyZS4gSW5pdGlhbGx5LCBpdOKAmXMgdXN1YWxseSB0aGUgbGVhc3QgZXhwZW5zaXZlIGNvdmVyYWdlIHlvdSBjYW4gYnV5LlwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiTWFueSBwZW9wbGUgaGF2ZSBwZXJtYW5lbnQgbmVlZHMsIHN1Y2ggYXMgcGF5aW5nIGZvciBmaW5hbCBleHBlbnNlcyBhbmQgcmVwbGFjaW5nIGluY29tZSBzaG91bGQgYSBicmVhZHdpbm5lciBkaWUgcHJlbWF0dXJlbHkuIFBlcm1hbmVudCBpbnN1cmFuY2UgbGFzdHMgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgaW5zdXJlZC5cIiksXG5cbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFJlYWN0LkRPTS5zdHJvbmcobnVsbCwgXCJXaGF04oCZcyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRlcm0gYW5kIHBlcm1hbmVudCBsaWZlIGluc3VyYW5jZT9cIikpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnRhYmxlKCB7Y2xhc3NOYW1lOlwidGFibGUgdGFibGUtYm9yZGVyZWRcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00udGhlYWQobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsIFwiVGVybVwiKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCBcIlBlcm1hbmVudFwiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnRib2R5KG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIkxvd2VzdCBpbml0aWFsIGNvc3RcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgXCJGaXhlZCBwcmVtaXVtc1wiKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFwiTW9yZSBjb3ZlcmFnZSBwZXIgZG9sbGFyXCIpLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFwiQ2FzaCB2YWx1ZSBhY2N1bXVsYXRpb25cIilcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIlByZW1pdW1zIHdpbGwgaW5jcmVhc2UgYWZ0ZXIgaW5pdGlhbCB0ZXJtIHBlcmlvZFwiKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIkd1YXJhbnRlZWQgY2FzaCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFwiQ292ZXJhZ2UgaXMgbm90IHBlcm1hbmVudCgyKVwiKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBcIkNvdmVyYWdlIGZvciBsaWZlKDEpLCBhcyBsb25nIGFzIHByZW1pdW1zIGFyZSBwYWlkXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBSZWFjdC5ET00uc3Ryb25nKG51bGwsIFwiVGVybSBsaWZlIGluc3VyYW5jZVwiKSksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlRlcm0gaW5zdXJhbmNlIHByb3ZpZGVzIGNvdmVyYWdlIGZvciBhIHNwZWNpZmljIHBlcmlvZCBvZiB0aW1lLCBzdWNoIGFzIDEwLCAyMCBvciAzMCB5ZWFycy4gSWYgeW91IGRpZSBkdXJpbmcgdGhhdCBwZXJpb2QsIHRoZSBiZW5lZmljaWFyeSB5b3UgbmFtZSBvbiB5b3VyIHBvbGljeSByZWNlaXZlcyB0aGUgZGVhdGggYmVuZWZpdCBhbW91bnQuIFdoZW4gdGhlIHRlcm0gZW5kcywgc28gZG9lcyB5b3VyIHByb3RlY3Rpb24sIHVubGVzcyB5b3Ugc2VsZWN0IGEgdGVybSBwb2xpY3kgdGhhdCBnaXZlcyB5b3UgdGhlIG9wdGlvbiBvZiByZW5ld2luZyB5b3VyIGNvdmVyYWdlLlwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiVGVybSBwb2xpY2llcyBkb27igJl0IGJ1aWxkIGNhc2ggdmFsdWUgYXMgbW9zdCBwZXJtYW5lbnQgbGlmZSBpbnN1cmFuY2UgcHJvZHVjdHMgZG8uIEJlY2F1c2Ugb2YgdGhpcyBmYWN0LCB3aGVuIHlvdSBidXkgYSB0ZXJtIHBvbGljeSB5b3XigJlyZSBwYXlpbmcgZm9yIHB1cmUgcHJvdGVjdGlvbi4gU28gbW9zdCBvZiB0aGUgdGltZSwgdGVybSBpbnN1cmFuY2UgaXMgdGhlIGxlYXN0IGV4cGVuc2l2ZSBraW5kIG9mIGNvdmVyYWdlIHlvdSBjYW4gYnV5LlwiKSxcblxuICAgICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlBlcm1hbmVudCBsaWZlIGluc3VyYW5jZVwiKSksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlBlcm1hbmVudCBwb2xpY2llcyBwcm92aWRlIHByb3RlY3Rpb24gZm9yIHlvdXIgZW50aXJlIGxpZmUgYnkgcGF5aW5nIGEgc3VtIHRvIHlvdXIgYmVuZWZpY2lhcnkgdXBvbiB5b3VyIGRlYXRoKDEpLiBNb3N0IHBlcm1hbmVudCBwb2xpY2llcyBidWlsZCBjYXNoIHZhbHVlIG92ZXIgdGltZSwgYW5kIHlvdSBjYW4gYWNjZXNzIHRoaXMgY2FzaCB2YWx1ZSBmb3IgZW1lcmdlbmNpZXMsIG9wcG9ydHVuaXRpZXMgb3IgcGxhbm5lZCBsaWZlIGV2ZW50cyBzdWNoIGFzIGEgY29sbGVnZSBlZHVjYXRpb24gb3IgcmV0aXJlbWVudC5cIiksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlRoZXJlIGFyZSBkaWZmZXJlbnQgdHlwZXMgb2YgcGVybWFuZW50IHBvbGljaWVzLiBXaG9sZSBsaWZlIHBvbGljaWVzIHVzdWFsbHkgb2ZmZXIgbGV2ZWwgcHJlbWl1bXMgYW5kIHN0cm9uZywgdHJhZGl0aW9uYWwgZ3VhcmFudGVlcywgc3VjaCBhcyBhIHNjaGVkdWxlIG9mIGd1YXJhbnRlZWQgdmFsdWVzLiBVbml2ZXJzYWwgbGlmZSBwb2xpY2llcyBub3JtYWxseSBvZmZlciBmbGV4aWJsZSBmZWF0dXJlcywgc3VjaCBhcyB0aGUgYWJpbGl0eSB0byBjaGFuZ2UgeW91ciBjb3ZlcmFnZSBhbW91bnQgb3IgeW91ciBwYXltZW50IHNjaGVkdWxlIGFmdGVyIHlvdSBwdXJjaGFzZSB0aGUgcG9saWN5LiBBIHZhcmlhdGlvbiBvbiB1bml2ZXJzYWwgbGlmZSwgdmFyaWFibGUgdW5pdmVyc2FsIGxpZmUgYWxsb3dzIHlvdSB0byBpbnZlc3QgeW91ciBwb2xpY3nigJlzIGNhc2ggdmFsdWVzIGluIGZpeGVkIGFjY291bnRzIGFuZCBzdWItYWNjb3VudHMgdGhhdCBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gZWFybiBtYXJrZXQgcmV0dXJucy4gXCIgKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiRmluYWxseSwgc2luZ2xlIHBheW1lbnQgd2hvbGUgbGlmZSBpcyBhIHR5cGUgb2YgbGlmZSBpbnN1cmFuY2UgeW91IGJ1eSB3aXRoIG9uZSBwYXltZW50LiBCZWNhdXNlIHRoZSBkZWF0aCBiZW5lZml0IGlzIGhpZ2hlciB0aGFuIHRoZSBzaW5nbGUgcGF5bWVudCwgdGhpcyBraW5kIG9mIGxpZmUgaW5zdXJhbmNlIGlzIG9mdGVuIGEgZ29vZCBmaXQgZm9yIHBlb3BsZSBsb29raW5nIHRvIHRyYW5zZmVyIHdlYWx0aC5cIiksXG5cbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJmb290bm90ZXNcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIigxKSBNYW55IHBlcm1hbmVudCBwb2xpY2llcyBlbmRvdyBhdCBhZ2UgMTIxLlwiKSxcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCIoMikgU29tZSB0ZXJtIHBvbGljaWVzIG9mZmVyIHRoZSBvcHRpb24gdG8gY29udGludWUgY292ZXJhZ2UgYXQgdGhlIGVuZCBvZiB0aGUgbGV2ZWwgdGVybSBwZXJpb2QuIEluIG1vc3QgY2FzZXMsIHByZW1pdW1zIHdpbGwgaW5jcmVhc2UgYW5udWFsbHkgYXMgeW91IGFnZS5cIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1mb290ZXJcIiwgc3R5bGU6e21hcmdpblRvcDogMH19LCBcbiAgICAgICAgICAgIHJhZGlvcyxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tcHJpbWFyeVwiLCBvbkNsaWNrOnRoaXMuaGFuZGxlUmV0dXJuVG9RdW90ZX0sIFwiUmV0dXJuIHRvIHF1b3RlXCIpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbGljeUFkdmlzb3JNb2RhbCIsInZhciBMaWZlUXVvdGVSZWZEYXRhID0gcmVxdWlyZSgnTGlmZVF1b3RlUmVmRGF0YScpXG5cbnZhciBtYWtlRW51bSA9IHJlcXVpcmUoJ21ha2VFbnVtJylcblxudmFyIFByb2R1Y3RDb2RlID0gbWFrZUVudW0oTGlmZVF1b3RlUmVmRGF0YS5QUk9EVUNUX0NPREVTLCAnbmFtZScpXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZHVjdENvZGUiLCJ2YXIgTGlmZVF1b3RlUmVmRGF0YSA9IHJlcXVpcmUoJ0xpZmVRdW90ZVJlZkRhdGEnKVxuXG52YXIgbWFrZUxvb2t1cCA9IHJlcXVpcmUoJ21ha2VMb29rdXAnKVxuXG52YXIgUHJvZHVjdENvZGVzID0gbWFrZUxvb2t1cChMaWZlUXVvdGVSZWZEYXRhLlBST0RVQ1RfQ09ERVMpXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZHVjdENvZGVzIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQm9vdHN0cmFwTW9kYWxNaXhpbiA9IHJlcXVpcmUoJ0Jvb3RzdHJhcE1vZGFsTWl4aW4nKVxudmFyIEluY3JlbWVudGluZ0tleU1peGluID0gcmVxdWlyZSgnSW5jcmVtZW50aW5nS2V5TWl4aW4nKVxuXG52YXIgUUFuZEFNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1FBbmRBTW9kYWwnLFxuICBtaXhpbnM6IFtCb290c3RyYXBNb2RhbE1peGluLCBJbmNyZW1lbnRpbmdLZXlNaXhpbl1cblxuLCByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwgZmFkZVwifSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZGlhbG9nXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWNvbnRlbnRcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1oZWFkZXJcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlF1ZXN0aW9ucyBcIiwgJyYnLCBcIiBBbnN3ZXJzXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtYm9keVwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00ucCgge2NsYXNzTmFtZTpcInF1ZXN0aW9uXCJ9LCBcIldoeSBkbyB5b3UgYXNrIGZvciBteSBnZW5kZXIgYW5kIGFnZT9cIiksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlByaWNpbmcgZm9yIGxpZmUgaW5zdXJhbmNlIGlzIGJhc2VkIG9uIG1vcnRhbGl0eSwgb3IgaW4gb3RoZXIgd29yZHMsIHRoZSBwcmVkaWN0aW9uIG9mIGhvdyBsb25nIHlvdSB3aWxsIGxpdmUuIFRoYXQgcHJlZGljdGlvbiBpcyBiYXNlZCBvbiBtYW55IGZhY3RvcnMsIGluY2x1ZGluZyB5b3VyIGFnZSBhbmQgZ2VuZGVyLiBPYnZpb3VzbHksIGlmIHlvdSBhcmUgb2xkZXIsIHlvdSB3aWxsIGxpa2VseSBwYXNzIGF3YXkgYmVmb3JlIHNvbWVvbmUgd2hvIGlzIHN1YnN0YW50aWFsbHkgeW91bmdlci4gQW5kIGdlbmRlciBwbGF5cyBhIHJvbGUgYmVjYXVzZSBzdGF0aXN0aWNhbGx5IHNwZWFraW5nLCB3b21lbiBhcmUgbGlrZWx5IHRvIGxpdmUgbG9uZ2VyIHRoYW4gbWVuLlwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKCB7Y2xhc3NOYW1lOlwicXVlc3Rpb25cIn0sIFwiV2h5IGRvIHlvdSBhc2sgaWYgSSB1c2UgdG9iYWNjbyBwcm9kdWN0cz9cIiksXG4gICAgICAgICAgICBSZWFjdC5ET00ucChudWxsLCBcIlByaWNpbmcgZm9yIGxpZmUgaW5zdXJhbmNlIGlzIGJhc2VkIG9uIGEgcHJlZGljdGlvbiBvZiBob3cgbG9uZyB5b3Ugd2lsbCBsaXZlLiBTdGF0aXN0aWNzIHNob3cgcGVvcGxlIHdobyB1c2UgdG9iYWNjbyBwcm9kdWN0cyBoYXZlIGEgaGlnaGVyIG1vcnRhbGl0eSByYXRlIOKAkyBvciBhIGhpZ2hlciBsaWtlbGlob29kIG9mIHBhc3NpbmcgYXdheSBzb29uZXIg4oCTIHRoYW4gbm9uLXNtb2tlcnMuXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnAoIHtjbGFzc05hbWU6XCJxdWVzdGlvblwifSwgXCJXaGF04oCZcyBhbiB1bmRlcndyaXRpbmcgY2xhc3M/XCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJBbiB1bmRlcndyaXRpbmcgY2xhc3MgaXMgYSBnZW5lcmFsIGNsYXNzaWZpY2F0aW9uIHRoYXQgZGVzY3JpYmVzIHlvdXIgb3ZlcmFsbCBoZWFsdGguIFRoZXNlIGNsYXNzaWZpY2F0aW9ucyBoYXZlIG5hbWVzIGxpa2Ug4oCYRWxpdGUgUHJlZmVycmVk4oCZIGZvciB0aGUgaGVhbHRoaWVzdCBpbmRpdmlkdWFscyBhbmQg4oCYU3RhbmRhcmTigJkgZm9yIGluZGl2aWR1YWxzIHdpdGggZ2VuZXJhbGx5IGdvb2QgaGVhbHRoLiBZb3VyIHVuZGVyd3JpdGluZyBjbGFzcyBkaXJlY3RseSBpbXBhY3RzIHRoZSBwcmljZSB5b3Ugd2lsbCBwYXkgZm9yIGNvdmVyYWdlLCBiZWNhdXNlIGhlYWx0aHkgcGVvcGxlIHRlbmQgdG8gbGl2ZSBsb25nZXIuXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJUaGUgbWVkaWNhbCBxdWVzdGlvbnMgd2UgYXNrIGhlcmUgaGVscCB5b3UgYXJyaXZlIGF0IGFuIGVzdGltYXRlZCB1bmRlcndyaXRpbmcgY2xhc3MsIHdoaWNoIGlzIHRoZW4gdXNlZCB0byBjYWxjdWxhdGUgeW91ciBxdW90ZS4gWW91ciBhbnN3ZXJzIHRvIHRoZSBtZWRpY2FsIHF1ZXN0aW9ucyBhcmUgbm90IHNhdmVkIGluIGFueSB3YXkuXCIpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtZm9vdGVyXCIsIHN0eWxlOnttYXJnaW5Ub3A6IDB9fSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7dHlwZTpcImJ1dHRvblwiLCBjbGFzc05hbWU6XCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazp0aGlzLmhpZGV9LCBcIlJldHVybiB0byBxdW90ZVwiKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBRQW5kQU1vZGFsIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgR2VuZGVycyA9IHJlcXVpcmUoJ0dlbmRlcnMnKVxudmFyIEhlYWx0aENvZGVzID0gcmVxdWlyZSgnSGVhbHRoQ29kZXMnKVxudmFyIFByb2R1Y3RDb2RlcyA9IHJlcXVpcmUoJ1Byb2R1Y3RDb2RlcycpXG52YXIgU3RhdGVzID0gcmVxdWlyZSgnU3RhdGVzJylcbnZhciBTdGVwID0gcmVxdWlyZSgnU3RlcCcpXG5cbnZhciBmb3JtYXREb2xsYXJzID0gcmVxdWlyZSgnZm9ybWF0RG9sbGFycycpXG5cbnZhciBRdW90ZUluZm8gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdRdW90ZUluZm8nLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWFkZXJSb3cgPSBbUmVhY3QuRE9NLnRoKG51bGwpXVxuICAgICAgLCBhbm51YWxSb3cgPSBbUmVhY3QuRE9NLnRoKG51bGwsIFwiQW5udWFsXCIpXVxuICAgICAgLCBtb250aGx5Um93ID0gW1JlYWN0LkRPTS50aChudWxsLCBcIk1vbnRobHlcIildXG4gICAgdGhpcy5wcm9wcy5wYXltZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHBheW1lbnQpIHtcbiAgICAgIGhlYWRlclJvdy5wdXNoKFJlYWN0LkRPTS50aChudWxsLCBwYXltZW50LnRlcm0sIFwiIHllYXJcIikpXG4gICAgICBhbm51YWxSb3cucHVzaChSZWFjdC5ET00udGQobnVsbCwgcGF5bWVudC5hbm51YWxQYXltZW50LnRvRml4ZWQoMikpKVxuICAgICAgbW9udGhseVJvdy5wdXNoKFJlYWN0LkRPTS50ZChudWxsLCBwYXltZW50Lm1vbnRobHlQYXltZW50LnRvRml4ZWQoMikpKVxuICAgIH0pXG4gICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicGFuZWwtYm9keVwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiQ29uZ3JhdHVsYXRpb25zISBZb3XigJl2ZSBqdXN0IHRha2VuIHRoZSBmaXJzdCBzdGVwIHRvd2FyZCBzZWN1cmluZyB5b3VyIGxvdmVkIG9uZXPigJkgZmluYW5jaWFsIGZ1dHVyZS4gWW91ciBsaWZlIGluc3VyYW5jZSBxdW90ZSBpcyBiZWxvdy4gV2hhdOKAmXMgbmV4dD8gRm9yd2FyZCB5b3VyIHF1b3RlIHRvIG9uZSBvZiBvdXIgZXhwZXJpZW5jZWQgYWdlbnRzIHdobyB3aWxsIHdhbGsgeW91IHRocm91Z2ggdGhlIGFwcGxpY2F0aW9uIHByb2Nlc3MuXCIpLFxuICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicm93XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY29sLXNtLTZcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiWW91ciBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS50YWJsZSgge2NsYXNzTmFtZTpcInRhYmxlIHRhYmxlLWJvcmRlcmVkXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLnRib2R5KG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCBcIkdlbmRlclwiKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBHZW5kZXJzW3RoaXMucHJvcHMuZ2VuZXJhbEluZm8uZ2VuZGVyXS50aXRsZSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCBcIkFnZVwiKSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCB0aGlzLnByb3BzLmdlbmVyYWxJbmZvLmFnZSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCBcIlN0YXRlXCIpLFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIFN0YXRlc1t0aGlzLnByb3BzLmdlbmVyYWxJbmZvLnN0YXRlQ29kZV0uYWJicmV2aWF0aW9uKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsIFwiVG9iYWNjbyBVc2VcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgdGhpcy5wcm9wcy5nZW5lcmFsSW5mby50b2JhY2NvID8gJ1Ntb2tlcicgOiAnTm9uIFNtb2tlcicpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00udHIobnVsbCwgXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGgobnVsbCwgXCJBbW91bnQgb2YgY292ZXJhZ2VcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgZm9ybWF0RG9sbGFycyh0aGlzLnByb3BzLmdlbmVyYWxJbmZvLmNvdmVyYWdlKSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLCBcbiAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCBcIlR5cGUgb2YgY292ZXJhZ2VcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgUHJvZHVjdENvZGVzW3RoaXMucHJvcHMuZ2VuZXJhbEluZm8ucHJvZHVjdENvZGVdLm5hbWUpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00udHIobnVsbCwgXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGgobnVsbCwgXCJVbmRlcndyaXRpbmcgY2xhc3NcIiksXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgSGVhbHRoQ29kZXNbdGhpcy5wcm9wcy5nZW5lcmFsSW5mby5oZWFsdGhDb2RlXS50aXRsZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tNlwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaDMobnVsbCwgXCJUZXJtXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnRhYmxlKCB7Y2xhc3NOYW1lOlwidGFibGUgdGFibGUtYm9yZGVyZWRcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00udGhlYWQobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgaGVhZGVyUm93XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBSZWFjdC5ET00udGJvZHkobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRyKG51bGwsIFxuICAgICAgICAgICAgICAgICAgYW5udWFsUm93XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00udHIobnVsbCwgXG4gICAgICAgICAgICAgICAgICBtb250aGx5Um93XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInBhbmVsLWZvb3RlclwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJyb3dcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tMTJcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtbGVmdFwiLCBvbkNsaWNrOnRoaXMucHJvcHMuc2V0QWN0aXZlU3RlcC5iaW5kKG51bGwsIFN0ZXAuR0VORVJBTF9JTkZPKX0sIFwiRWRpdFwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHt0eXBlOlwiYnV0dG9uXCIsIGNsYXNzTmFtZTpcImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIsIG9uQ2xpY2s6dGhpcy5wcm9wcy5zZXRBY3RpdmVTdGVwLmJpbmQobnVsbCwgU3RlcC5TRU5EX1FVT1RFKX0sIFwiRm9yd2FyZCB0byBBZ2VudFwiKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBRdW90ZUluZm8iLCIvKipcbiAqIERpc3BsYXlzIGEgbGlzdCBvZiByYWRpbyBidXR0b25zIHdpdGggdGhlIGdpdmVuIGxhYmVscyBhbmQgbWFuYWdlcyB0cmFja2luZ1xuICogb2YgdGhlIHNlbGVjdGVkIGluZGV4IGFuZCBsYWJlbC5cbiAqIEBqc3ggUmVhY3QuRE9NXG4gKi9cbnZhciBSYWRpb1NlbGVjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1JhZGlvU2VsZWN0JyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFzU2VsZWN0ZWRJbmRleCA9ICh0eXBlb2YgdGhpcy5wcm9wcy5zZWxlY3RlZEluZGV4ICE9ICd1bmRlZmluZWQnKVxuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3RlZEluZGV4OiAoaGFzU2VsZWN0ZWRJbmRleCA/IHRoaXMucHJvcHMuc2VsZWN0ZWRJbmRleDogbnVsbClcbiAgICAsIHNlbGVjdGVkTGFiZWw6IChoYXNTZWxlY3RlZEluZGV4ID8gdGhpcy5wcm9wcy5sYWJlbHNbdGhpcy5wcm9wcy5zZWxlY3RlZEluZGV4XSA6IG51bGwpXG4gICAgfVxuICB9XG5cbiwgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmFkaW9zID0gdGhpcy5wcm9wcy5sYWJlbHMubWFwKGZ1bmN0aW9uKGxhYmVsLCBpKSB7XG4gICAgICByZXR1cm4gUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInJhZGlvXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmxhYmVsKG51bGwsIFxuICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJyYWRpb1wiLFxuICAgICAgICAgICAgcmVmOnRoaXMucHJvcHMucmVmICsgJ18nICsgaSxcbiAgICAgICAgICAgIG5hbWU6dGhpcy5wcm9wcy5yZWYsXG4gICAgICAgICAgICB2YWx1ZTppLFxuICAgICAgICAgICAgY2hlY2tlZDp0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXggPT09IGksXG4gICAgICAgICAgICBvbkNoYW5nZTp0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMsIGksIGxhYmVsKX0pLFxuICAgICAgICAgIGxhYmVsXG4gICAgICAgIClcbiAgICAgIClcbiAgICB9LmJpbmQodGhpcykpXG4gICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYobnVsbCwgcmFkaW9zKVxuICB9XG5cbiwgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihpLCBsYWJlbCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRJbmRleDogaVxuICAgICwgc2VsZWN0ZWRMYWJlbDogbGFiZWxcbiAgICB9KVxuICB9XG5cbiwgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRJbmRleDogbnVsbFxuICAgICwgc2VsZWN0ZWRMYWJlbDogbnVsbFxuICAgIH0pXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9TZWxlY3QiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBDb250YWN0Rm9ybSA9IHJlcXVpcmUoJ0NvbnRhY3RGb3JtJylcbnZhciBHbG9iYWxNb2RhbCA9IHJlcXVpcmUoJ0dsb2JhbE1vZGFsJylcbnZhciBTdGVwID0gcmVxdWlyZSgnU3RlcCcpXG5cbnZhciBTZW5kUXVvdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdTZW5kUXVvdGUnLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uZm9ybSgge2NsYXNzTmFtZTpcImZvcm0taG9yaXpvbnRhbFwiLCByb2xlOlwiZm9ybVwifSwgXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicGFuZWwtYm9keVwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiT25lIG9mIG91ciBleHBlcmllbmNlZCBhZ2VudHMgd2lsbCBiZSBoYXBweSB0byB0YWxrIHRvIHlvdSBhYm91dCB5b3VyIGxpZmUgaW5zdXJhbmNlIG5lZWRzLCBhbmQgd2lsbCBiZSB3aXRoIHlvdSBldmVyeSBzdGVwIG9mIHRoZSB3YXkgd2hlbiB5b3UgcHVyY2hhc2UgeW91ciBwb2xpY3kuIFNpbXBseSB0ZWxsIHVzIHdoZW4geW914oCZZCBsaWtlIHRvIGJlIGNvbnRhY3RlZCwgYW5kIHdl4oCZbGwgY2FsbCB5b3UuXCIpLFxuICAgICAgICBDb250YWN0Rm9ybSgge3JlZjpcImNvbnRhY3RGb3JtXCIsIGVycm9yRGlzcGxheTpcInRleHRcIixcbiAgICAgICAgICBpbml0aWFsRGF0YTp0aGlzLnByb3BzLmNvbnRhY3RJbmZvfVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInBhbmVsLWZvb3RlclwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJyb3dcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjb2wtc20tMTJcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtbGVmdFwiLCBvbkNsaWNrOnRoaXMucHJvcHMuc2V0QWN0aXZlU3RlcC5iaW5kKG51bGwsIFN0ZXAuUVVPVEVfSU5GTyksIGRpc2FibGVkOnRoaXMucHJvcHMubG9hZGluZ30sIFwiQmFjayB0byBSZXN1bHRzXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbigge3R5cGU6XCJidXR0b25cIiwgY2xhc3NOYW1lOlwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiwgb25DbGljazp0aGlzLmhhbmRsZVNlbmQsIGRpc2FibGVkOnRoaXMucHJvcHMubG9hZGluZ30sIFwiU2VuZFwiKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4sIGhhbmRsZVNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5yZWZzLmNvbnRhY3RGb3JtLmdldEZvcm1EYXRhKClcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9wcy5oYW5kbGVTZW5kKGRhdGEsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGFuZGxlU2hvd0dsb2JhbE1vZGFsKEdsb2JhbE1vZGFsLlNFUlZJQ0VfVU5BVkFJTEFCTEUpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5zZXRBY3RpdmVTdGVwKFN0ZXAuVFRGTilcbiAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZFF1b3RlIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQm9vdHN0cmFwTW9kYWxNaXhpbiA9IHJlcXVpcmUoJ0Jvb3RzdHJhcE1vZGFsTWl4aW4nKVxudmFyIEluY3JlbWVudGluZ0tleU1peGluID0gcmVxdWlyZSgnSW5jcmVtZW50aW5nS2V5TWl4aW4nKVxudmFyIExpZmVRdW90ZUNvbnN0YW50cyA9IHJlcXVpcmUoJ0xpZmVRdW90ZUNvbnN0YW50cycpXG5cbnZhciBTZXJ2aWNlVW5hdmFpbGFibGVNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NlcnZpY2VVbmF2YWlsYWJsZU1vZGFsJyxcbiAgbWl4aW5zOiBbQm9vdHN0cmFwTW9kYWxNaXhpbiwgSW5jcmVtZW50aW5nS2V5TWl4aW5dXG5cbiwgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsIGZhZGVcIn0sIFxuICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcIm1vZGFsLWRpYWxvZ1wifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1jb250ZW50XCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibW9kYWwtaGVhZGVyXCJ9LCBcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIilcbiAgICAgICAgICApLFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJtb2RhbC1ib2R5XCJ9LCBcbiAgICAgICAgICAgIFwiIFRoYW5rIHlvdSBmb3IgeW91ciBpbnRlcmVzdCBpbiBhIGxpZmUgaW5zdXJhbmNlIHF1b3RlLiBVbmZvcnR1bmF0ZWx5LCBvdXIgc2VydmljZSBpcyB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZSBhcyB3ZSB3b3JrIHRvIGVuaGFuY2UgeW91ciBleHBlcmllbmNlLiBUbyBvYnRhaW4gYSBxdW90ZSwgcGxlYXNlIFwiLCBSZWFjdC5ET00uYSgge2hyZWY6TGlmZVF1b3RlQ29uc3RhbnRzLkxPQ0FMX1NBTEVTX0FHRU5UX1VSTH0sIFwiY29udGFjdCBvbmUgb2Ygb3VyIGV4cGVyaWVuY2VkIHJlcHJlc2VudGF0aXZlcyBcIiwgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJnbHlwaGljb24gZ2x5cGhpY29uLXNoYXJlXCJ9KSksIFwiIGRpcmVjdGx5LiBcIlxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlVW5hdmFpbGFibGVNb2RhbCIsInZhciBMaWZlUXVvdGVSZWZEYXRhID0gcmVxdWlyZSgnTGlmZVF1b3RlUmVmRGF0YScpXG5cbnZhciBtYWtlRW51bSA9IHJlcXVpcmUoJ21ha2VFbnVtJylcblxudmFyIFN0YXRlID0gbWFrZUVudW0oTGlmZVF1b3RlUmVmRGF0YS5TVEFURV9DT0RFUywgJ2FiYnJldmlhdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGUiLCJ2YXIgTGlmZVF1b3RlUmVmRGF0YSA9IHJlcXVpcmUoJ0xpZmVRdW90ZVJlZkRhdGEnKVxuXG52YXIgbWFrZUxvb2t1cCA9IHJlcXVpcmUoJ21ha2VMb29rdXAnKVxuXG52YXIgU3RhdGVzID0gbWFrZUxvb2t1cChMaWZlUXVvdGVSZWZEYXRhLlNUQVRFX0NPREVTKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlcyIsInZhciBTdGVwID0ge1xuICBHRU5FUkFMX0lORk86IDFcbiwgUVVPVEVfSU5GTzogMlxuLCBTRU5EX1FVT1RFOiAzXG4sIFRURk46IDRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGVwIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgTGlmZVF1b3RlQ29uc3RhbnRzID0gcmVxdWlyZSgnTGlmZVF1b3RlQ29uc3RhbnRzJylcblxudmFyIFRURk4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdUVEZOJyxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwYW5lbC1ib2R5XCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgUmVhY3QuRE9NLnN0cm9uZyhudWxsLCBcIlRoYW5rcyBmb3Igc2VuZGluZyB1cyB5b3VyIHF1b3RlXCIpKSxcbiAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXCJPbmUgb2Ygb3VyIGFnZW50cyB3aWxsIGJlIGluIHRvdWNoIHdpdGggeW91IHNob3J0bHkgdG8gdGFsayBhYm91dCBuZXh0IHN0ZXBzLlwiKSxcbiAgICAgICAgUmVhY3QuRE9NLmEoIHtocmVmOkxpZmVRdW90ZUNvbnN0YW50cy5MSUZFX0lOU1VSQU5DRV9QUk9EVUNUU19VUkwsIGNsYXNzTmFtZTpcImJ0biBidG4tZGVmYXVsdFwifSwgXCJMZWFybiBNb3JlIFwiLCBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImdseXBoaWNvbiBnbHlwaGljb24tc2hhcmVcIn0pKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUVEZOIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgV1RGTiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1dURk4nLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwsIFJlYWN0LkRPTS5hKCB7aHJlZjpcImh0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3RcIiwgdGFyZ2V0OlwiX2JsYW5rXCJ9LCBcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwYW5lbC1ib2R5IHJlYWN0XCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmltZygge3NyYzpcImltZy9yZWFjdF9sb2dvLnBuZ1wifSlcbiAgICAgIClcbiAgICApKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdURk4iLCJ2YXIgQm9vdHN0cmFwRGV2aWNlID0gcmVxdWlyZSgnQm9vdHN0cmFwRGV2aWNlJylcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBhY3RpdmUgQm9vdHN0cmFwIDMgZGV2aWNlIGNsYXNzIGJhc2VkIG9uIGRldmljZSB3aWR0aCBvclxuICogY3VycmVudCB3aW5kb3cgd2lkdGguXG4gKiBAcmV0dXJuIHtCb290c3RyYXBEZXZpY2V9XG4gKi9cbmZ1bmN0aW9uIGJzRGV2aWNlKCkge1xuICB2YXIgd2lkdGggPSAod2luZG93LmlubmVyV2lkdGggPiAwID8gd2luZG93LmlubmVyV2lkdGggOiBzY3JlZW4ud2lkdGgpXG4gIGlmICh3aWR0aCA8IDc2OCkgcmV0dXJuIEJvb3RzdHJhcERldmljZS5YU1xuICBpZiAod2lkdGggPCA5OTIpIHJldHVybiBCb290c3RyYXBEZXZpY2UuU01cbiAgaWYgKHdpZHRoIDwgMTIwMCkgcmV0dXJuIEJvb3RzdHJhcERldmljZS5NRFxuICByZXR1cm4gQm9vdHN0cmFwRGV2aWNlLkxHXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnNEZXZpY2UiLCIvKipcbiAqIENyZWF0ZXMgYSBjbGFzc05hbWUgc3RyaW5nIGluY2x1ZGluZyBzb21lIGNsYXNzIG5hbWVzIGNvbmRpdGlvbmFsbHkuXG4gKiBAcGFyYW0ge3N0cmluZz19IHN0YXRpY0NsYXNzTmFtZSBjbGFzcyBuYW1lKHMpIHdoaWNoIHNob3VsZCBhbHdheXMgYmVcbiAqICAgaW5jbHVkZWQuXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCAqPn0gY29uZGl0aW9uYWxDbGFzc05hbWVzIGFuIG9iamVjdCBtYXBwaW5nIGNsYXNzXG4gKiAgIG5hbWVzIHRvIGEgdmFsdWUgd2hpY2ggaW5kaWNhdGVzIGlmIHRoZSBjbGFzcyBuYW1lIHNob3VsZCBiZSBpbmNsdWRlZCAtXG4gKiAgIGNsYXNzIG5hbWVzIHdpbGwgYmUgaW5jbHVkZWQgaWYgdGhlaXIgY29ycmVzcG9uZGluZyB2YWx1ZSBpcyB0cnV0aHkuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNsYXNzTmFtZXMoc3RhdGljQ2xhc3NOYW1lLCBjb25kaXRpb25hbENsYXNzTmFtZXMpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgaWYgKHR5cGVvZiBjb25kaXRpb25hbENsYXNzTmFtZXMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25kaXRpb25hbENsYXNzTmFtZXMgPSBzdGF0aWNDbGFzc05hbWVcbiAgfVxuICBlbHNlIHtcbiAgICBuYW1lcy5wdXNoKHN0YXRpY0NsYXNzTmFtZSlcbiAgfVxuICBmb3IgKHZhciBjbGFzc05hbWUgaW4gY29uZGl0aW9uYWxDbGFzc05hbWVzKSB7XG4gICAgaWYgKCEhY29uZGl0aW9uYWxDbGFzc05hbWVzW2NsYXNzTmFtZV0pIHtcbiAgICAgIG5hbWVzLnB1c2goY2xhc3NOYW1lKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmFtZXMuam9pbignICcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcyIsIi8qKlxuICogRnJvbSBVbmRlcnNjb3JlLmpzIDEuNS4yXG4gKiBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuICogKGMpIDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICogYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuICogTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gKiBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjb250ZXh0ID0gdGhpc1xuICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGFzdCA9IChuZXcgRGF0ZSgpKSAtIHRpbWVzdGFtcFxuICAgICAgaWYgKGxhc3QgPCB3YWl0KSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICAgIGlmICghaW1tZWRpYXRlKSByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgfVxuICAgIGlmIChjYWxsTm93KSByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2UiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBmb3JtYXREb2xsYXJzID0gcmVxdWlyZSgnZm9ybWF0RG9sbGFycycpXG5cbmZ1bmN0aW9uIGRvbGxhck9wdGlvbnMoc3RhcnQsIGVuZEluY2x1c2l2ZSwgc3RlcCkge1xuICB2YXIgb3B0aW9ucyA9IFtdXG4gIGZvciAodmFyIGFtb3VudCA9IHN0YXJ0OyBhbW91bnQgPD0gZW5kSW5jbHVzaXZlOyBhbW91bnQgKz0gc3RlcCkge1xuICAgIG9wdGlvbnMucHVzaChSZWFjdC5ET00ub3B0aW9uKCB7dmFsdWU6YW1vdW50fSwgZm9ybWF0RG9sbGFycyhhbW91bnQpKSlcbiAgfVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbGxhck9wdGlvbnMiLCJ2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBleHRlbmQoZGVzdCkge1xuICBmb3IgKHZhciBpID0gMSwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgc3JjID0gYXJndW1lbnRzW2ldXG4gICAgaWYgKCFzcmMgfHwgdHlwZW9mIHNyYyAhPSAnb2JqZWN0JykgY29udGludWVcbiAgICBmb3IgKHZhciBwcm9wIGluIHNyYykge1xuICAgICAgaWYgKCFoYXNPd24uY2FsbChzcmMsIHByb3ApKSBjb250aW51ZVxuICAgICAgZGVzdFtwcm9wXSA9IHNyY1twcm9wXVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZCIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIExpZmVRdW90ZSA9IHJlcXVpcmUoJ0xpZmVRdW90ZScpXG5cbnZhciB6aXBDb2RlTWF0Y2ggPSAvemlwQ29kZT0oXFxkezV9KS8uZXhlYyh3aW5kb3cubG9jYXRpb24uaHJlZilcbnZhciBxdWVyeVBhcmFtWmlwQ29kZSA9ICh6aXBDb2RlTWF0Y2ggIT0gbnVsbCA/IHppcENvZGVNYXRjaFsxXSA6ICcnKVxuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoTGlmZVF1b3RlKCB7cXVlcnlQYXJhbVppcENvZGU6cXVlcnlQYXJhbVppcENvZGV9KSxcbiAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlmZXF1b3RlJykpXG4iLCJmdW5jdGlvbiBmb3JtYXREb2xsYXJzKGRvbGxhcnMpIHtcbiAgcmV0dXJuICckJyArIGRvbGxhcnMudG9Mb2NhbGVTdHJpbmcoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdERvbGxhcnMiLCJ2YXIgTGlmZVF1b3RlUmVmRGF0YSA9IHJlcXVpcmUoJ0xpZmVRdW90ZVJlZkRhdGEnKVxuXG52YXIgcmVmRGF0YU9wdGlvbnMgPSByZXF1aXJlKCdyZWZEYXRhT3B0aW9ucycpXG5cbnZhciBnZW5kZXJPcHRpb25zID0gcmVmRGF0YU9wdGlvbnMuYmluZChudWxsLCBMaWZlUXVvdGVSZWZEYXRhLkdFTkRFUl9DT0RFUywgJ3RpdGxlJylcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5kZXJPcHRpb25zIiwidmFyIExpZmVRdW90ZVJlZkRhdGEgPSByZXF1aXJlKCdMaWZlUXVvdGVSZWZEYXRhJylcblxudmFyIHJlZkRhdGFPcHRpb25zID0gcmVxdWlyZSgncmVmRGF0YU9wdGlvbnMnKVxuXG52YXIgaGVhbHRoT3B0aW9ucyA9IHJlZkRhdGFPcHRpb25zLmJpbmQobnVsbCwgTGlmZVF1b3RlUmVmRGF0YS5IRUFMVEhfQ09ERVMsICd0aXRsZScpXG5cbm1vZHVsZS5leHBvcnRzID0gaGVhbHRoT3B0aW9ucyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuZnVuY3Rpb24gaW50ZWdlck9wdGlvbnMoc3RhcnQsIGVuZEluY2x1c2l2ZSkge1xuICB2YXIgb3B0aW9ucyA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8PSBlbmRJbmNsdXNpdmU7IGkrKykge1xuICAgIG9wdGlvbnMucHVzaChSZWFjdC5ET00ub3B0aW9uKCB7dmFsdWU6aX0sIGkpKVxuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZWdlck9wdGlvbnMiLCJ2YXIgaXNaaXAgPSBmdW5jdGlvbigpIHtcbiAgdmFyIFpJUF9SRSA9IC9eXFxkezV9KD86LT9cXGR7NH0pPyQvXG4gIHJldHVybiBmdW5jdGlvbiBpc1ppcCh2YWx1ZSkge1xuICAgIHJldHVybiBaSVBfUkUudGVzdCh2YWx1ZSlcbiAgfVxufSgpXG5cbm1vZHVsZS5leHBvcnRzID0gaXNaaXAiLCIvLyBFbnVtcyBmb3IgZGlyZWN0IGFjY2VzcyB0byBjb2RlcyBieSBuYW1lIChpbiBDT05TVEFOVF9DQVBTX1NUWUxFKVxuZnVuY3Rpb24gbWFrZUVudW0ocmVmRGF0YSwgbmFtZVByb3ApIHtcbiAgdmFyIGVudW1fID0ge31cbiAgcmVmRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBlbnVtX1tkYXRhW25hbWVQcm9wXS5yZXBsYWNlKC9cXHMvZywgJ18nKS50b1VwcGVyQ2FzZSgpXSA9IGRhdGEuY29kZVxuICB9KVxuICByZXR1cm4gZW51bV9cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlRW51bSIsIi8vIENvZGUgLT4gUmVmIERhdGEgTG9va3Vwc1xuZnVuY3Rpb24gbWFrZUxvb2t1cChyZWZEYXRhKSB7XG4gIHZhciBsb29rdXAgPSB7fVxuICByZWZEYXRhLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgIGxvb2t1cFtkYXRhLmNvZGVdID0gZGF0YVxuICB9KVxuICByZXR1cm4gbG9va3VwXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFrZUxvb2t1cCIsInZhciBMaWZlUXVvdGVSZWZEYXRhID0gcmVxdWlyZSgnTGlmZVF1b3RlUmVmRGF0YScpXG5cbnZhciByZWZEYXRhT3B0aW9ucyA9IHJlcXVpcmUoJ3JlZkRhdGFPcHRpb25zJylcblxudmFyIHByb2R1Y3RPcHRpb25zID0gcmVmRGF0YU9wdGlvbnMuYmluZChudWxsLCBMaWZlUXVvdGVSZWZEYXRhLlBST0RVQ1RfQ09ERVMsICduYW1lJylcblxubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0T3B0aW9ucyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuZnVuY3Rpb24gcmVmRGF0YU9wdGlvbnMocmVmRGF0YSwgb3B0aW9uUHJvcCkge1xuICByZXR1cm4gcmVmRGF0YS5tYXAoZnVuY3Rpb24oZGF0dW0pIHtcbiAgICByZXR1cm4gUmVhY3QuRE9NLm9wdGlvbigge3ZhbHVlOmRhdHVtLmNvZGV9LCBkYXR1bVtvcHRpb25Qcm9wXSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWZEYXRhT3B0aW9ucyIsInZhciBMaWZlUXVvdGVSZWZEYXRhID0gcmVxdWlyZSgnTGlmZVF1b3RlUmVmRGF0YScpXG5cbnZhciByZWZEYXRhT3B0aW9ucyA9IHJlcXVpcmUoJ3JlZkRhdGFPcHRpb25zJylcblxudmFyIHN0YXRlT3B0aW9ucyA9IHJlZkRhdGFPcHRpb25zLmJpbmQobnVsbCwgTGlmZVF1b3RlUmVmRGF0YS5TVEFURV9DT0RFUywgJ2FiYnJldmlhdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGVPcHRpb25zIiwidmFyIFRSSU1fUkUgPSAvXlxccyt8XFxzKyQvZ1xuXG5mdW5jdGlvbiB0cmltKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoVFJJTV9SRSwgJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbSJdfQ==
