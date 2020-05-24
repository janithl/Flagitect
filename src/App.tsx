import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import colours from '@res/colours';
import {
  Vertical,
  Horizontal,
  Diagonal,
  PerSaltire,
  Checked,
} from '@res/layouts';

export default (): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Hello World!</Text>
    <Vertical size={256} />
    <Horizontal size={256} />
    <PerSaltire size={256} />
    <Checked size={128} />
    <Diagonal size={128} />
    <Diagonal
      size={128}
      toLeft={false}
      divColours={[colours.beige, colours.salmon]}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  heading: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 36,
    color: colours.salmon,
  },
});
