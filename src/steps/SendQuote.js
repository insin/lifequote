import AutoForm from 'react-auto-form'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'

import ContactForm from '../components/ContactForm'
import {Step} from '../enums'

let SendQuote = React.createClass({
  getInitialState() {
    return {
      errors: {}
    }
  },
  handleSubmit(e, data) {
    e.preventDefault()
    let errors = ContactForm.validate(data)
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.props.updateLead(data)
        .then(lead => this.props.changeStep(Step.TTFN))
    }
  },
  render() {
    let {errors} = this.state
    let {changeStep, contactInfo, loading} = this.props
    return <AutoForm onSubmit={this.handleSubmit}>
      <div className="panel-body">
        <p>One of our experienced agents will be happy to talk to you about your life insurance needs, and will be with you every step of the way when you purchase your policy. Simply tell us when you’d like to be contacted, and we’ll call you.</p>
        <ContactForm initialData={contactInfo} errors={errors}/>
      </div>
      <div className="panel-footer">
        <Row>
          <Col sm={12}>
            <Button className="pull-left" onClick={() => changeStep(Step.QUOTE_INFO)} disabled={loading}>
              Back to Results
            </Button>
            <Button type="submit" bsStyle="primary" className="pull-right" disabled={loading}>
              Send
            </Button>
          </Col>
        </Row>
      </div>
    </AutoForm>
  }
})

export default SendQuote
