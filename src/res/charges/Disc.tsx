import React from 'react';
import { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { toDP } from '@lib/utils';

export default (
  id: string,
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => (
  <>
    <Defs>
      <Pattern
        id={id}
        viewBox={[0, 0, width, height].join(' ')}
        height={`${toDP(100 / repeatY, 2)}%`}
        width={`${toDP(100 / repeatX, 2)}%`}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={(height * percentage) / 200}
          fill={colour}
        />
      </Pattern>
    </Defs>
    <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
  </>
);
