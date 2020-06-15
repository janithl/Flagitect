import React from 'react';
import { Defs, Pattern, Polygon, Rect } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

export default (
  id: string,
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => {
  percentage /= 100;
  const sizeX = toDP(width * percentage);
  const sizeY = toDP(height * percentage);
  const midpointX = toDP(width / 2);
  const midpointY = toDP(height / 2);
  const startX = midpointX - toDP(sizeX / 2);
  const startY = midpointY - toDP(sizeY / 2);
  const points = [
    coord(startX, midpointY),
    coord(midpointX, startY),
    coord(startX + sizeX, midpointY),
    coord(midpointX, startY + sizeY),
  ];

  return (
    <>
      <Defs>
        <Pattern
          id={id}
          viewBox={[0, 0, width, height].join(' ')}
          height={`${toDP(100 / repeatY, 2)}%`}
          width={`${toDP(100 / repeatX, 2)}%`}>
          <Polygon points={points.join(' ')} fill={colour} />
        </Pattern>
      </Defs>
      <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
    </>
  );
};
