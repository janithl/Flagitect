import React from 'react';
import { render } from '@testing-library/react-native';

import App from './App';

test('Renders initial app state', () => {
  const { getByText } = render(<App />);

  expect(getByText('Division')).toBeTruthy();
  expect(getByText('Vertical')).toBeTruthy();

  expect(getByText('Proportion')).toBeTruthy();
  expect(getByText('2 : 3')).toBeTruthy();

  expect(getByText('Colours')).toBeTruthy();
  expect(getByText('3')).toBeTruthy();

  expect(getByText('Charges')).toBeTruthy();
  expect(getByText('0')).toBeTruthy();
});
