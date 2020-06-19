import React from 'react';
import { G, Rect } from 'react-native-svg';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const divHeight = height / divColours.length;
  return (
    <G>
      {divColours.map((colour: string, i: number) => (
        <Rect
          x="0"
          y={i * divHeight}
          height={divHeight}
          width={width}
          fill={colour}
          key={i}
        />
      ))}
    </G>
  );
};
