import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Text, Row } from '@components';
import colours from '@res/colours';

export const FooterButton = ({ title, value, onPress }: FooterButtonProps) => (
  <TouchableOpacity style={styles.footerButton} onPress={onPress}>
    <Text colour={colours.white}>{title}</Text>
    <Text colour={colours.white} H3>
      {value}
    </Text>
  </TouchableOpacity>
);

type FooterButtonProps = {
  title: string;
  value: string;
  onPress?: () => void;
};

export default ({ children }: OwnProps): JSX.Element => (
  <View style={styles.footer}>
    <Row>{children}</Row>
  </View>
);

type OwnProps = {
  children: JSX.Element | JSX.Element[];
};

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: colours.primaryBlue,
  },
  footerButton: {
    padding: 20,
    alignItems: 'center',
  },
});
