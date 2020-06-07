import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';

import { Footer, FooterButton, Header } from '@components';
import colours from '@res/colours';
import { serialiseSVG } from '@lib/utils';
import { Division, renderDivisions } from '@lib/divisions';

const margin = 20;
const width = Math.round(Dimensions.get('window').width - margin * 2);
const propotions = 2 / 3;
const height = Math.round(propotions * width);

const renderFlag = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={propotions * width}
    width={width}
    style={styles.flag}>
    {renderDivisions(
      Division.Diagonal,
      [colours.black, colours.salmon, colours.beige],
      height,
      width,
    )}
  </Svg>
);

const exportSVG = () => {
  console.log(serialiseSVG(renderFlag()));
};

export default (): JSX.Element => (
  <View style={styles.container}>
    <Header title={'Flagitect'} onShare={exportSVG} />
    <View style={styles.editor}>{renderFlag()}</View>
    <Footer>
      <FooterButton title="Division" value="Solid" />
      <FooterButton title="Proportion" value="2 : 3" />
      <FooterButton title="Colours" value="x" />
    </Footer>
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
