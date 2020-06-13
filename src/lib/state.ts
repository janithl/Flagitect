import Actions from '@lib/actions';
import {
  flag,
  FlagReducerAction,
  FlagStateType,
  ui,
  UIReducerAction,
  UIStateType,
  charges,
  ChargesReducerAction,
  ChargesStateType,
} from '@lib/reducers';

export type StateType = {
  flag: FlagStateType;
  ui: UIStateType;
  charges: ChargesStateType;
};

/** initial state */
export const initialState: StateType = {
  flag: flag(),
  ui: ui(),
  charges: charges(),
};

export type ReducerAction =
  | FlagReducerAction
  | UIReducerAction
  | ChargesReducerAction
  | { type: Actions; payload?: StateType };

/** validates that the object passed is a state object */
const validateState = (object?: ReducerAction['payload']): boolean => {
  if (!object || typeof object !== 'object') return false;

  Object.keys(initialState).forEach((key) => {
    if (!Object.keys(object).includes(key)) {
      return false;
    }
  });

  return true;
};

export const reducer = (
  state = initialState,
  action: ReducerAction,
): StateType => {
  if (__DEV__) {
    console.log(state, action);
  }

  if (
    action?.type === Actions.REHYDRATE_STATE &&
    validateState(action?.payload)
  ) {
    return action?.payload as StateType;
  }

  return {
    flag: flag(state.flag, action as FlagReducerAction),
    ui: ui(state.ui, action as UIReducerAction),
    charges: charges(state.charges, action as ChargesReducerAction),
  };
};
