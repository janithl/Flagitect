import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import Actions from '@lib/actions';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';

const menuPercentage = 90 / 100;

const SlideInMenu = ({ style, children }: SlideInMenuProps) => {
  const width = Math.floor(useWindowDimensions().width * menuPercentage);
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={[style, { transform: [{ translateX }] }]}>
      {children}
    </Animated.View>
  );
};

type SlideInMenuProps = {
  style?: StyleProp<View>;
  children?: JSX.Element | JSX.Element[];
};

export default ({ ui: { menuOpen }, dispatch }: OwnProps): JSX.Element => {
  const width = Math.floor(useWindowDimensions().width * menuPercentage);
  return (
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
          <SlideInMenu
            style={[
              styles.modalBody,
              {
                width,
                transform: [{ translateX: -width }],
              },
            ]}>
            <SafeAreaView>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('res/app_icon.png')}
                />
              </View>
            </SafeAreaView>
          </SlideInMenu>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
    backgroundColor: colours.white,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    margin: 20,
  },
});
