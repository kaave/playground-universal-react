import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import format from 'date-fns/format';

import { author } from '../consts';
import App from '../containers/App';

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  const mountPoint = document.getElementById('mount-point');
  if (!mountPoint) {
    return;
  }

  renderMethod(<App />, mountPoint);
});
console.log('created by', author);
