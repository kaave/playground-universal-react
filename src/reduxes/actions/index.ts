import { Dispatch } from 'redux';

import { types as Counts } from './counts';

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    increment: () => dispatch({ type: Counts.increment }),
    decrement: () => dispatch({ type: Counts.decrement }),
    asyncIncrement: () => dispatch({ type: Counts.asyncIncrement }),
    asyncDecrement: () => dispatch({ type: Counts.asyncDecrement }),
  };
}
