import React, { Component } from 'react';

import './app.css';
import TodoHeader from '../Todo-header';
import TodoInput from '../Todo-input';
import TodoList from '../Todo-list';
import TodoFooter from '../Todo-footer';

export default class App extends Component {
  state = {
    todoData: [
      {
        id: '1',
        value: 'Drink coffee',
        editing: false,
        date: new Date('2022-06-01'),
        done: false,
        time: {
          minutes: 10,
          seconds: 22,
        },
      },
      {
        id: '2',
        value: 'Make a lunch',
        editing: false,
        date: new Date('2022-07-26'),
        done: false,
        time: {
          minutes: 3,
          seconds: 40,
        },
      },
      {
        id: '3',
        value: 'Build Todo Project',
        editing: false,
        date: new Date('2022-07-28'),
        done: false,
        time: {
          minutes: 7,
          seconds: 30,
        },
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

  changeTimeState = (timeState, id) => {
    this.setState(({ todoData }) => {
      const editingItem = todoData.find((item) => item.id === id);
      const editingItemClone = { ...editingItem };
      editingItemClone.time.minutes = timeState.minutes;
      editingItemClone.time.seconds = timeState.seconds;
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
        id: Date.now().toString(),
        value: value.value,
        editing: false,
        date: new Date(),
        done: false,
        time: {
          minutes: value.time.minutes ? value.time.minutes : 10,
          seconds: value.time.seconds ? value.time.seconds : 0,
        },
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
        <TodoInput getValue={(value) => {
          this.addItem(value);
        }} />
        <TodoList
          actualMode={actualButton}
          changeItemText={(text, id) => this.changeItemText(text, id)}
          onEdit={(id) => this.changeEditStatusItem(id)}
          todos={todoData}
          onDone={(id) => this.changeDoneItem(id)}
          onDelete={(id) => this.deleteItem(id)}
          onTimerPlay = {(timer, id) => this.changeTimeState(timer, id)}
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
