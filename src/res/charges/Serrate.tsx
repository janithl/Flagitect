import React from 'react';
import { G, Polygon, Svg } from 'react-native-svg';

import { coord } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  thickness = 20,
): JSX.Element => {
  thickness /= 100;
  const translateCoords = [0, Math.round((height - width) / 2)];

  const midpoint = height / 2;
  const t = thickness * midpoint;
  const points = [
    coord(0, midpoint - t),
    coord(midpoint * 0.5, midpoint - 1.5 * t),
    coord(midpoint, midpoint - t),
    coord(midpoint * 1.5, midpoint - 0.5 * t),
    coord(height, midpoint - t),
    coord(height, midpoint + t),
    coord(midpoint * 1.5, midpoint + 1.5 * t),
    coord(midpoint, midpoint + t),
    coord(midpoint * 0.5, midpoint + 0.5 * t),
    coord(0, midpoint + t),
  ];

  return (
    <G transform={`translate(${translateCoords.join(' ')})`}>
      <Svg height={width} width={width} viewBox={`0 0 ${height} ${height}`}>
        <Polygon points={points.join(' ')} fill={colour} />
      </Svg>
    </G>
  );
};
