import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  String,
  ScreenView,
  Card,
  Divider,
  Row,
  Number,
  NegativeNumber,
  Wallet,
  colors,
  Title,
  Button,
  OutlineToggleButton,
  sizeFactor,
  TouchableText,
} from "../components/Basic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SignedNumber from '../components/SignedNumber'
import { FlatList } from "react-native-gesture-handler";

export default class WalletScreen extends Component {
  render() {
    return (
      <ScreenView>
        <Title>Tổng quan</Title>
        <Card heading="Tất cả ví" headingColor={colors.dark} color="white">
          <Row>
            <String>Số dư</String>
            <SignedNumber>5,000,000</SignedNumber>
          </Row>
          <Row>
            <String>Tháng này</String>
            <SignedNumber>-250,000</SignedNumber>
          </Row>
        </Card>
        <Title>Quản lí ví</Title>
        <FlatList 
          data = {WalletData}
          renderItem={({item})=>{return (<Wallet
            heading={item.Name}
            color={item.color}
            date={item.date}
            isDefault={item.isDefault}
          >
            {item.money}
          </Wallet>)}}>
        </FlatList>
        <TouchableText>Tạo ví mới</TouchableText>
        <Divider/>
      </ScreenView>
    );
  }
}

var WalletData = [
  {
    "key":"WL000001",
    "Name": "Ví chính",
    "color": "#5856d6",
    "date": "20/08/2020",
    "isDefault":"true",
    "money": "1,500,000"
  },
  {
    "key":"WL000002",
    "Name": "Ví cho người yêu",
    "color": "#ff2d55",
    "date": "01/01/2014",
    "isDefault":"false",
    "money": "25,000,000"
  },
  {
    "key":"WL000003",
    "Name": "Tiền dưỡng già",
    "color": "#ff9500",
    "date": "01/01/2018",
    "isDefault":"false",
    "money": "5,000,000"
  }
]