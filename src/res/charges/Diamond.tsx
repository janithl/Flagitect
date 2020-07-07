import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord, getMidpoint, toDP } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
): JSX.Element => {
  percentage /= 100;
  const midpoint = getMidpoint(width, height);

  const sizeX = toDP(width * percentage);
  const sizeY = toDP(height * percentage);
  const startX = midpoint.x - toDP(sizeX / 2);
  const startY = midpoint.y - toDP(sizeY / 2);

  const points = [
    coord(startX, midpoint.y),
    coord(midpoint.x, startY),
    coord(startX + sizeX, midpoint.y),
    coord(midpoint.x, startY + sizeY),
  ];

  return <Polygon points={points.join(' ')} fill={colour} />;
};
