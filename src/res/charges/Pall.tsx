import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  thickness = 20,
): JSX.Element => {
  thickness /= 100;

  const edge = {
    x: Math.round(width * thickness * 0.5),
    y: Math.round(height * thickness * 0.5),
  };
  const midpoint = {
    x: Math.round(width / 2),
    y: Math.round(height / 2),
  };

  const points = [
    coord(0, 0),
    coord(edge.x, 0),
    coord(midpoint.x, midpoint.y - edge.x / 2),
    coord(width, midpoint.y - edge.x / 2),
    coord(width, midpoint.y + edge.x / 2),
    coord(midpoint.x, midpoint.y + edge.x / 2),
    coord(edge.x, height),
    coord(0, height),
    coord(0, height - edge.y),
    coord(midpoint.x - edge.x, midpoint.y),
    coord(0, edge.y),
  ];

  return <Polygon points={points.join(' ')} fill={colour} />;
};
