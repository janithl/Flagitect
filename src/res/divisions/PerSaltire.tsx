import React from 'react';
import { G, Polygon } from 'react-native-svg';

import { coord, getMidpoint } from '@lib/utils';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const midpoint = getMidpoint(width, height);
  const midCoord = coord(midpoint.x, midpoint.y);

  return (
    <G>
      <Polygon
        points={[coord(0, height), midCoord, coord(0, 0)].join(' ')}
        fill={divColours[0]}
      />
      <Polygon
        points={[coord(0, 0), midCoord, coord(width, 0)].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[coord(width, 0), midCoord, coord(width, height)].join(' ')}
        fill={divColours.length > 2 ? divColours[2] : divColours[0]}
      />
      <Polygon
        points={[coord(width, height), midCoord, coord(0, height)].join(' ')}
        fill={divColours.length > 3 ? divColours[3] : divColours[1]}
      />
    </G>
  );
};
