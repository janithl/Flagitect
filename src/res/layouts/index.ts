export { default as Horizontal } from './Horizontal';
export { default as Vertical } from './Vertical';
export { default as Diagonal } from './Diagonal';
export { default as PerSaltire } from './PerSaltire';
export { default as Checked } from './Checked';
export { default as Solid } from './Solid';

export const Divisions = {
  solid: {
    name: 'Solid',
    minColours: 1,
    maxColours: 1,
  },
  horizontal: {
    name: 'Horizontally',
    minColours: 2,
    maxColours: 9,
  },
  vertical: {
    name: 'Vertically',
    minColours: 2,
    maxColours: 9,
  },
  diagonal: {
    name: 'Diagonally',
    minColours: 2,
    maxColours: 2,
  },
  diagonal_to_left: {
    name: 'Diagonally to left',
    minColours: 2,
    maxColours: 2,
  },
  per_saltire: {
    name: 'Per Saltire',
    minColours: 4,
    maxColours: 4,
  },
  checked: {
    name: 'Checky',
    minColours: 2,
    maxColours: 2,
  },
};
