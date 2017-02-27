import { combineReducers } from 'redux';

// TODO: pull out into own folder
const filmsReducer = (state = {}, action) => {
  switch (action.type) {

    case 'FAILURE': {
      const { error } = action.payload;
      return state;
    }

    case 'GET_FILMS': {
      // TODO: rename json
      const { json } = action.payload;
      return {
        films: json,
      }
    }

    default:
      return state;
  }
};

// TODO: pull out into own folder
const loadingReducer = (state = false, action) => {
  switch (action.type) {

    case 'FAILURE': {
      return false;
    }

    case 'GET_FILMS': {
      return false
    }

    default:
      return state;
  }
};

export default combineReducers({
  films: filmsReducer,
  loading: loadingReducer
});
