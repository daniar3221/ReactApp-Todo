/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditingInput from '../Editing-input';
import TodoListItem from '../Todo-list-item';

import './todo-list.css';

export default class TodoList extends Component {
  render() {
    // console.log(this.props.children);
    const {
      todos, onDone, onEdit, onDelete, actualMode, changeItemText, onTimerPlay,
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
              onTimerPlay = {(time, id) => { onTimerPlay(time, id); }}
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
  onTimerPlay: () => {},
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
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
  onTimerPlay: PropTypes.func.isRequired,
};
