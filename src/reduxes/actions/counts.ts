import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const types = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  asyncIncrement: 'ASYNC_INCREMENT',
  asyncDecrement: 'ASYNC_DECREMENT',
};

export const increment = actionCreator<void>(types.increment);
export const decrement = actionCreator<void>(types.decrement);
export const asyncIncrement = actionCreator.async<void, void>(types.asyncIncrement);
export const asyncDecrement = actionCreator.async<void, void>(types.asyncDecrement);

export const actions = { increment, decrement, asyncIncrement, asyncDecrement };
