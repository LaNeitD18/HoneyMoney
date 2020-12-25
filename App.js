import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import WalletScreen from "./screens/WalletScreen";
import CategoriesScreen from "./screens/CategoriesScreen";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";

import allReducers from "./reducers/allReducers";

//import WalletContainer from './containers/WalletContainer'
import AddTransactionScreen from "./screens/AddTransactionScreen";
import AddWalletScreen from "./screens/AddWalletScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import Calculator from "./components/Calculator";

import WalletNavigator from "./screens/WalletNavigator";

import CategoryNavigator from "./screens/CategoryNavigator";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ReportScreen from "./screens/ReportScreen";

//Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Redux
let store = createStore(allReducers);

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <WalletNavigator/>
            </NavigationContainer>
            
        </Provider>
    );
}
