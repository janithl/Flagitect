import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@components';
import Actions from '@lib/actions';
import { ModalActions } from '@lib/reducers';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { Download, Menu } from '@res/icons';

const Header = ({ title, onSave, onOpenMenu }: OwnProps): JSX.Element => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          height: styles.header.height + safeAreaInsets.top,
          paddingTop: safeAreaInsets.top,
        },
      ]}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onOpenMenu}>
          <Menu fill={colours.white} size={32} />
        </TouchableOpacity>
        <Text H2 colour={colours.white}>
          {title}
        </Text>
        <TouchableOpacity onPress={onSave}>
          <Download fill={colours.white} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

type OwnProps = {
  title: string;
  onSave: () => void;
  onOpenMenu: () => void;
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
    onOpenMenu={() =>
      dispatch({
        type: Actions.TOGGLE_MENU,
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
    backgroundColor: colours.salmon,
    height: Platform.OS === 'android' ? 55 : 100,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
