import React from 'react';
import { G, Rect } from 'react-native-svg';

export default (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const divWidth = width / divColours.length;
  return (
    <G>
      {divColours.map((colour: string, i: number) => (
        <Rect
          y="0"
          x={i * divWidth}
          height={height}
          width={divWidth}
          fill={colour}
          key={i}
        />
      ))}
    </G>
  );
};
