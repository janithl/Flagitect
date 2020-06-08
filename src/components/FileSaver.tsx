import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SectionHeading, Text } from '@components';
import colours from 'res/colours';

export default ({ onSave }: OwnProps): JSX.Element => {
  const [filename, setFilename] = useState('');

  return (
    <ScrollView>
      <SectionHeading title="Save File" />
      <TextInput
        placeholder="Filename"
        value={filename}
        onChangeText={setFilename}
        style={styles.input}
      />
      <TouchableOpacity onPress={() => onSave(filename)} style={styles.button}>
        <Text colour={colours.white} H4>
          Save SVG
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

type OwnProps = {
  onSave: (filename: string) => void;
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colours.primaryBlue,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    padding: 8,
    margin: 10,
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 32,
    color: colours.primaryBlue,
  },
});
