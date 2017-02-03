import { INIT_FETCH } from '../../actions/types.js';
import { getFilms, failure } from '../../actions';

export default (fetch, url) => (store) => next => action => {
  switch (action.type) {
    case INIT_FETCH: {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        }).then(json => {
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
