import Actions from '@lib/actions';
import { ProportionsList } from '@lib/proportions';
import colours, { initialColours } from '@res/colours';
import { DivisionList } from '@res/divisions';

type BorderType = {
  heightPercentage: number;
  colour: string;
};

export type FlagStateType = {
  division: number;
  proportion: number;
  selectedColours: string[];
  selectedEditColour: null | number;
  border: BorderType;
};

const initialState: FlagStateType = {
  division: 2,
  proportion: 2,
  selectedColours: initialColours,
  selectedEditColour: null,
  border: {
    heightPercentage: 0,
    colour: colours.white,
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
      /** if edit colour is selected, replace that colour */
      if (state.selectedEditColour !== null) {
        const selectedColours = [...state.selectedColours];
        selectedColours.splice(
          state.selectedEditColour,
          1,
          String(action.payload),
        );
        return {
          ...state,
          selectedColours,
          selectedEditColour: null,
        };
      }
      /** else append to selected colours */
      return {
        ...state,
        selectedColours: [...state.selectedColours, String(action.payload)],
      };

    case Actions.UPDATE_COLOUR:
      return {
        ...state,
        selectedEditColour: Number(action.payload),
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
