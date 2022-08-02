import React, { Component } from 'react';
import './todo-input.css';
import PropTypes from 'prop-types';

export default class TodoInput extends Component {
  constructor({ getValue }) {
    super();
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
      // КАК ТУТ ДЕСТРУКТУРИЗИРОВАТЬ
      // eslint-disable-next-line react/destructuring-assignment
      getValue(this.state.value);
      this.setState({
        value: '',
      });
    };
  }

  render() {
    const { value } = this.state;

    return (
      <form
        className="item-add-form"
        onSubmit={this.onSubmit}
      >
        <input
          className="todo-input"
          placeholder="What's need to be done ?"
          onChange={this.onLabelChange}
          value={value}
        />
      </form>
    );
  }
}

TodoInput.defaultProps = {
  getValue: () => {},
};

TodoInput.propTypes = {
  getValue: PropTypes.func,
};
