import React, { Component } from 'react';
import './editing-input.css';
import PropTypes from 'prop-types';

export default class EditingInput extends Component {
  constructor({ itemText, itemId, editItemText }) {
    super();
    this.state = {
      value: itemText,
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      // КАК ДЕСТРУКТУРИЗИРОВАТЬ ТУТ
      // eslint-disable-next-line react/destructuring-assignment
      editItemText(this.state.value, itemId);
      this.setState({
        value: '',
      });
    };
    this.onLabelChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    };
  }

  render() {
    const { value } = this.state;
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
