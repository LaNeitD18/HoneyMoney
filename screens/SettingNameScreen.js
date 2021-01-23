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
    Alert
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

export default class SettingNameScreen extends Component {
    constructor() {
        super();

        this.state = {
            userName: firebase.auth().currentUser.displayName
        }
    }

    editUserInfo = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.userName
        }).then(function() {
            //console.log("au " + firebase.auth().currentUser.displayName);
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/profile")
                .update({name : firebase.auth().currentUser.displayName});
            Alert.alert("Thông báo", "Bạn đã cập nhật thông tin thành công", 
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK pressed")
                    }
                ], {cancelable: false}
            );
            this.props.navigation.goBack();
        }).catch(function(error) {

        });
    }

    render() {
        const email = firebase.auth().currentUser.email;

        return (
            <ScreenView style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}>
                <TouchableOpacity>
                    <View style={{ margin: sizeFactor, alignItems: "center" }}>
                        <Image
                            source={require("../assets/info.png")}
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
                            Thông tin người dùng
                        </String>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: "center", margin: sizeFactor }}>
                    <HomoTextInput
                        label="Email"
                        placeholder="Email không thay đổi được"
                        leftIcon={{
                            type: "material-community",
                            name: "email",
                            color: colors.gray,
                        }}
                        secureTextEntry={true}
                        textContentType="emailAddress"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        keyboardType="email-address"
                        disabled={true}
                        value={email}
                    />
                    <HomoTextInput
                        label="Họ Và Tên"
                        placeholder="Họ và tên"
                        leftIcon={{
                            type: "material-community",
                            name: "account-circle",
                            color: colors.gray,
                        }}
                        textContentType="name"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        value={this.state.userName}
                        onChangeText={(text) => {this.setState({ userName: text})}}
                    />
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={() => this.editUserInfo()}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}
