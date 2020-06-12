import React from 'react';
import { FlatList } from 'react-native';

import { Button, ColourSwatch, Text } from '@components';
import Actions from '@lib/actions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

export default ({ selectedColours, dispatch }: OwnProps): JSX.Element => {
  const onRemove = (payload: number) =>
    dispatch({ type: Actions.REMOVE_COLOUR, payload });

  const addColours = () =>
    dispatch({
      type: Actions.SET_MODAL_ACTION,
      payload: ModalActions.SelectColourDivision,
    });

  return (
    <FlatList
      data={selectedColours}
      renderItem={({ item, index }) => (
        <ColourSwatch colour={item} onPress={() => onRemove(index)} />
      )}
      keyExtractor={(item) => item}
      numColumns={5}
      ListFooterComponent={
        <Button onPress={addColours}>
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
