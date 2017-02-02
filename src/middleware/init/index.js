import fetch from 'isomorphic-fetch';
import { data, failure } from '../../actions';

export default (store) => next => action => {
import { INIT_FETCH } from '../../actions/types.js';
import { getFilms, failure } from '../../actions';

  switch (action.type) {
    case 'INIT_FETCH': {
      fetch('http://localhost:8001/films')
    case INIT_FETCH: {
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        }).then(json => {
          // This timeout is not neccessary but it makes it look like
          // the fetch is taking a few seconds
          setTimeout(() => {
            store.dispatch(data(json));
          }, 3000);

          store.dispatch(getFilms(json));
        }).catch(err => {
          store.dispatch(failure(err));
        });

      return next(action);
    }

    default:
      return next(action);

  }
};
