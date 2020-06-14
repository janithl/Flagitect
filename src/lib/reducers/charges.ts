import Actions from '@lib/actions';
import { makeID } from '@lib/utils';
import { Charges } from '@res/charges';

export type ChargeType = {
  id: string;
  type: Charges;
  colour: string;
  thickness?: number;
  percentage?: number;
  rotation?: number;
  points?: number;
};

export type ChargesStateType = {
  [key: string]: ChargeType;
};

const initialState: ChargesStateType = {};

export type ChargesReducerAction = {
  type: Actions;
  payload?: Partial<ChargeType> | string;
};

export default (
  state = initialState,
  action?: ChargesReducerAction,
): ChargesStateType => {
  switch (action?.type) {
    case Actions.UPDATE_CHARGE:
      const id = action?.payload?.id ?? makeID();
      const charge = state[id] ?? { id };
      return {
        ...state,
        [id]: { ...charge, ...(action?.payload as ChargeType) },
      };
    case Actions.REMOVE_CHARGE:
      if (!action?.payload) return state;

      const { [action?.payload as string]: _, ...rest } = state;
      return {
        ...rest,
      };
    default:
      return state;
  }
};
