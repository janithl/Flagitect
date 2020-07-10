import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { coord } from '@lib/utils';

const baseSize = 100;
export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  thickness = 50,
): JSX.Element => {
  percentage /= 100;
  thickness /= 100;

  const size = {
    x: Math.round((2 / 3) * height * percentage),
    y: Math.round(height * percentage),
  };

  const origin = {
    x: Math.round((width - size.x) / 2),
    y: Math.round((height - size.y) / 2),
  };

  const borderTop = origin.y + size.y / 12;
  const startY = origin.y + (size.y / 3) * (1 + thickness);
  const midcurveY = origin.y + (size.y / 3) * (2 + thickness);
  const midX = origin.x + size.x / 2;
  const endX = origin.x + size.x;
  const endY = origin.y + size.y;

  return (
    <Path
      d={[
        `M ${origin.x} ${borderTop}`,
        `L ${origin.x} ${startY}`,
        `Q ${coord(origin.x, midcurveY)} ${coord(midX, endY)}`,
        `Q ${coord(endX, midcurveY)} ${coord(endX, startY)}`,
        `L ${endX} ${borderTop}`,
        `Q ${coord(midX, origin.y)} ${coord(origin.x, borderTop)}`,
      ].join(' ')}
      fill={colour}
    />
  );
};
