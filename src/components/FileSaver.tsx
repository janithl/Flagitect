import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@components';
import { FileTypes } from '@lib/files';

import colours from '@res/colours';

export default ({ onSave }: OwnProps): JSX.Element => (
  <View>
    {/* <SectionHeading title="Save File" />
       <TextInput
        placeholder="Filename"
        value={filename}
        onChangeText={setFilename}
        style={styles.input}
      /></View> */}
    <TouchableOpacity
      onPress={() => onSave(FileTypes.PNG)}
      style={styles.button}>
      <Text colour={colours.white} H4>
        Save PNG
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onSave(FileTypes.SVG)}
      style={styles.button}>
      <Text colour={colours.white} H4>
        Save SVG
      </Text>
    </TouchableOpacity>
  </View>
);

type OwnProps = {
  onSave: (type: FileTypes) => void;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colours.primaryBlue,
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 20,
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
