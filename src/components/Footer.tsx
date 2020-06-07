import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text, Row } from '@components';
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
    paddingHorizontal: 5,
    paddingVertical: 20,
    alignItems: 'center',
  },
});
