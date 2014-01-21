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

var GeneralInfo = React.createClass({
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
        modal = <NeedsCalculatorModal
                  handleAccept={this.handleAcceptCoverage}
                  handleHidden={this.handleModalHidden}
                />
    else if (this.state.modal === GeneralInfoModal.POLICY_ADVISOR)
        modal = <PolicyAdvisorModal
                  handleSelectProductCode={this.handleSelectProductCode}
                  handleHidden={this.handleModalHidden}
                />
    else if (this.state.modal === GeneralInfoModal.HEALTH_CODE)
        modal = <HealthCodeModal
                  handleAccept={this.handleAcceptHealthCode}
                  handleHidden={this.handleModalHidden}
                />
    else if (this.state.modal === GeneralInfoModal.PERMANENT_INSURANCE)
        modal = <PermanentInsuranceModal
                  handleShowGlobalModal={this.handleShowGlobalModal}
                  handleHidden={this.handleModalHidden}
                />

    return <div><form className="form-horizontal" role="form">
      <div className="panel-body">
        <p><strong>Simply enter your information for a no-obligation quote.</strong></p>
        <div className="form-group">
          <label htmlFor="gender" className="col-sm-4 control-label">Gender</label>
          <div className="col-sm-4">
            <select className="form-control" ref="gender" id="gender" defaultValue={this.props.initialData.gender || this.defaults.gender}>
              {genderOptions()}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age" className="col-sm-4 control-label">Age</label>
          <div className="col-sm-4">
            <select className="form-control" ref="age" id="age" defaultValue={this.props.initialData.age || this.defaults.age}>
              {integerOptions(25, 70)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="stateCode" className="col-sm-4 control-label">State</label>
          <div className="col-sm-4">
            <select className="form-control" ref="stateCode" id="stateCode" defaultValue={this.props.initialData.stateCode || this.defaults.stateCode}>
              {stateOptions()}
            </select>
          </div>
        </div>
        <div className={$c('form-group', {'has-error': 'zipCode' in this.state.errors})}>
          <label htmlFor="zipCode" className="col-sm-4 control-label">Zip Code</label>
          <div className="col-sm-4">
            <input className="form-control" ref="zipCode" type="text" id="zipCode"
              defaultValue={this.props.initialData.zipCode}
              onChange={debounce(this.handleZipChange, 250)}
            />
          </div>
          <div className="col-sm-4 help-text">
            <p className="form-control-static">
              {'zipCode' in this.state.errors && this.state.errors.zipCode}
            </p>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Do you use tobacco products?</label>
          <div className="col-sm-4">
            <label className="radio-inline"><input ref="tobaccoYes" type="radio" name="tobacco" defaultChecked={'tobacco' in this.props.initialData && this.props.initialData.tobacco}/> Yes</label>
            <label className="radio-inline"><input ref="tobaccoNo" type="radio" name="tobacco" defaultChecked={'tobacco' in this.props.initialData ? !this.props.initialData.tobacco : true}/> No</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="coverage" className="col-sm-4 control-label">Amount of coverage</label>
          <div className="col-sm-4">
            <select className="form-control" ref="coverage" id="coverage" defaultValue={this.props.initialData.coverage || this.defaults.coverage}>
              {dollarOptions(100000, 950000, 50000).concat(dollarOptions(1000000, 3000000, 500000))}
            </select>
          </div>
          <div className="col-sm-4">
            <p className="form-control-static">
              <a href="#needscalculator" onClick={this.setActiveModal.bind(null, GeneralInfoModal.NEEDS_CALCULATOR)}>How much do you need?</a>
            </p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="productCode" className="col-sm-4 control-label">Type of coverage</label>
          <div className="col-sm-4">
            <select className="form-control" ref="productCode" id="productCode" defaultValue={this.props.initialData.productCode || this.defaults.productCode}>
              {productOptions()}
            </select>
          </div>
          <div className="col-sm-4">
            <p className="form-control-static">
              <a href="#policyadvisor" onClick={this.setActiveModal.bind(null, GeneralInfoModal.POLICY_ADVISOR)}>What kind should you buy?</a>
            </p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="healthCode" className="col-sm-4 control-label">Health category</label>
          <div className="col-sm-4">
            <select className="form-control" ref="healthCode" id="healthCode" defaultValue={this.props.initialData.healthCode || this.defaults.healthCode}>
              {healthOptions()}
            </select>
          </div>
          <div className="col-sm-4">
            <p className="form-control-static">
              <a href="#healthCode" onClick={this.setActiveModal.bind(null, GeneralInfoModal.HEALTH_CODE)}>What’s your category?</a>
            </p>
          </div>
        </div>
        <p><strong>Privacy Policy</strong></p>
        <p>Please read our <a href={LifeQuoteConstants.PRIVACY_POLICY_URL} target="_blank">privacy policy <span className="glyphicon glyphicon-share"></span></a> which explains how we use and protect your personal information.</p>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-4">
            <div className="checkbox">
              <label><input ref="reviewed" type="checkbox" defaultChecked={'reviewed' in this.props.initialData && this.props.initialData.reviewed}/> I have reviewed the privacy policy and want to continue</label>
            </div>
          </div>
        </div>
        <p><strong>Thanks for helping us provide you with a more accurate quote.</strong></p>
      </div>
      <div className="panel-footer">
        <div className="row">
          <div className="col-sm-12">
            <button type="button" className="btn btn-default pull-left" disabled={this.props.loading} onClick={this.handleReset}>Reset</button>
            <button type="button" className="btn btn-primary pull-right" disabled={this.props.loading} onClick={this.handleGetQuote}>Get Quote</button>
          </div>
        </div>
      </div>
    </form>
    {modal}
    </div>
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