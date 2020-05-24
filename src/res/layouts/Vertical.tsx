import React from 'react';
import { Svg, G, Rect } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 2 / 3,
  divColours = [colours.primaryBlue, colours.white, colours.salmon],
}: OwnProps): JSX.Element => {
  const divWidth = BASE_SIZE / divColours.length;

  return (
    <Svg
      height={Math.round(size * ratio)}
      width={size}
      viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
      preserveAspectRatio="none">
      <G>
        {divColours.map((colour: string, i: number) => (
          <Rect
            y="0"
            x={i * divWidth}
            height={BASE_SIZE}
            width={divWidth}
            fill={colour}
            key={i}
          />
        ))}
      </G>
    </Svg>
  );
};

type OwnProps = {
  size?: number;
  ratio?: number;
  divColours?: string[];
};
