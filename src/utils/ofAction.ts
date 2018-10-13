// https://github.com/m0a/typescript-fsa-redux-observable/issues/6

import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { Action, ActionCreator } from 'typescript-fsa';
import { Observable, OperatorFunction } from 'rxjs';

// export function ofAction<P>(actionCreator: ActionCreator<P>): MonoTypeOperatorFunction<Action<P>> {
//   return actions$ => actions$.pipe(filter(actionCreator.match)) as ActionsObservable<Action<P>>;
// }

export const ofAction = <P>(actionCreator: ActionCreator<P>): OperatorFunction<Action<unknown>, Action<P>> => (
  actions$,
): Observable<Action<P>> => actions$.pipe(filter(actionCreator.match));
