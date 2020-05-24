import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '@components/Text';
import colours from '@res/colours';

export default ({ value, min, max, setValue }: OwnProps): JSX.Element => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => setValue(Math.max(min, value - 1))}>
      <View style={[styles.control, styles.controlButton]}>
        <Text H4>-</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.control}>
      <Text H4>{String(value)}</Text>
    </View>
    <TouchableOpacity onPress={() => setValue(Math.min(max, value + 1))}>
      <View style={[styles.control, styles.controlButton]}>
        <Text H4>+</Text>
      </View>
    </TouchableOpacity>
  </View>
);

type OwnProps = {
  value: number;
  min: number;
  max: number;
  setValue: (value: number) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  control: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: colours.beige,
  },
});
