import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Svg } from 'react-native-svg';

import Actions from '@lib/actions';
import { DivisionList, renderDivisions } from '@lib/divisions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { ReducerAction } from '@lib/state';
import { serialiseSVG, addHTML } from '@lib/utils';
import colours from '@res/colours';

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
  flag: { division, proportion, selectedColours },
  ui: { fileType },
}: OwnProps): JSX.Element => {
  const flag = useRef(null);
  const size = calculateSize(
    useWindowDimensions().height,
    useWindowDimensions().width,
    ProportionsList[proportion].ratio,
  );

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
        saveFile(filename, fileType, getSVG());
        break;
      case FileTypes.HTML:
        saveFile(filename, fileType, addHTML(getSVG()));
    }
    dispatch({ type: Actions.SAVE_DONE });
  }, [dispatch, getSVG, fileType]);

  return (
    <View testID="editor" style={styles.editor}>
      {renderFlag()}
    </View>
  );
};

type OwnProps = {
  flag: {
    division: number;
    proportion: number;
    selectedColours: string[];
  };
  ui: {
    fileType: FileTypes;
  };
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
