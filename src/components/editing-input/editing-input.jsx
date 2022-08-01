import React, { Component } from 'react';
import './editing-input.css';
import PropTypes from 'prop-types';


export default class EditingInput extends Component {

  constructor() {
    super();
    // const { itemText, itemId, editItemText } = this.props;
    this.state = {
      value: '',
    };
    this.onLabelChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.editItemText(this.state.value, this.props.itemId);
      this.setState({
        value: '',
      });
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          className="editing-input"
          placeholder="Type something to change..."
          value={this.state.value}
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
