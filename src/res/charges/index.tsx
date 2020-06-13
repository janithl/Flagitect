import React from 'react';
import { G } from 'react-native-svg';

import { ChargeType } from '@lib/reducers';

import renderDisc from './Disc';
import renderCross, { CrossTypes } from './Cross';
import renderPile, { PileTypes } from './Pile';

export enum Charges {
  Cross = 'Cross',
  Disc = 'Disc',
  Pile = 'Pile',
}

export default (
  charges: ChargeType[],
  height: number,
  width: number,
): JSX.Element => (
  <>
    {charges.map((charge: ChargeType) => {
      switch (charge?.type) {
        case Charges.Cross:
          return (
            <G id={charge.id}>{renderCross(height, width, charge.colour)}</G>
          );
        case Charges.Disc:
          return (
            <G id={charge.id}>
              {renderDisc(height, width, charge.colour, charge?.size)}
            </G>
          );
        case Charges.Pile:
          return (
            <G id={charge.id}>{renderPile(height, width, charge.colour)}</G>
          );
      }
    })}
  </>
);

export { renderCross, renderDisc, renderPile, CrossTypes, PileTypes };
