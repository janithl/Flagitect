import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';

import { DivisionList, renderDivisions } from '@lib/divisions';
import { saveFile, FileTypes } from '@lib/files';
import { ProportionsList } from '@lib/proportions';
import { ReducerAction, Actions } from '@lib/state';
import { serialiseSVG, addHTML } from '@lib/utils';
import colours from '@res/colours';

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
  fileType,
  proportion,
  selectedColours,
}: OwnProps): JSX.Element => {
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

  return <View style={styles.editor}>{renderFlag()}</View>;
};

type OwnProps = {
  division: number;
  fileType: FileTypes;
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
