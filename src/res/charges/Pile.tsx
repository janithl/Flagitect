import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export enum PileTypes {
  Pile = 'Pile',
  Upright = 'Upright Pile',
  Inverted = 'Inverted Pile',
}

export default (
  height: number,
  width: number,
  colour: string,
  pileType = PileTypes.Pile,
  percentage = 50,
): JSX.Element => {
  percentage /= 100;

  const points: string[] = [];
  const midX = Math.round(width / 2);
  const midY = Math.round(height / 2);
  switch (pileType) {
    case PileTypes.Pile:
      points.push(coord(0, 0));
      points.push(coord(0, height));
      points.push(coord(Math.round(width * percentage), midY));
      break;
    case PileTypes.Upright:
      points.push(coord(0, height));
      points.push(coord(width, height));
      points.push(coord(midX, height - Math.round(height * percentage)));
      break;
    case PileTypes.Inverted:
      points.push(coord(0, 0));
      points.push(coord(width, 0));
      points.push(coord(midX, Math.round(height * percentage)));
      break;
  }
  return <Polygon points={points.join(' ')} fill={colour} />;
};
