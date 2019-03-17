import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';

import { asyncDecrement, asyncIncrement, types } from '../actions/counts';

const wait = (msec: number) => () => new Promise(resolve => setTimeout(resolve, msec));

const asyncIncrementWorker = bindAsyncAction(asyncIncrement)(function*(): SagaIterator {
  yield call(wait(1000));
  yield put({ type: types.increment });
});

const asyncDecrementWorker = bindAsyncAction(asyncDecrement)(function*(): SagaIterator {
  yield call(wait(1000));
  yield put({ type: types.decrement });
});

export function* watchIncrementAsync(): SagaIterator {
  // @ts-ignore: TODO
  yield takeEvery(types.asyncIncrement, asyncIncrementWorker);
}

export function* watchDecrementAsync(): SagaIterator {
  // @ts-ignore: TODO
  yield takeEvery(types.asyncDecrement, asyncDecrementWorker);
}

export const sagas = [watchIncrementAsync, watchDecrementAsync];
