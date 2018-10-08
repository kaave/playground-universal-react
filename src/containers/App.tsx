import * as React from 'react';
import format from 'date-fns/format';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from '../routes';

export interface State {
  counter: number;
}

export default class App extends React.Component {
  state = { counter: 0 };

  componentDidMount() {
    this.startCountup();
  }

  startCountup() {
    setInterval(() => this.setState({ ...this.state, counter: this.state.counter + 1 }), 100);
  }

  render() {
    const { counter } = this.state;

    return (
      <main id="main" className="Main" role="main">
        now: {format(new Date())}, count: {counter}
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </main>
    );
  }
}
