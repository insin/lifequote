import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import React from 'react'

import createModal from './createModal'
import {GlobalModal} from '../enums'
import {LOCAL_SALES_AGENT_URL} from '../constants'

let PermanentInsuranceModal = ({hideModal}) => <div>
  <Modal.Header closeButton onHide={hideModal}>
    <Modal.Title>Permanent Insurance</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p><strong>Thanks for your interest in permanent life insurance.</strong></p>
    <p>The best way to get a quote for permanent life insurance is to speak directly with one of our experienced agents. There are several ways to get in touch with your local agent:</p>
    <p className="text-center">
      <Button href={LOCAL_SALES_AGENT_URL}>Find your local agent <Glyphicon glyph="share"/></Button>
      {' '}
      <Button onClick={() => hideModal({next: GlobalModal.WE_CALL_YOU})}>We’ll call you</Button>
      {' '}
      <Button onClick={() => hideModal({next: GlobalModal.EMAIL_US})}>Email us</Button>
    </p>
  </Modal.Body>
</div>

PermanentInsuranceModal.displayName = 'PermanentInsuranceModal'

export default createModal(PermanentInsuranceModal)
