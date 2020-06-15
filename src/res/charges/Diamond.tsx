import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
): JSX.Element => {
  percentage /= 100;
  const sizeX = toDP(width * percentage);
  const sizeY = toDP(height * percentage);
  const midpointX = toDP(width / 2);
  const midpointY = toDP(height / 2);
  const startX = midpointX - toDP(sizeX / 2);
  const startY = midpointY - toDP(sizeY / 2);
  const points = [
    coord(startX, midpointY),
    coord(midpointX, startY),
    coord(startX + sizeX, midpointY),
    coord(midpointX, startY + sizeY),
  ];

  return <Polygon points={points.join(' ')} fill={colour} />;
};
