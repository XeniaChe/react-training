import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addVoteAsync,
  initFetchAsync,
} from '../store/reducers/anecdoteReducer';

const AnecdoteList = () => {
  // Subscription to state.anecdotes
  const state = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  // Initial data fetching
  useEffect(() => {
    // Dispatching ASYNC action
    dispatch(initFetchAsync());
  }, [dispatch]);

  const voteHandler = (id) => {
    // Dispatching ASYNC action
    dispatch(addVoteAsync(id));
  };

  const style = {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1px solid black',
  };

  const anecdotesCopy = [...state.anecdotes];
  const anecdotesSorted = anecdotesCopy.sort((a, b) => b.votes - a.votes);
  let anecdotesList = anecdotesSorted;

  if (state.filter) {
    const filteredAnecdotes = anecdotesSorted.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    anecdotesList = filteredAnecdotes;
  }

  return (
    <>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id} style={style}>
          <div>
            <p>{anecdote.content}</p>
          </div>
          <div>
            <p>
              has <strong>{anecdote.votes}</strong> votes
            </p>
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
