import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';

export default ({ title }: OwnProps): JSX.Element => (
  <View style={styles.header}>
    <SafeAreaView>
      <Text H2 colour={colours.white}>
        {title}
      </Text>
    </SafeAreaView>
  </View>
);

type OwnProps = {
  title: string;
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 100,
    backgroundColor: colours.salmon,
  },
});
