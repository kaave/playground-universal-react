import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import format from 'date-fns/format';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import Helmet from 'react-helmet-async';
import { returntypeof } from 'react-redux-typescript';

import { State } from '../reducers';
import actions from '../actions';

function mapStateToProps(state: State) {
  return { ...state };
}

const mapDispatchToProps = { ...actions };

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const stateProps = returntypeof(mapStateToProps);

type AppProps = typeof stateProps & typeof mapDispatchToProps & RouteConfigComponentProps;

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
      setInterval(() => this.props.increment(), 666);
    }

    render() {
      const { counter } = this.state;

      return (
        <main id="main" className="Main" role="main">
          <Helmet>
            <title>base title</title>
          </Helmet>
          now: {format(new Date())}, count: {counter}, storeCount: {this.props.count}
          {this.props.route && renderRoutes(this.props.route.routes)}
        </main>
      );
    }
  },
);
