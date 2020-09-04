import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WalletScreen from './screens/WalletScreen'
import CategoriesScreen from './screens/CategoriesScreen'


//Redux
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/allReducers';

//import WalletContainer from './containers/WalletContainer'
import AddTransactionScreen from './screens/AddTransactionScreen';
import AddWalletScreen from './screens/AddWalletScreen';
import EditCategoryScreen from './screens/EditCategoryScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import Calculator from './components/Calculator';

import WalletNavigator from './screens/WalletNavigator';

import CategoryNavigator from './screens/CategoryNavigator';

//Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Redux
let store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ activeTintColor: 'blue', keyboardHidesTabBar: true}}>
          <Tab.Screen name="Trang chủ" component={WalletNavigator} options={{title: 'Wallet'}} />
          <Tab.Screen name="Danh mục" component={CategoryNavigator} options={{title: 'Categories'}}/>
          <Tab.Screen name="AddTrans" component={AddTransactionScreen} options={{title: 'Thêm giao dịch'}}/>
          <Tab.Screen name="AddCate" component={AddCategoryScreen} options={{title: 'Thêm Categories'}}/>
          <Tab.Screen name="AddWallet" component={AddWalletScreen} options={{title: 'Thêm ví'}}/>
          <Tab.Screen name="EditCate" component={EditCategoryScreen} options={{title: 'Sửa Categories'}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
