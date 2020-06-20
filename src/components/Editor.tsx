import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { G, Rect, Svg } from 'react-native-svg';

import Actions from '@lib/actions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { ChargeType, ModalActions, openModal } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import { addHTML, addXML, share, serialiseSVG } from '@lib/utils';
import renderCharges from '@res/charges';
import colours from 'res/colours';
import renderDivisions, { DivisionList } from '@res/divisions';

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
  const screenCanvas = calculateSize(
    useWindowDimensions().height,
    useWindowDimensions().width,
    ProportionsList[proportion].ratio,
  );
  const exportCanvas = {
    height: 1920 * ProportionsList[proportion].ratio,
    width: 1920,
  };

  const renderFlag = (height: number, width: number) => {
    const borderPercentage = border.heightPercentage / 100;
    const borderWidth = Math.floor(height * borderPercentage);

    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        viewBox={[0, 0, width, height].join(' ')}
        ref={flag}>
        <Rect height={height} width={width} fill={border.colour} />
        <G transform={`translate(${borderWidth},${borderWidth})`}>
          {renderDivisions(
            DivisionList[division],
            selectedColours,
            height - borderWidth * 2,
            width - borderWidth * 2,
          )}
          {renderCharges(
            Object.values(charges),
            height - borderWidth * 2,
            width - borderWidth * 2,
          )}
        </G>
      </Svg>
    );
  };

  const getSVG = useCallback(
    () => serialiseSVG(renderFlag(exportCanvas.height, exportCanvas.width)),
    [division, selectedColours, exportCanvas],
  );

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
      {renderFlag(screenCanvas.height, screenCanvas.width)}
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
