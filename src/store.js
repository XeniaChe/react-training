import anecdoteReducer from './store/reducers/anecdoteReducer';

import { configureStore } from '@reduxjs/toolkit';

// Creating a store
// TODO: read about new Toolkit before starting THUNK

// It automatically does:
// The slice reducers were automatically passed to combineReducers()
// The redux-thunk middleware was automatically added
// Dev-mode middleware was added to catch accidental mutations
// The Redux DevTools Extension was automatically set up
// The middleware and DevTools enhancers were composed together and added to the store
export const store = configureStore({
  reducer: { anecdotes: anecdoteReducer },
});
