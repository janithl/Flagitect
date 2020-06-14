import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  points = 5,
): JSX.Element => {
  const segment = (2 * Math.PI) / points;
  const r = Math.round((height * percentage) / 200);
  const getPointCoordinates = (point: number): string => {
    const x = Math.round(width / 2 + r * Math.cos(point * segment));
    const y = Math.round(height / 2 + r * Math.sin(point * segment));
    return coord(x, y);
  };

  const pointCoords: string[] = [];
  let i = 0;
  while (pointCoords.length < points) {
    pointCoords.push(getPointCoordinates(i));
    i += Math.floor(points / 2);
  }

  return <Polygon points={pointCoords.join(' ')} fill={colour} />;
};
