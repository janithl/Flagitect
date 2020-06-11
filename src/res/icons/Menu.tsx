import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={fill} />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
