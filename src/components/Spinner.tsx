import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Row, Text } from '@components';
import { Left, Right } from '@res/icons';
import colours from '@res/colours';

export default ({
  colour = colours.primaryBlue,
  label = '',
  list,
  value,
  setValue,
}: OwnProps): JSX.Element => {
  const nextValue = (pickedValue: number) => {
    if (pickedValue < 0) return list.length - 1;
    if (pickedValue > list.length - 1) return 0;
    return pickedValue;
  };

  return (
    <View style={styles.container}>
      <Row>
        <View style={styles.item}>
          <Button onPress={() => setValue(nextValue(value - 1))} padded={false}>
            <Left fill={colours.white} size={32} />
          </Button>
        </View>
        <View style={styles.item}>
          <Text colour={colour}>{label}</Text>
          <View style={styles.value}>
            <Text colour={colour} H3>
              {String(list[value])}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Button onPress={() => setValue(nextValue(value + 1))} padded={false}>
            <Right fill={colours.white} size={32} />
          </Button>
        </View>
      </Row>
    </View>
  );
};

type OwnProps = {
  colour?: string;
  label?: string;
  list: string[] | number[];
  value: number;
  setValue: (value: number) => void;
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  item: {
    padding: 10,
    alignItems: 'center',
  },
  value: {
    height: 30,
    justifyContent: 'center',
  },
});
