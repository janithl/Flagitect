import React from 'react';
import { StyleSheet, View } from 'react-native';
import colours from '@res/colours';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <View
    style={[
      styles.container,
      {
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: fill,
      },
    ]}
  />
);

type OwnProps = {
  fill: string;
  size?: number;
};

const styles = StyleSheet.create({
  container: {
    borderColor: colours.grey,
    borderWidth: 1,
  },
});
