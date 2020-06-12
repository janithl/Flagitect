import { chunkArray } from './utils';

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
