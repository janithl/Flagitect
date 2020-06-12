import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import {
  ColourSelector,
  FileSaver,
  Modal,
  SectionHeading,
  Spinner,
  Text,
} from '@components';
import Actions from '@lib/actions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { BorderHeightPercentages } from '@lib/proportions';
import Palette from './Palette';

export default ({
  dispatch,
  flag: { selectedColours, border },
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
          <View>
            <SectionHeading title="Border" />
            <View>
              <Spinner
                value={border.heightPercentage}
                list={BorderHeightPercentages}
                setValue={(payload: number) =>
                  dispatch({ type: Actions.SET_BORDER_HP, payload })
                }
              />
              <TouchableOpacity
                onPress={() =>
                  dispatch({
                    type: Actions.SET_MODAL_ACTION,
                    payload: ModalActions.SelectColourBorder,
                  })
                }>
                <Text H4>Set Colour</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  dispatch: (action: ReducerAction) => void;
};
