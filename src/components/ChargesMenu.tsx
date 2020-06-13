import React from 'react';
import { View } from 'react-native';

import { Button, SectionHeading, Spinner, Text } from '@components';
import Actions from '@lib/actions';
import { BorderHeightPercentages } from '@lib/proportions';
import { ChargeType, ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { Charges } from '@res/charges';
import colours from '@res/colours';

export default ({ border, charges, dispatch }: OwnProps): JSX.Element => (
  <View>
    <SectionHeading title="Border" />
    <View>
      <Spinner
        label="Border Height (%)"
        value={border.heightPercentage}
        list={BorderHeightPercentages}
        setValue={(payload: number) =>
          dispatch({ type: Actions.SET_BORDER_HP, payload })
        }
      />
      <Button
        onPress={() =>
          dispatch({
            type: Actions.SET_MODAL_ACTION,
            payload: ModalActions.SelectColourBorder,
          })
        }>
        <Text colour={colours.white} H4>
          Set Colour
        </Text>
      </Button>
    </View>
    <SectionHeading title="Charges" />
    {Object.values(charges).map((charge: ChargeType) => (
      <Button
        onPress={() =>
          dispatch({
            type: Actions.REMOVE_CHARGE,
            payload: charge.id,
          })
        }>
        <Text colour={colours.white} H4>
          {`Remove ${charge.type} ${charge.id}`}
        </Text>
      </Button>
    ))}
    <SectionHeading title="Add Charges" />

    {[Charges.Disc, Charges.Cross, Charges.Pile].map((charge) => (
      <Button
        onPress={() =>
          dispatch({
            type: Actions.UPDATE_CHARGE,
            payload: {
              type: charge,
              colour: colours.white,
            },
          })
        }>
        <Text colour={colours.white} H4>
          {`Add ${charge}`}
        </Text>
      </Button>
    ))}
  </View>
);

type OwnProps = {
  border: {
    colour: string;
    heightPercentage: number;
  };
  charges: {
    [key: string]: ChargeType;
  };
  dispatch: (action: ReducerAction) => void;
};
