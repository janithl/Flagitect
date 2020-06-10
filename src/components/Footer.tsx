import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, Row } from '@components';
import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import { Actions, ModalActions, ReducerAction } from '@lib/state';
import colours from '@res/colours';

export const FooterButton = ({
  title,
  value,
  onPress,
}: FooterButtonProps): JSX.Element => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Text colour={colours.white}>{title}</Text>
    <Text colour={colours.white} H4>
      {value}
    </Text>
  </TouchableOpacity>
);

type FooterButtonProps = {
  title: string;
  value: string;
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
    height: Platform.OS === 'android' ? 70 : 100,
    backgroundColor: colours.primaryBlue,
  },
  footerButton: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    alignItems: 'center',
  },
});
