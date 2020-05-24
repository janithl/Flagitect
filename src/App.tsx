import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

import { ScreenConstants } from '@screens';
import SelectDivisions from '@screens/SelectDivisions';
import SetPropotions from '@screens/SetPropotions';
import SetCustomPropotions from '@screens/SetCustomPropotions';
import colours from '@res/colours';
import {
  Vertical,
  Horizontal,
  Diagonal,
  PerSaltire,
  Checked,
} from '@res/layouts';

const HomeScreen = ({ navigation }): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Home</Text>
    <Button title="View Flags" onPress={() => navigation.navigate('Flags')} />
    <Button
      title="Select Divisions"
      onPress={() => navigation.navigate(ScreenConstants.SELECT_DIVISIONS)}
    />
  </SafeAreaView>
);

const FlagsScreen = ({ navigation }): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Flags</Text>
    <Vertical size={128} />
    <Horizontal size={128} />
    <PerSaltire size={128} />
    <Checked size={128} />
    <Diagonal size={128} />
    <Diagonal
      size={128}
      toLeft={false}
      divColours={[colours.beige, colours.salmon]}
    />
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  </SafeAreaView>
);

const Stack = createStackNavigator();
export default (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Create New"
            />
          ),
        }}
      />
      <Stack.Screen name="Flags" component={FlagsScreen} />
      <Stack.Screen
        name={ScreenConstants.SELECT_DIVISIONS}
        component={SelectDivisions}
      />
      <Stack.Screen
        name={ScreenConstants.SET_PROPOTIONS}
        component={SetPropotions}
      />
      <Stack.Screen
        name={ScreenConstants.SET_CUSTOM_PROPOTIONS}
        component={SetCustomPropotions}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  heading: {
    fontFamily: 'FiraSans-ExtraBold',
    fontSize: 36,
    color: colours.salmon,
  },
});
