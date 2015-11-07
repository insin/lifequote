import AutoForm from 'react-auto-form'
import Button from 'react-bootstrap/lib/Button'
import classnames from 'classnames'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'

import HealthCodeModal from '../modals/HealthCodeModal'
import NeedsCalculatorModal from '../modals/NeedsCalculatorModal'
import PermanentInsuranceModal from '../modals/PermanentInsuranceModal'
import PolicyAdvisorModal from '../modals/PolicyAdvisorModal'

import {PRIVACY_POLICY_URL} from '../constants'
import {Gender, GeneralInfoModal, HealthCode, ProductCode, State} from '../enums'
import {dollarOptions, genderOptions, healthOptions, integerOptions, productOptions, stateOptions} from '../options'
import {debounce, isZip} from '../utils'

let FORM_DEFAULTS = {
  age: 35,
  coverage: 250000,
  gender: Gender.MALE,
  healthCode: HealthCode.EXCELLENT,
  productCode: ProductCode.TERM,
  stateCode: State.AL,
  tobacco: 'No'
}

let FormField = ({children, error, id, label, modal}) =>
  <div className={classnames('form-group', {'has-error': !!error})}>
    <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
    <div className="col-sm-4">
      {children}
    </div>
    {!!error && <Col sm={4} className="help-text">
      <p className="form-control-static">
        {error}
      </p>
    </Col>}
    {modal && <Col sm={4}>
      <p className="form-control-static">
        {modal}
      </p>
    </Col>}
  </div>

let GeneralInfo = React.createClass({
  getInitialState() {
    let {initialData, zipCode} = this.props
    return {
      form: initialData || {...FORM_DEFAULTS, zipCode},
      errors: {},
      modal: null
    }
  },

  hideModal({next = null} = {}) {
    this.setState({modal: null})
    if (next) {
      this.props.showModal(next)
    }
  },
  showModal(modal) {
    this.setState({modal})
  },

  handleChange(e, name, data, change) {
    this.setState({form: {...this.state.form, ...change}})
  },
  handleReset() {
    this.setState(this.getInitialState())
  },
  handleSubmit(e, data) {
    e.preventDefault()
    if (Number(data.productCode) === ProductCode.PERMANENT) {
      return this.showModal(GeneralInfoModal.PERMANENT_INSURANCE)
    }
    if (!this.handleZipChange({target: {value: data.zipCode}})) {
      return
    }
    if (!data.reviewed) {
      return window.alert('You must indicate that you have read our privacy policy before proceeding.')
    }
    this.props.getQuote(data)
  },
  handleZipChange(e) {
    let zipCode = e.target.value
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
  },

  setCoverage(coverage) {
    this.setState({form: {...this.state.form, coverage}})
  },
  setProductCode(productCode) {
    if (productCode) {
      this.setState({form: {...this.state.form, productCode}})
    }
  },
  setHealthCode(healthCode) {
    this.setState({form: {...this.state.form, healthCode}})
  },

  render() {
    let {errors, form} = this.state
    let {loading} = this.props
    return <div>
      <AutoForm className="form-horizontal" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <div className="panel-body">
          <p><strong>Simply enter your information for a no-obligation quote.</strong></p>
          <FormField id="gender" label="Gender">
            <select className="form-control" name="gender" id="gender" value={form.gender}>
              {genderOptions()}
            </select>
          </FormField>
          <FormField id="age" label="Age">
            <select className="form-control" name="age" id="age" value={form.age}>
              {integerOptions(25, 70)}
            </select>
          </FormField>
          <FormField id="state" label="State">
            <select className="form-control" name="stateCode" id="stateCode" value={form.stateCode}>
              {stateOptions()}
            </select>
          </FormField>
          <FormField id="zipCode" label="Zip Code" error={errors.zipCode}>
            <input
              className="form-control"
              id="zipCode"
              name="zipCode"
              onChange={debounce(this.handleZipChange, 250)}
              type="text"
              value={form.zipCode}
            />
          </FormField>
          <FormField label="Do you use tobacco products?">
            <label className="radio-inline">
              <input type="radio" name="tobacco" value="Yes"checked={form.tobacco === 'Yes'}/> Yes
            </label>
            <label className="radio-inline">
              <input type="radio" name="tobacco" value="No" checked={form.tobacco === 'No'}/> No
            </label>
          </FormField>
          <FormField id="coverage" label="Coverage"
            modal={<Button bsStyle="link" onClick={(e) => this.showModal(GeneralInfoModal.NEEDS_CALCULATOR, e)}>
              How much do you need?
            </Button>}>
            <select className="form-control" name="coverage" id="coverage" value={form.coverage}>
              {[...dollarOptions(100000, 950000, 50000), ...dollarOptions(1000000, 3000000, 500000)]}
            </select>
          </FormField>
          <FormField id="productCode" label="Type of coverage"
            modal={<Button bsStyle="link" onClick={(e) => this.showModal(GeneralInfoModal.POLICY_ADVISOR, e)}>
              What kind should you buy?
            </Button>}>
            <select className="form-control" name="productCode" id="productCode" value={form.productCode}>
              {productOptions()}
            </select>
          </FormField>
          <FormField id="healthCode" label="Health category"
            modal={<Button bsStyle="link" onClick={(e) => this.showModal(GeneralInfoModal.HEALTH_CODE, e)}>
              What’s your category?
            </Button>}>
            <select className="form-control" name="healthCode" id="healthCode" value={form.healthCode}>
              {healthOptions()}
            </select>
          </FormField>
          <p><strong>Privacy Policy</strong></p>
          <p>Please read our <a href={PRIVACY_POLICY_URL} target="_blank">privacy policy <span className="glyphicon glyphicon-share"></span></a> which explains how we use and protect your personal information.</p>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-4">
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="reviewed" value="reviwed" checked={!!form.reviewed}/> I have reviewed the privacy policy and want to continue
                </label>
              </div>
            </div>
          </div>
          <p><strong>Thanks for helping us provide you with a more accurate quote.</strong></p>
        </div>
        <div className="panel-footer">
          <Row>
            <Col sm={12}>
              <Button className="pull-left" disabled={loading} onClick={this.handleReset}>Reset</Button>
              <Button type="submit" bsStyle="primary" className="pull-right" disabled={loading}>Get Quote</Button>
            </Col>
          </Row>
        </div>
      </AutoForm>
      {this.renderModal()}
    </div>
  },

  renderModal() {
    switch (this.state.modal) {
      case GeneralInfoModal.NEEDS_CALCULATOR:
        return <NeedsCalculatorModal
          setCoverage={this.setCoverage}
          onExit={this.hideModal}
        />
      case GeneralInfoModal.POLICY_ADVISOR:
        return <PolicyAdvisorModal
          setProductCode={this.setProductCode}
          onExit={this.hideModal}
        />
      case GeneralInfoModal.HEALTH_CODE:
        return <HealthCodeModal
          setHealthCode={this.setHealthCode}
          onExit={this.hideModal}
        />
      case GeneralInfoModal.PERMANENT_INSURANCE:
        return <PermanentInsuranceModal onExit={this.hideModal}/>
    }
  }
})

export default GeneralInfo
