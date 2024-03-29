const appColours = {
  primaryBlue: '#1C2F52',
  secondaryBlue: '#2A4D6A',
  offWhite: '#FAF7F2',
  beige: '#DFBC98',
  salmon: '#D73E4B',

  white: '#FFFFFF',
  black: '#000000',
  grey: '#C5C5C5',

  disabledBg: '#E0E0E0',
  disabledFg: '#A0A0A0',
};

export const gnomePalette = [
  '#99C1F1',
  '#62A0EA',
  '#3584E4',
  '#1C71D8',
  '#1A5FB4',
  '#8FF0A4',
  '#57E389',
  '#33D17A',
  '#2EC27E',
  '#26A269',
  '#F9F06B',
  '#F8E45C',
  '#F6D32D',
  '#F5C211',
  '#E5A50A',
  '#FFBE6F',
  '#FFA348',
  '#FF7800',
  '#E66100',
  '#C64600',
  '#F66151',
  '#ED333B',
  '#E01B24',
  '#C01C28',
  '#A51D2D',
  '#DC8ADD',
  '#C061CB',
  '#9141AC',
  '#813D9C',
  '#613583',
  '#CDAB8F',
  '#B5835A',
  '#986A44',
  '#865E3C',
  '#63452C',
  '#FFFFFF',
  '#F6F5F4',
  '#DEDDDA',
  '#C0BFBC',
  '#9A9996',
  '#77767B',
  '#5E5C64',
  '#3D3846',
  '#241F31',
  '#000000',
];

export const getRandomColour = (): string => {
  const i = Math.floor(Math.random() * gnomePalette.length - 1);
  return gnomePalette[i];
};

export const initialColours = [
  getRandomColour(),
  appColours.white,
  getRandomColour(),
];

export default appColours;
