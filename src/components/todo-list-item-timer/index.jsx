/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import './todo-list-item-timer.css';

function TodoListItemTimer({
  timer, onPlay, onStop, play,
}) {
  const { minutes, seconds } = timer;
  return (
        <div className="todo-list-item-timer">
            <button onClick={() => {
              if (!play) onPlay();
            } }><i className="fa-solid fa-play"></i></button>
            <button onClick={() => {
              if (play) onStop();
            }} ><i className="fa-solid fa-pause"></i></button>
            <span className="minutes">{minutes}</span>
            <span>:</span>
            <span className='seconds'>{seconds}</span>
        </div>
  );
}

export default TodoListItemTimer;
