import React from 'react';
import { G, Rect } from 'react-native-svg';

export enum CrossTypes {
  Greek = 'Greek',
  Nordic = 'Nordic',
}

export default (
  height: number,
  width: number,
  thickness: number,
  colour: string,
  crossType?: CrossTypes,
): JSX.Element => {
  const y = (height - thickness) / 2;
  const x = crossType === CrossTypes.Nordic ? y : (width - thickness) / 2;
  return (
    <G>
      <Rect x={x} y={0} height={height} width={thickness} fill={colour} />
      <Rect x={0} y={y} height={thickness} width={width} fill={colour} />
    </G>
  );
};
