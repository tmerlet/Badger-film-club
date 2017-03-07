import { FAILURE, GET_FILMS_SUCCESS } from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {

    case FAILURE: {
      const { error } = action.payload;
      return state;
    }

    case GET_FILMS_SUCCESS: {
      return action.payload.films;
    }

    default:
      return state;
  }
};
