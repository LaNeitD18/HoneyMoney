import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screen/HomeScreen'
import TransactionScreen from './screen/TransactionScreen'
import Wallet from './screens/Wallet'
import Categories from './screens/Categories'

//Redux
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/allReducers';
import SampleContainer from './containers/SampleContainer';

//Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Redux
let store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ activeTintColor: 'blue' }}>
          <Tab.Screen name="Home" component={Wallet} options={{tittle: 'Wallet'}} />
          <Tab.Screen name="Transaction" component={Categories} options={{tittle: 'Categories'}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
