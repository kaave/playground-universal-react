import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import loggerMiddleware from 'redux-logger';

import rootReducer from './reducers';

const history = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();
const initialState = {};

export const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(applyMiddleware(routerMiddleware(history), loggerMiddleware)),
);
