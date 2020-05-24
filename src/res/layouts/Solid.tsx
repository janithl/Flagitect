import React from 'react';
import { Svg, Rect } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 1 / 2,
  divColours = [colours.green],
}: OwnProps): JSX.Element => (
  <Svg
    height={Math.round(size * ratio)}
    width={size}
    viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
    preserveAspectRatio="none">
    <Rect
      x="0"
      y={0}
      height={BASE_SIZE}
      width={BASE_SIZE}
      fill={divColours[0]}
    />
  </Svg>
);

type OwnProps = {
  size?: number;
  ratio?: number;
  divColours?: string[];
};
