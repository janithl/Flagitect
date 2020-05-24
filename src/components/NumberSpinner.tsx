import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '@components/Text';
import { Add, Remove } from '@res/icons';
import colours from '@res/colours';

export default ({ value, min, max, setValue }: OwnProps): JSX.Element => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => setValue(Math.max(min, value - 1))}>
      <View style={[styles.control, styles.controlButton]}>
        <Remove fill={colours.white} />
      </View>
    </TouchableOpacity>
    <View style={styles.control}>
      <Text H4>{String(value)}</Text>
    </View>
    <TouchableOpacity onPress={() => setValue(Math.min(max, value + 1))}>
      <View style={[styles.control, styles.controlButton]}>
        <Add fill={colours.white} />
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
    alignItems: 'center',
    width: 36,
    height: 36,
    padding: 6,
    borderRadius: 18,
  },
  controlButton: {
    backgroundColor: colours.primaryBlue,
  },
});
