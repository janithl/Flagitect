import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Alert, Share } from 'react-native';

const childToWeb = (child: JSX.Element) => {
  const { type, props } = child;
  const name = type && type.displayName;
  const webName = name && name[0].toLowerCase() + name.slice(1);
  const Tag = webName ? webName : type;
  return <Tag {...props}>{toWeb(props.children)}</Tag>;
};

const toWeb = (children: JSX.Element[] | JSX.Element) =>
  React.Children.map(children, childToWeb);

export const serialiseSVG = (element: JSX.Element): string =>
  ReactDOMServer.renderToStaticMarkup(<>{toWeb(element)}</>);

export const addHTML = (content: string): string => `<!doctype html>
<html lang="en">
  <head>
    <title>Flagitect</title>
  </head>
  <body>
    ${content}
  </body>
</html>`;

export const addXML = (content: string): string =>
  '<?xml version="1.0" encoding="UTF-8"?>' + content;

export const chunkArray = (array: string[], chunkSize: number): string[][] => {
  const result: string[][] = [];
  let chunk: string[] = [];
  array.forEach((value: string, index: number) => {
    chunk.push(value);
    if (index % chunkSize === chunkSize - 1) {
      result.push(chunk);
      chunk = [];
    }
  });
  return result;
};

export const coord = (x: number, y: number): string => [x, y].join(',');

export const makeID = (): string =>
  [
    new Date().getTime().toString(32),
    Math.floor(new Date().getTime() * Math.random()).toString(32),
  ]
    .join('-')
    .toUpperCase();

export const toDP = (x: number, decimalPlace = 2): number => {
  x *= Math.pow(10, decimalPlace);
  return Math.round(x) / Math.pow(10, decimalPlace);
};

export const share = async (message: string): Promise<void> => {
  try {
    await Share.share({ message });
  } catch (error) {
    Alert.alert('Share Failed', error.message);
  }
};

/**
 * Convert HSV values to RGB Hex string
 * Formulae from https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
 * @param hue
 * @param saturation
 * @param value
 * @returns RGB Hex string
 */
export const HSVtoRGB = (
  hue: number,
  saturation: number,
  value: number,
): string => {
  enum colours {
    Red = 5,
    Green = 3,
    Blue = 1,
  }

  const k = (n: number) => (n + hue / 60) % 6;
  const f = (n: colours) =>
    value -
    value * saturation * Math.max(0, Math.min(1, Math.min(k(n), 4 - k(n))));

  /** convert 0 - 1 RGB value to Hex code */
  const toHex = (colour: number) =>
    Math.round(255 * colour)
      .toString(16)
      .padStart(2, '0');

  return [
    '#',
    toHex(f(colours.Red)),
    toHex(f(colours.Green)),
    toHex(f(colours.Blue)),
  ]
    .join('')
    .toUpperCase();
};

export const getMidpoint = (
  width: number,
  height: number,
): { x: number; y: number } => ({
  x: Math.round(width / 2),
  y: Math.round(height / 2),
});
