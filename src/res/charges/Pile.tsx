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
  type = PileTypes.Pile,
  percentage = 100,
): JSX.Element => {
  const points: string[] = [];
  switch (type) {
    case PileTypes.Pile:
      points.push(coord(0, 0));
      points.push(coord(0, height));
      points.push(
        coord(Math.floor((width * percentage) / 100), Math.floor(height / 2)),
      );
      break;
    case PileTypes.UprightPile:
      points.push(coord(0, height));
      points.push(coord(width, height));
      points.push(
        coord(
          Math.floor(width / 2),
          height - Math.floor((height * percentage) / 100),
        ),
      );
      break;
    case PileTypes.InvertedPile:
      points.push(coord(0, 0));
      points.push(coord(width, 0));
      points.push(
        coord(Math.floor(width / 2), Math.floor((height * percentage) / 100)),
      );
      break;
  }
  return <Polygon points={points.join(' ')} fill={colour} />;
};
