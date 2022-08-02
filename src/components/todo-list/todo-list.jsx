/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditingInput from '../editing-input';
import TodoListItem from '../todo-list-item';

import './todo-list.css';

export default class TodoList extends Component {
  // eslint-disable-next-line consistent-return
  render() {
    const {
      todos, onDone, onEdit, onDelete, actualMode, changeItemText,
    } = this.props;

    if (actualMode === 'all') {
      const elements = todos.map((item) => {
        if (item.editing) {
          return (

            <li key={item.id} className="editing-li">
              <EditingInput
                itemText={item.value}
                itemId={item.id}
                editItemText={(text, id) => changeItemText(text, id)}
              />
            </li>
          );
        }

        return (
          <li key={item.id} className="list-group-item ">
            <div className="round">
              <input
                type="checkbox"
                defaultChecked={item.done}
                id={item.id}
                onClick={() => onDone(item.id)}
              />
              <label htmlFor={item.id} />
            </div>
            <TodoListItem
              onEdit={(id) => onEdit(id)}
              onDelete={(id) => onDelete(id)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
            />
          </li>
        );
      });
      return (
        <ul className="todo-list list-group ">
          {elements}
        </ul>
      );
    } if (actualMode === 'active') {
      const activeElements = todos.filter((item) => !item.done);
      const elements = activeElements.map((item) => {
        if (item.editing) {
          return (

            <li key={item.id} className="editing-li">
              <EditingInput
                itemText={item.value}
                itemId={item.id}
                editItemText={(text, id) => changeItemText(text, id)}
              />
            </li>
          );
        }

        return (
          <li key={item.id} className="list-group-item ">
            <div className="round">
              <input
                type="checkbox"
                defaultChecked={item.done}
                id={item.id}
                onClick={() => onDone(item.id)}
              />
              <label htmlFor={item.id} />
            </div>
            <TodoListItem
              onEdit={(id) => onEdit(id)}
              onDelete={(id) => onDelete(id)}
              {...item}
            />
          </li>
        );
      });
      return (
        <ul className="todo-list list-group ">
          {elements}
        </ul>
      );
    } if (actualMode === 'completed') {
      const activeElements = todos.filter((item) => item.done === true);
      const elements = activeElements.map((item) => {
        if (item.editing) {
          return (

            <li key={item.id} className="editing-li">
              <EditingInput
                itemText={item.value}
                itemId={item.id}
                editItemText={(text, id) => changeItemText(text, id)}
              />
            </li>
          );
        }

        return (
          <li key={item.id} className="list-group-item ">
            <div className="round">
              <input
                type="checkbox"
                defaultChecked={item.done}
                id={item.id}
                onClick={() => onDone(item.id)}
              />
              <label htmlFor={item.id} />
            </div>
            <TodoListItem
              onEdit={(id) => onEdit(id)}
              onDelete={(id) => onDelete(id)}
              {...item}
            />
          </li>
        );
      });
      return (
        <ul className="todo-list list-group ">
          {elements}
        </ul>
      );
    }
  }
}
TodoList.defaultProps = {
  todos: [],
  onDone: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    editing: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    date: PropTypes.any,
    done: PropTypes.bool,
  })),
  onDone: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  actualMode: PropTypes.string.isRequired,
  changeItemText: PropTypes.func.isRequired,
};
