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
    Alert,
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

export default class SettingPasswordScreen extends Component {
    constructor() {
        super();

        this.state = {
            currentPassword: "",
            newPassword: "",
        };
    }

    editPassword = async () => {
        let successful = false;
        const emailCredential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            this.state.currentPassword
        );
        await firebase
            .auth()
            .currentUser.reauthenticateWithCredential(emailCredential)
            .then(() => {
                // User successfully reauthenticated.
                firebase.auth().currentUser.updatePassword(this.state.newPassword);
                successful = true;
            })
            .catch((error) => {
                // Handle error.
                console.log("ZZZ");
                console.log(error);
            });

        if (successful) {
            Alert.alert(
                "Thông báo",
                "Bạn đã cập nhật mật khẩu thành công",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("OK pressed");
                            this.props.navigation.navigate("SettingScreen");
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    render() {
        return (
            <ScreenView style={{ backgroundColor: "white" }}>
                <TouchableOpacity>
                    <View
                        style={{
                            margin: sizeFactor,
                            alignItems: "center",
                            marginTop: sizeFactor * 2,
                        }}
                    >
                        <Image
                            source={require("../assets/password.png")}
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
                            Thay đổi mật khẩu
                        </String>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: "center", margin: sizeFactor }}>
                    <HomoTextInput
                        label="Mật khẩu hiện tại"
                        placeholder="••••••••••••••••••••••"
                        leftIcon={{ name: "lock", color: colors.gray }}
                        secureTextEntry={true}
                        textContentType="password"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        value={this.state.currentPassword}
                        onChangeText={(text) => this.setState({ currentPassword: text })}
                    />
                    <HomoTextInput
                        label="Mật khẩu mới"
                        placeholder="••••••••••••••••••••••"
                        leftIcon={{
                            name: "lock-plus",
                            type: "material-community",
                            color: colors.gray,
                        }}
                        secureTextEntry={true}
                        textContentType="password"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        value={this.state.newPassword}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                    />
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={() => this.editPassword()}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}
