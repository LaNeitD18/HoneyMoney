import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";

import WalletScreen from "./WalletScreen";
import AddWalletScreen from "./AddWalletScreen";
import AddTransactionScreen from "./AddTransactionScreen";

const WalletStack = createStackNavigator();

export default class CategoryNavigator extends Component {
    render() {
        return (
            <WalletStack.Navigator>
                <WalletStack.Screen
                    name="Ví"
                    component={WalletScreen}
                    options={{ headerShown: true }}
                />
                <WalletStack.Screen
                    name="AddWalletScreen"
                    component={AddWalletScreen}
                    options={{ headerShown: true, title: "Tạo ví mới" }}
                />
                <WalletStack.Screen
                    name="AddTransactionScreen"
                    component={AddTransactionScreen}
                    options={{ headerShown: true, title: "Tạo giao dịch" }}
                />
            </WalletStack.Navigator>
        );
    }
}
