import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
} from 'react-native';

import Actions from '@lib/actions';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

const width = Math.floor(Dimensions.get('screen').width / 1.2);
const SlideInMenu = ({ style = {}, children }: SlideInMenuProps) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={{ ...style, transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  );
};

type SlideInMenuProps = {
  style?: StyleProp;
  children?: JSX.Element | JSX.Element[];
};

export default ({ ui: { menuOpen }, dispatch }: OwnProps): JSX.Element => (
  <Modal
    transparent={true}
    visible={menuOpen}
    onRequestClose={() =>
      dispatch({
        type: Actions.TOGGLE_MENU,
      })
    }>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        onPress={() =>
          dispatch({
            type: Actions.TOGGLE_MENU,
          })
        }>
        <SlideInMenu style={styles.modalBody}>
          <SafeAreaView>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('res/app_icon.png')} />
            </View>
          </SafeAreaView>
        </SlideInMenu>
      </TouchableOpacity>
    </View>
  </Modal>
);

type OwnProps = {
  ui: { menuOpen: boolean };
  dispatch: (action: ReducerAction) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  background: {
    flex: 1,
  },
  modalBody: {
    flex: 1,
    width: width,
    backgroundColor: colours.white,
    alignItems: 'center',
    transform: [{ translateX: -width }],
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    margin: 20,
  },
});
