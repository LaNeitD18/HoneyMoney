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
    LooseDivider,
    ChooseWalletList,
} from "../components/Basic";
import {
    Icon,
    SearchBar,
    Input,
    Avatar,
    Accessory,
    ListItem,
    Overlay,
} from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import * as firebase from "firebase";
import { categoryRef } from "../components/DataConnect";

import { findIcon } from "../components/Image";
import { changeType, changeName, openDialog } from "../actions/index";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import ChooseIconDialog from "../components/ChooseIconDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import ChooseWalletDialog from "../components/ChooseWalletDialog";

const data1 = [
    {
        name: "Ví 1",
        color: colors.purple,
    },
    {
        name: "Ví 2",
        color: colors.blue,
    },
];

export default class WalletTransferScreen extends Component {
    render() {
        return (
            <ScreenView style={{ backgroundColor: "white" }}>
                <Overlay
                    overlayStyle={{
                        borderRadius: sizeFactor,
                        width: windowWidth - sizeFactor * 4,
                        height: windowHeight - sizeFactor * 20,
                        paddingHorizontal: sizeFactor * 1.5,
                        paddingVertical: sizeFactor * 1,
                        alignContent: "center",
                        alignItems: "stretch",
                    }}
                    isVisible={true}
                >
                    <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                        <TouchableOpacity>
                            <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                        </TouchableOpacity>
                    </View>

                    <String
                        style={{
                            fontSize: sizeFactor * 1.5,
                            fontWeight: "bold",
                            marginBottom: sizeFactor * 1.5,
                        }}
                    >
                        Chọn ví
                    </String>
                    <ScrollView
                        style={{ paddingHorizontal: sizeFactor / 2, marginBottom: sizeFactor }}
                    >
                        <ChooseWalletList data={data1} />
                    </ScrollView>
                </Overlay>

                <View
                    style={{ margin: sizeFactor, marginTop: sizeFactor * 4, alignItems: "center" }}
                >
                    <Image
                        source={require("../assets/transfer.png")}
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
                        Chuyển tiền giữa các ví
                    </String>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví nguồn
                        </String>
                    </View>
                    <TouchableOpacity>
                        <Row style={{ marginBottom: 0 }}>
                            <View
                                style={{
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginVertical: sizeFactor * 0.5,
                                }}
                            >
                                <Icon
                                    style={{ marginRight: sizeFactor }}
                                    name="wallet"
                                    size={sizeFactor * 2.5}
                                    type="material-community"
                                    color={colors.pink}
                                />
                                <String style={{ marginBottom: 0, fontSize: sizeFactor * 1.5 }}>
                                    Ví chính
                                </String>
                            </View>
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví đích
                        </String>
                    </View>
                    <TouchableOpacity>
                        <Row style={{ marginBottom: 0 }}>
                            <View
                                style={{
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginVertical: sizeFactor * 0.5,
                                }}
                            >
                                <Icon
                                    style={{ marginRight: sizeFactor }}
                                    name="wallet"
                                    size={sizeFactor * 2.5}
                                    type="material-community"
                                    color={colors.pink}
                                />
                                <String style={{ marginBottom: 0, fontSize: sizeFactor * 1.5 }}>
                                    Ví chính
                                </String>
                            </View>
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        margin: sizeFactor,
                        marginHorizontal: sizeFactor * 1.5,
                    }}
                >
                    <HomoTextInput
                        label="Số tiền"
                        placeholder="000,000 VNĐ"
                        leftIcon={{
                            type: "material-community",
                            name: "cash",
                            color: colors.gray,
                        }}
                        keyboardType="numeric"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                    />
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
