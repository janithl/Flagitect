import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" fill={fill} />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
