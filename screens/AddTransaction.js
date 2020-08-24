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
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginHorizontal: sizeFactor * 1.75,
            marginRight: sizeFactor * 3,
          }}
        >
          <Icon
            name="unfold-more-horizontal"
            type="material-community"
            color="white"
            size={sizeFactor * 1.45}
            style={{
              marginRight: sizeFactor / 2,
              opacity: 0,
              marginTop: 1,
            }}
          />
          <Heading style={{ color: "white" }}>Ví chính</Heading>
          <Icon
            name="unfold-more-horizontal"
            type="material-community"
            color="white"
            size={sizeFactor * 1.45}
            style={{
              marginLeft: sizeFactor / 2,
              opacity: 0.75,
              marginTop: 1,
            }}
          />
        </View>
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
            marginBottom: sizeFactor,
          }}
        >
          <SmallKindSelect
            buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]}
          />
          <ScrollSelect />
          <View
            style={{
              flex: 1,
              paddingLeft: sizeFactor,
            }}
          >
            <String style={{ fontWeight: "bold" }}>Danh mục con</String>
          </View>
          <ScrollSelect />
          <TouchableOpacity>
            <View style={{ justifyContent: "center" }}>
              <Icon
                name="chevron-down"
                type="material-community"
                color="black"
                size={sizeFactor * 2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <OutlineButton backgroundColor="white" color="white">
          Thực hiện giao dịch
        </OutlineButton>
        <Title style={{ color: "white" }}>Nâng cao</Title>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: sizeFactor * 1.5,
            paddingVertical: sizeFactor,
          }}
        >
          <String style={{ fontWeight: "bold" }}>Chọn ngày</String>
          <RowLeft style={{ flex: 9 }}>
            <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
              <ToggleButton
                color={colors.indigo}
                background="white"
                choosed="true"
              >
                Hôm nay
              </ToggleButton>
            </View>
            <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
              <ToggleButton
                color={colors.indigo}
                background="white"
                choosed="false"
              >
                Hôm qua
              </ToggleButton>
            </View>
            <View style={{ flex: 3.5 }}>
              <ToggleButton
                color={colors.indigo}
                background="white"
                choosed="false"
              >
                Chọn ngày
              </ToggleButton>
            </View>
          </RowLeft>
          <Divider />
          <String style={{ fontWeight: "bold" }}>Ghi chú</String>
        </View>
      </ScreenView>
    );
  }
}
