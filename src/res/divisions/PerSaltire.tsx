import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const midpoint = coord(Math.round(width / 2), Math.round(height / 2));
  return (
    <G>
      <Polygon
        points={[coord(0, height), midpoint, coord(0, 0)].join(' ')}
        fill={divColours[0]}
      />
      <Polygon
        points={[coord(0, 0), midpoint, coord(width, 0)].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[coord(width, 0), midpoint, coord(width, height)].join(' ')}
        fill={divColours.length > 2 ? divColours[2] : divColours[0]}
      />
      <Polygon
        points={[coord(width, height), midpoint, coord(0, height)].join(' ')}
        fill={divColours.length > 3 ? divColours[3] : divColours[1]}
      />
    </G>
  );
};
