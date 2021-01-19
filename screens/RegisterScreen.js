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
    Space,
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

export default class RegisterScreen extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <ImageBackground
                    source={require("../assets/background.png")}
                    style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: sizeFactor,
                                alignItems: "center",
                                borderWidth: 0,
                                borderRadius: sizeFactor,
                                marginBottom: sizeFactor,
                                marginTop: sizeFactor / 2,
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontSize: sizeFactor * 1.25,
                                    fontWeight: "bold",
                                    marginBottom: sizeFactor,
                                    marginTop: sizeFactor / 2,
                                }}
                            >
                                Đăng ký tài khoản
                            </Text>
                            <HomoTextInput
                                label="Họ và tên"
                                placeholder="Tên Của Bạn"
                                leftIcon={{ name: "person", color: colors.gray }}
                                secureTextEntry={true}
                                textContentType="name"
                                errorMessage="Thông báo lỗi"
                            />
                            <HomoTextInput
                                leftIcon={{ name: "email", color: colors.gray }}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                errorMessage=""
                            />
                            <HomoTextInput
                                label="Mật khẩu"
                                placeholder="••••••••••••••••••••••"
                                leftIcon={{ name: "lock", color: colors.gray }}
                                textContentType="password"
                                secureTextEntry={true}
                                errorMessage=""
                            />

                            <View
                                style={{
                                    width: windowWidth - sizeFactor * 8,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: sizeFactor / 2,
                                }}
                            >
                                <Button2 style={{ width: sizeFactor * 8.5 }}>Hủy bỏ</Button2>
                                <Button1 style={{ width: sizeFactor * 8.5 }}>Xác nhận</Button1>
                            </View>
                        </View>
                        <Text style={{ color: colors.white }}>
                            Bằng việc tạo tài khoản, bạn đã chấp nhận
                        </Text>
                        <Text style={{ color: colors.white }}>
                            các Điều khoản và Điều kiện của chúng tôi.
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
