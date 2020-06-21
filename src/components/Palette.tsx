import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ColourSwatch, Spinner, SpinnerTypes } from '@components';
import Actions from '@lib/actions';
import { ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { HSVtoRGB } from '@lib/utils';
import { gnomePalette } from '@res/colours';

enum PaletteTypes {
  Gnome = 'Gnome',
  Custom = 'Custom',
}
const PaletteTypeList = [PaletteTypes.Gnome, PaletteTypes.Custom];

/** create palette based on hue selected */
const getPalette = (hue: number) => {
  const palette: string[] = [];
  for (let sat = 1; sat >= 0; sat -= 0.2) {
    for (let val = 0.28; val <= 1; val += 0.16) {
      palette.push(HSVtoRGB(hue, sat, val));
    }
  }
  return palette;
};

export default ({
  selectAction,
  selectedCharge,
  dispatch,
}: OwnProps): JSX.Element => {
  const [palette, setPalette] = useState(0);
  const [hue, setHue] = useState(180);
  const paletteType = PaletteTypeList[palette];

  const onSelect = (payload: string) => {
    switch (selectAction) {
      case ModalActions.SelectColourBorder:
        dispatch({
          type: Actions.SET_BORDER_COLOUR,
          payload,
        });
        openModal(dispatch, ModalActions.ChargesList);
        break;
      case ModalActions.SelectColourCharge:
        dispatch({
          type: Actions.UPDATE_CHARGE,
          payload: {
            id: selectedCharge,
            colour: payload,
          },
        });
        openModal(dispatch, ModalActions.EditCharge);
        break;
      case ModalActions.SelectColourDivision:
        dispatch({
          type: Actions.ADD_COLOUR,
          payload,
        });
        break;
    }
  };

  const paletteSelector = () => (
    <>
      <Spinner
        type={SpinnerTypes.List}
        label={'Palette'}
        list={PaletteTypeList}
        value={palette}
        setValue={setPalette}
      />
      {paletteType === PaletteTypes.Custom && (
        <Spinner
          type={SpinnerTypes.Number}
          label={'Hue'}
          value={hue}
          setValue={(value: number) => setHue(value % 360)}
          step={15}
          min={0}
          max={360}
        />
      )}
    </>
  );

  return (
    <FlatList
      data={
        paletteType === PaletteTypes.Custom ? getPalette(hue) : gnomePalette
      }
      renderItem={({ item }) => (
        <ColourSwatch colour={item} onPress={() => onSelect(item)} />
      )}
      keyExtractor={(item) => item}
      numColumns={5}
      columnWrapperStyle={styles.columnStyle}
      ListFooterComponent={<View style={styles.footer} />}
      ListHeaderComponent={paletteSelector}
    />
  );
};

type OwnProps = {
  selectAction: ModalActions;
  selectedCharge: string;
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  footer: {
    height: 100,
  },
});
