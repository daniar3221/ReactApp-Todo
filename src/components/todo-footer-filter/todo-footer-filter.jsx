import React, { Component } from 'react';
import './todo-footer-filter.css';
import PropTypes from 'prop-types';

export default class TodoFooterFilter extends Component {
  changeActiveStyle = (indexButton) => {
    this.buttons = document.querySelectorAll('.btn-filter');
    const btnArr = [...this.buttons];
    btnArr.map((item) => item.classList.remove('active'));
    btnArr[indexButton].classList.add('active');
  };

  render() {
    const { actualButton } = this.props;

    return (
      <span className="todo-footer-filter">
        <button
          type="button"
          className="btn btn-filter btn-outline-danger active"
          onClick={() => {
            this.changeActiveStyle(0);
            actualButton('all');
          }}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-filter btn-outline-danger"
          onClick={() => {
            this.changeActiveStyle(1);
            actualButton('active');
          }}
        >
          Active
        </button>
        <button
          type="button"
          className="btn btn-filter btn-outline-danger"
          onClick={() => {
            this.changeActiveStyle(2);
            actualButton('completed');
          }}
        >
          Completed
        </button>
      </span>
    );
  }
}

TodoFooterFilter.propTypes = {
  actualButton: PropTypes.func.isRequired,
};
