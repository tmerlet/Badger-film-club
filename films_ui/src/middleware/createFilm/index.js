import { CREATE_FILM } from '../../actions/types.js';
import { failure, getFilms } from '../../actions';

export default (fetch, url) => (store) => next => action => {
  switch (action.type) {
    case CREATE_FILM: {
      const { title } = action.payload;
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title })
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
      }).then(json => {
        store.dispatch(getFilms());
      }).catch(err => {
        store.dispatch(failure(err));
      });

      return next(action);
    }

    default:
      return next(action);
  }
};
