import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M19 12v7H5v-7H3v9h18v-9h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"
      fill={fill}
    />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
