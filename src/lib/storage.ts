import AsyncStorage from '@react-native-community/async-storage';

import { StateType } from '@lib/state';

export const getState = async (): Promise<StateType | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@app_state');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const storeState = async (state: StateType): Promise<void> => {
  try {
    await AsyncStorage.setItem('@app_state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};
