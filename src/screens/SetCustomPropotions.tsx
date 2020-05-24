import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';

import Text from '@components/Text';
import { Solid } from '@res/layouts';
import colours from '@res/colours';

export default ({ navigation }): JSX.Element => {
  const [height, setHeight] = useState(11);
  const [width, setWidth] = useState(28);

  return (
    <View style={styles.container}>
      <Solid
        size={256}
        ratio={height / width}
        divColours={[colours.primaryBlue]}
      />
      <Text H2>{`${height} : ${width}`}</Text>
      <View>
        <View style={styles.label}>
          <Text H4>Height</Text>
        </View>
        <Slider
          value={height}
          onValueChange={(value) => setHeight(value)}
          minimumValue={1}
          maximumValue={100}
          step={1}
          style={styles.slider}
        />
      </View>
      <View>
        <View style={styles.label}>
          <Text H4>Width</Text>
        </View>
        <Slider
          value={width}
          onValueChange={(value) => setWidth(value)}
          minimumValue={1}
          maximumValue={100}
          step={1}
          style={styles.slider}
        />
      </View>
      <Button onPress={() => navigation.goBack()} title="SET PROPOTION" />
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
