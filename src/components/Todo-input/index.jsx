import React, { Component } from 'react';
import './todo-input.css';
import PropTypes from 'prop-types';

export default class TodoInput extends Component {
  constructor({ getValue }) {
    super();
    this.state = {
      value: '',
      time: {
        minutes: '',
        seconds: '',
      },
    };

    this.onLabelChange = (e) => {
      this.setState((prevState) => {
        const { value } = e.target;
        return {
          value,
          time: {
            minutes: prevState.time.minutes,
            seconds: prevState.time.seconds,
          },
        };
      });
    };

    this.onMinutesChange = (e) => {
      this.setState((prevState) => {
        const minutes = e.target.value;
        return {
          value: prevState.value,
          time: {
            minutes,
            seconds: prevState.time.seconds,
          },
        };
      });
    };

    this.onSecondsChange = (e) => {
      this.setState((prevState) => {
        const seconds = e.target.value;
        return {
          value: prevState.value,
          time: {
            seconds,
            minutes: prevState.time.minutes,
          },
        };
      });
    };

    this.onSubmit = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        getValue(this.state);
        this.setState({
          value: '',
          time: {
            minutes: '',
            seconds: '',
          },
        });
      }
    };
  }

  render() {
    const { value, time } = this.state;

    return (
      <form
        className="item-add-form"
        onKeyDown={this.onSubmit}
      >
        <input
          className="todo-input"
          placeholder="What's need to be done ?"
          onChange={this.onLabelChange}
          value={value}
        />

         <input type="text"
         className='todo-input-min'
         placeholder='Min'
         onChange={this.onMinutesChange}
         value = {time.minutes}
         />

        <input type="text"
         className='todo-input-sec'
         placeholder='Sec'
         onChange={this.onSecondsChange}
         value = {time.seconds}
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
