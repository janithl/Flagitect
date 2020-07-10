import React from 'react';
import { G, Path, Polygon, Svg } from 'react-native-svg';

import { coord, getMidpoint } from '@lib/utils';

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

  const midY = getMidpoint(width, height).y;
  const t = thickness * midY;

  const renderStripes = () => {
    if (stripedType === StripedTypes.Serrated) {
      const points = [
        coord(0, midY - t),
        coord(midY * 0.5, midY - 1.5 * t),
        coord(midY, midY - t),
        coord(midY * 1.5, midY - 0.5 * t),
        coord(height, midY - t),
        coord(height, midY + t),
        coord(midY * 1.5, midY + 1.5 * t),
        coord(midY, midY + t),
        coord(midY * 0.5, midY + 0.5 * t),
        coord(0, midY + t),
      ];

      return <Polygon points={points.join(' ')} fill={colour} />;
    } else if (stripedType === StripedTypes.Wavy) {
      const points = [
        ['M', 0, midY - t].join(' '),
        ['A', midY, midY, '0 0 1', midY, midY - t].join(' '),
        ['A', midY, midY, '0 0 0', height, midY - t].join(' '),
        ['L', height, midY + t].join(' '),
        ['A', midY, midY, '0 0 1', midY, midY + t].join(' '),
        ['A', midY, midY, '0 0 0', 0, midY + t].join(' '),
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
