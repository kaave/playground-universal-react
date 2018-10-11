import { combineReducers } from 'redux';

import * as Counts from './counts';

// tslint:disable-next-line no-empty-interface
export interface State {
  counts: Counts.State;
}

export default combineReducers({
  ...Counts.reducers,
});
