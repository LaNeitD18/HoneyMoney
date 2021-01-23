import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
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

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Notifications } from "expo";
import { Alert } from "react-native";

export default class SettingAlertScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hours: "21",
            minutes: "00",
            bat: true,
            expoPushToken: "",
            notification: {},
        };
    }
    showTimePicker = () => {
        this.setState({ show: true, bat: true });
    };
    tat = () => {
        this.setState({ bat: false });
    };
    confirm = (date) => {
        const temp = date;
        this.setState({ hours: temp.getHours(), minutes: temp.getMinutes(), show: false });
        this.sendNotificationImmediately();
    };
    cancel = () => {
        this.setState({ show: false });
    };
    saveChanges = async () => {
        var datetime = new Date();
        datetime.setHours(this.state.hours, this.state.minutes, 0);
        let notificationId = await Notifications.scheduleLocalNotificationAsync(
            {
                title: "Honey Money: Nhắc nhở",
                body: "Đừng quên cập nhật chi tiêu cho hôm nay nhé!",
            },
            {
                time: datetime,
            }
        );
        // can be saved in AsyncStorage or send to server
    };

    render() {
        return (
            <ScreenView style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="time"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    date={Date.now()}
                />
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
                    <TouchableOpacity onPress={this.showTimePicker}>
                        <Row>
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name={this.state.bat ? "radiobox-marked" : "radiobox-blank"}
                                    type="material-community"
                                    color={this.state.bat ? colors.blue : colors.gray}
                                    style={{ marginRight: sizeFactor / 2 }}
                                />
                                <String
                                    style={{ color: this.state.bat ? colors.blue : colors.gray }}
                                >
                                    Bật
                                </String>
                            </View>
                            <String style={{ color: this.state.bat ? colors.blue : colors.gray }}>
                                {"Vào lúc " + this.state.hours + ":" + this.state.minutes}
                            </String>
                        </Row>
                    </TouchableOpacity>
                    <LooseDivider />
                    <TouchableOpacity onPress={this.tat}>
                        <Row>
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name={this.state.bat ? "radiobox-blank" : "radiobox-marked"}
                                    type="material-community"
                                    color={this.state.bat ? colors.gray : colors.blue}
                                    style={{ marginRight: sizeFactor / 2 }}
                                />
                                <String
                                    style={{ color: this.state.bat ? colors.gray : colors.blue }}
                                >
                                    Tắt
                                </String>
                            </View>
                        </Row>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={this.saveChanges}>Lưu thay đổi</Button1>
                </View>
            </ScreenView>
        );
    }
}
