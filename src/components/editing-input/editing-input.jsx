import React, { Component } from 'react';
import './editing-input.css';
import PropTypes from 'prop-types';


export default class EditingInput extends Component {

  state = {
    value: this.props.itemText,
  };
  
  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.editItemText(this.state.value, this.props.itemId);
    this.setState({
      value: '',
    });
  };

  render() {
    // const { itemText, itemId, editItemText } = this.props
    const { value } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          className="editing-input"
          placeholder="Type something to change..."
          value={value}
        />
      </form>
    );
  }
}

EditingInput.defaultProps = {
  itemText: '',
  itemId: () => {},
  editItemText: () => {},
};

EditingInput.propTypes = {
  itemText: PropTypes.string,
  itemId: PropTypes.number,
  editItemText: PropTypes.func,
};
