import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { getVersion } from 'react-native-device-info';

import { SectionHeading, Text } from '@components';
import Actions from '@lib/actions';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { Clear } from '@res/icons';

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
  const toggleMenu = () =>
    dispatch({
      type: Actions.TOGGLE_MENU,
    });

  return (
    <Modal transparent={true} visible={menuOpen} onRequestClose={toggleMenu}>
      <View style={styles.container}>
        <SlideInMenu
          style={[
            styles.modalBody,
            {
              width,
              transform: [{ translateX: -width }],
            },
          ]}>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={toggleMenu}>
                  <Clear fill={colours.black} size={32} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={require('res/app_icon.png')}
                  />
                </View>
                <View style={styles.title}>
                  <Text H1>{`Flagitect ${getVersion()}`}</Text>
                </View>
              </View>
              <SectionHeading title={'License'} />
              <View style={styles.modalContent}>
                <Text>{`Copyright (c) ${new Date().getFullYear()} Flagitect Developers`}</Text>
                <Text />
                <Text>
                  Permission is hereby granted, free of charge, to any person
                  obtaining a copy of this software and associated documentation
                  files (the "Software"), to deal in the Software without
                  restriction, including without limitation the rights to use,
                  copy, modify, merge, publish, distribute, sublicense, and/or
                  sell copies of the Software, and to permit persons to whom the
                  Software is furnished to do so, subject to the following
                  conditions:
                </Text>
                <Text />
                <Text>
                  The above copyright notice and this permission notice shall be
                  included in all copies or substantial portions of the
                  Software.
                </Text>
                <Text />
                <Text>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </SlideInMenu>
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
  modalBody: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
  },
  logo: {
    width: 240,
    height: 240,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
  },
});
