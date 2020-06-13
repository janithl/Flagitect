import React from 'react';
import { ScrollView } from 'react-native';

import { Button, Spinner, SpinnerTypes, Text } from '@components';
import Actions from '@lib/actions';
import { ChargeType } from '@lib/reducers';
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

  const removeCharge = () =>
    dispatch({
      type: Actions.REMOVE_CHARGE,
      payload: selectedCharge,
    });

  return (
    <ScrollView>
      <Spinner
        label="Size (%)"
        value={charges[selectedCharge]?.percentage ?? 10}
        type={SpinnerTypes.Number}
        min={10}
        max={90}
        step={10}
        setValue={(value: number) => updateValue('percentage', value)}
      />
      <Spinner
        label="Thickness (%)"
        value={charges[selectedCharge]?.thickness ?? 10}
        type={SpinnerTypes.Number}
        min={5}
        max={50}
        step={5}
        setValue={(value: number) => updateValue('thickness', value)}
      />
      <Button onPress={removeCharge}>
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
