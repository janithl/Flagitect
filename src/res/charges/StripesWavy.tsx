import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

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
    ['M', 0, midpoint - t].join(' '),
    ['A', midpoint, midpoint, '0 0 1', midpoint, midpoint - t].join(' '),
    ['A', midpoint, midpoint, '0 0 0', height, midpoint - t].join(' '),
    ['L', height, midpoint + t].join(' '),
    ['A', midpoint, midpoint, '0 0 1', midpoint, midpoint + t].join(' '),
    ['A', midpoint, midpoint, '0 0 0', 0, midpoint + t].join(' '),
    'Z',
  ];

  return (
    <G transform={`translate(${translateCoords.join(' ')})`}>
      <Svg height={width} width={width} viewBox={`0 0 ${height} ${height}`}>
        <Path d={points.join(' ')} fill={colour} />
      </Svg>
    </G>
  );
};
