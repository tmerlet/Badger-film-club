import { combineReducers } from 'redux';

import filmsReducer from './films';
import loadingReducer from './loading';

export default combineReducers({
  films: filmsReducer,
  loading: loadingReducer
});
