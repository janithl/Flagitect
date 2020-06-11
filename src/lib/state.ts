import Actions from '@lib/actions';
import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import { UIReducer } from '@lib/reducers';
import { initialColours } from '@res/colours';

export type StateType = {
  division: number;
  proportion: number;
  selectedColours: string[];
  modalAction: ModalActions;
  fileType: string;
  menuOpen: boolean;
};

export enum ModalActions {
  SaveFlag = 'Save Flag',
  EditColours = 'Edit Colours',
  None = '',
}

export type ReducerAction = {
  type: Actions;
  payload?: string | number | ModalActions | StateType;
};

export const initialState = {
  division: 2,
  proportion: 2,
  selectedColours: initialColours,
  modalAction: ModalActions.None,
  fileType: '',
  menuOpen: false,
};

/** validates that the object passed is a state object */
const validateState = (object: ReducerAction['payload']): boolean => {
  if (!object || typeof object !== 'object') return false;

  Object.keys(initialState).forEach((key) => {
    if (!Object.keys(object).includes(key)) {
      return false;
    }
  });

  return true;
};

const nextIndex = (currentIndex: number, list: { length: number }): number =>
  currentIndex + 1 === list.length ? 0 : currentIndex + 1;

const minimumColours = 2;

export const reducer = (state: StateType, action: ReducerAction): StateType => {
  if (__DEV__) {
    console.log(state, action);
  }

  switch (action.type) {
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

    case Actions.REHYDRATE_STATE:
      return validateState(action.payload)
        ? (action.payload as StateType)
        : state;

    default:
      return UIReducer(state, action);
  }
};
