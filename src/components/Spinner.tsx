import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Row, Text } from '@components';
import { Add, Left, Remove, Right } from '@res/icons';
import colours from '@res/colours';

export enum SpinnerTypes {
  Number = 'Number',
  List = 'List',
}

export default ({ type, value, setValue, ...props }: OwnProps): JSX.Element => {
  const nextValue = (pickedValue: number) => {
    if (type === SpinnerTypes.Number) {
      if (pickedValue < props?.min) return props?.min;
      if (pickedValue > props?.max) return props?.max;
      return pickedValue;
    } else {
      if (pickedValue < 0) return props?.list?.length - 1;
      if (pickedValue > props?.list?.length - 1) return 0;
      return pickedValue;
    }
  };

  const step = props?.step || 1;
  return (
    <View style={styles.container}>
      <Row>
        <View style={styles.item}>
          <Button
            onPress={() => setValue(nextValue(value - step))}
            padded={false}>
            {type === SpinnerTypes.Number ? (
              <Remove fill={colours.white} size={32} />
            ) : (
              <Left fill={colours.white} size={32} />
            )}
          </Button>
        </View>
        <View style={styles.item}>
          <Text colour={props.colour}>{props.label}</Text>
          <View style={styles.value}>
            <Text colour={props.colour} H3>
              {props?.list ? String(props?.list[value]) : String(value)}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Button
            onPress={() => setValue(nextValue(value + step))}
            padded={false}>
            {type === SpinnerTypes.Number ? (
              <Add fill={colours.white} size={32} />
            ) : (
              <Right fill={colours.white} size={32} />
            )}
          </Button>
        </View>
      </Row>
    </View>
  );
};

type OwnProps =
  | {
      type: SpinnerTypes.List;
      list: string[] | number[];
      value: number;
      setValue: (value: number) => void;
      colour?: string;
      label?: string;
    }
  | {
      type: SpinnerTypes.Number;
      value: number;
      setValue: (value: number) => void;
      step?: number;
      min?: number;
      max?: number;
      colour?: string;
      label?: string;
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
