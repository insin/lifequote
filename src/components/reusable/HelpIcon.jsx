/**
 * Displays a help icon which displays help as a popover on hover. This
 * component should only have text as its child content.
 * @jsx React.DOM
 */
var HelpIcon = React.createClass({
  getDefaultProps: function() {
    return {
      glyphicon: 'question-sign'
    , container: 'body'
    , animation: false
    , trigger: 'hover click'
    , placement: 'auto right'
    }
  }

, render: function() {
    return <span style={{cursor: 'help'}} className={'glyphicon glyphicon-' + this.props.glyphicon}></span>
  }

, componentDidMount: function() {
    $(this.getDOMNode()).popover({
      content: this.props.children
    , container: this.props.container
    , animation: this.props.animation
    , trigger: this.props.trigger
    , placement: this.props.placement
    })
  }
})

module.exports = HelpIcon