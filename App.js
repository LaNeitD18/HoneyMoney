import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wallet from './screens/WalletScreen'
import Categories from './screens/CategoriesScreen'

//Redux
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/allReducers';

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
          <Tab.Screen name="Trang chủ" component={Wallet} options={{tittle: 'Wallet'}} />
          <Tab.Screen name="Danh mục" component={Categories} options={{tittle: 'Categories'}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
