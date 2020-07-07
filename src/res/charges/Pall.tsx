import React from 'react';
import { G, Rect } from 'react-native-svg';

export default (
  height: number,
  width: number,
  colour: string,
  thickness = 20,
): JSX.Element => {
  thickness /= 100;

  const chargeHeight = height * thickness;
  const midpoint = {
    x: Math.round(width / 2),
    y: Math.round(height / 2),
  };
  const angle = (180 * Math.atan(height / width)) / Math.PI;
  const diagonal = Math.sqrt(midpoint.x ** 2 + midpoint.y ** 2);

  return (
    <G>
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
    </G>
  );
};
