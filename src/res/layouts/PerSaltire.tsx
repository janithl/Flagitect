import React from 'react';
import { Svg, G, Path } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 2 / 3,
  divColours = [
    colours.beige,
    colours.black,
    colours.primaryBlue,
    colours.salmon,
  ],
}: OwnProps): JSX.Element => {
  const height = Math.round(size * ratio);
  const midpoint = Math.round(BASE_SIZE / 2);
  return (
    <Svg
      height={height}
      width={size}
      viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
      preserveAspectRatio="none">
      <G>
        <Path
          d={`M0 0 H${BASE_SIZE} L${midpoint} ${midpoint} L0 0`}
          fill={divColours[0]}
        />
        <Path
          d={`M0 0 L${midpoint} ${midpoint} L0 ${BASE_SIZE} V0`}
          fill={divColours[1]}
        />
        <Path
          d={`M0 ${BASE_SIZE} H${BASE_SIZE}
          L${midpoint} ${midpoint} L0 ${BASE_SIZE}`}
          fill={divColours.length > 2 ? divColours[2] : divColours[0]}
        />
        <Path
          d={`M${BASE_SIZE} 0 L${midpoint} ${midpoint}
          L${BASE_SIZE} ${BASE_SIZE} V0`}
          fill={divColours.length > 3 ? divColours[3] : divColours[1]}
        />
      </G>
    </Svg>
  );
};

type OwnProps = {
  size?: number;
  ratio?: number;
  divColours?: string[];
};
