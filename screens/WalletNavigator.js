import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

import WalletScreen from './WalletScreen';
import AddWalletScreen from './AddWalletScreen';

const WalletStack = createStackNavigator();

export default class CategoryNavigator extends Component {
    render() {
        return (
            <WalletStack.Navigator>
                <WalletStack.Screen name="WalletScreen" component={WalletScreen} options={{headerShown: false}}/>
                <WalletStack.Screen name="AddWalletScreen" component={AddWalletScreen} options={{headerShown: true, title: ''}}/>
            </WalletStack.Navigator>
        );
    }
}