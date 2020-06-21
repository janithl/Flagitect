import React from 'react';
import { Polygon, PolygonProps } from 'react-native-svg';

import { coord } from '@lib/utils';

export enum BendTypes {
  Bend = 'Bend',
  Enhanced = 'Enhanced Bend',
  Reduced = 'Reduced Bend',
}

export default (
  height: number,
  width: number,
  colour: string,
  bendType = BendTypes.Bend,
  thickness = 20,
  flip = false,
): JSX.Element => {
  thickness /= 100;

  const points: string[] = [coord(0, 0)];
  const edgeX = Math.round(width * thickness);
  const edgeY = Math.round(height * thickness);
  switch (bendType) {
    case BendTypes.Enhanced:
      points.push(coord(edgeX, 0));
      points.push(coord(width, height));
      points.push(coord(width - edgeX, height));
      break;
    case BendTypes.Reduced:
      points.push(coord(0, edgeY));
      points.push(coord(width, height));
      points.push(coord(width, height - edgeY));
      break;
    case BendTypes.Bend:
      points.push(coord(edgeX, 0));
      points.push(coord(width, height - edgeY));
      points.push(coord(width, height));
      points.push(coord(width - edgeX, height));
      points.push(coord(0, edgeY));
      break;
  }

  const props: PolygonProps = {
    points: points.join(' '),
    fill: colour,
  };
  if (flip) {
    props.transform = `scale(-1 1) translate(${-width} 0)`;
  }

  return <Polygon {...props} />;
};
