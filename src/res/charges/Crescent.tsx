import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

import { toDP } from '@lib/utils';

const baseSize = 50;
export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  thickness = 20,
  rotation = 0,
): JSX.Element => {
  percentage /= 100;
  thickness /= 100;

  const size = Math.round(height * percentage);
  const smallRadius = baseSize - toDP(baseSize * thickness * 0.35);

  const translateCoords = [
    Math.round((width - size) / 2),
    Math.round((height - size) / 2),
  ];
  const rotateCoords = [rotation, toDP(size / 2, 1), toDP(size / 2, 1)];
  const transform = [
    `translate(${translateCoords.join(' ')})`,
    `rotate(${rotateCoords.join(' ')}) `,
  ].join(' ');

  return (
    <G transform={transform}>
      <Svg height={size} width={size} viewBox="0 0 100 100">
        <Path
          d={`M 12 17.5 A ${baseSize} ${baseSize} 0 1 0 88 17.5 A ${smallRadius} ${smallRadius} 0 1 1 12 17.5`}
          fill={colour}
        />
      </Svg>
    </G>
  );
};
