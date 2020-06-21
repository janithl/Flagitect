import { chunkArray, HSVtoRGB } from './utils';

test('ChunkArray', () => {
  const array = ['1', '2', '3'];
  const longArray = [...array, ...array, ...array];
  const chunked = chunkArray(longArray, 3);

  expect(chunked[0]).toContain('1');
  expect(chunked[0]).toContain('2');
  expect(chunked[0]).toContain('3');
  expect(chunked[1]).toContain('1');
  expect(chunked[1]).toContain('2');
  expect(chunked[2]).toContain('3');
});

test('HSVtoRGB', () => {
  /** greys */
  expect(HSVtoRGB(0, 0, 0)).toBe('#000000');
  expect(HSVtoRGB(0, 0, 0.5)).toBe('#808080');
  expect(HSVtoRGB(0, 0, 1)).toBe('#FFFFFF');

  /** red */
  expect(HSVtoRGB(0, 1, 1)).toBe('#FF0000');
  expect(HSVtoRGB(0, 1, 0.8)).toBe('#CC0000');
  expect(HSVtoRGB(0, 1, 0.5)).toBe('#800000');
  expect(HSVtoRGB(0, 1, 0.2)).toBe('#330000');

  /** yellow */
  expect(HSVtoRGB(60, 1, 1)).toBe('#FFFF00');
  expect(HSVtoRGB(60, 0.5, 1)).toBe('#FFFF80');
  expect(HSVtoRGB(60, 0.5, 0.5)).toBe('#808040');
  expect(HSVtoRGB(60, 1, 0.5)).toBe('#808000');

  /** random css colours */
  expect(HSVtoRGB(146, 0.66, 0.55)).toBe('#308C58');
  expect(HSVtoRGB(174, 0.71, 0.88)).toBe('#41E0D0');
  expect(HSVtoRGB(351, 0.29, 1)).toBe('#FFB5C0');
});
