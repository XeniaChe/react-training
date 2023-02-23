import axios from 'axios';
const GLOBAL_URL = 'http://localhost:3001/';

// http://localhost:3001/'
/////////////////////////////// Action Creators
const addVote = (ancdUpdated) => ({
  type: 'ANECDOTES/ADD_VOTE',
  payload: ancdUpdated,
});

export const addNewAnecdote = (newAnecdote) => ({
  type: 'ANECDOTES/ADD_NEW',
  payload: newAnecdote,
});

const writeAncdsToState = (anecdotes) => ({
  type: 'ANECDOTES/FETCH_INIT',
  payload: anecdotes,
});

/////////////////////////////// ASYNC functions
export const initFetchAsync = () => {
  return async (dispatch) => {
    try {
      // ASYNC call first
      const { data: result } = await axios(GLOBAL_URL);

      // Dispatch an actual SYNC action
      dispatch(writeAncdsToState(result));
    } catch (error) {
      // Dispatching error notification can come here
      console.error(error);
    }
  };
};

export const addNewAsync = (content) => {
  return async (dispatch) => {
    try {
      const dataToSend = { content, votes: 0 };

      const { data: anecdoteCreated } = await axios({
        method: 'post',
        url: GLOBAL_URL,
        data: { dataToSend },
      });

      dispatch(addNewAnecdote(anecdoteCreated));
    } catch (error) {
      // Dispatching error notification can come here
      console.error(error);
    }
  };
};

export const addVoteAsync = (id) => {
  return async (dispatch) => {
    try {
      const { data: ancdUpdated } = await axios({
        method: 'put',
        url: `${GLOBAL_URL}/anecdotes/${id}`,
      });

      dispatch(addVote(ancdUpdated));
    } catch (error) {
      // Dispatching error notification can come here
      console.error(error);
    }
  };
};

const initState = {
  anecdotes: [],
  filter: '',
};

// Reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ANECDOTES/ADD_VOTE': {
      const updAncds = state.anecdotes.map((ancd) =>
        ancd.id === action.payload.id ? action.payload : ancd
      );

      return { ...state, anecdotes: updAncds };
    }

    case 'ANECDOTES/ADD_NEW': {
      return { ...state, anecdotes: [...state.anecdotes, action.payload] };
    }

    case 'ANECDOTES/FETCH_INIT': {
      return { ...state, anecdotes: [...action.payload] };
    }

    default:
      return state;
  }
};

export default reducer;
