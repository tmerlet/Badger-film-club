import { GET_FILMS } from '../../actions/types.js';
import { getFilmsSuccess, failure } from '../../actions';

export default (fetch, url) => (store) => next => action => {
  switch (action.type) {
    case GET_FILMS: {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        }).then(json => {
          store.dispatch(getFilmsSuccess(json));
        }).catch(err => {
          store.dispatch(failure(err));
        });

      return next(action);
    }

    default:
      return next(action);

  }
};
