import React from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { ListItem, SectionHeading, Spinner, SpinnerTypes } from '@components';
import Actions from '@lib/actions';
import { ChargeType, openModal, ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

const properties = [
  {
    name: 'percentage',
    label: 'Size (%)',
    min: 10,
    max: 100,
    step: 10,
  },
  {
    name: 'thickness',
    label: 'Thickness (%)',
    min: 5,
    max: 50,
    step: 5,
  },
];

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
      {charges[selectedCharge] &&
        properties.map((item) =>
          charges[selectedCharge][item.name] ? (
            <Spinner
              key={item.name}
              label={item.label}
              value={charges[selectedCharge][item.name] ?? item.min}
              type={SpinnerTypes.Number}
              min={item.min}
              max={item.max}
              step={item.step}
              setValue={(value: number) => updateValue(item.name, value)}
            />
          ) : (
            <View key={item.name} />
          ),
        )}
      <SectionHeading title="Options" />
      <ListItem
        title="Set Colour"
        onPress={() => openModal(dispatch, ModalActions.SelectColourCharge)}
      />
      <ListItem
        title={`Remove ${charges[selectedCharge]?.type}`}
        colour={colours.salmon}
        onPress={removeChargePrompt}
      />
    </ScrollView>
  );
};

type OwnProps = {
  selectedCharge: string;
  charges: { [key: string]: ChargeType };
  dispatch: (action: ReducerAction) => void;
};
