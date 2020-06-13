import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colours from '@res/colours';

export default ({
  children = [],
  padded = true,
  onPress,
}: OwnProps): JSX.Element => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, padded ? styles.buttonPadded : null]}>
    {children}
  </TouchableOpacity>
);

type OwnProps = {
  children?: JSX.Element[] | JSX.Element;
  padded?: boolean;
  onPress: () => void;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primaryBlue,
    height: 40,
    minWidth: 40,
    borderRadius: 10,
  },
  buttonPadded: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
