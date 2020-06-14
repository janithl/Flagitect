import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill={fill} />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
