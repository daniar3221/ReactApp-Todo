import React, { useState, useEffect } from 'react';

import './app.css';
import TodoHeader from '../Todo-header';
import TodoInput from '../Todo-input';
import TodoList from '../Todo-list';
import TodoFooter from '../Todo-footer';
import { startData } from '../data';

export default function App() {
  const [todoData, setTodoData] = useState([]);

  const [actualButton, setActualButton] = useState('all');

  const deleteItem = (id) => {
    const idx = todoData.findIndex((item) => item.id === id);
    const newArray = [
      ...todoData.slice(0, idx),
      ...todoData.slice(idx + 1),
    ];
    setTodoData(newArray);
  };

  const changeItemText = (text, id) => {
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
    setTodoData(newArray);
  };

  const changeTimeState = (timeState, id) => {
    // console.log(timeState);
    setTodoData((prevState) => {
      const editingItem = prevState.find((item) => item.id === id);
      const editingItemClone = { ...editingItem };
      editingItemClone.time.minutes = timeState.minutes;
      editingItemClone.time.seconds = timeState.seconds;
      const idx = todoData.findIndex((item) => item.id === id);
      const newArray = [
        ...prevState.slice(0, idx),
        editingItemClone,
        ...prevState.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const changeEditStatusItem = (id) => {
    const editingItem = todoData.find((item) => item.id === id);
    const editingItemClone = { ...editingItem };
    editingItemClone.editing = !editingItemClone.editing;
    const idx = todoData.findIndex((item) => item.id === id);
    const newArray = [
      ...todoData.slice(0, idx),
      editingItemClone,
      ...todoData.slice(idx + 1),
    ];
    setTodoData(newArray);
  };

  const deleteAllCompleted = () => {
    const completedTasks = todoData.filter((item) => !item.done);
    setTodoData(completedTasks);
  };

  const changeActualButton = (actBtn) => {
    setActualButton(actBtn);
  };

  const addItem = (value, time) => {
    const newItem = {
      id: Date.now().toString(),
      value,
      editing: false,
      date: new Date(),
      done: false,
      time: {
        minutes: time.minutes ? +time.minutes : 10,
        seconds: time.seconds ? +time.seconds : 0,
      },
    };
    setTodoData((prevState) => [...prevState, newItem]);
  };

  const changeDoneItem = (id) => {
    const changingItem = todoData.find((item) => item.id === id);
    const changingItemClone = { ...changingItem };
    changingItemClone.done = !changingItemClone.done;
    const idx = todoData.findIndex((item) => item.id === id);
    const newArray = [
      ...todoData.slice(0, idx),
      changingItemClone,
      ...todoData.slice(idx + 1),
    ];
    setTodoData(newArray);
  };

  useEffect(() => {
    setTodoData(startData);
  }, []);

  // useEffect(() => {
  //   console.log(todoData);
  // });

  const leftCount = todoData.filter((item) => item.done !== true).length;

  return (
      <div className="app">
        <TodoHeader />
        <TodoInput getValue={(value, time) => {
          addItem(value, time);
        }} />
        <TodoList
          actualMode={actualButton}
          changeItemText={(text, id) => changeItemText(text, id)}
          onEdit={(id) => changeEditStatusItem(id)}
          todos={todoData}
          onDone={(id) => changeDoneItem(id)}
          onDelete={(id) => deleteItem(id)}
          onTimerPlay = {(timer, id) => changeTimeState(timer, id)}
        />
        <TodoFooter
          deleteAllCompleted={() => deleteAllCompleted()}
          actualButton={(actBtn) => changeActualButton(actBtn)}
          itemsLeft={leftCount}
        />
      </div>
  );
}
