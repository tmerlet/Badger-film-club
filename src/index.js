import React from 'react';
import { render } from 'react-dom';

import { connect, Provider } from 'react-redux';
import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as Actions from './actions';

import init from './middleware/init';

import reducers from './reducers';

import Films from './components/Films';

const node = document.getElementById('mount');

const initialState = {
  films: [],
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(init)
  )
);

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

const App = connect(mapStateToProps, mapDispatchToProps)(Films);

render(<Provider store={store}><App /></Provider>, node);
// ACTION SHOULD BE IMPORTED FROM ACTIONS
store.dispatch({type: 'INIT_FETCH'})
