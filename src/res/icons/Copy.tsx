import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default ({ fill, size = 24 }: OwnProps): JSX.Element => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M16 1H2v16h2V3h12V1zm5 4H6v18h15V5zm-2 16H8V7h11v14z"
      fill={fill}
    />
  </Svg>
);

type OwnProps = {
  fill: string;
  size?: number;
};
