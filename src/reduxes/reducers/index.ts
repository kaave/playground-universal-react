import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';

import * as Counts from './counts';

// tslint:disable-next-line no-empty-interface
export type State = Counts.State & RouterState;

export const createRootReducer = (history: History) =>
  combineReducers({
    ...Counts.reducers,
    router: connectRouter(history),
  } as any); // FIXME: use any
