/** @jsx React.DOM */
var BootstrapModalMixin = require('BootstrapModalMixin')
var HealthCodes = require('HealthCodes')
var HealthCode = require('HealthCode')
var IncrementingKeyMixin = require('IncrementingKeyMixin')
var LifeQuoteConstants = require('LifeQuoteConstants')
var RadioSelect = require('RadioSelect')

var integerOptions = require('integerOptions')

var HealthCodeModal = React.createClass({
  mixins: [BootstrapModalMixin, IncrementingKeyMixin]

, getInitialState: function() {
    return {
      suggestedHealthCode: null
    , data: {}
    , errors: {}
    }
  }

, handleReset: function() {
    ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 11].forEach(function(num) {
      this.refs['question' + num].reset()
    }.bind(this))
    this.refs.heightFeet.getDOMNode().selectedIndex = 0
    this.refs.heightInches.getDOMNode().selectedIndex = 0
    this.refs.weight.getDOMNode().value = ''
  }

, handleGetCategory: function() {
    var data = {}
    for (var i = 1; i <= 9; i++) {
      var radios = this.refs['question' + i]
      if (radios.state.selectedIndex === null) {
        radios.getDOMNode().parentNode.scrollIntoView()
        return alert('Please answer Question #' + i)
      }
      data['question' + i] = radios.state.selectedIndex
    }
    if (this.refs.weight.getDOMNode().value == '') {
      this.refs.weight.getDOMNode().parentNode.scrollIntoView()
      return alert('Please fill in your height and weight')
    }
    data.heightFeet = this.refs.heightFeet.getDOMNode().value
    data.heightInches = this.refs.heightInches.getDOMNode().value
    data.weight = this.refs.weight.getDOMNode().value
    if (this.refs.question11.state.selectedIndex === null) {
      this.refs.question11.getDOMNode().parentNode.scrollIntoView()
      return alert('Please answer Question #11')
    }
    data.question11 = this.refs.question11.state.selectedIndex

    // TODO Calculate category
    console.info(data)

    this.setState({
      data: data
    , suggestedHealthCode: HealthCode.GOOD
    })
  }

, handleBack: function() {
    this.setState({suggestedHealthCode: null})
  }

, handleAccept: function() {
    this.props.handleAccept(this.state.suggestedHealthCode)
    this.hide()
  }

, render: function() {
    var body, footer
    if (this.state.suggestedHealthCode == null) {
      body = <div>
        <p>Pricing for life insurance is based on an overall picture of your health, among other factors. By answering the brief medical questions to help estimate your health category, we can provide you with a more accurate quote. </p>
        <p>Your information will not be recorded or saved in any way. All questions are required.</p>
        <form ref="form" role="form">
        <div className="modal-form-group">
          <label>1. When was the last time you used tobacco?</label>
          <RadioSelect ref="question1" selectedIndex={this.state.data.question1}
            labels={['Never' , 'None in the last 36 months', 'None in the last 12 months', 'Within the last 12 months']}
          />
        </div>
        <div className="modal-form-group">
          <label>2. When was the last time you were treated for alcohol or drug abuse?</label>
          <RadioSelect ref="question2" selectedIndex={this.state.data.question2}
            labels={['Never', 'Within the last 10 years', '10 or more years ago']}
          />
        </div>
        <div className="modal-form-group">
          <label>3. Do you have any DUI convictions?</label>
          <RadioSelect ref="question3" selectedIndex={this.state.data.question3}
            labels={['No', 'Yes, less than 5 years ago', 'Yes, more than 5 years ago']}
          />
        </div>
        <div className="modal-form-group">
          <label>4. How many moving violations have you been convicted of in the last 3 years?</label>
          <RadioSelect ref="question4" selectedIndex={this.state.data.question4}
            labels={['None or 1', '2', '3 or more', '6 or more']}
          />
        </div>
        <div className="modal-form-group">
          <label>5. Do you have parents or siblings that died from cancer, cardiac disease or diabetes?</label>
          <RadioSelect ref="question5" selectedIndex={this.state.data.question5}
            labels={['None', 'Yes, only 1 parent or sibling prior to age 60', 'Yes, only 1 parent or sibling between ages 61-65', 'More than 1 parent or sibling']}
          />
        </div>
        <div className="modal-form-group">
          <label>6. Do you have a history of diabetes, cardiac disease, cancer or stroke?</label>
          <RadioSelect ref="question6" selectedIndex={this.state.data.question6} labels={['No', 'Yes']}/>
        </div>
        <div className="modal-form-group">
          <label>7. Are you taking any medication for high blood pressure?</label>
          <RadioSelect ref="question7" selectedIndex={this.state.data.question7}
            labels={['No', 'Yes and I am under the age of 50', 'Yes and I am age 50 or over']}
          />
        </div>
        <div className="modal-form-group">
          <label>8. What was your last blood pressure reading?</label>
          <RadioSelect ref="question8" selectedIndex={this.state.data.question8}
            labels={["I don’t know", 'Less than or equal to 140/78', 'Between 140/78 and 140/90 and I am less than age 50', 'Between 140/78 and 150/92 and I am older than 50', '151/93 and higher']}
          />
        </div>
        <div className="modal-form-group">
          <label>9. What was your last cholesterol reading?</label>
          <RadioSelect ref="question9" selectedIndex={this.state.data.question9}
            labels={['I don’t know', 'Less than 210', 'Between 211 and 250', '251-400', '401 or higher']}
          />
        </div>
        <div className="modal-form-group">
          <label>10. What is your current height and weight?</label>
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="heightFeet">Feet</label>
              <div className="col-sm-3">
                <select id="heightFeet" ref="heightFeet" className="form-control" defaultValue={this.state.data.heightFeet}>{integerOptions(4, 6)}</select>
              </div>
              <label className="col-sm-2 control-label" htmlFor="heightInches">Inches</label>
              <div className="col-sm-3">
                <select id="heightInches" ref="heightInches" className="form-control" defaultValue={this.state.data.heightInches}>{integerOptions(0, 11)}</select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="weight">Weight</label>
              <div className="col-sm-3">
                <div className="input-group">
                  <input type="text" id="weight" ref="weight" className="form-control" defaultValue={this.state.data.weight}/>
                  <span className="input-group-addon">lbs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-form-group">
          <label>11. Do you pilot an airplane or helicpoter?</label>
          <RadioSelect ref="question11" selectedIndex={this.state.data.question11} labels={['No', 'Yes']}/>
        </div>
        </form>
        <div className="footnotes">
          <p>It’s important to know this tool is a guide to the most common underwriting questions, and does not represent every scenario. When you apply for coverage, you will be asked to fill out a full application.</p>
          <p>This estimated health category is not guaranteed.  Your final underwriting class will be determined by the results of any examinations, laboratory results, medical history, and non-medical information developed during the underwriting process. </p>
        </div>
      </div>
      footer = <div>
        <button type="button" className="btn btn-default" onClick={this.handleReset}>Reset</button>
        <button type="button" className="btn btn-primary" onClick={this.handleGetCategory}>Get your category</button>
      </div>
    }
    else {
      body = <p>
        Based on the information provided, your estimated health category is: <strong>{HealthCodes[this.state.suggestedHealthCode].title}</strong>
      </p>
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
            <strong>Determine your health category</strong>
          </div>
          <div className="modal-body" style={{height: 500, overflowY: 'scroll'}}>
            {body}
          </div>
          <div className="modal-footer" style={{marginTop: 0}}>
            {footer}
          </div>
        </div>
      </div>
    </div>
  }
})

module.exports = HealthCodeModal