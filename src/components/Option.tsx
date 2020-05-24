import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '@components/Text';

export default ({
  id,
  name,
  onPress,
  children = [],
}: OwnProps): JSX.Element => (
  <TouchableOpacity onPress={() => onPress(id)}>
    <View style={styles.option}>
      <View style={styles.icon}>{children}</View>
      <View style={styles.label}>
        <Text H4>{name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

type OwnProps = {
  id: string;
  name: string;
  onPress: (id: string) => void;
  children?: JSX.Element | JSX.Element[];
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 7,
    justifyContent: 'center',
  },
  label: {
    flex: 3,
    justifyContent: 'center',
  },
});
