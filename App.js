import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import WalletScreen from "./screens/Wallet";
import CategoriesScreen from "./screens/Categories";
import AddTransactionScreen from "./screens/AddTransaction";

export default function App() {
  return <AddTransactionScreen />;
}
