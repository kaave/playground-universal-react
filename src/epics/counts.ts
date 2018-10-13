import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { timer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { ofAction } from '~/utils/ofAction';
import { asyncIncrement, asyncDecrement, increment, decrement } from '~/actions/counts';

const asyncIncrementEpic: Epic<Action, any> = (actions$, _store) =>
  actions$.pipe(
    ofAction(asyncIncrement) as any,
    mergeMap(_action => timer(1000).pipe(map(() => increment()))),
  );

const asyncDecrementEpic: Epic<Action, any> = (actions$, _store) =>
  actions$.pipe(
    ofAction(asyncDecrement) as any,
    mergeMap(_action => timer(1000).pipe(map(() => decrement()))),
  );

export default [asyncIncrementEpic, asyncDecrementEpic];
