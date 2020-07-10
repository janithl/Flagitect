import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Button, Text } from '@components';
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
  StripedTypes,
} from '@res/charges/index';
import colours, { getRandomColour } from '@res/colours';

const ChargeItem = ({ title, onPress }: ChargeItemProps) => (
  <View style={styles.chargeItem}>
    <Button onPress={onPress} height={100} width={100}>
      <Text colour={colours.white} textAlign="center" H4>
        {title}
      </Text>
    </Button>
  </View>
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
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
});

const getChargeOptions = (charge: Charges) => {
  const options: Partial<ChargeType> = {
    type: charge,
    colour: getRandomColour(),
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
      options.thickness = 20;
      break;
    case BendTypes.Bend:
    case BendTypes.Enhanced:
    case BendTypes.Reduced:
      delete options.percentage;
      delete options.repeatX;
      delete options.repeatY;
      options.thickness = 20;
      options.flip = false;
      break;
    case CrossTypes.Greek:
      options.thickness = 30;
      break;
    case ComplexTypes.Star:
    case ComplexTypes.Flower:
      options.rotation = 180;
      options.points = 5;
      options.thickness = 40;
      break;
    case ComplexTypes.Crescent:
      options.rotation = 90;
      options.thickness = 30;
      break;
    case ComplexTypes.Pall:
      delete options.percentage;
      delete options.repeatX;
      delete options.repeatY;
      options.thickness = 30;
      break;
    case StripedTypes.Serrated:
    case StripedTypes.Wavy:
      delete options.percentage;
      options.thickness = 30;
      options.repeatX = 10;
      options.repeatY = 8;
      break;
    case ComplexTypes.Shield:
      delete options.repeatX;
      delete options.repeatY;
      options.thickness = 30;
      break;
  }

  return options;
};
