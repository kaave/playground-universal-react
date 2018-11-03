import * as React from 'react';
import { connect } from 'react-redux';

import format from 'date-fns/format';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import Helmet from 'react-helmet-async';
import { returntypeof } from 'react-redux-typescript';

import { State } from '../reduxes/reducers';
import { mapDispatchToProps } from '../reduxes/actions';

function mapStateToProps(state: State) {
  return { ...state };
}

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type AppProps = typeof stateProps & typeof dispatchProps & RouteConfigComponentProps;

export interface AppState {
  counter: number;
}

export default connectToStore(
  class App extends React.Component<AppProps, AppState> {
    state = { counter: 0 };

    componentDidMount() {
      this.startCountup();
    }

    startCountup() {
      setInterval(() => this.setState({ ...this.state, counter: this.state.counter + 1 }), 1000);
    }

    increment = () => this.props.increment();
    decrement = () => this.props.decrement();
    asyncIncrement = () => this.props.asyncIncrement();
    asyncDecrement = () => this.props.asyncDecrement();

    render() {
      const { counter } = this.state;

      return (
        <main id="main" className="Main" role="main">
          <Helmet>
            <title>base title</title>
          </Helmet>
          now: {format(new Date())}, auto counter: {counter}, storeCounter: {this.props.count}
          {this.props.route && renderRoutes(this.props.route.routes)}
          <button onClick={this.increment}>increment</button>
          <button onClick={this.decrement}>decrement</button>
          <button onClick={this.asyncIncrement}>async increment</button>
          <button onClick={this.asyncDecrement}>async decrement</button>
        </main>
      );
    }
  },
);
