import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  thickness = 50,
  points = 5,
  rotation = 0,
): JSX.Element => {
  thickness /= 100;
  percentage /= 100;

  const halfSegment = Math.PI / points;
  const radiusLarge = Math.round((height * percentage) / 2);
  const radiusSmall = Math.round((height * percentage * thickness) / 2);
  const midpoint = {
    x: Math.round(width / 2),
    y: Math.round(height / 2),
  };

  const getPointCoordinates = (radius: number, theta: number): string => {
    return coord(
      toDP(midpoint.x + radius * Math.sin(theta), 1),
      toDP(midpoint.y + radius * Math.cos(theta), 1),
    );
  };

  /**
   * this algorithm uses two circles sharing a midpoint, one smaller than
   * the other, and polygon lines zig zagging between points on the two
   **/
  const nodes = [];
  for (let i = 1; i < points * 2; i += 2) {
    nodes.push(getPointCoordinates(radiusSmall, halfSegment * i));
    nodes.push(getPointCoordinates(radiusLarge, halfSegment * (i + 1)));
  }

  return (
    <G transform={`rotate(${[rotation, midpoint.x, midpoint.y].join(' ')})`}>
      <Polygon fill={colour} points={nodes.join(' ')} />
    </G>
  );
};
