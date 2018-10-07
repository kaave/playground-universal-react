import * as React from 'react';
import { render } from 'react-dom';
import { fromEvent } from 'rxjs';
import format from 'date-fns/format';

import { author } from '../consts';
import App from '../containers/App';

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  console.log(format(new Date()), 'DOMContentLoaded');
  const mountPoint = document.getElementById('mount-point');
  if (!mountPoint) {
    return;
  }

  render(<App />, mountPoint);
});
console.log('created by', author);
