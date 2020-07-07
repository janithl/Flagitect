import React from 'react';
import { Rect, Svg } from 'react-native-svg';

import { getMidpoint } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  thickness = 20,
): JSX.Element => {
  thickness /= 100;
  const midpoint = getMidpoint(width, height);

  const chargeHeight = height * thickness;
  const angle = (180 * Math.atan(height / width)) / Math.PI;
  const diagonal = Math.sqrt(midpoint.x ** 2 + midpoint.y ** 2);

  return (
    <Svg width={width} height={height}>
      <Rect
        x={midpoint.x}
        y={midpoint.y - chargeHeight / 2}
        width={midpoint.x}
        height={chargeHeight}
        fill={colour}
      />
      <Rect
        x={midpoint.x}
        y={midpoint.y - chargeHeight / 2}
        width={diagonal}
        height={chargeHeight}
        fill={colour}
        transform={`rotate(${[180 + angle, midpoint.x, midpoint.y].join(' ')})`}
      />
      <Rect
        x={midpoint.x}
        y={midpoint.y - chargeHeight / 2}
        width={diagonal}
        height={chargeHeight}
        fill={colour}
        transform={`rotate(${[180 - angle, midpoint.x, midpoint.y].join(' ')})`}
      />
    </Svg>
  );
};
