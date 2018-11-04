import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as Counts from '../actions/counts';

export interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export const reducers = {
  count: reducerWithInitialState(initialState.count)
    .case(Counts.increment, state => state + 1)
    .case(Counts.decrement, state => state - 1)
    .case(Counts.add, (state, payload) => state + payload),
};
