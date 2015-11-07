import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import {LIFE_INSURANCE_PRODUCTS_URL} from '../constants'

let TTFN = () => <div className="panel-body">
  <p><strong>Thanks for sending us your quote</strong></p>
  <p>One of our agents will be in touch with you shortly to talk about next steps.</p>
  <Button href={LIFE_INSURANCE_PRODUCTS_URL}>
    Learn More <Glyphicon glyph="share"/>
  </Button>
</div>

export default TTFN
