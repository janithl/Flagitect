import Actions from '@lib/actions';

export enum ModalActions {
  SaveFlag = 'Save Flag',
  EditColours = 'Edit Division Colours',
  ChargesList = 'Charges',
  EditCharge = 'Edit Charge',
  SelectColourBorder = 'Select Border Colour',
  SelectColourDivision = 'Add Division Colour',
  None = '',
}

export type UIReducerAction = {
  type: Actions;
  payload?: string | ModalActions;
};

export type UIStateType = {
  modalAction: ModalActions;
  fileType: string;
  menuOpen: boolean;
  selectedCharge: string;
};

const initialState: UIStateType = {
  modalAction: ModalActions.None,
  fileType: '',
  menuOpen: false,
  selectedCharge: '',
};

export default (
  state = initialState,
  action?: UIReducerAction,
): UIStateType => {
  switch (action?.type) {
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

    case Actions.TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    case Actions.SELECT_CHARGE:
      return {
        ...state,
        selectedCharge: action.payload as string,
        modalAction:
          action.payload?.length === 0
            ? ModalActions.ChargesList
            : ModalActions.EditCharge,
      };

    default:
      return state;
  }
};

export const openModal = (
  dispatch: (action: UIReducerAction) => void,
  modal: ModalActions,
): void =>
  dispatch({
    type: Actions.SET_MODAL_ACTION,
    payload: modal,
  });
