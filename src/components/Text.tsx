import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colours from '@res/colours';

export default ({
  H1 = false,
  H2 = false,
  H3 = false,
  H4 = false,
  H5 = false,
  colour,
  children = [],
}: OwnProps): JSX.Element => {
  let style = styles.paragraph;
  if (H1) {
    style = styles.heading1;
  }
  if (H2) {
    style = styles.heading2;
  }
  if (H3) {
    style = styles.heading3;
  }
  if (H4) {
    style = styles.heading4;
  }
  if (H5) {
    style = styles.heading5;
  }

  const textStyle = colour ? [style, { color: colour }] : style;
  return <Text style={textStyle}>{children}</Text>;
};

type OwnProps = {
  H1?: boolean;
  H2?: boolean;
  H3?: boolean;
  H4?: boolean;
  H5?: boolean;
  colour?: string;
  children?: JSX.Element[] | JSX.Element | string;
};

const styles = StyleSheet.create({
  heading1: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 38,
    color: colours.black,
  },
  heading2: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 32,
    color: colours.black,
  },
  heading3: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 26,
    color: colours.black,
  },
  heading4: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 20,
    color: colours.black,
  },
  heading5: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 16,
    color: colours.black,
  },
  paragraph: {
    fontFamily: 'FiraSans-Regular',
    fontSize: 14,
    color: colours.black,
  },
});
