import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colours from '@res/colours';

export default ({ children = [], onPress }: OwnProps): JSX.Element => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    {children}
  </TouchableOpacity>
);

type OwnProps = {
  children?: JSX.Element[] | JSX.Element;
  onPress: () => void;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colours.primaryBlue,
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
});
