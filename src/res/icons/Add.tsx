import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={fill} />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
