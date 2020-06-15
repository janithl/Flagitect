import React from 'react';
import { G, Polygon, Rect } from 'react-native-svg';

import { coord, toDP } from '@lib/utils';

export enum Division {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
  Quartered = 'Quarterly',
  Diagonal = 'Diagonally',
  DiagonalToLeft = 'Diag. To Left',
  PerSaltire = 'Per Saltire',
  Checked = 'Checky',
  Solid = 'Solid',
}

export const DivisionList = [
  Division.Solid,
  Division.Horizontal,
  Division.Vertical,
  Division.Quartered,
  Division.Diagonal,
  Division.DiagonalToLeft,
  Division.PerSaltire,
  Division.Checked,
];

const renderHorizontalDivisions = (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const divHeight = height / divColours.length;
  return (
    <G>
      {divColours.map((colour: string, i: number) => (
        <Rect
          x="0"
          y={i * divHeight}
          height={divHeight}
          width={width}
          fill={colour}
          key={i}
        />
      ))}
    </G>
  );
};

const renderVerticalDivisions = (
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

const renderCheckedDivisions = (
  divColours: string[],
  height: number,
  width: number,
  divsHorizontal = 9,
  divsVertical = 7,
): JSX.Element => {
  const divHeight = toDP(height / divsVertical, 2);
  const divWidth = toDP(width / divsHorizontal, 2);
  const divs = {
    vertical: Array(divsVertical).fill(0),
    horizontal: Array(divsHorizontal).fill(0),
  };
  return (
    <G>
      {divs.vertical.map((_, i: number) => (
        <G key={i}>
          {divs.horizontal.map((__, j: number) => (
            <Rect
              key={[i, j].join('-')}
              x={j * divWidth}
              y={i * divHeight}
              height={divHeight}
              width={divWidth}
              fill={divColours[(i + j) % 2]}
            />
          ))}
        </G>
      ))}
    </G>
  );
};

const renderDiagonalDivisions = (
  divColours: string[],
  height: number,
  width: number,
  toLeft = true,
): JSX.Element => {
  const firstPath = toLeft
    ? [coord(0, height), coord(width, height), coord(width, 0)]
    : [coord(0, 0), coord(0, height), coord(width, height)];
  const secondPath = toLeft
    ? [coord(0, height), coord(0, 0), coord(width, 0)]
    : [coord(0, 0), coord(width, 0), coord(width, height)];

  return (
    <G>
      <Polygon points={firstPath.join(' ')} fill={divColours[0]} />
      <Polygon points={secondPath.join(' ')} fill={divColours[1]} />
    </G>
  );
};

const renderPerSaltire = (
  divColours: string[],
  height: number,
  width: number,
): JSX.Element => {
  const midpoint = coord(Math.round(width / 2), Math.round(height / 2));
  return (
    <G>
      <Polygon
        points={[coord(0, height), midpoint, coord(0, 0)].join(' ')}
        fill={divColours[0]}
      />
      <Polygon
        points={[coord(0, 0), midpoint, coord(width, 0)].join(' ')}
        fill={divColours[1]}
      />
      <Polygon
        points={[coord(width, 0), midpoint, coord(width, height)].join(' ')}
        fill={divColours.length > 2 ? divColours[2] : divColours[0]}
      />
      <Polygon
        points={[coord(width, height), midpoint, coord(0, height)].join(' ')}
        fill={divColours.length > 3 ? divColours[3] : divColours[1]}
      />
    </G>
  );
};

const renderSolid = (divColours: string[], height: number, width: number) => (
  <Rect x="0" y="0" height={height} width={width} fill={divColours[0]} />
);

export const renderDivisions = (
  division: Division,
  divColours: string[],
  height: number,
  width: number,
  divsHorizontal?: number,
  divsVertical?: number,
): JSX.Element => {
  switch (division) {
    case Division.Horizontal:
      return renderHorizontalDivisions(divColours, height, width);
    case Division.Vertical:
      return renderVerticalDivisions(divColours, height, width);
    case Division.Quartered:
      return renderCheckedDivisions(divColours, height, width, 2, 2);
    case Division.Checked:
      return renderCheckedDivisions(
        divColours,
        height,
        width,
        divsHorizontal,
        divsVertical,
      );
    case Division.DiagonalToLeft:
      return renderDiagonalDivisions(divColours, height, width);
    case Division.Diagonal:
      return renderDiagonalDivisions(divColours, height, width, false);
    case Division.PerSaltire:
      return renderPerSaltire(divColours, height, width);
    case Division.Solid:
    default:
      return renderSolid(divColours, height, width);
  }
};
