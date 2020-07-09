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

  const halfSegment = Math.PI / points;
  const radiusLarge = Math.round((height * percentage) / 2);
  const radiusSmall = Math.round((height * percentage * thickness) / 2);

  /**
   * this algorithm uses two circles sharing a midpoint, one smaller than
   * the other, and polygon lines zig zagging between points on the two
   **/
  const nodes = [];
  for (let i = 1; i < points * 2; i += 2) {
    nodes.push(getStarPoints(radiusSmall, halfSegment * i));
    nodes.push(getStarPoints(radiusLarge, halfSegment * (i + 1)));
  }

  return (
    <G transform={`rotate(${[rotation, midpoint.x, midpoint.y].join(' ')})`}>
      <Polygon fill={colour} points={nodes.join(' ')} />
    </G>
  );
};
