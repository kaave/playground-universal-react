import { History } from 'history';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware, { SagaMiddleware, END } from 'redux-saga';

import { createRootReducer } from './reducers';
import { rootSaga } from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export function getStore(argv: { initialState: object; history: History<any>; isServer?: boolean }) {
  const { initialState, history, isServer } = argv;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware, routerMiddleware(history)];
  if (!isServer) {
    middlewares.push(loggerMiddleware);
  }

  const store: Store & {
    runSaga: SagaMiddleware<typeof rootSaga>['run'];
    close: () => void;
  } = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(...middlewares)));

  if (isServer) {
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
  } else {
    sagaMiddleware.run(rootSaga);
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
      const { rootReducer: nextReducer } = require('./reducers');

      store.replaceReducer(nextReducer(history));
    });
  }

  return store;
}
