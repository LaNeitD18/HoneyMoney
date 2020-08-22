import { StatusBar } from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import SampleContainer from '../containers/SampleContainer'

const Stack = createStackNavigator();

export default class HomeScreen extends Component
{
    //static navigationOptions = ({ navigation }) => { 
    //    const { params =  {} } = navigation.state;
    //    let tabBarLabel = 'Home';
    //    return {tabBarLabel};
    //}
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
                    name="Home"
                    component={Home}
                    options={{ title: 'Trang chủ' }}
                />
            </Stack.Navigator>
        )
    }
}

class Home extends Component
{
    render(){
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style = {{fontSize: 22, color: 'black'}}>
                    Đây là trang chủ
                </Text>
                <SampleContainer />
            </View>
        )
    }
}