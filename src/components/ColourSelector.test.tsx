import React from 'react';
import { render } from '@testing-library/react-native';

import ColourSelector from './ColourSelector';

test('Renders ColourSelector', () => {
  const props = {
    selectedColours: ['#FFFFFF'],
    dispatch: jest.fn(),
  };
  const { getByText } = render(<ColourSelector {...props} />);

  expect(getByText('Selected Colours')).toBeTruthy();
  expect(getByText('Palette')).toBeTruthy();
});
