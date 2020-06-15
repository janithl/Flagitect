import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import {
  BendTypes,
  Charges,
  ChargesList,
  ComplexTypes,
  CrossTypes,
  SimpleTypes,
} from '@res/charges/index';
import colours from '@res/colours';

const ChargeItem = ({ title, onPress }: ChargeItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.chargeItem}>
    <Text colour={colours.white} textAlign="center" H4>
      {title}
    </Text>
  </TouchableOpacity>
);

type ChargeItemProps = {
  title: string;
  onPress: () => void;
};

export default ({ dispatch }: OwnProps): JSX.Element => (
  <FlatList
    data={ChargesList}
    columnWrapperStyle={styles.columnStyle}
    keyExtractor={(item) => item}
    numColumns={3}
    renderItem={({ item }) => (
      <ChargeItem
        title={item}
        onPress={() => {
          dispatch({
            type: Actions.UPDATE_CHARGE,
            payload: getChargeOptions(item),
          });
          openModal(dispatch, ModalActions.ChargesList);
        }}
      />
    )}
  />
);

type OwnProps = {
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  chargeItem: {
    width: 100,
    height: 100,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colours.secondaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
});

const getChargeOptions = (charge: Charges) => {
  const options: Partial<ChargeType> = {
    type: charge,
    colour: colours.white,
    percentage: 50,
    repeatX: 1,
    repeatY: 1,
  };

  switch (charge) {
    case SimpleTypes.Canton:
    case SimpleTypes.Panel:
      delete options.repeatX;
      delete options.repeatY;
      break;
    case CrossTypes.Cross:
    case CrossTypes.Nordic:
    case CrossTypes.Saltire:
      delete options.percentage;
      delete options.repeatX;
      delete options.repeatY;
      options.thickness = 10;
      break;
    case BendTypes.Bend:
    case BendTypes.Enhanced:
    case BendTypes.Reduced:
      delete options.percentage;
      delete options.repeatX;
      delete options.repeatY;
      options.thickness = 10;
      options.flip = false;
      break;
    case CrossTypes.Greek:
      options.thickness = 15;
      break;
    case ComplexTypes.Star:
      options.rotation = 270;
      options.points = 5;
      break;
    case ComplexTypes.Crescent:
      options.rotation = 90;
      break;
  }

  return options;
};
