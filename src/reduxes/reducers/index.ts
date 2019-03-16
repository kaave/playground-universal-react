import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';

import * as Counts from './counts';

export type State = Counts.State & RouterState;

export const createRootReducer = (history: History) =>
  combineReducers({
    ...Counts.reducers,
    router: connectRouter(history),
  }); // FIXME: use any
