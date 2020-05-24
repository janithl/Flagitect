import React from 'react';
import { View, StyleSheet } from 'react-native';

import colours from '@res/colours';

export default (): JSX.Element => <View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colours.primaryBlue,
  },
});
