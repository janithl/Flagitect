import React, { useEffect, useRef, useState } from 'react';
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
import { Actions, ReducerAction } from '@components/AppState';
import { DivisionList, renderDivisions } from '@lib/divisions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { serialiseSVG, addHTML } from '@lib/utils';
import colours from '@res/colours';

enum ModalActions {
  SaveFlag = 'Save Flag',
  EditColours = 'Edit Colours',
  None = '',
}

const isPortrait = () =>
  Dimensions.get('window').height > Dimensions.get('window').width;
const margin = { vertical: 100, horizontal: 15 };
const initialSize = () => ({
  height: Math.round(Dimensions.get('window').height - margin.vertical * 2),
  width: Math.round(Dimensions.get('window').width - margin.horizontal * 2),
});

export default ({
  dispatch,
  division,
  proportion,
  selectedColours,
}: OwnProps): JSX.Element => {
  const [modalTitle, setModalTitle] = useState(ModalActions.None);
  const [size, setSize] = useState(initialSize());
  const flag = useRef(null);

  const calculateSize = () => {
    if (isPortrait()) {
      setSize({
        height: Math.round(
          initialSize().width * ProportionsList[proportion].ratio,
        ),
        width: initialSize().width,
      });
    } else {
      setSize({
        height: initialSize().height,
        width: Math.round(
          initialSize().height / ProportionsList[proportion].ratio,
        ),
      });
    }
  };

  /** call calculate size on orientation and proportion changes */
  Dimensions.addEventListener('change', calculateSize);
  useEffect(calculateSize, [proportion]);

  const renderFooter = () => (
    <Footer>
      <FooterButton
        title="Division"
        value={DivisionList[division]}
        onPress={() => dispatch({ type: Actions.INCREMENT_DIVISION })}
      />
      <FooterButton
        title="Proportion"
        value={ProportionsList[proportion].name}
        onPress={() => dispatch({ type: Actions.INCREMENT_PROPORTION })}
      />
      <FooterButton
        title="Colours"
        value={String(selectedColours.length)}
        onPress={() => setModalTitle(ModalActions.EditColours)}
      />
    </Footer>
  );

  const onSave = (type: FileTypes) => {
    const filename = String(new Date().getTime());
    switch (type) {
      case FileTypes.PNG:
        flag.current &&
          flag.current.toDataURL((base64: string) =>
            saveFile(filename, type, base64),
          );
        break;
      case FileTypes.SVG:
        saveFile(filename, type, serialiseSVG(renderFlag()));
        break;
      case FileTypes.HTML:
        saveFile(filename, type, addHTML(serialiseSVG(renderFlag())));
    }
  };

  const renderModalBody = () => {
    switch (modalTitle) {
      case ModalActions.EditColours:
        return (
          <ColourSelector
            selectedColours={selectedColours}
            dispatch={dispatch}
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
      height={size.height}
      width={size.width}
      ref={flag}
      fill={colours.white}>
      {renderDivisions(
        DivisionList[division],
        selectedColours,
        size.height,
        size.width,
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

type OwnProps = {
  division: number;
  proportion: number;
  selectedColours: string[];
  dispatch: (action: ReducerAction) => void;
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
});
