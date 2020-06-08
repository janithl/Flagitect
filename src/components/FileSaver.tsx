import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Row, SectionHeading, Text } from '@components';
import { saveFile, FileTypes } from '@lib/files';
import colours from '@res/colours';

const fileTypes = [FileTypes.PNG, FileTypes.SVG];

export default ({ content }: OwnProps): JSX.Element => {
  const [filename, setFilename] = useState('');

  const onClickSave = (filetype: FileTypes) =>
    saveFile(filename.toLowerCase().trim(), filetype, content);

  const validate = filename.trim().length > 0;

  return (
    <ScrollView>
      <SectionHeading title="Save File" />
      <TextInput
        placeholder="Filename"
        value={filename}
        onChangeText={setFilename}
        style={styles.input}
      />
      <Row>
        {fileTypes.map((fileType: FileTypes) => (
          <TouchableOpacity
            key={fileType}
            onPress={() => onClickSave(fileType)}
            disabled={!validate}
            style={[
              styles.button,
              validate ? styles.buttonEnabled : styles.buttonDisabled,
            ]}>
            <Text colour={colours.white} H4>{`Save ${fileType}`}</Text>
          </TouchableOpacity>
        ))}
      </Row>
    </ScrollView>
  );
};

type OwnProps = {
  content: string;
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    paddingVertical: 8,
    borderRadius: 12,
    margin: 10,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: colours.primaryBlue,
  },
  buttonDisabled: {
    backgroundColor: colours.grey,
  },
  input: {
    padding: 8,
    margin: 10,
    fontFamily: 'FiraSans-Regular',
    fontSize: 32,
    lineHeight: 36,
    color: colours.primaryBlue,
    borderBottomColor: colours.primaryBlue,
    borderBottomWidth: 2,
  },
});
