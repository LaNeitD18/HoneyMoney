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

export default class LoginScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{ backgroundColor: "white", padding: sizeFactor, alignItems: "center" }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            fontSize: sizeFactor * 1.25,
                            fontWeight: "bold",
                            marginBottom: sizeFactor,
                        }}
                    >
                        Đăng nhập
                    </Text>
                    <HomoTextInput errorMessage="Thông báo lỗi" />
                    <HomoTextInput
                        label="Mật khẩu"
                        placeholder="••••••••••••••••••••••"
                        leftIcon={{ name: "lock", color: colors.gray }}
                        secureTextEntry={true}
                        errorMessage="Thông báo lỗi"
                    />
                    <View
                        style={{
                            width: windowWidth - sizeFactor * 8,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button2 style={{ width: sizeFactor * 8.5 }}>Đăng ký</Button2>
                        <Button1 style={{ width: sizeFactor * 8.5 }}>Đăng nhập</Button1>
                    </View>
                    <Button3>Quên mật khẩu</Button3>
                </View>
            </View>
        );
    }
}
