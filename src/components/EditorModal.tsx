import React from 'react';
import { View } from 'react-native';

import { ColourSelector, FileSaver, Modal } from '@components';
import Actions from '@lib/actions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';

export default ({
  dispatch,
  flag: { selectedColours },
  ui: { modalAction },
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
  flag: {
    selectedColours: string[];
  };
  ui: {
    modalAction: ModalActions;
  };
  dispatch: (action: ReducerAction) => void;
};
