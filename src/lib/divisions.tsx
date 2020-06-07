import React from 'react';
import { G, Path, Rect } from 'react-native-svg';

export enum Division {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
  Quartered = 'Quarterly',
  Diagonal = 'Diagonally',
  DiagonalToLeft = 'Diag. To Left',
  Checked = 'Checky',
  Solid = 'Solid',
}

export const DivisionList = [
  Division.Horizontal,
  Division.Vertical,
  Division.Quartered,
  Division.Diagonal,
  Division.DiagonalToLeft,
  Division.Checked,
  Division.Solid,
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
  const divHeight = Math.round(height / divsVertical);
  const divWidth = Math.round(width / divsHorizontal);
  return (
    <G>
      {Array(divsVertical)
        .fill(0)
        .map((_, i: number) => (
          <G key={i}>
            {Array(divsHorizontal)
              .fill(0)
              .map((__, j: number) => (
                <Rect
                  x={j * divWidth}
                  y={i * divHeight}
                  height={divHeight}
                  width={divWidth}
                  fill={divColours[(i + j) % 2]}
                  key={[i, j].join('-')}
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
    ? `M0 ${height} H${width} V0 L0 ${height}`
    : `M0 0 V${height} H${width} L0 0`;
  const secondPath = toLeft
    ? `M0 0 H${width} L0 ${height} V0`
    : `M0 0 H${width} V${height} L0 0`;

  return (
    <G>
      <Path d={firstPath} fill={divColours[0]} />
      <Path d={secondPath} fill={divColours[1]} />
    </G>
  );
};

const renderSolid = (divColours: string[], height: number, width: number) => (
  <Rect x="0" y={0} height={height} width={width} fill={divColours[0]} />
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
    case Division.Solid:
    default:
      return renderSolid(divColours, height, width);
  }
};
