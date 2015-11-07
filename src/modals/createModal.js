import Modal from 'react-bootstrap/lib/Modal'
import React from 'react'

export default function createModal(Component) {
  return React.createClass({
    displayName: `Modal(${Component.displayName})`,
    propTypes: {
      onExit: React.PropTypes.func.isRequired
    },
    getInitialState() {
      return {
        next: null,
        showing: true
      }
    },
    handleHide({next = null} = {}) {
      this.setState({showing: false, next})
    },
    handleExit() {
      this.props.onExit({next: this.state.next})
    },
    render() {
      let {showing} = this.state
      let {onExit, ...props} = this.props
      return <Modal show={showing} onHide={this.handleHide} onExited={this.handleExit}>
        <Component {...props} hideModal={this.handleHide}/>
      </Modal>
    }
  })
}
