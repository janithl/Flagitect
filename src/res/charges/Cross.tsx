import React from 'react';
import { Defs, Pattern, Rect } from 'react-native-svg';

import { toDP } from '@lib/utils';

export enum CrossTypes {
  Cross = 'Cross',
  Greek = 'Greek Cross',
  Nordic = 'Nordic Cross',
}

export default (
  id: string,
  height: number,
  width: number,
  colour: string,
  thickness = 15,
  percentage = 50,
  crossType?: CrossTypes,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => {
  const size = { height, width };
  thickness *= Math.round(height / 100);
  percentage /= 100;

  const y = Math.round((height - thickness) / 2);
  const x =
    crossType === CrossTypes.Nordic ? y : Math.round((width - thickness) / 2);
  let startY = 0,
    startX = 0;

  if (crossType === CrossTypes.Greek) {
    startY = Math.round((height - height * percentage) / 2);
    size.height = Math.round(height - startY * 2);
    startX = Math.round((width - size.height) / 2);
    size.width = size.height;
  }

  return (
    <>
      <Defs>
        <Pattern
          id={id}
          viewBox={[0, 0, width, height].join(' ')}
          height={`${toDP(100 / repeatY, 2)}%`}
          width={`${toDP(100 / repeatX, 2)}%`}>
          <Rect
            x={x}
            y={startY}
            height={size.height}
            width={thickness}
            fill={colour}
          />
          <Rect
            x={startX}
            y={y}
            height={thickness}
            width={size.width}
            fill={colour}
          />
        </Pattern>
      </Defs>
      <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
    </>
  );
};
