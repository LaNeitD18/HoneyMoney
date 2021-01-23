import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";

import WalletScreen from './WalletScreen';
import AddWalletScreen from './AddWalletScreen';
import AddTransactionScreen from './AddTransactionScreen';
import EditWalletScreen from './EditWalletScreen';
import WalletTransferScreen from './WalletTransferScreen'

const WalletStack = createStackNavigator();

export default class WalletNavigator extends Component {
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
                    name="EditWalletScreen" 
                    component={EditWalletScreen} 
                    options={{headerShown: true, title: "Sửa ví"}}/>
                <WalletStack.Screen
                    name="AddTransactionScreen"
                    component={AddTransactionScreen}
                    options={{ headerShown: true, title: "Tạo giao dịch" }}
                />
                <WalletStack.Screen
                    name="WalletTransferScreen"
                    component={WalletTransferScreen}
                    options={{ headerShown: true, title: "Chuyển tiền qua ví" }}
                />
            </WalletStack.Navigator>
        );
    }
}
