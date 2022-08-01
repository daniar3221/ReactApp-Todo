import React, { Component } from 'react';
import './todo-input.css';

export default class TodoInput extends Component {
  constructor() {
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
      this.props.getValue(this.state.value);
      this.setState({
        value: '',
      });
    };
  }

  render() {
    return (
      <form
        className="item-add-form"
        onSubmit={this.onSubmit}
      >
        <input
          className="todo-input"
          placeholder="What's need to be done ?"
          onChange={this.onLabelChange}
          value={this.state.value}
        />
      </form>
    );
  }
}
