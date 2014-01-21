/**
 * Displays a list of radio buttons with the given labels and manages tracking
 * of the selected index and label.
 * @jsx React.DOM
 */
var RadioSelect = React.createClass({
  getInitialState: function() {
    var hasSelectedIndex = (typeof this.props.selectedIndex != 'undefined')
    return {
      selectedIndex: (hasSelectedIndex ? this.props.selectedIndex: null)
    , selectedLabel: (hasSelectedIndex ? this.props.labels[this.props.selectedIndex] : null)
    }
  }

, render: function() {
    var radios = this.props.labels.map(function(label, i) {
      return <div className="radio">
        <label>
          <input type="radio"
            ref={this.props.ref + '_' + i}
            name={this.props.ref}
            value={i}
            checked={this.state.selectedIndex === i}
            onChange={this.handleChange.bind(this, i, label)}/>
          {label}
        </label>
      </div>
    }.bind(this))
    return <div>{radios}</div>
  }

, handleChange: function(i, label) {
    this.setState({
      selectedIndex: i
    , selectedLabel: label
    })
  }

, reset: function() {
    this.setState({
      selectedIndex: null
    , selectedLabel: null
    })
  }
})

module.exports = RadioSelect