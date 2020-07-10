import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord, getMidpoint, getPointCoordinates } from '@lib/utils';

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
  const midpoint = getMidpoint(width, height);
  /** simplify call to getPointCoordinates by filling out the center coords */
  const getStarPoints = (radius: number, theta: number) => {
    const point = getPointCoordinates(midpoint.x, midpoint.y, radius, theta);
    return coord(point.x, point.y);
  };

  const segment = (2 * Math.PI) / points;
  const radiusLarge = Math.round((height * percentage) / 2);
  const radiusSmall = Math.round((height * percentage * thickness) / 2);

  /**
   * this algorithm uses two circles sharing a midpoint, one smaller than
   * the other, and polygon lines zig zagging between points on the two
   **/
  const nodes = [];
  for (let i = 0; i < points; i++) {
    nodes.push(getStarPoints(radiusLarge, i * segment));
    nodes.push(getStarPoints(radiusSmall, (i + 0.5) * segment));
  }

  return (
    <G transform={`rotate(${[rotation, midpoint.x, midpoint.y].join(' ')})`}>
      <Polygon fill={colour} points={nodes.join(' ')} />
    </G>
  );
};
