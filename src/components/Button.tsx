import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import colours from '@res/colours';

export default ({
  children = [],
  padded = true,
  height = 36,
  width,
  onPress,
}: OwnProps): JSX.Element => {
  const [border, setBorder] = useState(5);
  const margin = padded ? 20 : 6;
  return (
    <TouchableWithoutFeedback
      hitSlop={{ bottom: 5, left: 5, right: 5, top: 10 }}
      onPress={onPress}
      onPressIn={() => setBorder(1)}
      onPressOut={() => setBorder(5)}>
      <View
        style={[
          styles.button,
          padded ? styles.buttonPadded : null,
          {
            height,
            width,
            marginTop: margin - border,
            borderBottomWidth: border,
          },
        ]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

type OwnProps = {
  children?: JSX.Element[] | JSX.Element;
  padded?: boolean;
  height?: number;
  width?: number;
  onPress: () => void;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    backgroundColor: colours.secondaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.primaryBlue,
  },
  buttonPadded: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
