import React from 'react';
import { View } from 'react-native';

import { ColourSelector, FileSaver, Modal } from '@components';
import { Actions, ModalActions, ReducerAction } from '@lib/state';

export default ({
  dispatch,
  modalAction,
  selectedColours,
}: OwnProps): JSX.Element => {
  const renderModalBody = () => {
    switch (modalAction) {
      case ModalActions.EditColours:
        return (
          <ColourSelector
            selectedColours={selectedColours}
            dispatch={dispatch}
          />
        );
      case ModalActions.SaveFlag:
        return (
          <FileSaver
            onSave={(fileType) =>
              dispatch({
                type: Actions.SAVE_FLAG,
                payload: fileType,
              })
            }
          />
        );
      case ModalActions.None:
      default:
        return <View />;
    }
  };

  return (
    <Modal
      visible={modalAction !== ModalActions.None}
      dismiss={() => dispatch({ type: Actions.DISMISS_MODAL })}
      title={modalAction}>
      {renderModalBody()}
    </Modal>
  );
};

type OwnProps = {
  selectedColours: string[];
  modalAction: ModalActions;
  dispatch: (action: ReducerAction) => void;
};
