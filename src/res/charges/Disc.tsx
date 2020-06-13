import React from 'react';
import { Circle } from 'react-native-svg';

export default (
  x: number,
  y: number,
  radius: number,
  colour: string,
): JSX.Element => <Circle cx={x} cy={y} r={radius} fill={colour} />;
