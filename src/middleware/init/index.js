import fetch from 'isomorphic-fetch';
import { data, failure } from '../../actions';

export default (store) => next => action => {

// AGAIN THE TYPE SHOULD BE IMPORTED FROM actions/types
// url shouldn't be hardcoded (read it from the environment)
// fetch should be injected in so that we can test this logic
// i.e. export default fetch => store => next => action { ... }
  switch (action.type) {
    case 'INIT_FETCH': {
      fetch('http://localhost:8001/films')
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        }).then(json => {
          // THIS TIMEOUT IS NOT NECCESSARY IT WAS JUST TO MAKE IT LOOK LIKE
          // THE FETCH WAS TAKING A FEW SECONDS
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
