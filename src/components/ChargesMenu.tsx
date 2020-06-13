import React from 'react';
import { View } from 'react-native';

import { Button, SectionHeading, Spinner, Text } from '@components';
import Actions from '@lib/actions';
import { BorderHeightPercentages } from '@lib/proportions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

export default ({ border, dispatch }: OwnProps): JSX.Element => (
  <View>
    <SectionHeading title="Border" />
    <View>
      <Spinner
        label="Border Height (%)"
        value={border.heightPercentage}
        list={BorderHeightPercentages}
        setValue={(payload: number) =>
          dispatch({ type: Actions.SET_BORDER_HP, payload })
        }
      />
      <Button
        onPress={() =>
          dispatch({
            type: Actions.SET_MODAL_ACTION,
            payload: ModalActions.SelectColourBorder,
          })
        }>
        <Text colour={colours.white} H4>
          Set Colour
        </Text>
      </Button>
    </View>
  </View>
);

type OwnProps = {
  border: {
    colour: string;
    heightPercentage: number;
  };
  dispatch: (action: ReducerAction) => void;
};
