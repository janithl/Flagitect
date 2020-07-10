import React from 'react';
import { Path } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

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

  const borderTop = toDP(size.y / 48, 1);
  const startY = toDP(origin.y + (size.y / 3) * (1 + thickness), 1);
  const midcurveY = toDP(origin.y + (size.y / 3) * (2 + thickness), 1);
  const midX = origin.x + toDP(size.x / 2, 1);
  const endX = origin.x + size.x;
  const endY = origin.y + size.y;

  return (
    <Path
      d={[
        `M ${origin.x} ${origin.y + borderTop}`,
        `L ${origin.x} ${startY}`,
        `Q ${coord(origin.x, midcurveY)} ${coord(midX, endY)}`,
        `Q ${coord(endX, midcurveY)} ${coord(endX, startY)}`,
        `L ${endX} ${origin.y + borderTop}`,
        [
          'Q',
          coord(midX, origin.y - borderTop),
          coord(origin.x, origin.y + borderTop),
        ].join(' '),
      ].join(' ')}
      fill={colour}
    />
  );
};
