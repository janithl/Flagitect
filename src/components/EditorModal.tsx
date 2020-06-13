import React from 'react';
import { View } from 'react-native';

import { ChargesMenu, ColourSelector, FileSaver, Modal } from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import Palette from './Palette';

export default ({
  dispatch,
  flag: { selectedColours, border },
  ui: { modalAction },
  charges,
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
      case ModalActions.SelectColourBorder:
      case ModalActions.SelectColourDivision:
        return <Palette selectAction={modalAction} dispatch={dispatch} />;
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
      case ModalActions.EditCharges:
        return (
          <ChargesMenu border={border} charges={charges} dispatch={dispatch} />
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
    border: {
      colour: string;
      heightPercentage: number;
    };
  };
  ui: {
    modalAction: ModalActions;
  };
  charges: {
    [key: string]: ChargeType;
  };
  dispatch: (action: ReducerAction) => void;
};
