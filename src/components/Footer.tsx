import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';
import { Left, Right } from '@res/icons';

export default (): JSX.Element => (
  <View style={styles.footer}>
    <SafeAreaView>
      <Left fill={colours.white} />
      <Text colour={colours.white}>Division</Text>
      <Text colour={colours.white}>Proportion</Text>
      <Text colour={colours.white}>Colours</Text>
      <Right fill={colours.white} />
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'stretch',
    height: 100,
    backgroundColor: colours.primaryBlue,
  },
});
