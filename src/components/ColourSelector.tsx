import React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';

import { Button, ColourSwatch, Text } from '@components';
import Actions from '@lib/actions';
import { ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

export default ({ selectedColours, dispatch }: OwnProps): JSX.Element => {
  const onRemove = (payload: number) =>
    dispatch({ type: Actions.REMOVE_COLOUR, payload });

  const onEdit = (payload: number) => {
    dispatch({ type: Actions.UPDATE_COLOUR, payload });
    openModal(dispatch, ModalActions.ChangeColourDivision);
  };

  const onAdd = () => {
    dispatch({ type: Actions.UPDATE_COLOUR, payload: null });
    openModal(dispatch, ModalActions.SelectColourDivision);
  };

  const colourAlert = (index: number) =>
    Alert.alert(
      'Change Colour',
      'What would you like to do?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
        },
        {
          text: 'Remove',
          onPress: () => onRemove(index),
          style: 'cancel',
        },
        { text: 'Change', onPress: () => onEdit(index) },
      ],
      { cancelable: false },
    );

  return (
    <FlatList
      data={selectedColours}
      renderItem={({ item, index }) => (
        <ColourSwatch colour={item} onPress={() => colourAlert(index)} />
      )}
      keyExtractor={(item) => item}
      numColumns={5}
      columnWrapperStyle={styles.columnStyle}
      ListFooterComponent={
        <Button onPress={onAdd} height={48}>
          <Text colour={colours.white} H4>
            Add Colours
          </Text>
        </Button>
      }
    />
  );
};

type OwnProps = {
  selectedColours: string[];
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  columnStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
