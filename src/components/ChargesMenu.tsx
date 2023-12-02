import React from 'react';
import { FlatList, View } from 'react-native';

import { ListItem, SectionHeading, Spinner, SpinnerTypes } from '@components';
import Actions from '@lib/actions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { Add, Edit, Paint } from '@res/icons';

export default ({ border, charges, dispatch }: OwnProps): JSX.Element => {
  const disableBorderColour = border.heightPercentage === 0;
  const renderHeader = () => (
    <>
      <SectionHeading title="Border" />
      <View>
        <Spinner
          label="Border Height (%)"
          value={border.heightPercentage}
          type={SpinnerTypes.Number}
          min={0}
          max={25}
          step={5}
          setValue={(payload: number) =>
            dispatch({ type: Actions.SET_BORDER_HP, payload })
          }
        />
        <ListItem
          title="Set Border Colour"
          icon={
            <Paint
              fill={disableBorderColour ? colours.disabledFg : border.colour}
              size={32}
            />
          }
          disabled={disableBorderColour}
          onPress={() => openModal(dispatch, ModalActions.SelectColourBorder)}
        />
      </View>

      <SectionHeading title="Charges" />
      <ListItem
        title="Add Charge"
        icon={<Add fill={colours.primaryBlue} size={32} />}
        onPress={() => openModal(dispatch, ModalActions.AddCharge)}
      />
    </>
  );

  return (
    <FlatList
      data={Object.values(charges)}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ListItem
          key={item.id}
          title={item.type}
          icon={<Edit fill={colours.primaryBlue} size={32} />}
          onPress={() =>
            dispatch({
              type: Actions.SELECT_CHARGE,
              payload: item.id,
            })
          }
        />
      )}
    />
  );
};

type OwnProps = {
  border: {
    colour: string;
    heightPercentage: number;
  };
  charges: { [key: string]: ChargeType };
  dispatch: (action: ReducerAction) => void;
};
