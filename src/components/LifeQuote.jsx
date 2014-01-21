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

var LifeQuote = React.createClass({
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
      content = <GeneralInfo
                  queryParamZipCode={this.props.queryParamZipCode}
                  initialData={this.state.generalInfo}
                  handleReset={this.handleReset}
                  handleGetQuote={this.handleGetQuote}
                  handleShowGlobalModal={this.setActiveModal}
                  loading={this.state.loading}
                />
    else if (this.state.step === Step.QUOTE_INFO)
      content = <QuoteInfo
                  generalInfo={this.state.generalInfo}
                  payments={this.state.payments}
                  setActiveStep={this.setActiveStep}
                />
    else if (this.state.step === Step.SEND_QUOTE)
      content = <SendQuote
                  contactInfo={this.state.contactInfo}
                  setActiveStep={this.setActiveStep}
                  handleSend={this.handleSend}
                  handleShowGlobalModal={this.setActiveModal}
                  loading={this.state.loading}
                />
    else if (this.state.step === Step.TTFN)
      content = (JSON.stringify(this.state).toLowerCase().indexOf('react') == -1
                 ? <TTFN/>
                 : <WTFN/>)

    var modal
    if (this.state.modal === GlobalModal.WE_CALL_YOU)
      modal = <CallYouModal
                contactInfo={this.state.contactInfo}
                handleHidden={this.handleModalHidden}
                handleSend={this.handleSend}
                handleSetNextGlobalModal={this.setNextModal}
              />
    else if (this.state.modal === GlobalModal.EMAIL_US)
      modal = <EmailUsModal
                contactInfo={this.state.contactInfo}
                handleHidden={this.handleModalHidden}
                handleSend={this.handleSend}
                handleSetNextGlobalModal={this.setNextModal}
              />
    else if (this.state.modal === GlobalModal.Q_AND_A)
      modal = <QAndAModal handleHidden={this.handleModalHidden}/>
    else if (this.state.modal === GlobalModal.SERVICE_UNAVAILABLE)
      modal = <ServiceUnavailableModal handleHidden={this.handleModalHidden}/>

    return <div className={this.state.loading ? 'loading' : ''}>
      <div className="row">
        <div className="col-sm-9">
          <div className="quote-progress clearfix">
            <div className={$c('col-sm-4', {active: this.state.step === Step.GENERAL_INFO})}>
              <span className="step-number">1</span>{' '}
              <span className="step-name">General Information</span>
            </div>
            <div className={$c('col-sm-4', {active: this.state.step === Step.QUOTE_INFO})}>
              <span className="step-number">2</span>{' '}
              <span className="step-name">Get your quote</span>
            </div>
            <div className={$c('col-sm-4', {active: this.state.step === Step.SEND_QUOTE})}>
              <span className="step-number">3</span>{' '}
              <span className="step-name">Send your quote to an agent</span>
            </div>
          </div>
          <div className="panel panel-default">
            {content}
          </div>
        </div>
        <div className="col-sm-3">
          <h3 className="text-center">Need Assistance?</h3>
          <div className="list-group">
            <a className="list-group-item" href="#callcontact" onClick={this.setActiveModal.bind(null, GlobalModal.WE_CALL_YOU)}>
              <h4 className="list-group-item-heading"><span className="glyphicon glyphicon-phone-alt"></span> We’ll call you</h4>
              <p className="list-group-item-text">Need assistance? A licensed representative will contact you.</p>
            </a>
            <a className="list-group-item" href="#questioncontact" onClick={this.setActiveModal.bind(null, GlobalModal.EMAIL_US)}>
              <h4 className="list-group-item-heading"><span className="glyphicon glyphicon-envelope"></span> Email us</h4>
              <p className="list-group-item-text">Have a specific question? We will get right back to you via email.</p>
            </a>
            <a className="list-group-item" href="#qanda" onClick={this.setActiveModal.bind(null, GlobalModal.Q_AND_A)}>
              <h4 className="list-group-item-heading"><span className="glyphicon glyphicon-info-sign"></span> Questions {'&'} Answers</h4>
              <p className="list-group-item-text">Look here for answers to commonly-asked questions.</p>
            </a>
          </div>
          <p className="text-center">
            <a href={LifeQuoteConstants.LOCAL_SALES_AGENT_URL} target="_blank">Find a Local Sales Agent <span className="glyphicon glyphicon-share"></span></a>
          </p>
        </div>
      </div>
      {modal}
    </div>
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