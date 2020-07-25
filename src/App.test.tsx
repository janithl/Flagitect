import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import App from './App';

describe('App', () => {
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

  test('Divisions cycle', () => {
    const { getByText, queryByText } = render(<App />);

    const divisionButton = getByText('Division');
    expect(divisionButton).toBeTruthy();
    expect(getByText('Vertical')).toBeTruthy();

    fireEvent.press(divisionButton);
    expect(queryByText('Vertical')).toBeFalsy();
    expect(getByText('Quarterly')).toBeTruthy();

    fireEvent.press(divisionButton);
    expect(queryByText('Quarterly')).toBeFalsy();
    expect(getByText('Diagonally')).toBeTruthy();
  });

  test('Proportions cycle', () => {
    const { getByText, queryByText } = render(<App />);

    const proportionsButton = getByText('Proportion');
    expect(proportionsButton).toBeTruthy();
    expect(getByText('2 : 3')).toBeTruthy();

    fireEvent.press(proportionsButton);
    expect(queryByText('2 : 3')).toBeFalsy();
    expect(getByText('3 : 4')).toBeTruthy();

    fireEvent.press(proportionsButton);
    expect(queryByText('3 : 4')).toBeFalsy();
    expect(getByText('3 : 5')).toBeTruthy();
  });

  test('Colours menu opens and allows adding of colours', () => {
    const { getByText } = render(<App />);

    const coloursButton = getByText('Colours');
    expect(coloursButton).toBeTruthy();
    expect(getByText('3')).toBeTruthy();

    fireEvent.press(coloursButton);
    expect(getByText('Edit Division Colours')).toBeTruthy();

    const addColourButton = getByText('Add Colours');
    expect(addColourButton).toBeTruthy();

    fireEvent.press(addColourButton);
    expect(getByText('Add Division Colour')).toBeTruthy();
  });
});
