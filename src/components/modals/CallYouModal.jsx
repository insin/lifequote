/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var ContactForm = require('ContactForm')
var GlobalModal = require('GlobalModal')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var CallYouModal = React.createClass({
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      sent: false
    }
  }

, render: function() {
    var content, footer
    if (!this.state.sent) {
      content = <div>
        <p><strong>Thank you for your interest in life insurance.</strong></p>
        <p>One of our experienced agents will be happy to talk to you about your life insurance needs. Simply tell us when you’d like to be contacted, and we’ll call you.</p>
        <p><strong>Please fill out the following fields</strong></p>
        <ContactForm ref="contactForm" email={false} errorDisplay="tooltip"
          initialData={this.props.contactInfo}
        />
      </div>
      footer = <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
    }
    else {
      content = <div>
        <p>Thank you for contacting us. One of our agents will be in touch with you shortly.</p>
      </div>
      footer = <button type="button" className="btn btn-primary" onClick={this.hide}>Close</button>
    }
    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.renderCloseButton()}
            <strong>We’ll call you</strong>
          </div>
          <div className="modal-body">
            {content}
         </div>
          <div className="modal-footer" style={{marginTop: 0}}>
            {footer}
          </div>
        </div>
      </div>
    </div>
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