import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';

export default ({ title }: OwnProps): JSX.Element => (
  <View style={styles.sectionHeading}>
    <Text colour={colours.white}>{title}</Text>
  </View>
);

type OwnProps = {
  title: string;
};

const styles = StyleSheet.create({
  sectionHeading: {
    backgroundColor: colours.primaryBlue,
    padding: 10,
  },
});
