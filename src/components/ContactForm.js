import classnames from 'classnames'
import React, {PropTypes} from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import validator from 'validator'

import {COMPANY} from '../constants'
import {stateOptions} from '../options'
import {isZip} from '../utils'

// Fields which are always present and required
let BASE_REQUIRED_FIELDS = [
  'firstName', 'lastName', 'phoneNmbr', 'address', 'city', 'stateCode', 'zipCode'
]

let FormField = React.createClass({
  contextTypes: {
    errorDisplay: PropTypes.string,
    errors: PropTypes.object
  },

  render() {
    let {children, id, label} = this.props
    let {errorDisplay, errors} = this.context
    let error = errors[id]
    let field = children
    if (errorDisplay === 'tooltip') {
      field = <OverlayTrigger position="right" overlay={error ? <Tooltip>{error}</Tooltip> : <span/>}>
        {field}
      </OverlayTrigger>
    }
    return <div className={classnames('form-group', {'has-error': error})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className={classnames({
        'col-sm-4': errorDisplay === 'text',
        'col-sm-6': errorDisplay === 'tooltip'
      })}>
        {field}
      </div>
      {!!error && errorDisplay === 'text' && <div className="col-sm-4 help-text">
        <p className="form-control-static">
          {error}
        </p>
      </div>}
    </div>
  }
})

let RadioInlines = (props) => <FormField {...props}>
  <div>
    {props.options.map(value => <label className="radio-inline" key={value}>
      <input
        defaultChecked={value === props.defaultValue}
        name={props.id}
        type="radio"
        value={value}
      /> {value}
    </label>)}
  </div>
</FormField>

let Select = (props) => <FormField {...props}>
  <select className="form-control" defaultValue={props.value} id={props.id} name={props.id}>
    {typeof props.options == 'function'
     ? props.options()
     : props.options.map(value => <option value={value} key={value}>{value}</option>)
    }
  </select>
</FormField>

let Textarea = (props) => <FormField {...props}>
  <textarea
    className="form-control"
    id={props.id}
    defaultValue={props.value}
  />
</FormField>

let TextInput = (props) => <FormField {...props}>
  <input
    type="text"
    className="form-control"
    id={props.id}
    defaultValue={props.value}
  />
</FormField>

/**
 * An uncontrolled form for collecting contact details.
 */
let ContactForm = React.createClass({
  statics: {
    validate(data, {email = true, question = false} = {}) {
      let errors = {}
      let requiredFields = [...BASE_REQUIRED_FIELDS]
      if (email) requiredFields.push('emailAddr')
      if (question) requiredFields.push('question')
      requiredFields.forEach(name => {
        if (!data[name]) {
          errors[name] = 'This field is required'
        }
      })
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
      if (email && !('emailAddr' in errors) && !validator.isEmail(data.emailAddr)) {
        errors.emailAddr = 'Must be a valid email address'
      }
      return errors
    }
  },
  propTypes: {
    email: PropTypes.bool,
    errorDisplay: PropTypes.oneOf(['text', 'tooltip']),
    errors: PropTypes.object,
    initialData: PropTypes.object,
    question: PropTypes.bool
  },
  getDefaultProps() {
    return {
      email: true,
      errorDisplay: 'text',
      errors: {},
      initialData: {},
      question: false
    }
  },
  childContextTypes: {
    errorDisplay: PropTypes.string,
    errors: PropTypes.object
  },
  getChildContext() {
    return {
      errorDisplay: this.props.errorDisplay,
      errors: this.props.errors
    }
  },
  getValue(id, initialDefault = '') {
    return (this.props.initialData && this.props.initialData[id]) || initialDefault
  },
  render() {
    let {email, question} = this.props
    return <div className="form-horizontal">
      <TextInput id="firstName" label="First Name" value={this.getValue('firstName')}/>
      <TextInput id="lastName" label="Last Name" value={this.getValue('lastName')}/>
      <TextInput id="phoneNmbr" label="Phone number" value={this.getValue('phoneNmbr')}/>
      {email && <TextInput id="emailAddr" label="Email" value={this.getValue('emailAddr')}/>}
      {question && <Textarea id="question" label="Question" value={this.getValue('question')}/>}
      <TextInput id="address" label="Address" value={this.getValue('address')}/>
      <TextInput id="city" label="City" value={this.getValue('city')}/>
      <Select id="stateCode" label="State" options={stateOptions} value={this.getValue('stateCode')}/>
      <TextInput id="zipCode" label="Zip Code" value={this.getValue('zipCode')}/>
      <RadioInlines
        defaultValue={this.getValue('currentCustomer', 'No')}
        id="currentCustomer"
        label={`Are you currently a ${COMPANY} Customer?`}
        options={['Yes', 'No']}
      />
    </div>
  }
})

module.exports = ContactForm
