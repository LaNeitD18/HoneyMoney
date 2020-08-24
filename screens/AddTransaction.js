import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import {
  String,
  ScreenView,
  Card,
  Divider,
  RowLeft,
  Number,
  NegativeNumber,
  Wallet,
  colors,
  sizeFactor,
  styles,
  KindSelect,
  Title,
  Category,
  TouchableText,
  ScrollSelect,
  CategoryTable,
  windowWidth,
  windowHeight,
  Heading2,
  Row,
  HeadlessCard,
  SmallScrollSelect,
  SmallKindSelect,
} from "../components/Basic";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import CategoriesScreen from "../screens/Categories";

export default class AddTransactionScreen extends Component {
  render() {
    return (
      <ScreenView style={{ backgroundColor: colors.indigo }}>
        <View
          style={{
            alignItems: "flex-end",
            paddingLeft: sizeFactor,
            paddingRight: sizeFactor * 1.5,
          }}
        >
          <String
            style={{ color: "white", fontWeight: "bold", marginBottom: 0 }}
          >
            Số tiền
          </String>
          <String
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: sizeFactor * 2,
            }}
          >
            +500,000{" VNĐ"}
          </String>
          <String style={{ color: "white", fontWeight: "bold" }}>
            Danh mục
          </String>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: sizeFactor,
            borderRadius: sizeFactor,
            paddingTop: sizeFactor * 0.75,
            paddingBottom: sizeFactor,
          }}
        >
          <SmallKindSelect
            buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]}
          />
          <View>
            <ScrollSelect />
          </View>
        </View>
      </ScreenView>
    );
  }
}
