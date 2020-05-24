import React from 'react';
import { Svg, G, Rect } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 3 / 5,
  divColours = [colours.black, colours.salmon, colours.beige],
}: OwnProps): JSX.Element => {
  const divHeight = BASE_SIZE / divColours.length;

  return (
    <Svg
      height={Math.round(size * ratio)}
      width={size}
      viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
      preserveAspectRatio="none">
      <G>
        {divColours.map((colour: string, i: number) => (
          <Rect
            x="0"
            y={i * divHeight}
            height={divHeight}
            width={BASE_SIZE}
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
