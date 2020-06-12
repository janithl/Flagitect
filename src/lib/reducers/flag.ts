import Actions from '@lib/actions';
import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import colours, { initialColours } from '@res/colours';

type BorderType = {
  heightPercentage: number;
  colour: string;
};

export type FlagStateType = {
  division: number;
  proportion: number;
  selectedColours: string[];
  border: BorderType;
};

const initialState: FlagStateType = {
  division: 2,
  proportion: 2,
  selectedColours: initialColours,
  border: {
    heightPercentage: 0,
    colour: colours.beige,
  },
};

const nextIndex = (currentIndex: number, list: { length: number }): number =>
  currentIndex + 1 === list.length ? 0 : currentIndex + 1;

const minimumColours = 2;

export type FlagReducerAction = {
  type: Actions;
  payload?: string | number;
};

export default (
  state = initialState,
  action?: FlagReducerAction,
): FlagStateType => {
  switch (action?.type) {
    case Actions.INCREMENT_DIVISION:
      return {
        ...state,
        division: nextIndex(state.division, DivisionList),
      };

    case Actions.INCREMENT_PROPORTION:
      return {
        ...state,
        proportion: nextIndex(state.proportion, ProportionsList),
      };

    case Actions.ADD_COLOUR:
      return {
        ...state,
        selectedColours: [...state.selectedColours, String(action.payload)],
      };

    case Actions.REMOVE_COLOUR:
      if (state.selectedColours.length === minimumColours) {
        return state;
      }

      return {
        ...state,
        selectedColours: state.selectedColours.filter(
          (_, index) => index !== Number(action.payload),
        ),
      };

    case Actions.SET_BORDER_COLOUR:
      return {
        ...state,
        border: {
          ...state.border,
          colour: String(action.payload),
        },
      };

    case Actions.SET_BORDER_HP:
      return {
        ...state,
        border: {
          ...state.border,
          heightPercentage: Number(action.payload),
        },
      };

    default:
      return state;
  }
};
