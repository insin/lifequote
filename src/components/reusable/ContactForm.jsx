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

var ContactForm = React.createClass({
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
    return <div className="form-horizontal">
      {this.textInput('firstName', 'First Name')}
      {this.textInput('lastName', 'Last Name')}
      {this.textInput('phoneNmbr', 'Phone number')}
      {this.props.email && this.textInput('emailAddr', 'Email')}
      {this.props.question && this.textarea('question', 'Question')}
      {this.textInput('address', 'Address')}
      {this.textInput('city', 'City')}
      {this.select('stateCode', 'State', stateOptions)}
      {this.textInput('zipCode', 'Zip Code')}
      {this.radioInlines('currentCustomer'
       , 'Are you currently a ' + LifeQuoteConstants.COMPANY + ' Customer?'
       , ['Yes', 'No']
       , {defaultValue: 'No'}
       )}
    </div>
  }

, textInput: function(id, label, kwargs) {
    kwargs = extend({defaultValue: ''}, kwargs)
    var input =
      <input type="text" className="form-control" id={id} ref={id}
        defaultValue={this.getDefaultValue(id, kwargs.defaultValue)}
      />
    return this.formField(id, label, input, kwargs)
  }

, textarea: function(id, label, kwargs) {
    kwargs = extend({defaultValue: ''}, kwargs)
    var textarea =
      <textarea className="form-control" id={id} ref={id}
        defaultValue={this.getDefaultValue(id, kwargs.defaultValue)}
      />
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
        return <option value={value}>{value}</option>
      })
    }
    var select =
      <select className="form-control" id={id} ref={id}
        defaultValue={this.getDefaultValue(id, kwargs.defaultValue)}
      >
        {options}
      </select>
    return this.formField(id, label, select, kwargs)
  }

, radioInlines: function(id, label, values, kwargs) {
    kwargs = extend({defaultValue: values[0]}, kwargs)
    var defaultValue = this.getDefaultValue(id, kwargs.defaultValue)
    var radios = values.map(function(value) {
      return <label className="radio-inline">
        <input type="radio" ref={id + value} name={id} value={value}
          defaultChecked={value === defaultValue}
        />
        {value}
      </label>
    })
    return this.formField(id, label, radios, kwargs)
  }

, formField: function(id, label, field, kwargs) {
    var fieldColClass = 'col-sm-6'
      , hasError = (id in this.state.errors)
      , errorDisplay
    if (this.props.errorDisplay == 'text') {
      fieldColClass = 'col-sm-4'
      errorDisplay = <div className="col-sm-4 help-text">
        <p className="form-control-static">
          {hasError && this.state.errors[id]}
        </p>
      </div>
    }
    return <div className={$c('form-group', {'has-error': hasError})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className={fieldColClass}>
        {field}
      </div>
      {errorDisplay}
    </div>
  }
})

module.exports = ContactForm