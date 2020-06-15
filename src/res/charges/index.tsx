import React from 'react';
import { G } from 'react-native-svg';

import { ChargeType } from '@lib/reducers';

import renderPanel from './Panel';
import renderDisc from './Disc';
import renderCross, { CrossTypes } from './Cross';
import renderPile, { PileTypes } from './Pile';
import renderCrescent from './Crescent';
import renderDiamond from './Diamond';
import renderStar from './Star';

export enum SimpleTypes {
  Canton = 'Canton',
  Diamond = 'Diamond',
  Disc = 'Disc',
  Panel = 'Panel',
}

export enum ComplexTypes {
  Crescent = 'Crescent',
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
        case SimpleTypes.Diamond:
          return (
            <G id={charge.id} key={charge.id}>
              {renderDiamond(height, width, charge.colour, charge?.percentage)}
            </G>
          );
        case SimpleTypes.Disc:
          return (
            <G id={charge.id} key={charge.id}>
              {renderDisc(
                charge.id,
                height,
                width,
                charge.colour,
                charge.percentage,
                charge.repeatX,
                charge.repeatY,
              )}
            </G>
          );
        case PileTypes.Pile:
        case PileTypes.Inverted:
        case PileTypes.Upright:
          return (
            <G id={charge.id} key={charge.id}>
              {renderPile(
                charge.id,
                height,
                width,
                charge.colour,
                charge.type,
                charge.percentage,
                charge.repeatX,
                charge.repeatY,
              )}
            </G>
          );
        case ComplexTypes.Star:
          return (
            <G id={charge.id} key={charge.id}>
              {renderStar(
                height,
                width,
                charge.colour,
                charge?.percentage,
                charge?.points,
                charge?.rotation,
              )}
            </G>
          );
        case ComplexTypes.Crescent:
          return (
            <G id={charge.id} key={charge.id}>
              {renderCrescent(
                height,
                width,
                charge.colour,
                charge.percentage,
                charge.rotation,
              )}
            </G>
          );
      }
    })}
  </>
);

export const ChargesList = [
  SimpleTypes.Canton,
  SimpleTypes.Diamond,
  SimpleTypes.Panel,
  PileTypes.Pile,
  PileTypes.Upright,
  PileTypes.Inverted,
  CrossTypes.Cross,
  CrossTypes.Nordic,
  CrossTypes.Greek,
  SimpleTypes.Disc,
  ComplexTypes.Star,
  ComplexTypes.Crescent,
];

export { renderCross, renderDisc, renderPile, CrossTypes, PileTypes };
