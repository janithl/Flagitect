import React from 'react';
import { StyleSheet, View } from 'react-native';

export default ({ children = [] }: OwnProps): JSX.Element => (
  <View style={styles.row}>
    {React.Children.map(children, (child: JSX.Element) => (
      <View style={styles.column}>{child}</View>
    ))}
  </View>
);

type OwnProps = {
  children?: JSX.Element[] | JSX.Element;
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
