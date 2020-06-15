import React from 'react';
import { Circle, Defs, Pattern, Rect } from 'react-native-svg';

import renderStar from './Star';

export default (
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  canton = false,
): JSX.Element => {
  const size = {
    height: Math.round((height * percentage) / 100),
    width: Math.round((width * percentage) / 100),
  };
  return (
    <>
      <Defs>
        <Pattern
          id="circles"
          viewBox={[0, 0, size.width, size.height].join(' ')}
          height="20%"
          width="10%">
          {renderStar(size.height, size.width, colour, 90, 5, 270)}
        </Pattern>
      </Defs>
      <Rect height={size.height} width={size.width} fill="#FFF" />
      <Rect
        height={size.height}
        width={size.width}
        x={canton ? 0 : Math.round((width - size.width) / 2)}
        y={canton ? 0 : Math.round((height - size.height) / 2)}
        //fill={colour}
        fill="url(#circles)"
      />
    </>
  );
};
