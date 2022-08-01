import React from 'react';
import './todo-list-item.css';
import { formatDistance } from 'date-fns';

function TodoListItem({
  value, date, done, onDelete, onEdit, id,
}) {
  const itemStyle = {
    fontSize: '20px',
    textDecoration: done ? 'line-through' : 'none',
  };

  return (
    <span className="todo-list-item">
      <span className="todo-list-item-label" style={itemStyle}>
        {value}
      </span>

      <span className="btn-block float-end">
        <button
          type="button"
          className=" btn-sm "
          onClick={() => onDelete(id)}
        >
          <i className="fa-solid fa-trash-can todo_list-item-icon" />
        </button>
        <button
          type="button"
          className="btn-sm "
          onClick={() => onEdit(id)}
        >
          <i className="fa-solid fa-pen todo_list-item-icon" />
        </button>
      </span>
      <span className="todo-list-item-time float-end">
        <span>created </span>
        {formatDistance(
          new Date(),
          date,
          {
            includeSeconds: true,
          },
        )}
        <span> ago</span>
      </span>

    </span>
  );
}

export default TodoListItem;
