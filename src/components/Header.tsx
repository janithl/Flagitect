import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from '@components';
import { Actions, ModalActions, ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { Download } from '@res/icons';

const Header = ({ title, onSave }: OwnProps): JSX.Element => (
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

export default Header;

type OwnProps = {
  title: string;
  onSave: () => void;
};

export const EditorHeader = ({ dispatch }: EditorHeaderProps): JSX.Element => (
  <Header
    title={'Flagitect'}
    onSave={() =>
      dispatch({
        type: Actions.SET_MODAL_ACTION,
        payload: ModalActions.SaveFlag,
      })
    }
  />
);

type EditorHeaderProps = {
  dispatch: (action: ReducerAction) => void;
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
