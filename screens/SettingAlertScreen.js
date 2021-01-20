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
    TouchableDeleteText,
    HomoTextInput,
    NormalCard,
    Button1,
    Button3,
    SettingRow,
    LooseDivider,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import * as firebase from "firebase";
import { categoryRef } from "../components/DataConnect";

import { findIcon } from "../components/Image";
import { changeType, changeName, openDialog } from "../actions/index";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import ChooseIconDialog from "../components/ChooseIconDialog";

export default class SettingAlertScreen extends Component {
    render() {
        return (
            <ScreenView style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}>
                <TouchableOpacity>
                    <View style={{ margin: 0, alignItems: "center" }}>
                        <Image
                            source={require("../assets/alert.png")}
                            style={[
                                styles.hugeCategory,
                                {
                                    opacity: 1,
                                    width: styles.hugeCategory.height - sizeFactor * 1.25,
                                    height: styles.hugeCategory.height - sizeFactor * 1.25,
                                    marginBottom: sizeFactor,
                                },
                            ]}
                        />

                        <String style={{ fontWeight: "bold", fontSize: sizeFactor * 1.5 }}>
                            Nhắc nhở
                        </String>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: "center", margin: sizeFactor, marginTop: 0 }}>
                    <String style={{ marginBottom: 0 }}>Hãy để Honey Money gửi thông báo</String>
                    <String style={{ marginBottom: sizeFactor * 2 }}>
                        nhắc nhở bạn cập nhật chi tiêu.
                    </String>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 2,
                        marginBottom: sizeFactor,
                    }}
                >
                    <Row>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                name="radiobox-blank"
                                type="material-community"
                                color={colors.gray}
                                style={{ marginRight: sizeFactor / 2 }}
                            />
                            <String>Cuối buổi (11:00) (16:00) (21:00)</String>
                        </View>
                    </Row>
                    <LooseDivider />
                    <Row>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                name="radiobox-marked"
                                type="material-community"
                                color={colors.blue}
                                style={{ marginRight: sizeFactor / 2 }}
                            />
                            <String style={{ color: colors.blue }}>Cuối ngày (21:00)</String>
                        </View>
                    </Row>
                    <LooseDivider />
                    <Row>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                name="radiobox-blank"
                                type="material-community"
                                color={colors.gray}
                                style={{ marginRight: sizeFactor / 2 }}
                            />
                            <String>Tắt</String>
                        </View>
                    </Row>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}
