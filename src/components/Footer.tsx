import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, Row } from '@components';
import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import Actions from '@lib/actions';
import { ModalActions, ReducerAction } from '@lib/state';
import colours from '@res/colours';

export const FooterButton = ({
  title,
  value,
  short = true,
  onPress,
}: FooterButtonProps): JSX.Element => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Text colour={colours.white}>{title}</Text>
    <View style={styles.footerValue}>
      <Text colour={colours.white} H3={short} H5={!short}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
);

type FooterButtonProps = {
  title: string;
  value: string;
  short: boolean;
  onPress?: () => void;
};

export default ({
  division,
  proportion,
  selectedColours,
  dispatch,
}: OwnProps): JSX.Element => (
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
        onPress={() =>
          dispatch({
            type: Actions.SET_MODAL_ACTION,
            payload: ModalActions.EditColours,
          })
        }
      />
      <FooterButton
        title="Charges"
        value="5"
        onPress={() => dispatch({ type: Actions.INCREMENT_PROPORTION })}
      />
    </Row>
  </View>
);

type OwnProps = {
  division: number;
  proportion: number;
  selectedColours: string[];
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'stretch',
    height: Platform.OS === 'android' ? 50 : 80,
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
