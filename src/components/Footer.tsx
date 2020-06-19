import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, Row } from '@components';
import { ProportionsList } from '@lib/proportions';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { DivisionList } from '@res/divisions';

export const FooterButton = ({
  title,
  value,
  short = true,
  onPress,
}: FooterButtonProps): JSX.Element => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Text colour={colours.white}>{title}</Text>
    <View style={styles.footerValue}>
      <Text colour={colours.white} H3={short} H5={!short} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
);

type FooterButtonProps = {
  title: string;
  value: string;
  short?: boolean;
  onPress?: () => void;
};

export default ({
  flag: { division, proportion, selectedColours },
  charges,
  dispatch,
}: OwnProps): JSX.Element => {
  return (
    <View style={styles.footer}>
      <Row>
        <FooterButton
          title="Division"
          value={DivisionList[division]}
          short={false}
          onPress={() => dispatch({ type: Actions.INCREMENT_DIVISION })}
        />
        <FooterButton
          title="Proportion"
          value={ProportionsList[proportion].name}
          onPress={() => dispatch({ type: Actions.INCREMENT_PROPORTION })}
        />
        <FooterButton
          title="Colours"
          value={String(selectedColours.length)}
          onPress={() => openModal(dispatch, ModalActions.EditColours)}
        />
        <FooterButton
          title="Charges"
          value={String(Object.keys(charges).length)}
          onPress={() => openModal(dispatch, ModalActions.ChargesList)}
        />
      </Row>
    </View>
  );
};

type OwnProps = {
  flag: {
    division: number;
    proportion: number;
    selectedColours: string[];
  };
  charges: {
    [key: string]: ChargeType;
  };
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'stretch',
    height: Platform.OS === 'android' ? 60 : 80,
    backgroundColor: colours.primaryBlue,
  },
  footerButton: {
    padding: 10,
    alignItems: 'center',
  },
  footerValue: {
    height: 30,
    justifyContent: 'center',
  },
});
