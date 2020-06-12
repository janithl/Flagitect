import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from '@components';
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
    <Button onPress={() => onSave(FileTypes.PNG)}>
      <Text colour={colours.white} H4>
        Save PNG
      </Text>
    </Button>
    <Button onPress={() => onSave(FileTypes.SVG)}>
      <Text colour={colours.white} H4>
        Save SVG
      </Text>
    </Button>
    <Button onPress={() => onSave(FileTypes.HTML)}>
      <Text colour={colours.white} H4>
        Save Webpage
      </Text>
    </Button>
  </View>
);

type OwnProps = {
  onSave: (type: FileTypes) => void;
};

const styles = StyleSheet.create({
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
