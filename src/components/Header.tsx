import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';

export default ({ title, onShare }: OwnProps): JSX.Element => (
  <View style={styles.header}>
    <SafeAreaView>
      <Button onPress={onShare} title="Share" />
      <Text H2 colour={colours.white}>
        {title}
      </Text>
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
    height: 100,
    backgroundColor: colours.salmon,
  },
});
