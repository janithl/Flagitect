import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
  Linking,
} from 'react-native';
import { getVersion } from 'react-native-device-info';

import { ListItem, SectionHeading, Text } from '@components';
import Actions from '@lib/actions';
import { ReducerAction } from '@lib/state';
import colours from '@res/colours';
import { Clear, Link } from '@res/icons';
import { license } from '@res/strings';

const SlideInMenu = ({ style, children }: SlideInMenuProps) => {
  const width = useWindowDimensions().width;
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
  style?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

export default ({ ui: { menuOpen }, dispatch }: OwnProps): JSX.Element => {
  const width = useWindowDimensions().width;
  const toggleMenu = () =>
    dispatch({
      type: Actions.TOGGLE_MENU,
    });

  return (
    <Modal
      transparent={true}
      hardwareAccelerated={true}
      visible={menuOpen}
      onRequestClose={toggleMenu}>
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
                  <Text H1>Flagitect</Text>
                  <Text>{`v${getVersion()}`}</Text>
                </View>
              </View>
              <SectionHeading title="Links" />
              <ListItem
                title="Source Code"
                subtitle="github.com/janithl/Flagitect"
                colour={colours.black}
                icon={<Link fill={colours.black} size={32} />}
                onPress={() =>
                  Linking.openURL('https://github.com/janithl/Flagitect')
                }
              />
              <ListItem
                title="Subreddit"
                subtitle="reddit.com/r/Flagitect"
                colour={colours.black}
                icon={<Link fill={colours.black} size={32} />}
                onPress={() =>
                  Linking.openURL('https://www.reddit.com/r/Flagitect')
                }
              />
              <SectionHeading title="License" />
              <View style={styles.modalContent}>
                <Text>{`Copyright (c) ${new Date().getFullYear()} Flagitect Developers`}</Text>
                <Text textAlign="justify">{license}</Text>
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
