import AutoForm from 'react-auto-form'
import React, {PropTypes} from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

import ContactForm from '../components/ContactForm'
import createModal from './createModal'

const EMAIL = 'email'
const PHONE = 'phone'

const MESSAGES = {
  [EMAIL]: 'One of our experienced agents will be happy to answer all your questions. Enter your name, email, and the question you’d like to ask, and an agent will respond within 24 hours',
  [PHONE]: 'One of our experienced agents will be happy to talk to you about your life insurance needs. Simply tell us when you’d like to be contacted, and we’ll call you.'
}

const TITLES = {
  [EMAIL]: 'Email us',
  [PHONE]: 'We’ll call you'
}

let Contact = ({contactInfo, errors, email, message, question}) => <div>
  <p><strong>Thank you for your interest in life insurance.</strong></p>
  <p>{message}</p>
  <p><strong>Please fill out the following fields:</strong></p>
  <ContactForm
    email={email}
    errorDisplay="tooltip"
    errors={errors}
    initialData={contactInfo}
    question={question}
  />
</div>

let ContactModal = React.createClass({
  propTypes: {
    type: PropTypes.oneOf([EMAIL, PHONE]).isRequired
  },
  getInitialState() {
    return {
      errors: {},
      sending: false,
      sent: false
    }
  },
  handleSubmit(e, data) {
    e.preventDefault()
    let emailForm = (this.props.type === EMAIL)
    let errors = ContactForm.validate(data, {email: emailForm, question: emailForm})
    this.setState({errors})
    if (Object.keys(errors).length === 0) {
      this.setState({sending: true})
      this.props.updateLead(data)
        .then(lead => this.setState({sending: false, sent: true}))
    }
  },
  render() {
    let {errors, sending, sent} = this.state
    let {contactInfo, hideModal, type} = this.props
    let title = TITLES[type]
    return <AutoForm onSubmit={this.handleSubmit} trimOnSubmit>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!sent ? <Contact
                   contactInfo={contactInfo}
                   email={type === EMAIL}
                   errors={errors}
                   message={MESSAGES[type]}
                   question={type === EMAIL}
                 />
               : <p>Thank you for contacting us. One of our agents will be in touch with you shortly.</p>
        }
      </Modal.Body>
      <Modal.Footer>
        {!sent ? <Button type="submit" bsStyle="primary" disabled={sending}>Submit</Button>
               : <Button bsStyle="primary" onClick={hideModal}>Close</Button>
        }
      </Modal.Footer>
    </AutoForm>
  }
})

export default createModal(ContactModal)
