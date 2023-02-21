import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

/////////////////////////////// Action Creators
export const addVote = (id) => ({
  type: 'ANECDOTES/ADD_VOTE',
  payload: id,
});

export const setFilter = (filter) => ({
  type: 'ANECDOTES/SET_FILTER',
  payload: filter,
});

export const addNewAnecdote = (newAncdContent) => ({
  type: 'ANECDOTES/ADD_NEW',
  payload: newAncdContent,
});

const writeAncdsToState = (anecdotes) => ({
  type: 'ANECDOTES/FETCH_INIT',
  payload: anecdotes,
});

/////////////////////////////// ASYNC action with Redux THUNK
export const initFetch = () => {
  return async (dispatch) => {
    try {
      // ASYNC call first
      const { data: result } = await axios('http://localhost:3001/');

      // Dispatch an actual SYNC action
      dispatch(writeAncdsToState(result));
    } catch (error) {
      // Dispatching error notification can come here
      console.error(error);
    }
  };
};

const initState = {
  anecdotes: [
    /*{ id: 1, content: 'If it hurts, do it more often', votes: 0 },
    {
      id: 2,
      content: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      id: 3,
      content:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      id: 4,
      content:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    {
      id: 5,
      content: 'Premature optimization is the root of all evil.',
      votes: 0,
    },
    {
      id: 6,
      content:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },*/
  ],
  filter: '',
};

// Reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ANECDOTES/ADD_VOTE': {
      const matchedAncd = state.anecdotes.find(
        (ancd) => ancd.id === action.payload
      );

      const updAncd = {
        ...matchedAncd,
        votes: matchedAncd.votes + 1,
      };

      const updAncds = state.anecdotes.map((ancd) =>
        ancd.id === updAncd.id ? updAncd : ancd
      );

      return { ...state, anecdotes: updAncds };
    }

    case 'ANECDOTES/SET_FILTER': {
      return { ...state, filter: action.payload };
    }

    case 'ANECDOTES/ADD_NEW': {
      const newAncd = { id: uuidv4(), content: action.payload, votes: 0 };

      return { ...state, anecdotes: [...state.anecdotes, newAncd] };
    }

    case 'ANECDOTES/FETCH_INIT': {
      return { ...state, anecdotes: [...action.payload] };
    }

    default:
      return state;
  }
};

export default reducer;
