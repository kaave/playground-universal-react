import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';

import { author } from '../consts';
import routes from '../routes';

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  const mountPoint = document.getElementById('mount-point');
  if (!mountPoint) {
    return;
  }

  renderMethod(
    <HelmetProvider>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </HelmetProvider>,
    mountPoint,
  );
});

console.log('created by', author);
