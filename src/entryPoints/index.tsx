import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { author } from '../consts';
import routes from '../routes';

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  const mountPoint = document.getElementById('mount-point');
  if (!mountPoint) {
    return;
  }

  renderMethod(<BrowserRouter>{renderRoutes(routes)}</BrowserRouter>, mountPoint);
});

console.log('created by', author);
