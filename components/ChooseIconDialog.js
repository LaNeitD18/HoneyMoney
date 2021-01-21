import React, { Component, useState } from "react";
import {
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    KeyboardAvoidingView,
} from "react-native";
import { Icon, SearchBar, ButtonGroup, Overlay } from "react-native-elements";
import { connect } from "react-redux";

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
    IconCategory,
} from "./Basic";

import { closeIconDialog } from '../actions/index';

class ChooseIconDialog extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Overlay
                overlayStyle={{
                    borderRadius: sizeFactor,
                    width: windowWidth - sizeFactor * 4,
                    paddingHorizontal: sizeFactor * 1.5,
                    paddingVertical: sizeFactor * 1.5,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                isVisible={this.props.isVisibleIconDialog}
            >
                <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                    <TouchableOpacity onPress={this.props.closeIconDialog}>
                        <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                    </TouchableOpacity>
                </View>
                <String
                    style={{
                        fontSize: sizeFactor,
                        fontWeight: "bold",
                    }}
                >
                    Biểu tượng danh mục
                </String>
                <Space />
                <ScrollView
                    style={{ width: windowWidth - sizeFactor * 7 }}
                    vertical
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            alignContent: "flex-start",
                            justifyContent: "flex-start",
                            paddingLeft: sizeFactor / 4,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: -sizeFactor / 2,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                            <IconCategory
                                choosed={true}
                                source={require("../assets/categories/general.png")}
                            />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: -sizeFactor / 2,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginRight: -sizeFactor / 2,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                            <IconCategory source={require("../assets/categories/tuthien.png")} />
                        </View>
                    </View>
                </ScrollView>
                <Space />
                <Space />
                <TouchableOpacity>
                    <String style={{ color: colors.blue }}>Đồng ý</String>
                </TouchableOpacity>
            </Overlay>
        );
    }
};

function mapStateToProps(state) {
    return {
        isVisibleIconDialog: state.isVisibleIconDialog,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeIconDialog: () => { dispatch(closeIconDialog())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIconDialog);
