/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var QAndAModal = React.createClass({
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, render: function() {
    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.renderCloseButton()}
            <strong>Questions {'&'} Answers</strong>
          </div>
          <div className="modal-body">
            <p className="question">Why do you ask for my gender and age?</p>
            <p>Pricing for life insurance is based on mortality, or in other words, the prediction of how long you will live. That prediction is based on many factors, including your age and gender. Obviously, if you are older, you will likely pass away before someone who is substantially younger. And gender plays a role because statistically speaking, women are likely to live longer than men.</p>
            <p className="question">Why do you ask if I use tobacco products?</p>
            <p>Pricing for life insurance is based on a prediction of how long you will live. Statistics show people who use tobacco products have a higher mortality rate – or a higher likelihood of passing away sooner – than non-smokers.</p>
            <p className="question">What’s an underwriting class?</p>
            <p>An underwriting class is a general classification that describes your overall health. These classifications have names like ‘Elite Preferred’ for the healthiest individuals and ‘Standard’ for individuals with generally good health. Your underwriting class directly impacts the price you will pay for coverage, because healthy people tend to live longer.</p>
            <p>The medical questions we ask here help you arrive at an estimated underwriting class, which is then used to calculate your quote. Your answers to the medical questions are not saved in any way.</p>
          </div>
          <div className="modal-footer" style={{marginTop: 0}}>
            <button type="button" className="btn btn-primary" onClick={this.hide}>Return to quote</button>
          </div>
        </div>
      </div>
    </div>
  }
})

module.exports = QAndAModal