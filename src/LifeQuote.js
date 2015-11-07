import classnames from 'classnames'
import Col from 'react-bootstrap/lib/Col'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'

import ContactModal from './modals/ContactModal'
import QAndAModal from './modals/QAndAModal'
import ServiceUnavailableModal from './modals/ServiceUnavailableModal'

import GeneralInfo from './steps/GeneralInfo'
import QuoteInfo from './steps/QuoteInfo'
import SendQuote from './steps/SendQuote'
import TTFN from './steps/TTFN'

import {LOCAL_SALES_AGENT_URL} from './constants'
import {GlobalModal, Step} from './enums'

let STEPS = [
  {code: Step.GENERAL_INFO, name: 'General Information'},
  {code: Step.QUOTE_INFO, name: 'Get your quote'},
  {code: Step.SEND_QUOTE, name: 'Send your quote to an agent'}
]

let StepLabel = ({active, name, step}) =>
  <Col sm={4} className={classnames({active})}>
    <span className="step-number">{step}</span>{' '}
    <span className="step-name">{name}</span>
  </Col>

let MODALS = [
  {
    code: GlobalModal.WE_CALL_YOU,
    glyph: 'phone-alt',
    id: 'we-call-you',
    title: "We'll call you",
    text: 'Need assistance? A licensed representative will contact you.'
  },
  {
    code: GlobalModal.EMAIL_US,
    glyph: 'envelope',
    id: 'email-us',
    title: 'Email us',
    text: 'Have a specific question? We will get right back to you via email.'
  },
  {
    code: GlobalModal.Q_AND_A,
    glyph: 'info-sign',
    id: 'q-and-a',
    title: 'Questions & Answers',
    text: 'Look here for answers to commonly-asked questions.'
  }
]

let ModalItem = ({code, glyph, id, onClick, title, text}) =>
  <a className="list-group-item" href={`#${id}`} onClick={(e) => { e.preventDefault(); onClick(code) }}>
    <h4 className="list-group-item-heading"><Glyphicon glyph={glyph}/> {title}</h4>
    <p className="list-group-item-text">{text}</p>
  </a>

let LifeQuote = React.createClass({
  render() {
    let {actions, state} = this.props
    let {loading, step} = state
    return <div className={classnames({loading})}>
      <Row>
        <Col sm={9}>
          <div className="quote-progress clearfix">
            {STEPS.map(({name, code}) =>
              <StepLabel active={step === code} key={code} name={name} step={code}/>
            )}
          </div>
          <div className="panel panel-default">
            {this.renderContent()}
          </div>
        </Col>
        <Col sm={3}>
          <h3 className="text-center">Need Assistance?</h3>
          <div className="list-group">
            {MODALS.map(modal => <ModalItem {...modal} onClick={actions.showModal}/>)}
          </div>
          <p className="text-center">
            <a href={LOCAL_SALES_AGENT_URL} target="_blank">
              Find a Local Sales Agent <Glyphicon glyph="share"/>
            </a>
          </p>
        </Col>
      </Row>
      {this.renderModal()}
    </div>
  },

  renderContent() {
    let {actions, state, zipCode} = this.props
    switch (state.step) {
      case Step.GENERAL_INFO:
        return <GeneralInfo
          getQuote={actions.getQuote}
          initialData={state.generalInfo}
          loading={state.loading}
          showModal={actions.showModal}
          zipCode={zipCode}
        />
      case Step.QUOTE_INFO:
        return <QuoteInfo
          changeStep={actions.changeStep}
          generalInfo={state.generalInfo}
          payments={state.payments}
        />
      case Step.SEND_QUOTE:
        return <SendQuote
          changeStep={actions.changeStep}
          contactInfo={state.contactInfo}
          updateLead={actions.updateLead}
        />
      case Step.TTFN:
        return <TTFN/>
    }
  },

  renderModal() {
    let {actions, state} = this.props
    switch (state.modal) {
      case GlobalModal.WE_CALL_YOU:
        return <ContactModal
          contactInfo={state.contactInfo}
          onExit={actions.hideModal}
          type="phone"
          updateLead={actions.updateLead}
        />
      case GlobalModal.EMAIL_US:
        return <ContactModal
          contactInfo={state.contactInfo}
          onExit={actions.hideModal}
          type="email"
          updateLead={actions.updateLead}
        />
      case GlobalModal.Q_AND_A:
        return <QAndAModal onExit={actions.hideModal}/>
      case GlobalModal.SERVICE_UNAVAILABLE:
        return <ServiceUnavailableModal onExit={actions.hideModal}/>
    }
  }
})

export default LifeQuote
