import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  Button,
  ListItem,
  SectionHeading,
  Spinner,
  SpinnerTypes,
  Text,
} from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { Charges, ChargesList, CrossTypes } from '@res/charges/index';
import colours from '@res/colours';
import { Edit, Paint } from '@res/icons';

const crosses = [CrossTypes.Cross, CrossTypes.Greek, CrossTypes.Nordic];

const addCharge = (charge: Charges) => ({
  type: charge,
  colour: colours.white,
  percentage: !(
    crosses.includes(charge as CrossTypes) && charge === CrossTypes.Greek
  )
    ? undefined
    : 10,
  thickness: crosses.includes(charge as CrossTypes) ? 10 : undefined,
});

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
      <ListItem
        title="Set Colour"
        icon={<Paint fill={border.colour} size={32} />}
        onPress={() => openModal(dispatch, ModalActions.SelectColourBorder)}
      />
    </View>

    <SectionHeading title="Charges" />
    {Object.values(charges).map((charge: ChargeType) => (
      <ListItem
        title={charge.type}
        icon={<Edit fill={colours.primaryBlue} size={32} />}
        onPress={() =>
          dispatch({
            type: Actions.SELECT_CHARGE,
            payload: charge.id,
          })
        }
      />
    ))}

    <SectionHeading title="Add Charges" />
    {ChargesList.map((charge) => (
      <Button
        onPress={() =>
          dispatch({
            type: Actions.UPDATE_CHARGE,
            payload: addCharge(charge),
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
