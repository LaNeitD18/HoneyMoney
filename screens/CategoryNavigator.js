import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { Icon } from "react-native-elements";
import CategoriesScreen from "./CategoriesScreen";
import EditCategoryScreen from "./EditCategoryScreen";
import AddCategoryScreen from "./AddCategoryScreen";
import { sizeFactor, String, colors } from "../components/Basic";
import { StyleSheet, Text, View } from "react-native";

import { connect } from 'react-redux';
import { categoryRef } from '../components/DataConnect';
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

class CategoryNavigator extends Component {
    deleteCategory = () => {
        const category = this.props.chosenCategory;
        categoryRef.child(category.key).remove();

        // exit this screen
        this.props.navigation.goBack();
    }

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
                        // headerRight: () => (
                        //     <View style={{ flexDirection: "row", marginRight: sizeFactor }}>
                        //         <TouchableOpacity onPress={this.deleteCategory}>
                        //             <Icon
                        //             name="delete-outline"
                        //             type="material-community"
                        //             color={colors.red}
                        //             size={sizeFactor * 1.75}
                        //             style={{ marginRight: sizeFactor }}/>
                        //         </TouchableOpacity>
                        //         <Icon
                        //             name={isEditing ? "eye-outline" : "pencil-outline"}
                        //             type="material-community"
                        //             color={colors.gray}
                        //             size={sizeFactor * 1.75}
                        //         />
                        //     </View>
                        // ),
                    }}
                />
            </Stack.Navigator>
        );
    }
}

function mapStateToProps(state) {
    return {
        chosenCategory: state.chosenCategory,
    };
}

export default connect(mapStateToProps)(CategoryNavigator);
