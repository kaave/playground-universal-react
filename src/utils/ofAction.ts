// https://github.com/m0a/typescript-fsa-redux-observable/issues/6

import { filter } from 'rxjs/operators';
import { Action, ActionCreator } from 'typescript-fsa';
import { Observable, OperatorFunction } from 'rxjs';

export const ofAction = <P>(actionCreator: ActionCreator<P>): OperatorFunction<Action<unknown>, Action<P>> => (
  actions$,
): Observable<Action<P>> => actions$.pipe(filter(actionCreator.match));
