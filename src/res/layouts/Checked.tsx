import React from 'react';
import { Svg, G, Rect } from 'react-native-svg';

import colours from '@res/colours';

const BASE_SIZE = 196;

export default ({
  size = BASE_SIZE,
  ratio = 2 / 3,
  divsHorizontal = 9,
  divsVertical = 7,
  divColours = [colours.black, colours.white],
}: OwnProps): JSX.Element => {
  const divHeight = Math.round(BASE_SIZE / divsVertical);
  const divWidth = Math.round(BASE_SIZE / divsHorizontal);
  return (
    <Svg
      height={Math.round(size * ratio)}
      width={size}
      viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
      preserveAspectRatio="none">
      <G>
        {Array(divsVertical)
          .fill(0)
          .map((_, i: number) => (
            <G key={i}>
              {Array(divsHorizontal)
                .fill(0)
                .map((__, j: number) => (
                  <Rect
                    x={j * divWidth}
                    y={i * divHeight}
                    height={divHeight}
                    width={divWidth}
                    fill={divColours[(i + j) % 2]}
                    key={[i, j].join('-')}
                  />
                ))}
            </G>
          ))}
      </G>
    </Svg>
  );
};

type OwnProps = {
  size?: number;
  ratio?: number;
  divColours?: string[];
  divsHorizontal?: number;
  divsVertical?: number;
};
