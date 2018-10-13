import actionCreatorFactory from 'typescript-fsa';
import { ActionCreator } from 'redux';

const actionCreator = actionCreatorFactory();

export const types = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
};

export const increment = actionCreator<void>(types.increment);
export const decrement = actionCreator<void>(types.decrement);

export const actions = { increment, decrement };
