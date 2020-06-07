import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { G, Svg, Rect } from 'react-native-svg';

import { Footer, Header } from '@components';
import colours from '@res/colours';
import { serialiseSVG } from '@lib/utils';

const margin = 20;
const width = Math.round(Dimensions.get('window').width - margin * 2);
const propotions = 2 / 3;
const height = Math.round(propotions * width);

const renderHorizontalDivisions = (divColours: string[]) => {
  const divHeight = height / divColours.length;
  return (
    <G>
      {divColours.map((colour: string, i: number) => (
        <Rect
          x="0"
          y={i * divHeight}
          height={divHeight}
          width={width}
          fill={colour}
          key={i}
        />
      ))}
    </G>
  );
};

const renderFlag = () => (
  <Svg height={propotions * width} width={width} style={styles.flag}>
    {renderHorizontalDivisions([colours.black, colours.salmon, colours.beige])}
  </Svg>
);

const exportSVG = () => {
  console.log(serialiseSVG(renderFlag()));
};

export default (): JSX.Element => (
  <View style={styles.container}>
    <Header title={'Flagitect'} onShare={exportSVG} />
    <View style={styles.editor}>{renderFlag()}</View>
    <Footer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    margin: 10,
    alignItems: 'center',
  },
  slider: {
    width: 150,
    height: 50,
  },
  editor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    backgroundColor: colours.offWhite,
  },
});
