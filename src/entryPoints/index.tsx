import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import { author } from '../consts';
import routes from '../routes';
import { getStore } from '../reduxes/store';

export const history = createHistory();

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  const mountPoint = document.getElementById('mount-point');
  if (!mountPoint) {
    return;
  }

  const initialState = JSON.parse(mountPoint.getAttribute('data-state') || '{}');
  const store = getStore({ initialState, history: createHistory() });

  renderMethod(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>{renderRoutes(routes)}</Router>
      </ConnectedRouter>
    </Provider>,
    mountPoint,
  );
});

console.log('created by', author);
