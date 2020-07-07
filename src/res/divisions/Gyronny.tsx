import React from 'react';
import { G, Polygon, Rect } from 'react-native-svg';

import { coord, getMidpoint } from '@lib/utils';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const midpoint = getMidpoint(width, height);

  return (
    <G>
      <Rect x="0" y="0" height={height} width={width} fill={divColours[0]} />
      <Polygon
        points={[
          coord(0, 0),
          coord(midpoint.x, midpoint.y),
          coord(0, midpoint.y),
        ].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[
          coord(0, height),
          coord(midpoint.x, midpoint.y),
          coord(midpoint.x, height),
        ].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[
          coord(width, height),
          coord(midpoint.x, midpoint.y),
          coord(width, midpoint.y),
        ].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[
          coord(width, 0),
          coord(midpoint.x, midpoint.y),
          coord(midpoint.x, 0),
        ].join(' ')}
        fill={divColours[1]}
      />
    </G>
  );
};
