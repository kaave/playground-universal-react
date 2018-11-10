import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import format from 'date-fns/format';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { ConnectedRouterProps } from 'connected-react-router';
import Helmet from 'react-helmet';
import { returntypeof } from 'react-redux-typescript';

import { State } from '../reduxes/reducers';
import { mapDispatchToProps } from '../reduxes/actions';
import { Modal } from '../components/organisms/modal';

function mapStateToProps(state: State) {
  return { ...state };
}

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type AppProps = typeof stateProps & typeof dispatchProps & RouteConfigComponentProps & ConnectedRouterProps;

export interface AppState {
  counter: number;
  isModalOpen: boolean;
}

class App extends React.Component<AppProps, AppState> {
  state = { counter: 0, isModalOpen: false };
  intervalID?: NodeJS.Timer;

  componentDidMount() {
    this.startCountup();
  }

  componentWillUnmount() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  startCountup() {
    this.intervalID = setInterval(() => this.setState({ ...this.state, counter: this.state.counter + 1 }), 1000);
  }

  increment = () => this.props.increment();
  decrement = () => this.props.decrement();
  asyncIncrement = () => this.props.asyncIncrement();
  asyncDecrement = () => this.props.asyncDecrement();

  handleOpenModalClick = () => this.setState({ isModalOpen: true });
  handleCloseModalClick = () => this.setState({ isModalOpen: false });

  render() {
    const { counter, isModalOpen } = this.state;
    const currentKey = this.props.location.pathname.split('/')[1] || '/';

    return (
      <main id="main" className="Main" role="main">
        <Helmet>
          <title>base title</title>
        </Helmet>
        <Modal isOpen={isModalOpen} onCloseClick={this.handleCloseModalClick} />
        <ul className="LinkList">
          <li className="LinkList__cell">
            <NavLink to="/">to index</NavLink>
          </li>
          <li className="LinkList__cell">
            <NavLink to="/demo">to demo</NavLink>
          </li>
        </ul>
        now: {format(new Date())}, auto counter: {counter}, storeCounter: {this.props.count}
        <TransitionGroup>
          <CSSTransition key={currentKey} classNames="fade" timeout={5000}>
            <Switch location={this.props.location}>{this.props.route && renderRoutes(this.props.route.routes)}</Switch>
          </CSSTransition>
        </TransitionGroup>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
        <button onClick={this.asyncIncrement}>async increment</button>
        <button onClick={this.asyncDecrement}>async decrement</button>
        <button onClick={this.handleOpenModalClick}>Open modal</button>
      </main>
    );
  }
}

export default connectToStore(App);
