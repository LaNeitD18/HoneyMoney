import { StatusBar } from 'expo-status-bar';
import {NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screen/HomeScreen'
import TransactionScreen from './screen/TransactionScreen'
import {WalletScreen} from './screens/WalletScreen'
import Categories from './screens/CategoriesScreen'


//Redux
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/allReducers';

import WalletContainer from './containers/WalletContainer'
import AddTransactionScreen from './screens/AddTransactionScreen';
import AddWalletScreen from './screens/AddWalletScreen';
import EditCategoryScreen from './screens/EditCategoryScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';


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
          <Tab.Screen name="Trang chủ" component={WalletContainer} options={{tittle: 'Wallet'}} />
          <Tab.Screen name="Danh mục" component={Categories} options={{tittle: 'Categories'}}/>
          <Tab.Screen name="AddTrans" component={AddTransactionScreen} options={{tittle: 'Thêm giao dịch'}}/>
          <Tab.Screen name="AddCate" component={AddCategoryScreen} options={{tittle: 'Thêm Categories'}}/>
          <Tab.Screen name="AddWallet" component={AddWalletScreen} options={{tittle: 'Thêm ví'}}/>
          <Tab.Screen name="EditCate" component={EditCategoryScreen} options={{tittle: 'Sửa Categories'}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
