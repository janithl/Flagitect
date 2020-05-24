import React from 'react';
import { Svg, G, Path } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 2 / 3,
  toLeft = true,
  divColours = [colours.black, colours.salmon],
}: OwnProps): JSX.Element => {
  const height = Math.round(size * ratio);
  const firstPath = toLeft
    ? `M0 ${BASE_SIZE} H${BASE_SIZE} V0 L0 ${BASE_SIZE}`
    : `M0 0 V${BASE_SIZE} H${BASE_SIZE} L0 0`;
  const secondPath = toLeft
    ? `M0 0 H${BASE_SIZE} L0 ${BASE_SIZE} V0`
    : `M0 0 H${BASE_SIZE} V${BASE_SIZE} L0 0`;

  return (
    <Svg
      height={height}
      width={size}
      viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
      preserveAspectRatio="none">
      <G>
        <Path d={firstPath} fill={divColours[0]} />
        <Path d={secondPath} fill={divColours[1]} />
      </G>
    </Svg>
  );
};

type OwnProps = {
  size?: number;
  ratio?: number;
  toLeft?: boolean;
  divColours?: string[];
};
