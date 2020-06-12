import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colours from '@res/colours';
import { Add, Clear } from '@res/icons';

export default ({ colour, add = false, onPress }: OwnProps): JSX.Element => (
  <View style={styles.swatchContainer} accessibilityHint="colourSwatch">
    <View style={[styles.swatch, { backgroundColor: colour }]} />
    <TouchableOpacity
      style={[
        styles.swatchButton,
        { backgroundColor: add ? colours.secondaryBlue : colours.salmon },
      ]}
      onPress={onPress}>
      {add ? <Add fill={colours.white} /> : <Clear fill={colours.white} />}
    </TouchableOpacity>
  </View>
);

type OwnProps = {
  colour: string;
  add?: boolean;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  swatch: {
    height: 48,
    width: 48,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colours.white,
  },
  swatchContainer: {
    padding: 7,
  },
});
