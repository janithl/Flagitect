import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Actions from '@lib/actions';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

export default ({ menuOpen, dispatch }: OwnProps): JSX.Element => (
  <Modal
    transparent={true}
    visible={menuOpen}
    onRequestClose={() =>
      dispatch({
        type: Actions.TOGGLE_MENU,
      })
    }>
    <View style={styles.container}>
      <View style={styles.modalBody}>
        <SafeAreaView>
          <Image style={styles.logo} source={require('res/app_icon.png')} />
        </SafeAreaView>
      </View>
      <TouchableOpacity
        style={styles.modalEmpty}
        onPress={() =>
          dispatch({
            type: Actions.TOGGLE_MENU,
          })
        }
      />
    </View>
  </Modal>
);

type OwnProps = {
  menuOpen: boolean;
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBody: {
    flex: 2,
    backgroundColor: colours.white,
    alignItems: 'center',
  },
  modalEmpty: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  logo: {
    width: 100,
    height: 100,
    padding: 20,
  },
});
