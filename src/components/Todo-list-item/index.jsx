/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './todo-list-item.css';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import TodoListItemTimer from '../todo-list-item-timer';

class TodoListItem extends Component {
  state = {
    timer: {
      minutes: this.props.time.minutes,
      seconds: this.props.time.seconds,
    },
    play: false,
  };

  itemStyle = (done) => ({
    fontSize: '17px',
    textDecoration: done ? 'line-through' : 'none',
  });

  setTimer = () => {
    let { minutes, seconds } = this.state.timer;
    this.setState({ play: true });
    this.timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) this.stopTimer();
      else if (minutes > 0 && seconds === 0) {
        minutes -= 1;
        seconds = 59;
        this.setState({
          timer: {
            minutes,
            seconds,
          },
        });
      } else if (minutes > 0 && seconds > 0) {
        seconds -= 1;
        this.setState({
          timer: {
            minutes,
            seconds,
          },
        });
        if (minutes === 0 && seconds === 0) this.stopTimer();
      } else if (seconds > 0) {
        seconds -= 1;
        this.setState({
          timer: {
            minutes,
            seconds,
          },
        });
        if (minutes === 0 && seconds === 0) this.stopTimer();
      }
      this.props.onTimerPlay(this.state.timer, this.props.id);
    }, 1000);
  };

  stopTimer = () => {
    this.setState({ play: false });
    clearInterval(this.timer);
  };

  render() {
    const {
      value, date, done, onDelete, onEdit, id,
    } = this.props;

    const { timer, play } = this.state;
    return (
      <span className="todo-list-item">
        <span className="todo-list-item-label" style={this.itemStyle(done)}>
          {value}
        </span>

        <TodoListItemTimer timer = { timer }
        play = {play}
        onPlay = {this.setTimer}
        onStop = {this.stopTimer}/>

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
}

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
  id: PropTypes.string.isRequired,
};

export default TodoListItem;
