import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ListItem } from '@components';
import { FileTypes } from '@lib/files';

import colours from '@res/colours';
import { Download } from '@res/icons';

export default ({ onSave }: OwnProps): JSX.Element => (
  <View>
    {/* <SectionHeading title="Save File" />
       <TextInput
        placeholder="Filename"
        value={filename}
        onChangeText={setFilename}
        style={styles.input}
      /></View> */}
    <ListItem
      arrow={false}
      title="Save PNG"
      onPress={() => onSave(FileTypes.PNG)}
      icon={<Download fill={colours.primaryBlue} size={32} />}
    />
    <ListItem
      arrow={false}
      title="Save SVG"
      onPress={() => onSave(FileTypes.SVG)}
      icon={<Download fill={colours.primaryBlue} size={32} />}
    />
    <ListItem
      arrow={false}
      title="Save Webpage"
      onPress={() => onSave(FileTypes.HTML)}
      icon={<Download fill={colours.primaryBlue} size={32} />}
    />
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
