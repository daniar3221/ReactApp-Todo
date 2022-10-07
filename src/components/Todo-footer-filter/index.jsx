import React from 'react';
import './todo-footer-filter.css';
import PropTypes from 'prop-types';

const TodoFooterFilter = ({ actualButton }) => {
  const changeActiveStyle = (indexButton) => {
    const buttons = document.querySelectorAll('.btn-filter');
    const btnArr = [...buttons];
    btnArr.map((item) => item.classList.remove('active'));
    btnArr[indexButton].classList.add('active');
  };

  return (
      <span className="todo-footer-filter">
        <button
          type="button"
          className="btn btn-filter btn-outline-danger active"
          onClick={() => {
            changeActiveStyle(0);
            actualButton('all');
          }}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-filter btn-outline-danger"
          onClick={() => {
            changeActiveStyle(1);
            actualButton('active');
          }}
        >
          Active
        </button>
        <button
          type="button"
          className="btn btn-filter btn-outline-danger"
          onClick={() => {
            changeActiveStyle(2);
            actualButton('completed');
          }}
        >
          Completed
        </button>
      </span>
  );
};

TodoFooterFilter.propTypes = {
  actualButton: PropTypes.func.isRequired,
};

export default TodoFooterFilter;
