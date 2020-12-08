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

export default class LoginScreen extends Component {
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
                        <Image
                            source={require("../assets/logo.png")}
                            style={{
                                height: sizeFactor * 8,
                                width: sizeFactor * 8 * 1.42489270386,
                                marginBottom: sizeFactor * 2,
                            }}
                        />
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: sizeFactor,
                                alignItems: "center",
                                borderWidth: 0,
                                borderRadius: sizeFactor,
                                marginBottom: sizeFactor * 4,
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
                                Đăng nhập
                            </Text>
                            <HomoTextInput
                                leftIcon={{ name: "email", color: colors.gray }}
                                textContentType="email"
                                keyboardType="email-address"
                                errorMessage=""
                            />
                            <HomoTextInput
                                label="Mật khẩu"
                                placeholder="••••••••••••••••••••••"
                                leftIcon={{ name: "lock", color: colors.gray }}
                                secureTextEntry={true}
                                textContentType="password"
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
                                <Button2 style={{ width: sizeFactor * 8.5 }}>Đăng ký</Button2>
                                <Button1 style={{ width: sizeFactor * 8.5 }}>Đăng nhập</Button1>
                            </View>
                            <Button3>Quên mật khẩu</Button3>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
