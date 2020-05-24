import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '@components/Text';
import NumberSpinner from '@components/NumberSpinner';
import { Solid } from '@res/layouts';
import colours from '@res/colours';

export default (): JSX.Element => {
  const [height, setHeight] = useState(2);
  const [width, setWidth] = useState(3);

  return (
    <View style={styles.container}>
      <Solid
        size={256}
        ratio={height / width}
        divColours={[colours.primaryBlue]}
      />
      <Text H2>{`${height} : ${width}`}</Text>

      <NumberSpinner
        value={height}
        setValue={(value: number) => setHeight(value)}
        min={1}
        max={100}
      />

      <NumberSpinner
        value={width}
        setValue={(value: number) => setWidth(value)}
        min={1}
        max={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    margin: 10,
    alignItems: 'center',
  },
  slider: {
    width: 150,
    height: 50,
  },
});
