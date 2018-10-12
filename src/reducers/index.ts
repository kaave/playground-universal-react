import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';

import * as Counts from './counts';

// tslint:disable-next-line no-empty-interface
export interface State {
  counts: Counts.State;
  router: RouterState;
}

export default combineReducers({
  ...Counts.reducers,
});
