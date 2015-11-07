import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import React from 'react'

import {LOCAL_SALES_AGENT_URL} from '../constants'
import createModal from './createModal'

let ServiceUnavailableModal = ({hideModal}) => <div>
  <Modal.Header closeButton onHide={hideModal}>
    <strong>Service Unavailable</strong>
  </Modal.Header>
  <Modal.Body>
   <p>Thank you for your interest in a life insurance quote. Unfortunately, our service is temporarily unavailable as we work to enhance your experience. To obtain a quote, please <a href={LOCAL_SALES_AGENT_URL}>contact one of our experienced representatives <Glyphicon glyph="share"/></a> directly.</p>
  </Modal.Body>
</div>

ServiceUnavailableModal.displayName = 'ServiceUnavailableModal'

export default createModal(ServiceUnavailableModal)
