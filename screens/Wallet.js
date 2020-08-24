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
        <Wallet
          heading="Ví chính"
          color={colors.indigo}
          date="20/08/2020"
          isDefault="true"
        >
          {" "}
          1,500,000
        </Wallet>
        <Wallet
          heading="Ví cho người yêu"
          color={colors.pink}
          date="01/01/2014"
          isDefault="false"
        >
          25,000,000
        </Wallet>
        <TouchableText>Tạo ví mới</TouchableText>
        <Divider/>
      </ScreenView>
    );
  }
}
