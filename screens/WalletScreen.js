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
} from "react-native";
import {
    String,
    ScreenView,
    Card,
    Divider,
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
} from "../components/Basic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AddWalletScreen from "./AddWalletScreen";

export default class WalletScreen extends Component {
    render() {
        return (
            <ScreenView>
                <Title>Tổng quan</Title>
                <View style={{ paddingHorizontal: sizeFactor }}>
                    <Row>
                        <HeadlessCard
                            color="white"
                            icon="wallet"
                            width={(windowWidth - sizeFactor * 3) / 2}
                            iconColor={colors.blue}
                        >
                            <View>
                                <Heading2>Số dư</Heading2>
                                <PositiveNumber>5,000,000</PositiveNumber>
                            </View>
                        </HeadlessCard>
                        <HeadlessCard
                            color="white"
                            width={(windowWidth - sizeFactor * 3) / 2}
                            icon="wallet"
                            iconColor={colors.blue}
                        >
                            <View>
                                <Heading2>Tháng này</Heading2>
                                <NegativeNumber>250,000</NegativeNumber>
                            </View>
                        </HeadlessCard>
                    </Row>
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
                        <AddWalletButton color={colors.blue} />
                    </View>
                </Row>
                <Wallet
                    heading="Ví chính"
                    color={colors.indigo}
                    date="20/08/2020"
                    isDefault="true"
                >
                    1,500,000
        </Wallet>
                <Wallet
                    heading="Ví cho người yêu"
                    color={colors.pink}
                    date="01/01/2014"
                    isDefault="false"
                >
                    25,000,000
        </Wallet>
                <Divider />
            </ScreenView>
        );
    }
}
