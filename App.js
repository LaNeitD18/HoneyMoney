import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import WalletScreen from "./screens/Wallet";
import CategoriesScreen from "./screens/Categories";
import AddTransactionScreen from "./screens/AddTransaction";
import AddWalletScreen from "./screens/AddWallet";
import AddCategoryScreen from "./screens/AddCategory";
import EditCategoryScreen from "./screens/EditCategory";
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
