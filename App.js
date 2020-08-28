import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import WalletScreen from "./screens/WalletScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import AddTransactionScreen from "./screens/AddTransactionScreen";
import AddWalletScreen from "./screens/AddWalletScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import ConfirmDialog from "./components/ConfirmDialog";
import AddSubcategoryDialog from "./components/AddSubcategoryDialog";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <WalletScreen />
            <ConfirmDialog />
        </View>
    );
}
