import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';
import { Add, Clear } from '@res/icons';

const minimumColours = 2;

const ColourSwatch = ({
  colour,
  add = false,
  onPress,
}: SwatchProps): JSX.Element => (
  <TouchableOpacity
    style={[styles.swatch, { backgroundColor: colour }]}
    onPress={onPress}>
    {add ? (
      <Add fill={colours.white} size={32} />
    ) : (
      <Clear fill={colours.white} size={32} />
    )}
  </TouchableOpacity>
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

  const renderSectionHeading = (title: string) => (
    <View style={styles.sectionHeading}>
      <Text colour={colours.white}>{title}</Text>
    </View>
  );

  return (
    <ScrollView>
      {renderSectionHeading('Selected Colours')}
      <View style={styles.selector}>
        {coloursSelected.map((colour, i) => (
          <ColourSwatch
            key={i}
            colour={colour}
            onPress={() => removeColour(i)}
          />
        ))}
      </View>
      {renderSectionHeading('Palette')}
      <View style={styles.selector}>
        {Object.values(colours).map((colour, i) => (
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
  sectionHeading: {
    backgroundColor: colours.primaryBlue,
    padding: 10,
  },
  swatch: {
    height: 48,
    width: 48,
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
    margin: 7,
    alignItems: 'center',
    alignContent: 'center',
  },
  selector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});
