import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import { initialColours } from '@res/colours';

export enum Actions {
  INCREMENT_DIVISION = 'INCREMENT_DIVISION',
  INCREMENT_PROPORTION = 'INCREMENT_PROPORTION',
  ADD_COLOUR = 'ADD_COLOUR',
  REMOVE_COLOUR = 'REMOVE_COLOUR',
  REHYDRATE_STATE = 'REHYDRATE_STATE',
  SET_MODAL_ACTION = 'SET_MODAL_ACTION',
  DISMISS_MODAL = 'DISMISS_MODAL',
  SAVE_FLAG = 'SAVE_FLAG',
  SAVE_DONE = 'SAVE_DONE',
}

export type StateType = {
  division: number;
  proportion: number;
  selectedColours: string[];
  modalAction: ModalActions;
  fileType: string;
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

/** validates that the object passed is a state object */
const validateState = (object: ReducerAction['payload']): boolean => {
  if (!object || typeof object !== 'object') return false;

  const stateKeys = [
    'division',
    'proportion',
    'selectedColours',
    'modalActions',
  ];

  stateKeys.forEach((key) => {
    if (!Object.keys(object).includes(key)) {
      return false;
    }
  });

  return true;
};

const nextIndex = (currentIndex: number, list: { length: number }): number =>
  currentIndex + 1 === list.length ? 0 : currentIndex + 1;

const minimumColours = 2;

export const initialState = {
  division: 2,
  proportion: 2,
  selectedColours: initialColours,
  modalAction: ModalActions.None,
  fileType: '',
};

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

    case Actions.SET_MODAL_ACTION:
      return {
        ...state,
        modalAction: action.payload as ModalActions,
      };

    case Actions.DISMISS_MODAL:
      return {
        ...state,
        modalAction: ModalActions.None,
      };

    case Actions.SAVE_FLAG:
      return {
        ...state,
        fileType: action.payload as string,
      };

    case Actions.SAVE_DONE:
      return {
        ...state,
        fileType: '',
      };

    case Actions.REHYDRATE_STATE:
      return validateState(action.payload)
        ? (action.payload as StateType)
        : state;

    default:
      return state;
  }
};
