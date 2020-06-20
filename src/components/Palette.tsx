import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ColourSwatch, Spinner, SpinnerTypes } from '@components';
import Actions from '@lib/actions';
import { ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { gnomePalette } from '@res/colours';

enum PaletteTypes {
  Gnome = 'Gnome',
  Custom = 'Custom',
}

const k = (n, H) => (n + H / 60) % 6;
const f = (n, H, S, V) =>
  V - V * S * Math.max(0, Math.min(1, Math.min(k(n, H), 4 - k(n, H))));
const comp = (rgb) =>
  Math.round(255 * rgb)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
const rgb = (H, S, V) =>
  ['#', comp(f(5, H, S, V)), comp(f(3, H, S, V)), comp(f(1, H, S, V))].join('');
const valIncrements = [0.28, 0.46, 0.64, 0.82, 1];
const satIncrements = [1, 0.8, 0.6, 0.4, 0.2, 0];

const getPalette = (hue: number) => {
  const palette: string[] = [];
  satIncrements.forEach((s: number) => {
    valIncrements.forEach((v: number) => {
      palette.push(rgb(hue, s, v));
    });
  });
  return palette;
};

export default ({
  selectAction,
  selectedCharge,
  dispatch,
}: OwnProps): JSX.Element => {
  const [palette, setPalette] = useState(0);
  const [hue, setHue] = useState(180);

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

  return (
    <FlatList
      data={palette === 0 ? gnomePalette : getPalette(hue)}
      renderItem={({ item }) => (
        <ColourSwatch colour={item} onPress={() => onSelect(item)} />
      )}
      keyExtractor={(item) => item}
      numColumns={5}
      columnWrapperStyle={styles.columnStyle}
      ListFooterComponent={<View style={styles.footer} />}
      ListHeaderComponent={
        <>
          <Spinner
            type={SpinnerTypes.List}
            label={'Palette'}
            list={[PaletteTypes.Gnome, PaletteTypes.Custom]}
            value={palette}
            setValue={setPalette}
          />
          {palette === 1 && (
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
      }
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
