import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Column from '../dashbord-Elements/columns';
import './calculation.css';
import { useSelector, useDispatch } from 'react-redux';
import { addCalculation } from '../../features/calculation-Slice/calculation-Slice';

const TextAreaComponent = ({ onChange }) => {
  const [text, setText] = useState('');
  const [columnName, setColumnName] = useState('');
  const calculations = useSelector((state) => state.calculation.calculations);
  const columnNames = useSelector((state) => state.calculation.columnNames);
  const dispatch = useDispatch();

  useEffect(() => {
    onChange({ calculation: text, columnName });
  }, [text, columnName, onChange]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedColumnName = event.dataTransfer.getData('columnName');
    const formattedColumnName = `[${droppedColumnName}]`;
    setText((prevText) => prevText + formattedColumnName);
    dispatch(addCalculation({ calculation: text + formattedColumnName, columnName }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='row'>
      <div className='column'>
        <Column />
      </div>
      <div className='textarea-container'>
        <TextField
          id='outlined-size-small'
          size='small'
          value={columnName}
          onChange={handleColumnNameChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          value={text}
          onChange={handleTextChange}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          rows='10'
          cols='30'
          style={{ width: '100%', height: '200px', padding: '10px' }}
        />
      </div>
    </div>
  );
};

export default TextAreaComponent;
