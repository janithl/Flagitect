import React from 'react';
import { G, Path } from 'react-native-svg';

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
  const getFlowerPoints = (radius: number, theta: number) => {
    const point = getPointCoordinates(midpoint.x, midpoint.y, radius, theta);
    return coord(point.x, point.y);
  };

  const segment = (2 * Math.PI) / points;
  const radiusLarge = Math.round((height * percentage) / 2);
  const radiusSmall = Math.round((height * percentage * thickness) / 2);
  const radiusMid = Math.round((radiusLarge + radiusSmall) / 2);

  /**
   * this algorithm uses three circles, with quadratic curves ending on
   * the biggest and smallest, and with the curve on the middle circle
   **/
  const nodes = [`M ${getFlowerPoints(radiusLarge, 0)}`];
  for (let i = 0; i < 2 * Math.PI; i += segment) {
    nodes.push(
      [
        'Q',
        getFlowerPoints(radiusMid, i + segment / 2),
        getFlowerPoints(radiusSmall, i + segment / 2),
        'Q',
        getFlowerPoints(radiusMid, i + segment / 2),
        getFlowerPoints(radiusLarge, i + segment),
      ].join(' '),
    );
  }

  return (
    <G transform={`rotate(${[rotation, midpoint.x, midpoint.y].join(' ')})`}>
      <Path fill={colour} d={nodes.join(' ')} />
    </G>
  );
};
