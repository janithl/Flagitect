import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';

import { Footer, FooterButton, Header, Modal } from '@components';
import colours from '@res/colours';
import { serialiseSVG } from '@lib/utils';
import { DivisionList, renderDivisions } from '@lib/divisions';
import { ProportionsList } from 'lib/proportions';

const margin = 15;
const width = Math.round(Dimensions.get('window').width - margin * 2);

export default (): JSX.Element => {
  const [divisionSelected, selectDivision] = useState(0);
  const [proportionSelected, selectProportion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const height = Math.round(ProportionsList[proportionSelected].ratio * width);

  const renderFlag = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      style={styles.flag}>
      {renderDivisions(
        DivisionList[divisionSelected],
        [colours.black, colours.salmon, colours.beige],
        height,
        width,
      )}
    </Svg>
  );

  const exportSVG = () => {
    console.log(serialiseSVG(renderFlag()));
  };

  const nextIndex = (currentIndex: number, list: { length: number }): number =>
    currentIndex + 1 === list.length ? 0 : currentIndex + 1;

  return (
    <View style={styles.container}>
      <Header title={'Flagitect'} onShare={exportSVG} />
      <View style={styles.editor}>{renderFlag()}</View>
      <Footer>
        <FooterButton
          title="Division"
          value={DivisionList[divisionSelected]}
          onPress={() =>
            selectDivision(nextIndex(divisionSelected, DivisionList))
          }
        />
        <FooterButton
          title="Proportion"
          value={ProportionsList[proportionSelected].name}
          onPress={() =>
            selectProportion(nextIndex(proportionSelected, ProportionsList))
          }
        />
        <FooterButton
          title="Colours"
          value="x"
          onPress={() => setModalVisible(true)}
        />
      </Footer>
      <Modal
        visible={modalVisible}
        dismiss={() => setModalVisible(false)}
        title="Edit Colours"
      />
    </View>
  );
};

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
