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
  Heading,
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
  OutlineButton,
  Row,
  HeadlessCard,
  SmallScrollSelect,
  SmallKindSelect,
  OutlineToggleButton,
  Button,
  ToggleButton,
  ColorSelectButton,
  RoundedView,
} from "../components/Basic";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import TextTicker from "react-native-text-ticker";

export default class AddWalletScreen extends Component {
  render() {
    return (
      <ScreenView>
        <Icon
          name="wallet"
          type="material-community"
          color="black"
          size={sizeFactor * 6}
        />
        <Title style={{ marginLeft: sizeFactor * 1.5 }}>Thông tin ví</Title>
        <RoundedView>
          <String style={{ fontWeight: "bold" }}>Tên ví</String>
          <TextInput style={styles.inputText} placeholder="Ví của tôi" />
          <Divider />
          <String style={{ fontWeight: "bold" }}>Số dư</String>
          <TextInput style={styles.inputText} placeholder="000,000,000" />
          <Divider />
          <String style={{ fontWeight: "bold" }}>Màu sắc</String>
          <Row>
            <ColorSelectButton color={colors.yellow} />
            <ColorSelectButton color={colors.green} />
            <ColorSelectButton color={colors.blue} selected />
            <ColorSelectButton color={colors.purple} />
            <ColorSelectButton color={colors.red} />
            <ColorSelectButton color={colors.orange} />
            <ColorSelectButton color={colors.dark} />
            <ColorSelectButton color={colors.indigo} />
            <ColorSelectButton color={colors.pink} />
          </Row>
          <Divider />
          <String style={{ fontWeight: "bold" }}>Ngày tạo</String>
          <String style={styles.inputText}>25/08/2000</String>
        </RoundedView>
        <Divider />
        <Button
          color="white"
          background={colors.blue}
          style={{ marginHorizontal: sizeFactor }}
        >
          Lưu thay đổi
        </Button>
      </ScreenView>
    );
  }
}
