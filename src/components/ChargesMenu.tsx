import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  Button,
  SectionHeading,
  Spinner,
  SpinnerTypes,
  Text,
} from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { ChargesList, CrossTypes } from '@res/charges/index';
import colours from '@res/colours';

export default ({ border, charges, dispatch }: OwnProps): JSX.Element => (
  <ScrollView>
    <SectionHeading title="Border" />
    <View>
      <Spinner
        label="Border Height (%)"
        value={border.heightPercentage}
        type={SpinnerTypes.Number}
        min={0}
        max={25}
        step={5}
        setValue={(payload: number) =>
          dispatch({ type: Actions.SET_BORDER_HP, payload })
        }
      />
      <Button
        onPress={() => openModal(dispatch, ModalActions.SelectColourBorder)}>
        <Text colour={colours.white} H4>
          Select Colour
        </Text>
      </Button>
    </View>

    <SectionHeading title="Charges" />
    {Object.values(charges).map((charge: ChargeType) => (
      <Button
        onPress={() =>
          dispatch({
            type: Actions.SELECT_CHARGE,
            payload: charge.id,
          })
        }>
        <Text colour={colours.white} H4>{`Edit ${charge.type}`}</Text>
        <Text colour={colours.white}>{charge.id}</Text>
      </Button>
    ))}

    <SectionHeading title="Add Charges" />
    {ChargesList.map((charge) => (
      <Button
        onPress={() =>
          dispatch({
            type: Actions.UPDATE_CHARGE,
            payload: {
              type: charge,
              colour: colours.white,
              percentage: 30,
              thickness: charge === CrossTypes.Greek ? 20 : undefined,
            },
          })
        }>
        <Text colour={colours.white} H4>
          {`Add ${charge}`}
        </Text>
      </Button>
    ))}
  </ScrollView>
);

type OwnProps = {
  border: {
    colour: string;
    heightPercentage: number;
  };
  charges: { [key: string]: ChargeType };
  dispatch: (action: ReducerAction) => void;
};
