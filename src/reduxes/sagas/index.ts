import { all } from 'redux-saga/effects';

import { sagas as Counts } from './counts';

export function* rootSaga() {
  yield all([...Counts.map(method => method())]);
}
