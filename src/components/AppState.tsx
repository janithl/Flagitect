import React, { Children, cloneElement, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { DivisionList } from '@lib/divisions';
import { ProportionsList } from '@lib/proportions';
import { initialColours } from '@res/colours';

const initialState = {
  division: 2,
  proportion: 2,
  selectedColours: initialColours,
};

export enum Actions {
  INCREMENT_DIVISION = 'INCREMENT_DIVISION',
  INCREMENT_PROPORTION = 'INCREMENT_PROPORTION',
  ADD_COLOUR = 'ADD_COLOUR',
  REMOVE_COLOUR = 'REMOVE_COLOUR',
  REHYDRATE_STATE = 'REHYDRATE_STATE',
}

export type ReducerAction = {
  type: string;
  payload?: string | number;
};

export type StateType = {
  division: number;
  proportion: number;
  selectedColours: string[];
};

const nextIndex = (currentIndex: number, list: { length: number }): number =>
  currentIndex + 1 === list.length ? 0 : currentIndex + 1;

const minimumColours = 2;

const reducer = (state: StateType, action: ReducerAction): StateType => {
  if (__DEV__) {
    console.log(state, action);
  }

  switch (action.type) {
    case Actions.INCREMENT_DIVISION:
      return {
        ...state,
        division: nextIndex(state.division, DivisionList),
      };
    case Actions.INCREMENT_PROPORTION:
      return {
        ...state,
        proportion: nextIndex(state.proportion, ProportionsList),
      };
    case Actions.ADD_COLOUR:
      return {
        ...state,
        selectedColours: [...state.selectedColours, String(action.payload)],
      };
    case Actions.REMOVE_COLOUR:
      if (state.selectedColours.length === minimumColours) {
        return state;
      }

      return {
        ...state,
        selectedColours: state.selectedColours.filter(
          (_, index) => index !== Number(action.payload),
        ),
      };
    case Actions.REHYDRATE_STATE:
      return action.payload;
    default:
      return state;
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@app_state');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const storeData = async (state: StateType) => {
  try {
    await AsyncStorage.setItem('@app_state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export default ({ children }: OwnProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getData().then(
      (payload) =>
        payload && dispatch({ type: Actions.REHYDRATE_STATE, payload }),
    );
  }, []);

  useEffect(() => {
    storeData(state);
  }, [state]);

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, { ...state, dispatch }),
      )}
    </>
  );
};

type OwnProps = {
  children: JSX.Element[] | JSX.Element;
};
