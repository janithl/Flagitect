import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';

import { Text } from '@components';
import colours from '@res/colours';
import { Clear } from '@res/icons';

export default ({
  visible,
  dismiss,
  title,
  children,
}: OwnProps): JSX.Element => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={dismiss}>
    <TouchableOpacity style={styles.modalEmpty} onPress={dismiss} />
    <View style={styles.modalBody}>
      <View style={styles.modalHeading}>
        <View style={styles.modalHeadingContent}>
          <Text colour={colours.white} H4>
            {title}
          </Text>
        </View>
        <TouchableOpacity style={styles.modalHeadingContent} onPress={dismiss}>
          <Clear fill={colours.white} size={28} />
        </TouchableOpacity>
      </View>

      {children}
    </View>
  </Modal>
);

type OwnProps = {
  visible: boolean;
  dismiss: () => void;
  title: string;
  children?: JSX.Element;
};

const styles = StyleSheet.create({
  modalEmpty: {
    flex: 3,
  },
  modalBody: {
    flex: 5,
    backgroundColor: colours.white,
  },
  modalHeading: {
    padding: 10,
    backgroundColor: colours.primaryBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeadingContent: {
    padding: 10,
  },
});
