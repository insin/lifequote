import AutoForm from 'react-auto-form'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal'
import React from 'react'

import createModal from './createModal'
import {HealthCodes} from '../lookups'
import {HealthCode} from '../enums'
import {integerOptions} from '../options'

let RadioSelect = ({name, options, value}) => <div>
  {options.map((label, index) => <div className="radio" key={index}>
    <label>
      <input type="radio" checked={value === String(index)} name={name} value={index}/>
      {` ${label}`}
    </label>
  </div>)}
</div>

let HealthCodeModal = React.createClass({
  getInitialState() {
    return {
      healthCode: null,
      form: {}
    }
  },

  handleAccept() {
    this.props.setHealthCode(this.state.healthCode)
    this.props.hideModal()
  },
  handleBack() {
    this.setState({healthCode: null})
  },
  handleChange(e, name, value, change) {
    this.setState({form: {...this.state.form, ...change}})
  },
  handleReset() {
    this.setState({form: {}})
  },
  handleSubmit(e, form) {
    e.preventDefault()
    for (let i = 1; i <= 9; i++) {
      if (!form[`question${i}`]) {
        this.refs[`question${i}`].scrollIntoView()
        return window.alert(`Please answer Question #${i}`)
      }
    }
    if (!form.heightFeet || !form.heightInches || !form.weight) {
      this.refs.question10.scrollIntoView()
      return window.alert('Please fill in your height and weight')
    }
    if (!form.question11) {
      this.refs.question11.scrollIntoView()
      return window.alert('Please answer Question #11')
    }

    // TODO Calculate category
    // console.info(form)
    this.setState({form, healthCode: HealthCode.GOOD})
  },

  render() {
    let {form, healthCode} = this.state
    let body
    let footer
    if (healthCode == null) {
      body = <div>
        <p>Pricing for life insurance is based on an overall picture of your health, among other factors. By answering the brief medical questions to help estimate your health category, we can provide you with a more accurate quote. </p>
        <p>Your information will not be recorded or saved in any way. All questions are required.</p>
        <div className="modal-form-group" ref="question1">
          <label>1. When was the last time you used tobacco?</label>
          <RadioSelect
            name="question1"
            options={[
              'Never',
              'None in the last 36 months',
              'None in the last 12 months',
              'Within the last 12 months'
            ]}
            value={form.question1}
          />
        </div>
        <div className="modal-form-group" ref="question2">
          <label>2. When was the last time you were treated for alcohol or drug abuse?</label>
          <RadioSelect
            name="question2"
            options={['Never', 'Within the last 10 years', '10 or more years ago']}
            value={form.question2}
          />
        </div>
        <div className="modal-form-group" ref="question3">
          <label>3. Do you have any DUI convictions?</label>
          <RadioSelect
            name="question3"
            options={['No', 'Yes, less than 5 years ago', 'Yes, more than 5 years ago']}
            value={form.question3}
          />
        </div>
        <div className="modal-form-group" ref="question4">
          <label>4. How many moving violations have you been convicted of in the last 3 years?</label>
          <RadioSelect
            name="question4"
            options={['None or 1', '2', '3 or more', '6 or more']}
            value={form.question4}
          />
        </div>
        <div className="modal-form-group" ref="question5">
          <label>5. Do you have parents or siblings that died from cancer, cardiac disease or diabetes?</label>
          <RadioSelect
            name="question5"
            options={[
              'None',
              'Yes, only 1 parent or sibling prior to age 60',
              'Yes, only 1 parent or sibling between ages 61-65',
              'More than 1 parent or sibling'
            ]}
            value={form.question5}
          />
        </div>
        <div className="modal-form-group" ref="question6">
          <label>6. Do you have a history of diabetes, cardiac disease, cancer or stroke?</label>
          <RadioSelect name="question6" value={form.question6} options={['No', 'Yes']}/>
        </div>
        <div className="modal-form-group" ref="question7">
          <label>7. Are you taking any medication for high blood pressure?</label>
          <RadioSelect
            name="question7"
            options={[
              'No',
              'Yes and I am under the age of 50',
              'Yes and I am age 50 or over'
            ]}
            value={form.question7}
          />
        </div>
        <div className="modal-form-group" ref="question8">
          <label>8. What was your last blood pressure reading?</label>
          <RadioSelect
            name="question8"
            options={[
              'I don’t know',
              'Less than or equal to 140/78',
              'Between 140/78 and 140/90 and I am less than age 50',
              'Between 140/78 and 150/92 and I am older than 50',
              '151/93 and higher'
            ]}
            value={form.question8}
          />
        </div>
        <div className="modal-form-group" ref="question9">
          <label>9. What was your last cholesterol reading?</label>
          <RadioSelect
            name="question9"
            options={[
              'I don’t know',
              'Less than 210',
              'Between 211 and 250',
              '251-400',
              '401 or higher'
            ]}
            value={form.question9}
          />
        </div>
        <div className="modal-form-group" ref="question10">
          <label>10. What is your current height and weight?</label>
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="heightFeet">Feet</label>
              <Col sm={3}>
                <select id="heightFeet" name="heightFeet" className="form-control" value={form.heightFeet}>
                  {integerOptions(4, 6)}
                </select>
              </Col>
              <label className="col-sm-2 control-label" htmlFor="heightInches">Inches</label>
              <Col sm={3}>
                <select id="heightInches" name="heightInches" className="form-control" value={form.heightInches}>
                  {integerOptions(0, 11)}
                </select>
              </Col>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="weight">Weight</label>
              <Col sm={3}>
                <div className="input-group">
                  <input type="text" id="weight" name="weight" className="form-control" value={form.weight}/>
                  <span className="input-group-addon">lbs</span>
                </div>
              </Col>
            </div>
          </div>
        </div>
        <div className="modal-form-group" ref="question11">
          <label>11. Do you pilot an airplane or helicpoter?</label>
          <RadioSelect name="question11" options={['No', 'Yes']} value={form.question11}/>
        </div>
        <div className="footnotes">
          <p>It’s important to know this tool is a guide to the most common underwriting questions, and does not represent every scenario. When you apply for coverage, you will be asked to fill out a full application.</p>
          <p>This estimated health category is not guaranteed.  Your final underwriting class will be determined by the results of any examinations, laboratory results, medical history, and non-medical information developed during the underwriting process. </p>
        </div>
      </div>
      footer = <div>
        <Button onClick={this.handleReset}>Reset</Button>
        {' '}
        <Button type="submit" bsStyle="primary">Get your category</Button>
      </div>
    }
    else {
      body = <p>
        Based on the information provided, your estimated health category is: <strong>{HealthCodes[healthCode].title}</strong>
      </p>
      footer = <div>
        <Button onClick={this.handleBack}>Back</Button>
        {' '}
        <Button bsStyle="primary" onClick={this.handleAccept}>Accept</Button>
      </div>
    }

    let {hideModal} = this.props
    return <AutoForm onChange={this.handleChange} onSubmit={this.handleSubmit} trimOnSubmit>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Determine your health category</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: 500, overflowY: 'scroll'}}>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </AutoForm>
  }
})

export default createModal(HealthCodeModal)
