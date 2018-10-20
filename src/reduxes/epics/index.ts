import { combineEpics } from 'redux-observable';

import countsEpics from './counts';

export default combineEpics(...countsEpics);
