import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import {
    String,
    ScreenView,
    Card,
    Row,
    PositiveNumber,
    NegativeNumber,
    Wallet,
    colors,
    Title,
    Button,
    styles,
    OutlineToggleButton,
    sizeFactor,
    TouchableText,
    Heading2,
    HeadlessCard,
    windowWidth,
    AddWalletButton,
    Space,
    NormalCard,
    LooseDivider,
} from "../components/Basic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SignedNumber from "../components/SignedNumber";
import { FlatList } from "react-native-gesture-handler";
import AddWalletScreen from "./AddWalletScreen";

//firebase
import * as firebase from "firebase";

//redux
import { connect } from "react-redux";

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import { rootRef, walletRef } from "../components/DataConnect";

//Redux action
import { UpdateWalletAction, SelectWallet } from "../actions";

//Navigator
import { CommonActions } from "@react-navigation/native";
import toMoneyString from "../components/toMoneyString";

export class WalletScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        walletRef.on("value", (snap) => {
            this.props.Update(snap);
        });
    }
    render() {
        return (
            <ScreenView>
                <View style={{}}>
                    <NormalCard
                        style={{
                            alignItems: "stretch",
                            marginBottom: sizeFactor * 2,
                        }}
                    >
                        <View style={{ alignItems: "center" }}>
                            <String
                                style={{
                                    fontSize: sizeFactor,
                                    fontWeight: "bold",
                                    color: colors.gray,
                                }}
                            >
                                Số dư toàn bộ ví
                            </String>
                        </View>
                        <LooseDivider />
                        <View style={{ alignItems: "center" }}>
                            <String style={{ fontSize: sizeFactor * 2 }}>25.000.000 VNĐ</String>
                        </View>
                    </NormalCard>
                </View>
                <Row>
                    <Title>Quản lí ví</Title>
                    <View
                        style={{
                            alignSelf: "flex-end",
                            marginBottom: sizeFactor,
                            marginRight: sizeFactor,
                            flexDirection: "row",
                        }}
                    >
                        <AddWalletButton
                            color={colors.blue}
                            onPress={() => {
                                this.props.navigation.navigate("AddWalletScreen");
                            }}
                        />
                    </View>
                </Row>
                <FlatList
                    data={this.props.walletData}
                    renderItem={({ item }) => {
                        return (
                            <Wallet
                                heading={item.name}
                                color={item.color}
                                date={item.date}
                                isDefault={item.isDefault}
                                onPressDefault={() => {
                                    if (item.isDefault == "false") {
                                        defaultChanged(item);
                                    }
                                }}
                                onPressEdit={() => {
                                    this.props.SelectWallet(item);
                                    this.props.navigation.navigate({ name: "EditWalletScreen" });
                                }}
                                onPressSuDung={() => {
                                    this.props.SelectWallet(item);
                                    this.props.navigation.navigate({
                                        name: "AddTransactionScreen",
                                    });
                                }}
                            >
                                {toMoneyString(item.money)}
                            </Wallet>
                        );
                    }}
                ></FlatList>
                <Space />
            </ScreenView>
        );
    }
}

defaultChanged = (walletItem) => {
    walletRef.once("value", (snap) => {
        snap.forEach((element) => {
            if (element.toJSON().isDefault == "true") {
                walletRef.child(element.key).update({
                    //name: element.toJSON().name,
                    //color: element.toJSON().color,
                    //date: element.toJSON().date,
                    //money: element.toJSON().money,
                    isDefault: "false",
                });
            }
        });
    });
    walletRef.child(walletItem.key).update({
        //name: walletItem.name,
        //color: walletItem.color,
        //date:walletItem.date,
        //money: walletItem.money,
        isDefault: "true",
    });
};

//redux define container

const mapStateToProps = (state) => {
    return {
        walletData: state.WalletReducer,
        //selectedWallet: state.selectedWalletReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (snap) => {
            dispatch(UpdateWalletAction(snap));
        },
        SelectWallet: (value) => {
            dispatch(SelectWallet(value));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

var WalletData = [
    {
        key: "WL000001",
        name: "Ví chính",
        color: "#5856d6",
        date: "20/08/2020",
        isDefault: "true",
        money: "1,500,000",
    },
    {
        key: "WL000002",
        name: "Ví cho người yêu",
        color: "#ff2d55",
        date: "01/01/2014",
        isDefault: "false",
        money: "25,000,000",
    },
    {
        key: "WL000003",
        name: "Tiền dưỡng già",
        color: "#ff9500",
        date: "01/01/2018",
        isDefault: "false",
        money: "5,000,000",
    },
];
