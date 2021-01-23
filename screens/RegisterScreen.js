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
    ActivityIndicator,
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
    HomoTextInput,
    Button1,
    Button2,
    Button3,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef, userRef, walletRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";

export default class RegisterScreen extends Component {
    constructor() {
        super();
        this.state = {
            displayName: "",
            email: "",
            password: "",
            isLoading: false,
        };
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    addDefaultCategories = () => {
        //const userCategoryRef = userRef.ref('Category/');
        categoryRef.on("value", (snapshot) => {
            snapshot.forEach((element) => {
                userRef.child("Category/").push({
                    CategoryName: element.toJSON().CategoryName,
                    Icon: element.toJSON().Icon,
                    ParentID: element.toJSON().ParentID,
                    TypeID: element.toJSON().TypeID,
                });
                //userRef.child('Category').push(element);
                console.log(element);
            });
        });
        //console.log(userCategoryRef);
    };

    addDefaultWallet = () => {
        walletRef.on("value", (snapshot) => {
            snapshot.forEach((element) => {
                userRef.child("Wallet/").push({
                    color: element.toJSON().color,
                    date: element.toJSON().date,
                    isDefault: element.toJSON().isDefault,
                    money: element.toJSON().money,
                    name: element.toJSON().name,
                });
                //userRef.child('Category').push(element);
                //console.log(element);
            });
        });
    };

    addDefaultDatabase = () => {
        this.addDefaultCategories();
        //this.addDefaultWallet();
    };

    registerUser = () => {
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert("Enter details to signup!");
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user
                        .updateProfile({
                            displayName: this.state.displayName,
                        })
                        .then(() => {
                            firebase
                                .database()
                                .ref("users/" + firebase.auth().currentUser.uid + "/profile")
                                .set({ name: this.state.displayName });
                        });
                    console.log("User registered successfully!");
                    this.setState({
                        isLoading: false,
                        displayName: "",
                        email: "",
                        password: "",
                    });
                    this.props.navigation.navigate("SignIn");
                })
                .catch((error) => this.setState({ errorMessage: error.message }));
        }
        this.addDefaultDatabase();
        //console.log(firebase.auth().currentUser.uid);

        // userRef.on('value', (snapshot) => {
        //     snapshot.forEach(element => {
        //         console.log(element.key);
        //     })
        // })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            );
        }

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
                                textContentType="name"
                                errorMessage=""
                                value={this.state.displayName}
                                onChangeText={(val) => this.updateInputVal(val, "displayName")}
                            />
                            <HomoTextInput
                                leftIcon={{ name: "email", color: colors.gray }}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                errorMessage=""
                                value={this.state.email}
                                onChangeText={(val) => this.updateInputVal(val, "email")}
                            />
                            <HomoTextInput
                                label="Mật khẩu"
                                placeholder="••••••••••••••••••••••"
                                leftIcon={{ name: "lock", color: colors.gray }}
                                textContentType="password"
                                secureTextEntry={true}
                                errorMessage=""
                                value={this.state.password}
                                onChangeText={(val) => this.updateInputVal(val, "password")}
                            />

                            <View
                                style={{
                                    width: windowWidth - sizeFactor * 8,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: sizeFactor / 2,
                                }}
                            >
                                <Button2
                                    style={{ width: sizeFactor * 8.5 }}
                                    onPress={() => this.props.navigation.navigate("SignIn")}
                                >
                                    Hủy bỏ
                                </Button2>
                                <Button1
                                    style={{ width: sizeFactor * 8.5 }}
                                    onPress={() => this.registerUser()}
                                >
                                    Xác nhận
                                </Button1>
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
