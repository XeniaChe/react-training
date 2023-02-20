import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/reducers/anecdoteReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const style = { marginBottom: 10 };

  const handleChange = (event) => {
    const value = event.target.value;

    // Dispatching 'setFilter' action to change the state
    dispatch(setFilter(value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
