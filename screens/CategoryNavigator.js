import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

import CategoriesScreen from './CategoriesScreen';
import EditCategoryScreen from './EditCategoryScreen';
import AddCategoryScreen from './AddCategoryScreen';

const Stack = createStackNavigator();

export default class CategoryNavigator extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}/>
                <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} options={{headerShown: true, title: ''}}/>
                <Stack.Screen name="EditCategoryScreen" component={EditCategoryScreen} options={{headerShown: true, title: ''}}/>
            </Stack.Navigator>
        );
    }
}