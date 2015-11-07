require('./HelpIcon.css')

import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Popover from 'react-bootstrap/lib/Popover'
import React from 'react'

/**
 * Displays a help icon which displays help as a popover on hover. This
 * component should only have text as its child contents.
 */
let HelpIcon = React.createClass({
  getDefaultProps() {
    return {
      glyph: 'question-sign',
      trigger: ['click', 'hover']
    }
  },
  render() {
    let {children, glyph, trigger} = this.props
    return <OverlayTrigger trigger={trigger} overlay={<Popover>{children}</Popover>}>
      <Glyphicon className="HelpIcon" glyph={glyph}/>
    </OverlayTrigger>
  }
})

export default HelpIcon
