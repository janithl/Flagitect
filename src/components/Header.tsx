import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';
import { Download } from '@res/icons';

export default ({ title, onSave }: OwnProps): JSX.Element => (
  <View style={styles.header}>
    <SafeAreaView style={styles.headerContent}>
      <View />
      <Text H2 colour={colours.white}>
        {title}
      </Text>
      <TouchableOpacity onPress={onSave}>
        <Download fill={colours.white} size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  </View>
);

type OwnProps = {
  title: string;
  onSave: () => void;
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: Platform.OS === 'android' ? 70 : 100,
    backgroundColor: colours.salmon,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
