import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import React, { Component, useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, LogBox, YellowBox } from "react-native";
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
import SettingScreen from "./screens/SettingScreen";
import ReportScreen from "./screens/ReportScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
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
import BudgetScreen from "./screens/BudgetScreen";
import EditBudgetScreen from "./screens/EditBudgetScreen";
import AddBudgetScreen from "./screens/AddBudgetScreen";
import SettingNameScreen from "./screens/SettingNameScreen";
import SettingPasswordScreen from "./screens/SettingPasswordScreen";
import SettingAlertScreen from "./screens/SettingAlertScreen";
import WalletTransferScreen from "./screens/WalletTransferScreen";
import SettingScreensNavigator from "./screens/SettingScreensNavigator";
import * as firebase from "firebase";
import { connect } from "react-redux";

//Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Redux
let store = createStore(allReducers);

class Main extends Component {
    componentDidMount() {}
    render() {
        return (
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
                        } else if (route.name === "Budget") {
                            iconName = "bank";
                        }

                        // You can return any component that you like here!
                        return (
                            <Icon
                                name={iconName}
                                type="material-community"
                                color={color}
                                size={25}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.greenDark,
                    inactiveTintColor: colors.dark,
                    keyboardHidesTabBar: true,
                    showIcon: true,
                    style: {
                        backgroundColor: "white",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 55,
                    },
                    labelStyle: {
                        marginBottom: 4,
                        fontSize: 11,
                    },
                }}
            >
                <Tab.Screen
                    name="Transactions"
                    component={TransactionsScreen}
                    options={{ title: "Giao dịch" }}
                />

                <Tab.Screen name="Report" component={ReportScreen} options={{ title: "Báo cáo" }} />
                <Tab.Screen
                    name="Add"
                    component={ActionButton}
                    options={{
                        tabBarButton: (props) => (
                            <View
                                style={{
                                    width: 60,
                                }}
                            >
                                <ActionButton
                                    buttonColor={colors.yellow}
                                    size={60}
                                    degrees={315}
                                    onPress={() => {}}
                                    //onOverlayPress={()=>{console.log("a")}}
                                    icon={
                                        <Icon
                                            name="plus"
                                            type="material-community"
                                            color="white"
                                            size={35}
                                        />
                                    }
                                    radius={80}
                                >
                                    <ActionButton.Item buttonColor="#transparent">
                                        <View></View>
                                    </ActionButton.Item>

                                    <ActionButton.Item
                                        buttonColor={colors.greenDark}
                                        size={50}
                                        title="Thu"
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("Action", {
                                                    screen: "AddTransactionScreen",
                                                    params: { add: true },
                                                });
                                            }}
                                        >
                                            <Icon
                                                name="database-plus"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>

                                    <ActionButton.Item
                                        buttonColor={colors.indigo}
                                        size={50}
                                        title="Chuyển ví"
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("Action", {
                                                    screen: "WalletScreen",
                                                });
                                            }}
                                        >
                                            <Icon
                                                name="wallet"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>
                                    <ActionButton.Item buttonColor="#F55555" size={50} title="Chi">
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("Action", {
                                                    screen: "AddTransactionScreen",
                                                    params: { add: false },
                                                });
                                            }}
                                        >
                                            <Icon
                                                name="database-minus"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor="#transparent">
                                        <View></View>
                                    </ActionButton.Item>
                                </ActionButton>
                            </View>
                        ),
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name="Budget"
                    //component={BudgetScreen}
                    component={WalletNavigator}
                    options={{ title: "Tiết kiệm" }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingScreensNavigator}
                    options={{ title: "Cài đặt" }}
                />
            </Tab.Navigator>
        );
    }
}

class RootContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <NavigationContainer>
                {/* <Tab.Navigator tabBarOptions={{ activeTintColor: 'blue' }}>
                    <Tab.Screen name="Danh mục" component={CategoryNavigator} options={{tittle: 'Categories'}}/>
                    <Tab.Screen name="AddTrans" component={AddTransactionScreen} options={{tittle: 'Thêm giao dịch'}}/>
                    <Tab.Screen name="AddWallet" component={AddWalletScreen} options={{tittle: 'Thêm ví'}}/>
                    </Tab.Navigator> */}
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {/* <Stack.Screen name="SignIn" component={LoginScreen}/>
                        <Stack.Screen name="SignUp" component={RegisterScreen}/> */}

                    {this.props.isSignedIn === false ? (
                        <>
                            <Stack.Screen name="SignIn" component={LoginScreen} />
                            <Stack.Screen name="SignUp" component={RegisterScreen} />
                        </>
                    ) : (
                        // User is signed in
                        <>
                            <Stack.Screen
                                options={{
                                    headerShown: true,
                                    title: "Tên màn hình",
                                    headerRight: () => (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                marginRight: sizeFactor,
                                            }}
                                        >
                                            <TouchableOpacity onPress={this.changeWallet}>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Icon
                                                        name="wallet"
                                                        type="material-community"
                                                        color={colors.blue}
                                                        size={sizeFactor * 1.75}
                                                        style={{ marginRight: sizeFactor / 2 }}
                                                    />
                                                    <String
                                                        style={{
                                                            marginBottom: 4,
                                                            color: colors.blue,
                                                        }}
                                                    >
                                                        Đổi ví
                                                    </String>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ),
                                }}
                                name="Main"
                                component={Main}
                            />
                            <Stack.Screen name="Action" component={WalletNavigator} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        isSignedIn: state.isSignedIn,
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         signIn: () => { dispatch(signIn())},
//     };
// }

const ConnectedRoot = connect(mapStateToProps)(RootContainer);

export default function App() {
    YellowBox.ignoreWarnings(["Animated: `useNativeDriver`"]);
    //ignore all warning
    console.disableYellowBox = true;

    return (
        <Provider store={store}>
            <ConnectedRoot />
        </Provider>
    );
}
