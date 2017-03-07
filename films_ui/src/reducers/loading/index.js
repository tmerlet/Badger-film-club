import { FAILURE, GET_FILMS_SUCCESS } from '../../actions/types';

export default (state = false, action) => {
  switch (action.type) {

    case FAILURE: {
      return false;
    }

    case GET_FILMS_SUCCESS: {
      return false
    }

    default:
      return state;
  }
};
