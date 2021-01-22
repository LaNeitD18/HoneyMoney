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

export default class SettingScreen extends Component {
    render() {
        return (
            <ScreenView>
                <View style={{ marginBottom: sizeFactor }}>
                    <Image
                        style={{
                            alignSelf: "center",
                            width: sizeFactor * 9,
                            height: sizeFactor * 9,
                            marginBottom: sizeFactor,
                        }}
                        source={require("../assets/user.png")}
                    />
                    <Text
                        style={{
                            fontWeight: "bold",
                            alignSelf: "center",
                            fontSize: sizeFactor * 1.5,
                            marginBottom: sizeFactor * 0.25,
                        }}
                    >
                        Phan Huy Tiến
                    </Text>
                    <Text style={{ alignSelf: "center", fontSize: sizeFactor, color: colors.gray }}>
                        btsvodich@gmail.com
                    </Text>
                </View>
                <Title style={{ marginBottom: sizeFactor / 4 }}>Cài đặt</Title>
                <NormalCard style={{ paddingHorizontal: 0 }}>
                    <SettingRow
                        color={colors.yellow}
                        iconName="account-circle"
                        text="Thông tin người dùng"
                        onPress={{}}
                    />
                    <SettingRow
                        color={colors.yellow}
                        iconName="key"
                        text="Thay đổi mật khẩu"
                        onPress={{}}
                    />
                    <SettingRow
                        color={colors.green}
                        iconName="package-variant"
                        text="Quản lý danh mục"
                        onPress={{}}
                    />
                    <SettingRow
                        color={colors.blue}
                        iconName="bell-ring"
                        text="Thông báo"
                        onPress={{}}
                    />
                    <View style={{ marginBottom: sizeFactor / 4, paddingHorizontal: sizeFactor }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignContent: "center",
                                alignItems: "center",
                                marginBottom: sizeFactor * 0.75,
                                alignSelf: "center",
                            }}
                        >
                            <Icon
                                style={{ marginRight: sizeFactor / 2 }}
                                name="logout"
                                size={sizeFactor * 1.5}
                                type="material-community"
                                color={colors.red}
                            />
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: colors.red,
                                    fontSize: sizeFactor,
                                }}
                            >
                                Đăng xuất tài khoản
                            </Text>
                        </View>
                    </View>
                </NormalCard>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: sizeFactor * 4,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: sizeFactor * 5,
                                height: sizeFactor * 5,
                                marginBottom: sizeFactor,
                            }}
                            source={require("../assets/icon.png")}
                        />
                    </TouchableOpacity>
                    <String
                        style={{
                            fontSize: sizeFactor * 2,
                            fontWeight: "700",
                            color: colors.gray3,
                            marginBottom: sizeFactor / 4,
                        }}
                    >
                        Honey Money
                    </String>
                    <String
                        style={{
                            fontSize: sizeFactor * 0.8,
                            color: colors.gray3,
                        }}
                    >
                        Version 1.0
                    </String>
                    <View
                        style={{
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            marginVertical: sizeFactor,
                        }}
                    >
                        <String
                            style={{
                                color: colors.dark,
                                marginBottom: 0,
                            }}
                        >
                            Made with
                        </String>
                        <Image
                            style={{
                                width: sizeFactor,
                                height: sizeFactor,
                                marginHorizontal: sizeFactor / 3,
                            }}
                            source={require("../assets/heart.png")}
                        />
                        <String
                            style={{
                                color: colors.dark,
                                marginBottom: 0,
                            }}
                        >
                            by:
                        </String>
                    </View>
                    <String style={{ marginBottom: sizeFactor / 2, fontWeight: "bold" }}>
                        Luong Ly Cong Thang
                    </String>
                    <String style={{ marginBottom: sizeFactor / 2, fontWeight: "bold" }}>
                        Phan Huy Tien
                    </String>
                    <String style={{ marginBottom: sizeFactor / 2, fontWeight: "bold" }}>
                        Ngo Cong Hau
                    </String>
                </View>
            </ScreenView>
        );
    }
}
