import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SectionHeading } from '@components';
import { Actions, ReducerAction } from '@lib/state';
import colours, { gnomePalette } from '@res/colours';
import { Add, Clear } from '@res/icons';

const ColourSwatch = ({
  colour,
  add = false,
  onPress,
}: SwatchProps): JSX.Element => (
  <View style={styles.swatchContainer} accessibilityHint="colourSwatch">
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

export default ({ selectedColours, dispatch }: OwnProps): JSX.Element => (
  <ScrollView>
    <SectionHeading title="Selected Colours" />
    <View style={styles.selector}>
      {selectedColours.map((colour, i) => (
        <ColourSwatch
          key={i}
          colour={colour}
          onPress={() => dispatch({ type: Actions.REMOVE_COLOUR, payload: i })}
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
          onPress={() =>
            dispatch({ type: Actions.ADD_COLOUR, payload: colour })
          }
        />
      ))}
    </View>
  </ScrollView>
);

type OwnProps = {
  selectedColours: string[];
  dispatch: (action: ReducerAction) => void;
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
