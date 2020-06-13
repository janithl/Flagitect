import React from 'react';
import { G } from 'react-native-svg';

import { ChargeType } from '@lib/reducers';

import renderDisc, { DiscTypes } from './Disc';
import renderCross, { CrossTypes } from './Cross';
import renderPile, { PileTypes } from './Pile';

export type Charges = DiscTypes | CrossTypes | PileTypes;

export default (
  charges: ChargeType[],
  height: number,
  width: number,
): JSX.Element => (
  <>
    {charges.map((charge: ChargeType) => {
      switch (charge?.type) {
        case CrossTypes.Cross:
        case CrossTypes.Greek:
        case CrossTypes.Nordic:
          return (
            <G id={charge.id}>
              {renderCross(
                height,
                width,
                charge.colour,
                charge?.thickness,
                charge?.percentage,
                charge.type,
              )}
            </G>
          );
        case DiscTypes.Disc:
          return (
            <G id={charge.id}>
              {renderDisc(height, width, charge.colour, charge?.percentage)}
            </G>
          );
        case PileTypes.Pile:
        case PileTypes.Inverted:
        case PileTypes.Upright:
          return (
            <G id={charge.id}>
              {renderPile(
                height,
                width,
                charge.colour,
                charge.type,
                charge?.percentage,
              )}
            </G>
          );
      }
    })}
  </>
);

export const ChargesList = [
  DiscTypes.Disc,
  PileTypes.Pile,
  PileTypes.Upright,
  PileTypes.Inverted,
  CrossTypes.Cross,
  CrossTypes.Nordic,
  CrossTypes.Greek,
];

export {
  renderCross,
  renderDisc,
  renderPile,
  CrossTypes,
  DiscTypes,
  PileTypes,
};
