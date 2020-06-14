import React from 'react';
import { View } from 'react-native';

import {
  ChargesAdd,
  ChargesMenu,
  ChargesEditor,
  ColourSelector,
  FileSaver,
  Modal,
} from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import Palette from './Palette';

export default ({
  dispatch,
  flag: { selectedColours, border },
  ui: { modalAction, selectedCharge },
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
      case ModalActions.SelectColourCharge:
      case ModalActions.SelectColourDivision:
        return (
          <Palette
            selectAction={modalAction}
            selectedCharge={selectedCharge}
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
      case ModalActions.ChargesList:
        return (
          <ChargesMenu border={border} charges={charges} dispatch={dispatch} />
        );
      case ModalActions.EditCharge:
        return (
          <ChargesEditor
            selectedCharge={selectedCharge}
            charges={charges}
            dispatch={dispatch}
          />
        );
      case ModalActions.AddCharge:
        return <ChargesAdd dispatch={dispatch} />;
      case ModalActions.None:
      default:
        return <View />;
    }
  };

  const dismissModal = () => {
    switch (modalAction) {
      case ModalActions.SelectColourBorder:
      case ModalActions.EditCharge:
        openModal(dispatch, ModalActions.ChargesList);
        break;
      case ModalActions.SelectColourCharge:
        openModal(dispatch, ModalActions.EditCharge);
        break;
      case ModalActions.SelectColourDivision:
        openModal(dispatch, ModalActions.EditColours);
        break;
      default:
        openModal(dispatch, ModalActions.None);
    }
  };

  return (
    <Modal
      visible={modalAction !== ModalActions.None}
      dismiss={dismissModal}
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
    selectedCharge: string;
  };
  charges: {
    [key: string]: ChargeType;
  };
  dispatch: (action: ReducerAction) => void;
};
