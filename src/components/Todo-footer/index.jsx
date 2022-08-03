import React from 'react';
import PropTypes from 'prop-types';
import TodoFooterFilter from '../Todo-footer-filter';
import './todo-footer.css';

function TodoFooter({ itemsLeft, actualButton, deleteAllCompleted }) {
  return (
    <div className="todo-footer">
      <span className="items-left-label">
        {itemsLeft}
        {' '}
        items left
      </span>
      <TodoFooterFilter actualButton={(actBtn) => actualButton(actBtn)} />
      <button
        type="button"
        onClick={() => deleteAllCompleted()}
        className="btn-clear btn btn-outline-danger"
      >
        Clear completed
      </button>
    </div>
  );
}

TodoFooter.defaultProps = {
  itemsLeft: 0,
};

TodoFooter.propTypes = {
  itemsLeft: PropTypes.number,
  actualButton: PropTypes.func.isRequired,
  deleteAllCompleted: PropTypes.func.isRequired,
};

export default TodoFooter;
