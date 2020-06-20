import React from 'react';
import { Rect } from 'react-native-svg';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => (
  <Rect x="0" y="0" height={height} width={width} fill={divColours[0]} />
);
