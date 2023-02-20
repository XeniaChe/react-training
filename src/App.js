import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
      <Filter />
    </div>
  );
};

export default App;
