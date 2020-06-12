import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Row, Text } from '@components';
import { Left, Right } from '@res/icons';
import colours from '@res/colours';

export default ({
  colour = colours.primaryBlue,
  value,
  label,
  list,
  setValue,
}: OwnProps): JSX.Element => {
  const nextValue = (minValue: number, maxValue: number, value: number) => {
    if (value < minValue) return maxValue;
    if (value > maxValue) return minValue;
    return value;
  };

  return (
    <Row>
      <View style={styles.control}>
        <Text H4 colour={colour}>
          Border Width
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setValue(nextValue(0, list.length - 1, value - 1))}>
        <View style={[styles.control, styles.controlButton]}>
          <Left fill={colours.white} />
        </View>
      </TouchableOpacity>
      <View style={styles.control}>
        <Text H4 colour={colour}>
          {String(list[value])}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setValue(nextValue(0, list.length - 1, value + 1))}>
        <View style={[styles.control, styles.controlButton]}>
          <Right fill={colours.white} />
        </View>
      </TouchableOpacity>
    </Row>
  );
};

type OwnProps = {
  value: number;
  label: string;
  colour: string;
  list: string[] | number[];
  setValue: (value: number) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
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
