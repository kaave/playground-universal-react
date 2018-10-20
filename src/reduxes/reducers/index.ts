import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';

import * as Counts from './counts';

// tslint:disable-next-line no-empty-interface
export type State = Counts.State & RouterState;

export default combineReducers({
  ...Counts.reducers,
});
