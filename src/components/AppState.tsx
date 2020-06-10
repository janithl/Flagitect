import React, { Children, cloneElement, useEffect, useReducer } from 'react';

import { Actions, initialState, reducer } from '@lib/state';
import { getState, storeState } from '@lib/storage';

export default ({ children }: OwnProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getState().then((payload) =>
      dispatch({ type: Actions.REHYDRATE_STATE, payload }),
    );
  }, []);

  useEffect(() => {
    storeState(state);
  }, [state]);

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, { ...state, dispatch }),
      )}
    </>
  );
};

type OwnProps = {
  children: JSX.Element[] | JSX.Element;
};
