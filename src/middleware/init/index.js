import fetch from 'isomorphic-fetch';
import { data, failure } from '../../actions';

export default (store) => next => action => {

  switch (action.type) {
    case 'INIT_FETCH': {
      fetch('http://localhost:8001/films')
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

        }).catch(err => {
          store.dispatch(failure(err));
        });

      return next(action);
    }

    default:
      return next(action);

  }
};
