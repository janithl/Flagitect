import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ColourSwatch } from '@components';
import Actions from '@lib/actions';
import { ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { gnomePalette } from '@res/colours';

export default ({
  selectAction,
  selectedCharge,
  dispatch,
}: OwnProps): JSX.Element => {
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
      data={gnomePalette}
      renderItem={({ item }) => (
        <ColourSwatch colour={item} add={true} onPress={() => onSelect(item)} />
      )}
      keyExtractor={(item) => item}
      numColumns={5}
      columnWrapperStyle={styles.columnStyle}
      ListFooterComponent={<View style={styles.footer} />}
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
