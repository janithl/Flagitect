import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Row from '@components/Row';
import Option from '@components/Option';
import { ScreenConstants } from '@screens';
import { Solid } from '@res/layouts';
import colours from '@res/colours';

type Propotions = {
  id: string;
  height: number;
  width: number;
};

const propotions: Propotions[][] = [
  [
    {
      id: '1_1',
      height: 1,
      width: 1,
    },
    {
      id: '3_4',
      height: 3,
      width: 4,
    },
    {
      id: '8_11',
      height: 8,
      width: 11,
    },
  ],
  [
    {
      id: '7_10',
      height: 7,
      width: 10,
    },
    {
      id: '2_3',
      height: 2,
      width: 3,
    },
    {
      id: '5_8',
      height: 5,
      width: 8,
    },
  ],
  [
    {
      id: '3_5',
      height: 3,
      width: 5,
    },
    {
      id: '10_19',
      height: 10,
      width: 19,
    },
    {
      id: '1_2',
      height: 1,
      width: 2,
    },
  ],
];

const selectDivision = (id: string) => Alert.alert(id);

export default ({ navigation }): JSX.Element => (
  <View style={styles.container}>
    {propotions.map((row, index) => (
      <Row key={`row-${index}`}>
        {row.map((propotion: Propotions) => (
          <Option
            id={propotion.id}
            key={`option-${propotion.id}`}
            name={`${propotion.height} : ${propotion.width}`}
            onPress={selectDivision}>
            <Solid
              size={64}
              ratio={propotion.height / propotion.width}
              divColours={[colours.primaryBlue]}
            />
          </Option>
        ))}
      </Row>
    ))}
    <Row>
      <Option
        id={'custom'}
        name={'Custom'}
        onPress={() =>
          navigation.navigate(ScreenConstants.SET_CUSTOM_PROPOTIONS)
        }>
        <Solid size={64} ratio={11 / 28} divColours={[colours.primaryBlue]} />
      </Option>
    </Row>
    <Row />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
