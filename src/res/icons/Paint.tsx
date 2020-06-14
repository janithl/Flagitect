import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import colours from '@res/colours';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Circle r={12} x={12} y={12} fill={fill} stroke={colours.grey} />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
