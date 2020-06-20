import React from 'react';
import { G, Rect } from 'react-native-svg';

import { toDP } from '@lib/utils';

export default (
  divColours: string[],
  height: number,
  width: number,
  divsHorizontal = 9,
  divsVertical = 7,
): JSX.Element => {
  const divHeight = toDP(height / divsVertical, 2);
  const divWidth = toDP(width / divsHorizontal, 2);
  const divs = {
    vertical: Array(divsVertical).fill(0),
    horizontal: Array(divsHorizontal).fill(0),
  };
  return (
    <G>
      {divs.vertical.map((_, i: number) => (
        <G key={i}>
          {divs.horizontal.map((__, j: number) => (
            <Rect
              key={[i, j].join('-')}
              x={j * divWidth}
              y={i * divHeight}
              height={divHeight}
              width={divWidth}
              fill={divColours[(i + j) % 2]}
            />
          ))}
        </G>
      ))}
    </G>
  );
};
