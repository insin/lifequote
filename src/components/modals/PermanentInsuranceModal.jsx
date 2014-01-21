/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var GlobalModal = require('GlobalModal')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')

var PermanentInsuranceModal = React.createClass({
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      globalModal: null
    }
  }

, render: function() {
    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.renderCloseButton()}
            <strong>Permanent Insurance</strong>
          </div>
          <div className="modal-body">
            <p><strong>Thanks for your interest in permanent life insurance.</strong></p>
            <p>The best way to get a quote for permanent life insurance is to speak directly with one of our experienced agents. There are several ways to get in touch with your local agent:</p>
            <p className="text-center">
              <a href={LifeQuoteConstants.LOCAL_SALES_AGENT_URL} className="btn btn-default">Find your local agent <span className="glyphicon glyphicon-share"></span></a>
              {' '}
              <button type="button" className="btn btn-default" onClick={this.handleShowGlobalModal.bind(null, GlobalModal.WE_CALL_YOU)}>We’ll call you</button>
              {' '}
              <button type="button" className="btn btn-default" onClick={this.handleShowGlobalModal.bind(null, GlobalModal.EMAIL_US)}>Email us</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  }

, handleShowGlobalModal: function(globalModal) {
    this.setState({globalModal: globalModal})
    this.hide()
  }

, handleHidden: function() {
    if (this.state.globalModal !== null) {
      this.props.handleShowGlobalModal(this.state.globalModal)
    }
  }
})

module.exports = PermanentInsuranceModal