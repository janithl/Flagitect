import React from 'react';
import { Polygon } from 'react-native-svg';

import { coord } from '@lib/utils';

export enum PileTypes {
  Pile = 'Pile',
  UprightPile = 'Upright Pile',
  InvertedPile = 'Inverted Pile',
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
  switch (pileType) {
    case PileTypes.Pile:
      points.push(coord(0, 0));
      points.push(coord(0, height));
      points.push(coord(width * percentage, Math.floor(height / 2)));
      break;
    case PileTypes.UprightPile:
      points.push(coord(0, height));
      points.push(coord(width, height));
      points.push(coord(Math.floor(width / 2), height - height * percentage));
      break;
    case PileTypes.InvertedPile:
      points.push(coord(0, 0));
      points.push(coord(width, 0));
      points.push(coord(Math.floor(width / 2), height * percentage));
      break;
  }
  return <Polygon points={points.join(' ')} fill={colour} />;
};
