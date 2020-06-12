import Actions from '@lib/actions';

export enum ModalActions {
  SaveFlag = 'Save Flag',
  EditColours = 'Edit Division Colours',
  EditCharges = 'Edit Charges',
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
};

const initialState: UIStateType = {
  modalAction: ModalActions.None,
  fileType: '',
  menuOpen: false,
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

    default:
      return state;
  }
};
