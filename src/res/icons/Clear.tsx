import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
      fill={fill}
    />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
