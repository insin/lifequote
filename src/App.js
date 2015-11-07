import React from 'react'

import LeadService from './LeadService'
import LifeQuote from './LifeQuote'

import {GlobalModal, Step} from './enums'
import {States} from './lookups'

/**
 * Top-level component which holds all application-level state and provides
 * actions which modify that state.
 */
let App = React.createClass({
  getInitialState() {
    return {
      // Submitted, valid contact information
      contactInfo: null,
      // Error message from the last failed service call
      errorMessage: null,
      // Submitted, valid general info
      generalInfo: null,
      // Generated lead id
      lead: null,
      // Loading status
      loading: false,
      // GlobalModal constant for the global modal currently being displayed
      modal: null,
      // Quote payments
      payments: {},
      // Step constant for the step currently being displayed
      step: Step.GENERAL_INFO
    }
  },

  changeStep(step) {
    this.setState({step})
  },

  /**
   * Returns a promise for a Lead.
   */
  getLead() {
    if (this.state.lead !== null) {
      return Promise.resolve(this.state.lead)
    }
    return LeadService.createLead().then(lead => {
      this.setState({lead})
      return lead
    })
  },

  /**
   * Returns a promise for a quote for the given info.
   */
  getQuote(generalInfo) {
    this.setState({
      contactInfo: {
        ...this.state.contactInfo,
        stateCode: generalInfo.stateCode,
        zipCode: generalInfo.zipCode
      },
      generalInfo,
      loading: true
    })

    this.getLead()
      .then(lead => LeadService.getQuote({
        leadId: lead.id,
        ...generalInfo
      }))
      .then(quote => {
        this.setState({
          loading: false,
          payments: quote.payments,
          step: Step.QUOTE_INFO
        })
        return quote
      })
      .catch(err => this.showErrorModal(err.message))
  },

  hideModal() {
    this.setState({modal: null})
  },

  showErrorModal(errorMessage) {
    console.error(errorMessage)
    this.setState({
      errorMessage,
      loading: false,
      modal: GlobalModal.SERVICE_UNAVAILABLE
    })
  },

  showModal(modal) {
    this.setState({modal})
  },

  /**
   * Returns a promise for updating a lead with the given contact info getting
   * the updated lead details.
   */
  updateLead(contactInfo) {
    this.setState({
      contactInfo: {...this.state.contactInfo, ...contactInfo},
      loading: true
    })

    return this.getLead()
      .then(lead => {
        let contactState = States[contactInfo.stateCode].abbreviation
        let updatedLead = {
          id: lead.id,
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          phoneNmbr: contactInfo.phoneNmbr,
          address: `${contactInfo.address} ${contactInfo.city}, ${contactState}`,
          stateCode: contactInfo.stateCode,
          zipCode: contactInfo.zipCode,
          currentCustomer: contactInfo.currentCustomer === 'Yes'
        }
        if (contactInfo.emailAddr) updatedLead.emailAddr = contactInfo.emailAddr
        if (contactInfo.question) updatedLead.question = contactInfo.question
        return LeadService.updateLead(updatedLead)
      })
      .then(lead => {
        this.setState({loading: false})
        return lead
      })
      .catch(err => this.showErrorModal(err.message))
  },

  render() {
    return <LifeQuote
      actions={{
        changeStep: this.changeStep,
        getLead: this.getLead,
        getQuote: this.getQuote,
        hideModal: this.hideModal,
        showModal: this.showModal,
        showErrorModal: this.showErrorModal,
        updateLead: this.updateLead
      }}
      state={this.state}
      zipCode={this.props.zipCode}
    />
  }
})

export default App
