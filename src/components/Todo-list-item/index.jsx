/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';
import './todo-list-item.css';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

import TodoListItemTimer from '../todo-list-item-timer';

const TodoListItem = ({
  value, date, done, onDelete, onEdit, id, time, onTimerPlay,
}) => {
  const [play, setPlay] = useState(false);

  const [lTimer, setLTimer] = useState(setInterval(() => {}));

  const itemStyle = (itemDone) => ({
    fontSize: '17px',
    textDecoration: itemDone ? 'line-through' : 'none',
  });

  const stopTimer = () => {
    clearInterval(lTimer);
  };

  const setTimer1 = () => setLTimer(setInterval(() => {
    if (time.minutes === 0 && time.seconds === 0) stopTimer();
    else if (time.minutes > 0 && time.seconds === 0) {
      onTimerPlay({
        minutes: time.minutes - 1,
        seconds: 59,
      }, id);
    } else if (time.minutes > 0 && time.seconds > 0) {
      onTimerPlay({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      }, id);
      if (time.minutes === 0 && time.seconds === 0) stopTimer();
    } else if (time.seconds > 0) {
      onTimerPlay({
        minutes: time.minutes,
        seconds: time.seconds - 1,
      }, id);
      if (time.minutes === 0 && time.seconds === 0) stopTimer();
    }
  }, 1000));

  return (
      <span className="todo-list-item">
        <span className="todo-list-item-label" style={itemStyle(done)}>
          {value}
        </span>

        <TodoListItemTimer timer = { time }
        play = {play}
        onPlay = {setTimer1}
        onStop = {stopTimer}
        setPlay ={setPlay}/>

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
};

// function TodoListItem({
//   value, date, done, onDelete, onEdit, id,
// }) {

// }

TodoListItem.defaultProps = {
  date: new Date(),
};

TodoListItem.propTypes = {
  value: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  date: PropTypes.instanceOf(Date),
  done: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onTimerPlay: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.shape({
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  }),
};

export default TodoListItem;
