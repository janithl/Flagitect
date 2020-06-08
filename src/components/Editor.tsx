import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';

import {
  ColourSelector,
  FileSaver,
  Footer,
  FooterButton,
  Header,
  Modal,
} from '@components';
import { DivisionList, renderDivisions } from '@lib/divisions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { serialiseSVG } from '@lib/utils';
import colours, { initialColours } from '@res/colours';

const margin = 15;
const width = Math.round(Dimensions.get('window').width - margin * 2);

enum ModalActions {
  SaveFlag = 'Save Flag',
  EditColours = 'Edit Colours',
  None = '',
}

export default (): JSX.Element => {
  const [modalTitle, setModalTitle] = useState(ModalActions.None);
  const [divisionSelected, selectDivision] = useState(1);
  const [proportionSelected, selectProportion] = useState(2);
  const height = Math.round(ProportionsList[proportionSelected].ratio * width);
  const [coloursSelected, selectColours] = useState(initialColours);
  const flag = useRef(null);

  const nextIndex = (currentIndex: number, list: { length: number }): number =>
    currentIndex + 1 === list.length ? 0 : currentIndex + 1;

  const renderFooter = () => (
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
        value={String(coloursSelected.length)}
        onPress={() => setModalTitle(ModalActions.EditColours)}
      />
    </Footer>
  );

  const onSave = (type: FileTypes) => {
    const filename = String(new Date().getTime());
    if (type === FileTypes.PNG) {
      flag.current &&
        flag.current.toDataURL((base64: string) =>
          saveFile(filename, type, base64),
        );
    } else {
      saveFile(filename, type, serialiseSVG(renderFlag()));
    }
  };

  const renderModalBody = () => {
    switch (modalTitle) {
      case ModalActions.EditColours:
        return (
          <ColourSelector
            coloursSelected={coloursSelected}
            selectColours={selectColours}
          />
        );
      case ModalActions.SaveFlag:
        return <FileSaver onSave={onSave} />;
      case ModalActions.None:
      default:
        return <View />;
    }
  };

  const renderFlag = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      ref={flag}
      style={styles.flag}>
      {renderDivisions(
        DivisionList[divisionSelected],
        coloursSelected,
        height,
        width,
      )}
    </Svg>
  );

  return (
    <View style={styles.container}>
      <Header
        title={'Flagitect'}
        onSave={() => setModalTitle(ModalActions.SaveFlag)}
      />
      <View style={styles.editor}>{renderFlag()}</View>
      {renderFooter()}
      <Modal
        visible={modalTitle !== ModalActions.None}
        dismiss={() => setModalTitle(ModalActions.None)}
        title={modalTitle}>
        {renderModalBody()}
      </Modal>
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
