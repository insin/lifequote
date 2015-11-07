import AutoForm from 'react-auto-form'
import Button from 'react-bootstrap/lib/Button'
import classnames from 'classnames'
import Modal from 'react-bootstrap/lib/Modal'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import React, {PropTypes} from 'react'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import validator from 'validator'

import createModal from './createModal'
import HelpIcon from '../components/HelpIcon'
import {formatDollars} from '../utils'

const FIELD_VALIDATORS = {
  monthlyNetIncome: 'isFloat',
  yearsIncomeProvided: 'isInt',
  outstandingMortgageOrRent: 'isFloat',
  currentOutstandingDebts: 'isFloat',
  numCollegeChildren: 'isInt',
  estCollegeExpensePerChild: 'isFloat',
  estFinalExpenses: 'isFloat',
  currentLiquidAssets: 'isFloat',
  personallyOwnedInsurance: 'isFloat'
}

const ERROR_MESSAGES = {
  isFloat: 'Please enter a dollar amount',
  isInt: 'Please enter a number'
}

function validateField(name, value) {
  if (!value) {
    return 'This field is required'
  }
  let validation = FIELD_VALIDATORS[name]
  if (!validator[validation](value)) {
    return ERROR_MESSAGES[validation]
  }
}

let FormField = React.createClass({
  contextTypes: {
    errors: PropTypes.object.isRequired
  },

  render() {
    let {children, help, label, name} = this.props
    let error = this.context.errors[this.props.name]
    let field = <OverlayTrigger position="right" overlay={error ? <Tooltip>{error}</Tooltip> : <span/>}>
      {children}
    </OverlayTrigger>
    return <div className={classnames('form-group', {'has-error': error})}>
      <label htmlFor={name} className="col-sm-8 control-label">{label}</label>
      <div className="col-sm-3">
        {field}
      </div>
      <div className="col-sm-1">
        <p className="form-control-static">
          <HelpIcon>{help}</HelpIcon>
        </p>
      </div>
    </div>
  }
})

let DollarField = (props) => <FormField {...props}>
  <div className="input-group">
    <span className="input-group-addon">$</span>
    <input
      type="text"
      className="form-control"
      name={props.name}
      id={props.name}
      value={props.value}
      placeholder={props.placeholder || ''}
    />
  </div>
</FormField>

let IntegerField = (props) => <FormField {...props}>
  <input
    type="text"
    className="form-control"
    name={props.name}
    id={props.name}
    value={props.value}
  />
</FormField>

let NeedsCalculatorModal = React.createClass({
  getInitialState() {
    return {
      coverage: null,
      form: {},
      errors: {}
    }
  },
  childContextTypes: {
    errors: PropTypes.object
  },
  getChildContext() {
    return {
      errors: this.state.errors
    }
  },

  handleAccept() {
    this.props.setCoverage(this.state.coverage)
    this.props.hideModal()
  },
  handleBack() {
    this.setState({coverage: null})
  },
  handleChange(e, name, value, change) {
    this.setState({
      form: {...this.state.form, ...change},
      errors: {...this.state.errors, [name]: validateField(name, value)}
    })
  },
  handleReset() {
    this.setState({form: {}, errors: {}})
  },
  handleSubmit(e, form) {
    e.preventDefault()
    let errors = Object.keys(FIELD_VALIDATORS).reduce((errors, name) => {
      var error = validateField(name, form[name])
      if (error) {
        errors[name] = error
      }
      return errors
    }, {})

    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      // TODO Calculate suggested amount
      // console.info(form)
      this.setState({form, coverage: 100000})
    }
  },

  getValue(name) {
    return this.state.form[name] || ''
  },

  render() {
    let {coverage} = this.state
    let {hideModal} = this.props
    let body
    let footer
    if (coverage == null) {
      body = <div className="form-horizontal">
        <p>Our needs calculator lets you estimate how much life insurance you may need in addition to the amount you may already own.</p>
        <DollarField
          name="monthlyNetIncome"
          label="Monthly net income"
          value={this.getValue('monthlyNetIncome')}
          help={`
            After-tax earnings per month
          `}
        />
        <IntegerField
          name="yearsIncomeProvided"
          label="Number of years you wish to provide income"
          value={this.getValue('yearsIncomeProvided')}
          help={`
            This number is how many years you would like to generate income for your family members or beneficiaries in order to cover expenses identified.
            Most experts recommend a minimum of 3-5 years.
          `}
        />
        <DollarField
          name="outstandingMortgageOrRent"
          label="Outstanding mortgage or rent payments"
          value={this.getValue('outstandingMortgageOrRent')}
          help={`
            Include mortgage balance and home equity loan balances.
            Or, determine the sufficient amount for 10 years, or 120 months, of rent.
          `}
        />
        <DollarField
          name="currentOutstandingDebts"
          label="Current outstanding debts"
          value={this.getValue('currentOutstandingDebts')}
          help={`
            Include credit cards, installment credit or other loan debts, such as school and auto.
          `}
        />
        <IntegerField
          name="numCollegeChildren"
          label="Number of children to attend college"
          value={this.getValue('numCollegeChildren')}
          help={`
            Number of children who have yet to enter college. This would not include children who have completed college.
            Children who do not require college funding do not need to be included here.
          `}
        />
        <DollarField
          name="estCollegeExpensePerChild"
          label="Estimated college expenses per child"
          value={this.getValue('estCollegeExpensePerChild')}
          help={`
            Four years at a private institution averages $129,228.
            Four years at a public institution averages $54,356.
            Costs include tuition fees, room and board as reported by the College Board, New York 2007.
          `}
        />
        <DollarField
          name="estFinalExpenses"
          label="Estimated final expenses"
          value={this.getValue('estFinalExpenses')}
          help={`
            Final expense costs are the costs associated with a funeral or final estate settlement costs.
            A typical burial costs between $8,000 and $12,000.
          `}
          placeholder="10,000"
        />
        <DollarField
          name="currentLiquidAssets"
          label="Current liquid assets"
          value={this.getValue('currentLiquidAssets')}
          help={`
            Liquid assets would include savings and investments, but would not include a 401K or real estate such as a house.
          `}
        />
        <DollarField
          name="personallyOwnedInsurance"
          label="Personally owned life insurance"
          value={this.getValue('personallyOwnedInsurance')}
          help={`
            This number should equal the total amount of coverage on your life, including coverage from any individual policies.
          `}
        />
      </div>
      footer = <div>
        <Button onClick={this.handleReset}>Reset</Button>
        <Button type="submit" bsStyle="primary">Calculate</Button>
      </div>
    }
    else {
      body = <div>
        <p>Based on the information entered, you need a total of <strong>{formatDollars(coverage)}</strong> in order to cover your life insurance needs.</p>
        <p><strong>Note:</strong> This calculation does not incorporate any assumptions about investment results, estate taxes or inflation.</p>
      </div>
      footer = <div>
        <Button onClick={this.handleBack}>Back</Button>
        <Button bsStyle="primary" onClick={this.handleAccept}>Accept</Button>
      </div>
    }

    return <AutoForm onChange={this.handleChange} onSubmit={this.handleSubmit} trimOnSubmit>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Needs Calculator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </AutoForm>
  }
})

export default createModal(NeedsCalculatorModal)
