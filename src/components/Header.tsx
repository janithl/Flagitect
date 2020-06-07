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
import { Share } from '@res/icons';

export default ({ title, onShare }: OwnProps): JSX.Element => (
  <View style={styles.header}>
    <SafeAreaView style={styles.headerContent}>
      <View />
      <Text H2 colour={colours.white}>
        {title}
      </Text>
      <TouchableOpacity onPress={onShare}>
        <Share fill={colours.white} />
      </TouchableOpacity>
    </SafeAreaView>
  </View>
);

type OwnProps = {
  title: string;
  onShare: () => void;
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
