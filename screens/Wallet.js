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
} from "../components/Basic";

export default class WalletScreen extends Component {
  render() {
    return (
      <ScreenView>
        <Card heading="Tất cả ví" color="white">
          <Row>
            <String>Số dư</String>
            <Number>5,000,000</Number>
          </Row>
          <Row>
            <String>Tháng này</String>
            <NegativeNumber>250,000</NegativeNumber>
          </Row>
        </Card>
        <Wallet
          heading="Ví chính"
          color={colors.yellow}
          date="20/08/2020"
          isDefault="true"
        >
          {" "}
          1,500,000
        </Wallet>
        <Wallet
          heading="Ví cho người yêu"
          color={colors.green}
          date="01/01/2014"
          isDefault="false"
        >
          25,000,000
        </Wallet>
        <TouchableOpacity>
          <Card
            color="white"
            heading="Tạo ví mới"
            headingColor={colors.darkGreen}
            icon="wallet-plus"
            iconColor={colors.darkGreen}
          ></Card>
        </TouchableOpacity>
      </ScreenView>
    );
  }
}
