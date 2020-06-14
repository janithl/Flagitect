import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
): JSX.Element => {
  percentage /= 100;
  const sizeX = Math.round(width * percentage);
  const sizeY = Math.round(height * percentage);
  const midpointX = Math.round(width / 2);
  const midpointY = Math.round(height / 2);
  const startX = midpointX - Math.round(sizeX / 2);
  const startY = midpointY - Math.round(sizeY / 2);
  const points = [
    coord(startX, midpointY),
    coord(midpointX, startY),
    coord(startX + sizeX, midpointY),
    coord(midpointX, startY + sizeY),
  ];
  return <Polygon points={points.join(' ')} fill={colour} />;
};
