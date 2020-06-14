import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@components';
import { Right } from '@res/icons';
import colours from '@res/colours';

export default ({
  title,
  subtitle,
  colour = colours.primaryBlue,
  arrow = true,
  onPress,
  icon,
}: OwnProps): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.label}>
      <Text colour={colour} H4>
        {title}
      </Text>
      {subtitle && <Text colour={colour}>{subtitle}</Text>}
    </View>
    <View style={styles.icon}>
      {arrow && <Right fill={colour} size={48} />}
    </View>
  </TouchableOpacity>
);

type OwnProps = {
  onPress: () => void;
  title: string;
  subtitle?: string;
  colour?: string;
  icon?: JSX.Element;
  arrow?: boolean;
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colours.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
  },
  label: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
