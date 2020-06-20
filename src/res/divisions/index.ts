import renderChecked from './Checked';
import renderDiagonal from './Diagonal';
import renderGyronny from './Gyronny';
import renderHorizontal from './Horizontal';
import renderPerSaltire from './PerSaltire';
import renderSolid from './Solid';
import renderVertical from './Vertical';

export enum Division {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
  Quartered = 'Quarterly',
  Diagonal = 'Diagonally',
  DiagonalToLeft = 'Diag. To Left',
  PerSaltire = 'Per Saltire',
  Gyronny = 'Gyronny',
  Checked = 'Checky',
  Solid = 'Solid',
}

export default (
  division: Division,
  divColours: string[],
  height: number,
  width: number,
  divsHorizontal?: number,
  divsVertical?: number,
): JSX.Element => {
  switch (division) {
    case Division.Horizontal:
      return renderHorizontal(divColours, height, width);
    case Division.Vertical:
      return renderVertical(divColours, height, width);
    case Division.Quartered:
      return renderChecked(divColours, height, width, 2, 2);
    case Division.Checked:
      return renderChecked(
        divColours,
        height,
        width,
        divsHorizontal,
        divsVertical,
      );
    case Division.DiagonalToLeft:
      return renderDiagonal(divColours, height, width);
    case Division.Diagonal:
      return renderDiagonal(divColours, height, width, false);
    case Division.PerSaltire:
      return renderPerSaltire(divColours, height, width);
    case Division.Gyronny:
      return renderGyronny(divColours, height, width);
    case Division.Solid:
    default:
      return renderSolid(divColours, height, width);
  }
};

export const DivisionList = [
  Division.Solid,
  Division.Horizontal,
  Division.Vertical,
  Division.Quartered,
  Division.Diagonal,
  Division.DiagonalToLeft,
  Division.PerSaltire,
  Division.Gyronny,
  Division.Checked,
];
