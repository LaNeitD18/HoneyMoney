import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { Icon } from "react-native-elements";
import CategoriesScreen from "./CategoriesScreen";
import EditCategoryScreen from "./EditCategoryScreen";
import AddCategoryScreen from "./AddCategoryScreen";
import { sizeFactor, String, colors } from "../components/Basic";
import { StyleSheet, Text, View } from "react-native";
const Stack = createStackNavigator();

export default class CategoryNavigator extends Component {
    render() {
        const isEditing = 0;
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
                <Stack.Screen
                    name="AddCategoryScreen"
                    component={AddCategoryScreen}
                    options={{ headerShown: true, title: "Thêm danh mục" }}
                />
                <Stack.Screen
                    name="EditCategoryScreen"
                    component={EditCategoryScreen}
                    options={{
                        headerShown: true,
                        title: isEditing ? "Sửa danh mục" : "Xem danh mục",
                        headerRight: () => (
                            <View style={{ flexDirection: "row", marginRight: sizeFactor }}>
                                <Icon
                                    name="delete-outline"
                                    type="material-community"
                                    color={colors.red}
                                    size={sizeFactor * 1.75}
                                    style={{ marginRight: sizeFactor }}
                                />
                                <Icon
                                    name={isEditing ? "eye-outline" : "pencil-outline"}
                                    type="material-community"
                                    color={colors.gray}
                                    size={sizeFactor * 1.75}
                                />
                            </View>
                        ),
                    }}
                />
            </Stack.Navigator>
        );
    }
}
