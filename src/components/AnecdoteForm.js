import React from 'react';
import { addNewAsync } from '../store/reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const style = { marginBottom: 10, padding: 10 };

  const dispatch = useDispatch();

  const addNewAnecdoteHandler = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    // dispatch action
    dispatch(addNewAsync(content));
  };

  return (
    <>
      <form onSubmit={addNewAnecdoteHandler} style={style}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>add-new</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
