import React from 'react';
import { G } from 'react-native-svg';

import { ChargeType } from '@lib/reducers';

import renderPanel from './Panel';
import renderDisc from './Disc';
import renderCross, { CrossTypes } from './Cross';
import renderPile, { PileTypes } from './Pile';
import renderStar from './Star';

export enum SimpleTypes {
  Canton = 'Canton',
  Disc = 'Disc',
  Panel = 'Panel',
}

export enum ComplexTypes {
  Star = 'Star',
}

export type Charges = SimpleTypes | CrossTypes | PileTypes | ComplexTypes;

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
            <G id={charge.id} key={charge.id}>
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
        case SimpleTypes.Canton:
        case SimpleTypes.Panel:
          return (
            <G id={charge.id} key={charge.id}>
              {renderPanel(
                height,
                width,
                charge.colour,
                charge?.percentage,
                charge?.type === SimpleTypes.Canton,
              )}
            </G>
          );
        case SimpleTypes.Disc:
          return (
            <G id={charge.id} key={charge.id}>
              {renderDisc(height, width, charge.colour, charge?.percentage)}
            </G>
          );
        case PileTypes.Pile:
        case PileTypes.Inverted:
        case PileTypes.Upright:
          return (
            <G id={charge.id} key={charge.id}>
              {renderPile(
                height,
                width,
                charge.colour,
                charge.type,
                charge?.percentage,
              )}
            </G>
          );
        case ComplexTypes.Star:
          return (
            <G
              id={charge.id}
              key={charge.id}
              rotation={charge?.rotation}
              originX={Math.round(width / 2)}
              originY={Math.round(height / 2)}>
              {renderStar(
                height,
                width,
                charge.colour,
                charge?.percentage,
                charge?.points,
              )}
            </G>
          );
      }
    })}
  </>
);

export const ChargesList = [
  SimpleTypes.Canton,
  SimpleTypes.Disc,
  SimpleTypes.Panel,
  PileTypes.Pile,
  PileTypes.Upright,
  PileTypes.Inverted,
  CrossTypes.Cross,
  CrossTypes.Nordic,
  CrossTypes.Greek,
  ComplexTypes.Star,
];

export { renderCross, renderDisc, renderPile, CrossTypes, PileTypes };
