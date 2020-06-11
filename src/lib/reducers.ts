import Actions from '@lib/actions';
import { ModalActions, ReducerAction, StateType } from '@lib/state';

export const UIReducer = (
  state: StateType,
  action: ReducerAction,
): StateType => {
  switch (action.type) {
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
