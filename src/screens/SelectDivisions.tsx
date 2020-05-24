import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Row from '@components/Row';
import Option from '@components/Option';
import { ScreenConstants } from '@screens';
import {
  Solid,
  Vertical,
  Horizontal,
  Diagonal,
  PerSaltire,
  Checked,
} from '@res/layouts';

type Division = {
  id: string;
  label: string;
  icon: JSX.Element;
};

const divisions: Division[][] = [
  [
    {
      id: 'solid',
      label: 'Solid',
      icon: <Solid size={64} />,
    },
    {
      id: 'vertical',
      label: 'Vertically',
      icon: <Vertical size={64} />,
    },
    {
      id: 'horizontal',
      label: 'Horizontally',
      icon: <Horizontal size={64} />,
    },
  ],
  [
    {
      id: 'diagonal',
      label: 'Diagonally',
      icon: <Diagonal toLeft={false} size={64} />,
    },
    {
      id: 'diagonal_to_left',
      label: 'Diagonally to left',
      icon: <Diagonal size={64} />,
    },
    {
      id: 'per_saltire',
      label: 'Per Saltire',
      icon: <PerSaltire size={64} />,
    },
  ],
  [
    {
      id: 'checked',
      label: 'Checky',
      icon: <Checked size={64} />,
    },
  ],
];

export default ({ navigation }): JSX.Element => {
  const selectDivision = (id: string) =>
    navigation.navigate(ScreenConstants.SET_PROPOTIONS, { id });

  return (
    <View style={styles.container}>
      {divisions.map((row, index) => (
        <Row key={`row-${index}`}>
          {row.map((division: Division) => (
            <Option
              id={division.id}
              key={`option-${division.id}`}
              name={division.label}
              onPress={selectDivision}>
              {division.icon}
            </Option>
          ))}
        </Row>
      ))}
      <Row />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
