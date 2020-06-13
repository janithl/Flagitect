import React from 'react';
import { G, Rect } from 'react-native-svg';

export enum CrossTypes {
  Cross = 'Cross',
  Greek = 'Greek Cross',
  Nordic = 'Nordic Cross',
}

export default (
  height: number,
  width: number,
  colour: string,
  thickness = 15,
  percentage = 50,
  crossType?: CrossTypes,
): JSX.Element => {
  thickness *= height / 100;
  percentage /= 100;

  const y = Math.floor((height - thickness) / 2);
  const x =
    crossType === CrossTypes.Nordic ? y : Math.floor((width - thickness) / 2);
  let startY = 0,
    startX = 0;

  if (crossType === CrossTypes.Greek) {
    startY = Math.floor((height - height * percentage) / 2);
    height = Math.floor(height - startY * 2);
    startX = Math.floor((width - height) / 2);
    width = height;
  }

  return (
    <G>
      <Rect x={x} y={startY} height={height} width={thickness} fill={colour} />
      <Rect x={startX} y={y} height={thickness} width={width} fill={colour} />
    </G>
  );
};
