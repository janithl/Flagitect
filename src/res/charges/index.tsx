import React from 'react';
import { Defs, G, Pattern, Rect } from 'react-native-svg';

import { ChargeType } from '@lib/reducers';
import { toDP } from '@lib/utils';

import renderPanel from './Panel';
import renderDisc from './Disc';
import renderBend, { BendTypes } from './Bend';
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

export type Charges =
  | SimpleTypes
  | BendTypes
  | CrossTypes
  | PileTypes
  | ComplexTypes;

export default (
  charges: ChargeType[],
  height: number,
  width: number,
): JSX.Element => (
  <>
    {charges.map((charge: ChargeType) => {
      let chargeElement = renderCharge(charge, height, width);
      if (Number(charge.repeatX) > 1 || Number(charge.repeatY) > 1) {
        chargeElement = repeatCharge(
          chargeElement,
          charge.id,
          height,
          width,
          charge.repeatX,
          charge.repeatY,
        );
      }
      return (
        <G id={`charge-${charge.id}`} key={charge.id}>
          {chargeElement}
        </G>
      );
    })}
  </>
);

export const renderCharge = (
  charge: ChargeType,
  height: number,
  width: number,
): JSX.Element => {
  switch (charge?.type) {
    case CrossTypes.Cross:
    case CrossTypes.Greek:
    case CrossTypes.Nordic:
      return renderCross(
        height,
        width,
        charge.colour,
        charge.thickness,
        charge.percentage,
        charge.type,
      );
    case SimpleTypes.Canton:
    case SimpleTypes.Panel:
      return renderPanel(
        height,
        width,
        charge.colour,
        charge.percentage,
        charge.type === SimpleTypes.Canton,
      );
    case SimpleTypes.Diamond:
      return renderDiamond(height, width, charge.colour, charge.percentage);
    case SimpleTypes.Disc:
      return renderDisc(height, width, charge.colour, charge.percentage);
    case PileTypes.Pile:
    case PileTypes.Inverted:
    case PileTypes.Upright:
      return renderPile(
        height,
        width,
        charge.colour,
        charge.type,
        charge.percentage,
      );
    case ComplexTypes.Star:
      return renderStar(
        height,
        width,
        charge.colour,
        charge.percentage,
        charge.points,
        charge.rotation,
      );
    case ComplexTypes.Crescent:
      return renderCrescent(
        height,
        width,
        charge.colour,
        charge.percentage,
        charge.rotation,
      );
    case BendTypes.Bend:
    case BendTypes.Enhanced:
    case BendTypes.Reduced:
      return renderBend(
        height,
        width,
        charge.colour,
        charge.type,
        charge.thickness,
        charge.flip,
      );
    case CrossTypes.Saltire:
      return (
        <>
          {renderBend(
            height,
            width,
            charge.colour,
            BendTypes.Bend,
            charge.thickness,
          )}
          {renderBend(
            height,
            width,
            charge.colour,
            BendTypes.Bend,
            charge.thickness,
            true,
          )}
        </>
      );
    default:
      return <G />;
  }
};

export const repeatCharge = (
  charge: JSX.Element,
  id: string,
  height: number,
  width: number,
  repeatX = 1,
  repeatY = 1,
): JSX.Element => (
  <>
    <Defs>
      <Pattern
        id={id}
        viewBox={[0, 0, width, height].join(' ')}
        height={`${toDP(100 / repeatY, 2)}%`}
        width={`${toDP(100 / repeatX, 2)}%`}>
        {charge}
      </Pattern>
    </Defs>
    <Rect height={height} width={width} x={0} y={0} fill={`url(#${id})`} />
  </>
);

export const ChargesList = [
  SimpleTypes.Canton,
  SimpleTypes.Diamond,
  SimpleTypes.Panel,
  BendTypes.Bend,
  BendTypes.Enhanced,
  BendTypes.Reduced,
  PileTypes.Pile,
  PileTypes.Upright,
  PileTypes.Inverted,
  CrossTypes.Cross,
  CrossTypes.Nordic,
  CrossTypes.Greek,
  CrossTypes.Saltire,
  SimpleTypes.Disc,
  ComplexTypes.Star,
  ComplexTypes.Crescent,
];

export {
  renderCross,
  renderDisc,
  renderPile,
  BendTypes,
  CrossTypes,
  PileTypes,
};
