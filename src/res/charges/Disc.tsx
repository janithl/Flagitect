import React from 'react';
import { Circle } from 'react-native-svg';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
): JSX.Element => (
  <Circle
    cx={width / 2}
    cy={height / 2}
    r={(height * percentage) / 200}
    fill={colour}
  />
);
