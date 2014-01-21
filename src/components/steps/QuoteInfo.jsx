/** @jsx React.DOM */
var Genders = require('Genders')
var HealthCodes = require('HealthCodes')
var ProductCodes = require('ProductCodes')
var States = require('States')
var Step = require('Step')

var formatDollars = require('formatDollars')

var QuoteInfo = React.createClass({
  render: function() {
    var headerRow = [<th></th>]
      , annualRow = [<th>Annual</th>]
      , monthlyRow = [<th>Monthly</th>]
    this.props.payments.forEach(function(payment) {
      headerRow.push(<th>{payment.term} year</th>)
      annualRow.push(<td>{payment.annualPayment.toFixed(2)}</td>)
      monthlyRow.push(<td>{payment.monthlyPayment.toFixed(2)}</td>)
    })
    return <div>
      <div className="panel-body">
        <p>Congratulations! You’ve just taken the first step toward securing your loved ones’ financial future. Your life insurance quote is below. What’s next? Forward your quote to one of our experienced agents who will walk you through the application process.</p>
        <div className="row">
          <div className="col-sm-6">
            <h3>Your Information</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Gender</th>
                  <td>{Genders[this.props.generalInfo.gender].title}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{this.props.generalInfo.age}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{States[this.props.generalInfo.stateCode].abbreviation}</td>
                </tr>
                <tr>
                  <th>Tobacco Use</th>
                  <td>{this.props.generalInfo.tobacco ? 'Smoker' : 'Non Smoker'}</td>
                </tr>
                <tr>
                  <th>Amount of coverage</th>
                  <td>{formatDollars(this.props.generalInfo.coverage)}</td>
                </tr>
                <tr>
                  <th>Type of coverage</th>
                  <td>{ProductCodes[this.props.generalInfo.productCode].name}</td>
                </tr>
                <tr>
                  <th>Underwriting class</th>
                  <td>{HealthCodes[this.props.generalInfo.healthCode].title}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6">
            <h3>Term</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  {headerRow}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {annualRow}
                </tr>
                <tr>
                  {monthlyRow}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="row">
          <div className="col-sm-12">
            <button type="button" className="btn btn-default pull-left" onClick={this.props.setActiveStep.bind(null, Step.GENERAL_INFO)}>Edit</button>
            <button type="button" className="btn btn-primary pull-right" onClick={this.props.setActiveStep.bind(null, Step.SEND_QUOTE)}>Forward to Agent</button>
          </div>
        </div>
      </div>
    </div>
  }
})

module.exports = QuoteInfo