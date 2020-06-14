import React from 'react';
import { Rect } from 'react-native-svg';

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
    <Rect
      height={size.height}
      width={size.width}
      x={canton ? 0 : Math.round((width - size.width) / 2)}
      y={canton ? 0 : Math.round((height - size.height) / 2)}
      fill={colour}
    />
  );
};
