enum Actions {
  /** Flag */
  INCREMENT_DIVISION = 'INCREMENT_DIVISION',
  INCREMENT_PROPORTION = 'INCREMENT_PROPORTION',
  ADD_COLOUR = 'ADD_COLOUR',
  REMOVE_COLOUR = 'REMOVE_COLOUR',
  SET_BORDER_COLOUR = 'SET_BORDER_COLOUR',
  SET_BORDER_HP = 'SET_BORDER_HP',

  /** UI */
  SET_MODAL_ACTION = 'SET_MODAL_ACTION',
  DISMISS_MODAL = 'DISMISS_MODAL',
  SAVE_FLAG = 'SAVE_FLAG',
  SAVE_DONE = 'SAVE_DONE',
  TOGGLE_MENU = 'TOGGLE_MENU',

  /** Charges */
  UPDATE_CHARGE = 'UPDATE_CHARGE',
  REMOVE_CHARGE = 'REMOVE_CHARGE',

  /** Etc */
  REHYDRATE_STATE = 'REHYDRATE_STATE',
}

export default Actions;
