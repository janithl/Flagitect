import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '@components/Text';
import { Left, Right } from '@res/icons';
import colours from '@res/colours';

export default ({ value, list, setValue }: OwnProps): JSX.Element => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => setValue(value - 1 < 0 ? list.length - 1 : value - 1)}>
      <View style={[styles.control, styles.controlButton]}>
        <Left fill={colours.white} />
      </View>
    </TouchableOpacity>
    <View style={styles.control}>
      <Text H4>{list[value]}</Text>
    </View>
    <TouchableOpacity
      onPress={() => setValue(value + 1 >= list.length ? 0 : value + 1)}>
      <View style={[styles.control, styles.controlButton]}>
        <Right fill={colours.white} />
      </View>
    </TouchableOpacity>
  </View>
);

type OwnProps = {
  value: number;
  list: string[];
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
    width: 120,
    height: 36,
    padding: 6,
    borderRadius: 18,
  },
  controlButton: {
    width: 36,
    backgroundColor: colours.primaryBlue,
  },
});
