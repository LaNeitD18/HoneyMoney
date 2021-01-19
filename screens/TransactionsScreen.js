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
    SimpleCarousel,
    TransactionsFullList,
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
        const DATA = [
            {
                date: "18",
                dayOfWeek: "Hôm nay",
                month: "Tháng 1/2021",
                change: "+15.000 VNĐ",
            },
            {
                date: "02",
                dayOfWeek: "Thứ 7",
                month: "Tháng 1/2021",
                change: "+15.000 VNĐ",
            },
        ];
        return (
            <ScreenView>
                <Title>Lịch sử giao dịch</Title>
                <SimpleCarousel>
                    <TransactionMonthSummary
                        month="Tháng 1/2021"
                        openBalance="+200.000 VNĐ"
                        endBalance="+300.000 VNĐ"
                        change="+100.000 VNĐ"
                        changeColor={colors.greenDark}
                    />
                    <TransactionMonthSummary
                        month="Tháng 2/2021"
                        openBalance="+200.000 VNĐ"
                        endBalance="+50.000 VNĐ"
                        change="-150.000 VNĐ"
                        changeColor={colors.redDark}
                    />
                </SimpleCarousel>
                <TransactionsFullList data={DATA} />
            </ScreenView>
        );
    }
}
