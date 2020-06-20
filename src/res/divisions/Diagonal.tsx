import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  divColours: string[],
  height: number,
  width: number,
  toLeft = true,
): JSX.Element => {
  const firstPath = toLeft
    ? [coord(0, height), coord(width, height), coord(width, 0)]
    : [coord(0, 0), coord(0, height), coord(width, height)];
  const secondPath = toLeft
    ? [coord(0, height), coord(0, 0), coord(width, 0)]
    : [coord(0, 0), coord(width, 0), coord(width, height)];

  return (
    <G>
      <Polygon points={firstPath.join(' ')} fill={divColours[0]} />
      <Polygon points={secondPath.join(' ')} fill={divColours[1]} />
    </G>
  );
};
