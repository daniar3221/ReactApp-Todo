import React, { useState } from 'react';
import './todo-input.css';
import PropTypes from 'prop-types';

const TodoInput = ({ getValue }) => {
  const [value, setValue] = useState('');

  const [time, setTime] = useState({
    minutes: '',
    seconds: '',
  });

  const onLabelChange = (e) => {
    setValue(e.target.value);
  };

  const onMinutesChange = (e) => {
    setTime((prevState) => ({
      minutes: e.target.value,
      seconds: prevState.seconds,
    }));
  };

  const onSecondsChange = (e) => {
    setTime((prevState) => {
      const seconds = e.target.value;
      return {
        seconds,
        minutes: prevState.minutes,
      };
    });
  };

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      if (!value) return;
      e.preventDefault();
      getValue(value, time);
      setValue('');
      setTime({
        minutes: '',
        seconds: '',
      });
    }
  };

  return (
      <form
        className="item-add-form"
        onKeyDown={onSubmit}
      >
        <input
          maxLength={23}
          className="todo-input"
          placeholder="What's need to be done ?"
          onChange={onLabelChange}
          value={value}
        />

         <input type="text"
         maxLength={2}
         onKeyPress={(event) => {
           if (!/[0-9]/.test(event.key)) {
             event.preventDefault();
           }
         }}
         className='todo-input-min'
         placeholder='Min'
         onChange={onMinutesChange}
         value = {time.minutes}
         />

        <input type="text"
        maxLength={2}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
         className='todo-input-sec'
         placeholder='Sec'
         onChange={onSecondsChange}
         value = {time.seconds}
         />
      </form>
  );
};

TodoInput.defaultProps = {
  getValue: () => {},
};

TodoInput.propTypes = {
  getValue: PropTypes.func,
};

export default TodoInput;
