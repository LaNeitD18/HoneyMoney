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
    Alert, 
    AsyncStorage
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

import { signIn } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = { 
          email: '', 
          password: '',
          isLoading: false,
          errorMessage: ''
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    userLogin = () => {
        if(this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                //console.log(res)
                console.log('User logged-in successfully!')
                this.setState({
                isLoading: false,
                email: '', 
                password: ''
                })
                this.props.signIn();
                //console.log(this.props.isSignedIn);
                //this.props.navigation.navigate('Main')
            })
            .catch(error => this.setState({ errorMessage: error.message }))
            console.log(this.state.errorMessage);
        }
    }

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
                                value={this.state.email}
                                onChangeText={(val) => this.updateInputVal(val, 'email')}
                            />
                            <HomoTextInput
                                label="Mật khẩu"
                                placeholder="••••••••••••••••••••••"
                                leftIcon={{ name: "lock", color: colors.gray }}
                                secureTextEntry={true}
                                textContentType="password"
                                errorMessage=""
                                value={this.state.password}
                                onChangeText={(val) => this.updateInputVal(val, 'password')}
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
                                    onPress={() => this.props.navigation.navigate('SignUp')}
                                >Đăng ký</Button2>
                                <Button1 
                                    style={{ width: sizeFactor * 8.5 }}
                                    onPress={() => this.userLogin()}
                                >Đăng nhập</Button1>
                            </View>
                            <Button3 onPress={() => console.log(firebase.auth().currentUser)}>Quên mật khẩu</Button3>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isSignedIn: state.isSignedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
        signIn: () => { dispatch(signIn())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);