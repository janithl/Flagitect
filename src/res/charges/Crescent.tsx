import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { toDP } from '@lib/utils';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  rotation = 0,
): JSX.Element => {
  percentage /= 100;
  const size = Math.round(height * percentage);
  const rotateCoords = [rotation, toDP(size / 2, 1), toDP(size / 2, 1)];
  return (
    <G
      translateX={Math.round((width - size) / 2)}
      translateY={Math.round((height - size) / 2)}
      transform={`rotate(${rotateCoords.join(' ')})`}>
      <Svg height={size} width={size} viewBox="0 0 100 100">
        <Path
          d="M 10 20 A 50 50 0 1 0 90 20 A 45 45 0 1 1 10 20"
          fill={colour}
        />
      </Svg>
    </G>
  );
};
