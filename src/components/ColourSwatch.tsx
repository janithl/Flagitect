import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import colours from '@res/colours';

export default ({ colour, onPress }: OwnProps): JSX.Element => {
  const [border, setBorder] = useState(5);
  return (
    <View style={styles.swatchContainer} accessibilityHint="colourSwatch">
      <TouchableWithoutFeedback
        hitSlop={{ bottom: 5, left: 5, right: 5, top: 10 }}
        onPress={onPress}
        onPressIn={() => setBorder(1)}
        onPressOut={() => setBorder(5)}>
        <View
          style={[
            styles.swatch,
            {
              backgroundColor: colour,
              marginTop: 6 - border,
              borderBottomWidth: border,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

type OwnProps = {
  colour: string;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  swatch: {
    height: 48,
    width: 48,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colours.primaryBlue,
  },
  swatchButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colours.white,
  },
  swatchContainer: {
    flex: 1,
    height: 54,
    alignItems: 'center',
  },
});
