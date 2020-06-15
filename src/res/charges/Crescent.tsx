import React from 'react';
import { Defs, G, Path, Pattern, Rect, Svg } from 'react-native-svg';

import { toDP } from '@lib/utils';

export default (
  id: string,
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  rotation = 0,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => {
  percentage /= 100;
  const size = Math.round(height * percentage);
  return (
    <>
      <Defs>
        <Pattern
          id={id}
          viewBox={[0, 0, width, height].join(' ')}
          height={`${toDP(100 / repeatY, 2)}%`}
          width={`${toDP(100 / repeatX, 2)}%`}>
          <G
            originX={Math.round(size / 2)}
            originY={Math.round(size / 2)}
            translateX={Math.round((width - size) / 2)}
            translateY={Math.round((height - size) / 2)}
            rotation={rotation}>
            <Svg height={size} width={size} viewBox="0 0 100 100">
              <Path
                d="M 10 20 A 50 50 0 1 0 90 20 A 45 45 0 1 1 10 20"
                fill={colour}
              />
            </Svg>
          </G>
        </Pattern>
      </Defs>
      <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
    </>
  );
};
