import React, { Component } from 'react';

import './app.css';
import TodoHeader from '../todo-header';
import TodoInput from '../todo-input';
import TodoList from '../todo-list';
import TodoFooter from '../todo-footer';

export default class App extends Component {
  
  maxId = 100;
  state = {
    todoData: [
      {
        id: 1,
        value: 'Drink coffee',
        editing: false,
        date: new Date('2022-06-01'),
        done: false,
      },
      {
        id: 2,
        value: 'Make a lunch',
        editing: false,
        date: new Date('2022-07-26'),
        done: false,
      },
      {
        id: 3,
        value: 'Build Todo Project',
        editing: false,
        date: new Date(),
        done: false,
      },
    ],
    actualButton: 'all',
  };
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };
  changeItemText = (text, id) => {
    this.setState(({ todoData }) => {
      const editingItem = todoData.find((item) => item.id === id);
      const editingItemClone = { ...editingItem };
      editingItemClone.value = text;
      editingItemClone.editing = false;
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        editingItemClone,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };
  changeEditStatusItem = (id) => {
    this.setState(({ todoData }) => {
      const editingItem = todoData.find((item) => item.id === id);
      const editingItemClone = { ...editingItem };
      editingItemClone.editing = !editingItemClone.editing;
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        editingItemClone,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };
  deleteAllCompleted = () => {
    this.setState(({ todoData }) => {
      const completedTasks = todoData.filter((item) => !item.done);
      return {
        todoData: completedTasks,
      };
    });
  };
  changeActualButton = (actBtn) => {
    this.setState({
      actualButton: actBtn,
    });
  };
  addItem = (value) => {
    this.setState(({ todoData }) => {
      const newItem = {
        id: this.maxId++,
        value,
        editing: false,
        date: new Date(),
        done: false,
      };
      const newArray = [
        ...todoData,
        newItem,
      ];
      return {
        todoData: newArray,
      };
    });
  };
  changeDoneItem = (id) => {
    this.setState(({ todoData }) => {
      const changingItem = todoData.find((item) => item.id === id);
      const changingItemClone = { ...changingItem };
      changingItemClone.done = !changingItemClone.done;
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        changingItemClone,
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArray,
      };
    });
  };
  
  render() {
    
    const { todoData, actualButton } = { ...this.state };

    const leftCount = todoData.filter((item) => item.done !== true).length;

    return (
      <div className="app">
        <TodoHeader />
        <TodoInput getValue={(value) => { this.addItem(value); }} />
        <TodoList
          actualMode={actualButton}
          changeItemText={(text, id) => this.changeItemText(text, id)}
          onEdit={(id) => this.changeEditStatusItem(id)}
          todos={todoData}
          onDone={(id) => this.changeDoneItem(id)}
          onDelete={(id) => this.deleteItem(id)}
        />
        <TodoFooter
          deleteAllCompleted={() => this.deleteAllCompleted()}
          actualButton={(actBtn) => this.changeActualButton(actBtn)}
          itemsLeft={leftCount}
        />
      </div>
    );
  }
}
