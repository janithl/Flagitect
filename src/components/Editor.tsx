import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { G, Rect, Svg } from 'react-native-svg';

import Actions from '@lib/actions';
import { DivisionList, renderDivisions } from '@lib/divisions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { addHTML, addXML, share, serialiseSVG } from '@lib/utils';
import renderCharges from '@res/charges';
import colours from 'res/colours';

const margins = {
  vertical: Platform.OS === 'android' ? 75 : 100,
  horizontal: 10,
};

/** calculate the flag size */
const calculateSize = (
  screenHeight: number,
  screenWidth: number,
  ratio: number,
) => {
  const size = {
    height: screenHeight - margins.vertical * 2,
    width: screenWidth - margins.horizontal * 2,
  };

  if (screenHeight > screenWidth) {
    /** Portrait mode */
    size.height = Math.round(size.width * ratio);
  } else {
    /** Landscape mode */
    size.width = Math.round(size.height / ratio);
  }

  return size;
};

export default ({
  dispatch,
  flag: { border, division, proportion, selectedColours },
  ui: { fileType, modalAction },
  charges,
}: OwnProps): JSX.Element => {
  const flag = useRef(null);
  const size = calculateSize(
    useWindowDimensions().height,
    useWindowDimensions().width,
    ProportionsList[proportion].ratio,
  );
  const borderWidth = Math.floor((size.height * border.heightPercentage) / 100);

  const renderFlag = () => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={size.height}
      width={size.width}
      ref={flag}>
      <Rect height={size.height} width={size.width} fill={border.colour} />
      <G translate={borderWidth}>
        {renderDivisions(
          DivisionList[division],
          selectedColours,
          size.height - borderWidth * 2,
          size.width - borderWidth * 2,
        )}
        {renderCharges(
          Object.values(charges),
          size.height - borderWidth * 2,
          size.width - borderWidth * 2,
        )}
      </G>
    </Svg>
  );

  const getSVG = useCallback(() => serialiseSVG(renderFlag()), [
    division,
    selectedColours,
    size,
  ]);

  useEffect(() => {
    if (fileType === FileTypes.NONE) return;

    const filename = String(new Date().getTime());
    switch (fileType) {
      case FileTypes.PNG:
        flag.current &&
          flag.current.toDataURL((base64: string) =>
            saveFile(filename, fileType, base64),
          );
        break;
      case FileTypes.SVG:
        share(addXML(getSVG()));
        break;
      case FileTypes.HTML:
        saveFile(filename, fileType, addHTML(getSVG()));
    }
    if (Platform.OS === 'ios') {
      openModal(dispatch, ModalActions.None);
    }
    dispatch({ type: Actions.SAVE_DONE });
  }, [dispatch, getSVG, fileType]);

  return (
    <View
      testID="editor"
      style={[
        styles.editor,
        modalAction === ModalActions.None ? null : styles.editorSmall,
      ]}>
      {renderFlag()}
    </View>
  );
};

type OwnProps = {
  flag: {
    border: {
      colour: string;
      heightPercentage: number;
    };
    division: number;
    proportion: number;
    selectedColours: string[];
  };
  ui: {
    fileType: FileTypes;
    modalAction: ModalActions;
  };
  charges: {
    [key: string]: ChargeType;
  };
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colours.grey,
    justifyContent: 'center',
    paddingTop: 5,
  },
  editorSmall: {
    justifyContent: 'flex-start',
  },
});
