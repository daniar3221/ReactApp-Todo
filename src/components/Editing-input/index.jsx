import React, { useState } from 'react';
import './editing-input.css';
import PropTypes from 'prop-types';

const EditingInput = ({ itemText, itemId, editItemText }) => {
  const [value, setValue] = useState(itemText);

  const onSubmitEnter = (e) => {
    if (e.key === 'Enter') {
      editItemText(value, itemId);
    }
  };
  const onSubmitButton = () => {
    editItemText(value, itemId);
  };
  const onLabelChange = (e) => {
    setValue(e.target.value);
  };

  return (
      <div>
        <input
          onKeyDown={onSubmitEnter}
          onChange={onLabelChange}
          className="editing-input"
          placeholder="Type something to change..."
          value={value}
        />
        <button type='button' className='check-button'
        onClick={onSubmitButton}>
                <i className="fa-solid fa-check" />
        </button>
      </div>
  );
};

EditingInput.defaultProps = {
  itemText: '',
  itemId: () => {},
  editItemText: () => {},
};

EditingInput.propTypes = {
  itemText: PropTypes.string,
  itemId: PropTypes.string,
  editItemText: PropTypes.func,
};

export default EditingInput;
