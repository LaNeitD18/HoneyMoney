import { StatusBar } from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class TransactionScreen extends Component
{
    render(){
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                }}
                >
                <Stack.Screen
                    name="Transaction"
                    component={Transaction}
                    options={{ title: 'Giao dịch' }}
                />
            </Stack.Navigator>
        )
    }
    
}
class Transaction extends Component
{
    render(){
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text Text = 'Đây là trang giao dịch' style = {{fontSize: 22, color: 'black'}}/>
            </View>
        )
    }
}