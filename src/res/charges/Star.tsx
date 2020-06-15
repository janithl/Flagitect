import React from 'react';
import { Defs, G, Pattern, Polygon, Rect, Svg } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

export default (
  id: string,
  height: number,
  width: number,
  colour: string,
  percentage = 50,
  points = 5,
  rotation = 0,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => {
  const segment = (2 * Math.PI) / points;
  const r = Math.round((height * percentage) / 200);
  const getPointCoordinates = (point: number, radius = r): string => {
    const x = Math.round(width / 2 + radius * Math.cos(point * segment));
    const y = Math.round(height / 2 + radius * Math.sin(point * segment));
    return coord(x, y);
  };

  let i = 0;
  let star: JSX.Element | null = null;

  if (points % 2 === 0) {
    /** for even number of points */
    const polygon1: string[] = [];
    const polygon2: string[] = [];
    while (polygon1.length < points) {
      polygon1.push(getPointCoordinates(i));
      polygon1.push(getPointCoordinates(i + 1, r / 2));
      polygon2.push(getPointCoordinates(i, r / 2));
      polygon2.push(getPointCoordinates(i + 1));
      i += 2;
    }

    star = (
      <G
        originX={Math.round(width / 2)}
        originY={Math.round(height / 2)}
        rotation={rotation}>
        <Polygon fill={colour} points={polygon1.join(' ')} />
        <Polygon fill={colour} points={polygon2.join(' ')} />
      </G>
    );
  } else {
    /** for odd number of points */
    const pointCoords: string[] = [];
    while (pointCoords.length < points) {
      pointCoords.push(getPointCoordinates(i));
      i += Math.floor(points / 2);
    }

    star = (
      <Polygon
        fill={colour}
        originX={Math.round(width / 2)}
        originY={Math.round(height / 2)}
        points={pointCoords.join(' ')}
        rotation={rotation}
      />
    );
  }

  return (
    <>
      <Defs>
        <Pattern
          id={id}
          viewBox={[0, 0, width, height].join(' ')}
          height={`${toDP(100 / repeatY, 2)}%`}
          width={`${toDP(100 / repeatX, 2)}%`}>
          {star}
        </Pattern>
      </Defs>
      <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
    </>
  );
};
