/** @jsx React.DOM */
var BootstrapDevice = require('BootstrapDevice')
var BootstrapModalMixin = require('BootstrapModalMixin')
var FormMixin = require('FormMixin')
var HelpIcon = require('HelpIcon')
var IncrementingKeyMixin = require('IncrementingKeyMixin')

var $c = require('classNames')
var bsDevice = require('bsDevice')
var formatDollars = require('formatDollars')
var trim = require('trim')

var NeedsCalculatorModal = React.createClass({
  mixins: [BootstrapModalMixin, FormMixin, IncrementingKeyMixin]

, fields: {
    'monthlyNetIncome': 'isFloat'
  , 'outstandingMortgageOrRent': 'isFloat'
  , 'currentOutstandingDebts': 'isFloat'
  , 'estCollegeExpensePerChild': 'isFloat'
  , 'estFinalExpenses': 'isFloat'
  , 'currentLiquidAssets': 'isFloat'
  , 'personallyOwnedInsurance': 'isFloat'
  , 'yearsIncomeProvided': 'isInt'
  , 'numCollegeChildren': 'isInt'
  }

, errorMessages: {
    'isFloat': 'Please enter a dollar amount'
  , 'isInt': 'Please enter a number'
  }

, getInitialState: function() {
    return {
      suggestedCoverage: null
    , data: {}
    , errors: {}
    }
  }

, componentWillUpdate: function(nextProps, nextState) {
    this.updateErrorTooltips(this.state.errors, nextState.errors, {
      placement: bsDevice() >= BootstrapDevice.MD ? 'auto right' : 'bottom'
    , trigger: 'hover click'
    , animation: false
    , container: 'body'
    })
  }

, handleReset: function() {
    for (var fieldRef in this.fieldRefs) {
      this.refs[fieldRef].getDOMNode().value = ''
    }
    this.setState({
      data: {}
    , errors: {}
    })
  }

, handleCalculate: function() {
    var data = {}
      , errors = {}
    for (var fieldRef in this.fields) {
      data[fieldRef] = trim(this.refs[fieldRef].getDOMNode().value)
      if (!data[fieldRef]) {
        errors[fieldRef] = 'This field is required'
        continue
      }
      var validation = this.fields[fieldRef]
      if (!validator[validation](data[fieldRef])) {
        errors[fieldRef] = this.errorMessages[validation]
      }
    }
    this.setState({errors: errors})

    var isValid = true
    for (var fieldRef in errors) {
      isValid = false
      break
    }

    if (isValid) {
      // TODO Calculate suggested amount
      console.info(data)

      this.setState({
        data: data
      , suggestedCoverage: 100000
      })
    }
  }

, handleBack: function() {
    this.setState({suggestedCoverage: null})
  }

, handleAccept: function() {
    this.props.handleAccept(this.state.suggestedCoverage)
    this.hide()
  }

, render: function() {
    var body, footer
    if (this.state.suggestedCoverage === null) {
      body = <div>
        <p>Our needs calculator lets you estimate how much life insurance you may need in addition to the amount you may already own.</p>
        <form ref="form" className="form-horizontal" role="form">
          {this.renderDollarField('monthlyNetIncome', 'Monthly net income',
            <HelpIcon>
              After-tax earnings per month
            </HelpIcon>
          )}
          {this.renderIntegerField('yearsIncomeProvided', 'Number of years you wish to provide income',
            <HelpIcon>
              This number is how many years you would like to generate income for your family members or beneficiaries in order to cover expenses identified.
              Most experts recommend a minimum of 3-5 years.
            </HelpIcon>
          )}
          {this.renderDollarField('outstandingMortgageOrRent', 'Outstanding mortgage or rent payments',
            <HelpIcon>
              Include mortgage balance and home equity loan balances.
              Or, determine the sufficient amount for 10 years, or 120 months, of rent.
            </HelpIcon>
          )}
          {this.renderDollarField('currentOutstandingDebts', 'Current outstanding debts',
            <HelpIcon>
              Include credit cards, installment credit or other loan debts, such as school and auto.
            </HelpIcon>
          )}
          {this.renderIntegerField('numCollegeChildren', 'Number of children to attend college',
            <HelpIcon>
              Number of children who have yet to enter college. This would not include children who have completed college.
              Children who do not require college funding do not need to be included here.
            </HelpIcon>
          )}
          {this.renderDollarField('estCollegeExpensePerChild', 'Estimated college expenses per child',
            <HelpIcon>
              Four years at a private institution averages $129,228.
              Four years at a public institution averages $54,356.
              Costs include tuition fees, room and board as reported by the College Board, New York 2007.
            </HelpIcon>
          )}
          {this.renderDollarField('estFinalExpenses', 'Estimated final expenses',
            <HelpIcon>
              Final expense costs are the costs associated with a funeral or final estate settlement costs.
              A typical burial costs between $8,000 and $12,000.
            </HelpIcon>,
            {placeholder: '10,000'}
          )}
          {this.renderDollarField('currentLiquidAssets', 'Current liquid assets',
            <HelpIcon>
              Liquid assets would include savings and investments, but would not include a 401K or real estate such as a house.
            </HelpIcon>
          )}
          {this.renderDollarField('personallyOwnedInsurance', 'Personally owned life insurance',
            <HelpIcon>
              This number should equal the total amount of coverage on your life, including coverage from any individual policies.
            </HelpIcon>
          )}
        </form>
      </div>
      footer = <div>
        <button type="button" className="btn btn-default" onClick={this.handleReset}>Reset</button>
        <button type="button" className="btn btn-primary" onClick={this.handleCalculate}>Calculate</button>
      </div>
    }
    else {
      body = <div>
        <p>Based on the information entered, you need a total of <strong>{formatDollars(this.state.suggestedCoverage)}</strong> in order to cover your life insurance needs.</p>
        <p><strong>Note:</strong> This calculation does not incorporate any assumptions about investment results, estate taxes or inflation.</p>
      </div>
      footer = <div>
        <button type="button" className="btn btn-default" onClick={this.handleBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={this.handleAccept}>Accept</button>
      </div>
    }

    return <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.renderCloseButton()}
            <strong>Needs Calculator</strong>
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer" style={{marginTop: 0}}>
            {footer}
          </div>
        </div>
      </div>
    </div>
  }

, renderDollarField: function(id, label, help, kwargs) {
    return this.renderField(id, label, help,
      <div className="input-group">
        <span className="input-group-addon">$</span>
        <input type="text" className="form-control" ref={id} id={id}
          defaultValue={this.state.data[id] || ''}
          placeholder={kwargs && kwargs.placeholder || ''}
        />
      </div>
    )
  }

, renderIntegerField: function(id, label, help) {
    return this.renderField(id, label, help,
      <input type="text" className="form-control" ref={id} id={id}
        defaultValue={this.state.data[id] || ''}
      />
    )
  }

, renderField: function(id, label, help, field) {
    return <div className={$c('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-8 control-label">{label}</label>
      <div className="col-sm-3">
        {field}
      </div>
      <div className="col-sm-1">
        <p className="form-control-static">
          {help}
        </p>
      </div>
    </div>
  }
})

module.exports = NeedsCalculatorModal