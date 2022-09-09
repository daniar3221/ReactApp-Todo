import React, { Component } from 'react';
import './editing-input.css';
import PropTypes from 'prop-types';

export default class EditingInput extends Component {
  constructor({ itemText, itemId, editItemText }) {
    super();
    this.state = {
      value: itemText,
    };
    this.onSubmitEnter = (e) => {
      if (e.key === 'Enter') {
        editItemText(this.state.value, itemId);
      }
    };
    this.onSubmitButton = () => {
      editItemText(this.state.value, itemId);
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
      <div>
        <input
          onKeyDown={this.onSubmitEnter}
          onChange={this.onLabelChange}
          className="editing-input"
          placeholder="Type something to change..."
          value={value}
        />
        <button type='button' className='check-button'
        onClick={this.onSubmitButton}>
                <i className="fa-solid fa-check" />
        </button>
      </div>
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
  itemId: PropTypes.string,
  editItemText: PropTypes.func,
};
