import Actions from '@lib/actions';
import { makeID } from '@lib/utils';
import { Charges, CrossTypes, PileTypes } from '@res/charges';

type ChargeOptions = {
  thickness: number;
  percentage: number;
  crossType: CrossTypes;
  pileType: PileTypes;
};

export type ChargeType = {
  id: string;
  type: Charges;
  height: number;
  width: number;
  colour: string;
  options?: Partial<ChargeOptions>;
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
