/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')

var ServiceUnavailableModal = React.createClass({
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, render: function() {
    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">

            {this.renderCloseButton()}
            <strong>Service Unavailable</strong>
          </div>
          <div className="modal-body">
            Thank you for your interest in a life insurance quote. Unfortunately, our service is temporarily unavailable as we work to enhance your experience. To obtain a quote, please <a href={LifeQuoteConstants.LOCAL_SALES_AGENT_URL}>contact one of our experienced representatives <span className="glyphicon glyphicon-share"></span></a> directly.
          </div>
        </div>
      </div>
    </div>
  }
})

module.exports = ServiceUnavailableModal