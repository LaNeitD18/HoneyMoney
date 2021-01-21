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
    ImageBackground,
} from "react-native";
import {
    String,
    ScreenView,
    Card,
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
    AddWalletKindSelect,
    OutlineToggleButton,
    Button,
    ToggleButton,
    ColorSelectButton,
    RoundedView,
    HomoTextInput,
    Button1,
    Button2,
    Button3,
    TransactionMonthSummary,
    NormalCard,
    LooseDivider,
    TransactionRow,
    TransactionDate,
    SimpleCarousel,
    SettingRow,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem, Space } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";
import { ProgressBar } from "react-native-paper";

export default class BudgetScreen extends Component {
    render() {
        return (
            <ScreenView>
                <Title>Quản lý tiết kiệm</Title>
                <NormalCard>
                    <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    marginRight: sizeFactor,
                                }}
                            >
                                <Image
                                    source={require("../assets/categories/tiennha.png")}
                                    style={{
                                        width: sizeFactor * 2.25,
                                        height: sizeFactor * 2.25,
                                    }}
                                ></Image>
                            </View>
                            <View>
                                <String style={{ marginBottom: 0 }}>Tiền nhà</String>
                                <String style={{ marginBottom: 0, fontWeight: "bold" }}>
                                    145.000 VNĐ
                                </String>
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <String
                                style={{
                                    fontSize: sizeFactor * 0.85,
                                    marginBottom: 0,
                                    color: colors.gray,
                                }}
                            >
                                Tháng 1/2021
                            </String>
                            <String
                                style={{
                                    marginBottom: 0,
                                    fontWeight: "bold",
                                    color: colors.gray,
                                }}
                            >
                                Còn 11 ngày
                            </String>
                        </View>
                    </Row>
                    <LooseDivider />
                    <Row>
                        <String
                            style={{
                                color: colors.greenDark,
                                fontSize: sizeFactor * 0.9,
                                marginBottom: 0,
                            }}
                        >
                            45.000 VNĐ
                        </String>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor * 0.9,
                                marginBottom: 0,
                            }}
                        >
                            Còn lại 100.000 VNĐ
                        </String>
                    </Row>
                    <ProgressBar
                        style={{
                            height: sizeFactor * 0.5,
                            borderRadius: 999,
                            marginTop: sizeFactor / 2,
                            marginBottom: sizeFactor,
                        }}
                        progress={0.75}
                        color={colors.blue}
                    />
                    <View style={{ alignItems: "center" }}>
                        <String style={{ marginBottom: sizeFactor, fontSize: sizeFactor * 0.9 }}>
                            Trung bình mỗi ngày 7.500 VNĐ
                        </String>
                    </View>
                </NormalCard>
            </ScreenView>
        );
    }
}
