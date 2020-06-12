import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { ColourSwatch } from '@components';
import Actions from '@lib/actions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { gnomePalette } from '@res/colours';

export default ({ selectAction, dispatch }: OwnProps): JSX.Element => {
  const onSelect = (payload: string) => {
    if (selectAction === ModalActions.SelectColourBorder) {
      dispatch({
        type: Actions.SET_BORDER_COLOUR,
        payload,
      });
      dispatch({ type: Actions.DISMISS_MODAL });
    } else if (selectAction === ModalActions.SelectColourDivision) {
      dispatch({
        type: Actions.ADD_COLOUR,
        payload,
      });
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
