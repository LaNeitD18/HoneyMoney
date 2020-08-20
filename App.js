import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screen/HomeScreen'
import TransactionScreen from './screen/TransactionScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ activeTintColor: 'blue' }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tittle: 'Home'}} />
        <Tab.Screen name="Transaction" component={TransactionScreen} options={{tittle: 'Transaction'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
