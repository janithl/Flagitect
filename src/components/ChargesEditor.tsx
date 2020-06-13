import React from 'react';
import { Alert, ScrollView } from 'react-native';

import {
  Button,
  SectionHeading,
  Spinner,
  SpinnerTypes,
  Text,
} from '@components';
import Actions from '@lib/actions';
import { ChargeType, openModal, ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

export default ({
  selectedCharge,
  charges,
  dispatch,
}: OwnProps): JSX.Element => {
  const updateValue = (key: string, value: number) =>
    dispatch({
      type: Actions.UPDATE_CHARGE,
      payload: { id: selectedCharge, [key]: value },
    });

  const removeChargePrompt = () =>
    Alert.alert(
      `Remove ${charges[selectedCharge]?.type}?`,
      'Are you sure you want to remove this charge?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: removeCharge },
      ],
      { cancelable: false },
    );

  const removeCharge = () => {
    dispatch({
      type: Actions.REMOVE_CHARGE,
      payload: selectedCharge,
    });
    dispatch({
      type: Actions.SELECT_CHARGE,
      payload: '',
    });
  };

  return (
    <ScrollView>
      <SectionHeading title={`${charges[selectedCharge]?.type} Properties`} />
      {charges[selectedCharge]?.percentage ? (
        <Spinner
          label="Size (%)"
          value={charges[selectedCharge]?.percentage ?? 10}
          type={SpinnerTypes.Number}
          min={10}
          max={90}
          step={10}
          setValue={(value: number) => updateValue('percentage', value)}
        />
      ) : null}
      {charges[selectedCharge]?.thickness ? (
        <Spinner
          label="Thickness (%)"
          value={charges[selectedCharge]?.thickness ?? 10}
          type={SpinnerTypes.Number}
          min={5}
          max={50}
          step={5}
          setValue={(value: number) => updateValue('thickness', value)}
        />
      ) : null}
      <Button
        onPress={() => openModal(dispatch, ModalActions.SelectColourCharge)}>
        <Text colour={colours.white} H4>
          Select Colour
        </Text>
      </Button>
      <SectionHeading title="Remove Charge" />
      <Button onPress={removeChargePrompt}>
        <Text colour={colours.white} H4>
          Remove Charge
        </Text>
      </Button>
    </ScrollView>
  );
};

type OwnProps = {
  selectedCharge: string;
  charges: { [key: string]: ChargeType };
  dispatch: (action: ReducerAction) => void;
};
