import React from 'react';
import { G, Path, Polygon, Svg } from 'react-native-svg';

import { coord } from '@lib/utils';

export enum StripedTypes {
  Serrated = 'Stripes Serrated',
  Wavy = 'Stripes Wavy',
}

export default (
  height: number,
  width: number,
  colour: string,
  stripedType = StripedTypes.Serrated,
  thickness = 20,
): JSX.Element => {
  thickness /= 100;

  const midpoint = height / 2;
  const t = thickness * midpoint;

  const renderStripes = () => {
    if (stripedType === StripedTypes.Serrated) {
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

      return <Polygon points={points.join(' ')} fill={colour} />;
    } else if (stripedType === StripedTypes.Wavy) {
      const points = [
        ['M', 0, midpoint - t].join(' '),
        ['A', midpoint, midpoint, '0 0 1', midpoint, midpoint - t].join(' '),
        ['A', midpoint, midpoint, '0 0 0', height, midpoint - t].join(' '),
        ['L', height, midpoint + t].join(' '),
        ['A', midpoint, midpoint, '0 0 1', midpoint, midpoint + t].join(' '),
        ['A', midpoint, midpoint, '0 0 0', 0, midpoint + t].join(' '),
        'Z',
      ];

      return <Path d={points.join(' ')} fill={colour} />;
    }

    return <G />;
  };

  const translateCoords = [0, Math.round((height - width) / 2)];
  return (
    <G transform={`translate(${translateCoords.join(' ')})`}>
      <Svg height={width} width={width} viewBox={`0 0 ${height} ${height}`}>
        {renderStripes()}
      </Svg>
    </G>
  );
};
