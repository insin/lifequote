/** @jsx React.DOM */
var LifeQuoteConstants = require('LifeQuoteConstants')

var TTFN = React.createClass({
  render: function() {
    return <div>
      <div className="panel-body">
        <p><strong>Thanks for sending us your quote</strong></p>
        <p>One of our agents will be in touch with you shortly to talk about next steps.</p>
        <a href={LifeQuoteConstants.LIFE_INSURANCE_PRODUCTS_URL} className="btn btn-default">Learn More <span className="glyphicon glyphicon-share"></span></a>
      </div>
    </div>
  }
})

module.exports = TTFN