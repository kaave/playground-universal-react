import { SagaIterator, delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { asyncDecrement, asyncIncrement, types } from '../actions/counts';

const asyncIncrementWorker = bindAsyncAction(asyncIncrement)(function*(): SagaIterator {
  yield call(delay, 1000);
  yield put({ type: types.increment });
});

const asyncDecrementWorker = bindAsyncAction(asyncDecrement)(function*(): SagaIterator {
  yield call(delay, 1000);
  yield put({ type: types.decrement });
});

export function* watchIncrementAsync(): SagaIterator {
  yield takeEvery(types.asyncIncrement, asyncIncrementWorker);
}

export function* watchDecrementAsync(): SagaIterator {
  yield takeEvery(types.asyncDecrement, asyncDecrementWorker);
}

export const sagas = [watchIncrementAsync, watchDecrementAsync];
