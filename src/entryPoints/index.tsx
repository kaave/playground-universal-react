import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReactReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

import { author } from '../consts';
import routes from '../routes';
import { getStore } from '../store';

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
    <HelmetProvider>
      <ReactReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
        </ConnectedRouter>
      </ReactReduxProvider>
    </HelmetProvider>,
    mountPoint,
  );
});

console.log('created by', author);
