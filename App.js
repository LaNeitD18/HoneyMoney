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
import TransactionsScreen from "./screens/TransactionsScreen";
import SettingScreen from "./screens/SettingScreens";
import ReportScreen from "./screens/ReportScreen";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import {
    String,
    ScreenView,
    Card,
    Divider,
    Heading,
    RowLeft,
    Number,
    NegativeNumber,
    Wallet,
    colors,
    sizeFactor,
    styles,
    KindSelect,
    Title,
    Category,
    TouchableText,
    ScrollSelect,
    CategoryTable,
    windowWidth,
    windowHeight,
    Heading2,
    OutlineButton,
    Row,
    HeadlessCard,
    SmallScrollSelect,
    SmallKindSelect,
    OutlineToggleButton,
    Button,
    ToggleButton,
    ColorSelectButton,
    RoundedView,
} from "./components/Basic";
import { Circle, G, Line, Image, Defs, LinearGradient, Stop, Svg, Path } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionButton from "react-native-circular-action-menu";
//Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Redux
let store = createStore(allReducers);

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Transactions") {
                                iconName = "swap-horizontal";
                            } else if (route.name === "Settings") {
                                iconName = "settings";
                            } else if (route.name === "Report") {
                                iconName = "chart-timeline-variant";
                            } else if (route.name === "Wallet") {
                                iconName = "wallet";
                            }

                            // You can return any component that you like here!
                            return <Icon name={iconName} type="material-community" color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: colors.green,
                        inactiveTintColor: colors.dark,
                        keyboardHidesTabBar: true,
                        showIcon: true,
                        style: {
                            backgroundColor: "white",
                            bottom: 0,
                            left: 0,
                            right: 0,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Transactions"
                        component={TransactionsScreen}
                        options={{ title: "Giao dịch" }}
                    />

                    <Tab.Screen
                        name="Report"
                        component={ReportScreen}
                        options={{ title: "Báo cáo" }}
                    />
                    <Tab.Screen
                        name="Add"
                        component={AddTransactionScreen}
                        options={{
                            tabBarButton: (props) => (
                                <View
                                    style={{
                                        width: 60,
                                        alignItems: "center",
                                    }}
                                    pointerEvents="box-none"
                                >
                                    <TouchableOpacity
                                        style={{
                                            top: -28,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 60,
                                            height: 60,
                                            borderRadius: 999,
                                            backgroundColor: colors.yellow,
                                            borderWidth: 3,
                                            borderColor: "whitesmoke",
                                        }}
                                    >
                                        <Icon name="plus" type="material-community" color="white" />
                                    </TouchableOpacity>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Wallet"
                        component={WalletNavigator}
                        options={{ title: "Quản lý ví" }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingScreen}
                        options={{ title: "Cài đặt" }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
