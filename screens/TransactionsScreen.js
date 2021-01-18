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
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";

export default class TransactionsScreen extends Component {
    render() {
        return (
            <ScreenView>
                <Title>Lịch sử giao dịch</Title>
                <View>
                    <ScrollView
                        horizontal
                        snapToInterval={windowWidth}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        style={{
                            backgroundColor: "white",
                            borderRadius: sizeFactor,
                            margin: sizeFactor,
                            marginBottom: 0,
                        }}
                    >
                        <View
                            style={{
                                width: windowWidth - sizeFactor * 2,
                                paddingHorizontal: sizeFactor,
                                paddingTop: sizeFactor,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontWeight: "bold",
                                    fontSize: sizeFactor * 1.5,
                                    marginBottom: sizeFactor * 0.75,
                                }}
                            >
                                Tháng 2/2021
                            </Text>
                            <Row>
                                <String style={{ color: colors.gray }}>Số dư đầu kỳ</String>
                                <String>+500.000 VNĐ</String>
                            </Row>
                            <Row>
                                <String style={{ color: colors.gray }}>Số dư cuối kỳ</String>
                                <String>+1.250.000 VNĐ</String>
                            </Row>
                            <Row>
                                <String style={{ fontWeight: "bold" }}>Thay đổi</String>
                                <String>+750.000 VNĐ</String>
                            </Row>
                        </View>
                    </ScrollView>
                </View>
            </ScreenView>
        );
    }
}
