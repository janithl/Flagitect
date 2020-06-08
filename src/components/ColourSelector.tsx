import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SectionHeading } from '@components';
import colours, { gnomePalette } from '@res/colours';
import { Add, Clear } from '@res/icons';

const minimumColours = 2;

const ColourSwatch = ({
  colour,
  add = false,
  onPress,
}: SwatchProps): JSX.Element => (
  <View style={styles.swatchContainer}>
    <View style={[styles.swatch, { backgroundColor: colour }]} />
    <TouchableOpacity
      style={[
        styles.swatchButton,
        { backgroundColor: add ? colours.secondaryBlue : colours.salmon },
      ]}
      onPress={onPress}>
      {add ? <Add fill={colours.white} /> : <Clear fill={colours.white} />}
    </TouchableOpacity>
  </View>
);

type SwatchProps = {
  colour: string;
  add?: boolean;
  onPress?: () => void;
};

export default ({ coloursSelected, selectColours }: OwnProps): JSX.Element => {
  const removeColour = (i: number) => {
    if (coloursSelected.length > minimumColours) {
      const newColours = [...coloursSelected];
      newColours.splice(i, 1);
      selectColours(newColours);
    }
  };

  const addColour = (colour: string) => {
    selectColours([...coloursSelected, colour]);
  };

  return (
    <ScrollView>
      <SectionHeading title="Selected Colours" />
      <View style={styles.selector}>
        {coloursSelected.map((colour, i) => (
          <ColourSwatch
            key={i}
            colour={colour}
            onPress={() => removeColour(i)}
          />
        ))}
      </View>
      <SectionHeading title="Palette" />
      <View style={styles.selector}>
        {gnomePalette.map((colour, i) => (
          <ColourSwatch
            key={i}
            colour={colour}
            add={true}
            onPress={() => addColour(colour)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

type OwnProps = {
  coloursSelected: string[];
  selectColours: (colours: string[]) => void;
};

const styles = StyleSheet.create({
  swatch: {
    height: 48,
    width: 48,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
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
    padding: 7,
  },
  selector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});
