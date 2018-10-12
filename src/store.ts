declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

import { History } from 'history';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import loggerMiddleware from 'redux-logger';

import rootReducer from './reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export function getStore({ initialState, history }: { initialState: object; history: History<any> }) {
  const middlewares: Middleware[] = [routerMiddleware(history), loggerMiddleware];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const { rootReducer: nextReducer } = require('./reducers');

      store.replaceReducer(connectRouter(history)(nextReducer));
    });
  }

  return store;
}
