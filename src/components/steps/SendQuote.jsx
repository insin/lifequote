/** @jsx React.DOM */
var ContactForm = require('ContactForm')
var GlobalModal = require('GlobalModal')
var Step = require('Step')

var SendQuote = React.createClass({
  render: function() {
    return <form className="form-horizontal" role="form">
      <div className="panel-body">
        <p>One of our experienced agents will be happy to talk to you about your life insurance needs, and will be with you every step of the way when you purchase your policy. Simply tell us when you’d like to be contacted, and we’ll call you.</p>
        <ContactForm ref="contactForm" errorDisplay="text"
          initialData={this.props.contactInfo}
        />
      </div>
      <div className="panel-footer">
        <div className="row">
          <div className="col-sm-12">
            <button type="button" className="btn btn-default pull-left" onClick={this.props.setActiveStep.bind(null, Step.QUOTE_INFO)} disabled={this.props.loading}>Back to Results</button>
            <button type="button" className="btn btn-primary pull-right" onClick={this.handleSend} disabled={this.props.loading}>Send</button>
          </div>
        </div>
      </div>
    </form>
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