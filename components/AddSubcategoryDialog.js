import React, { Component, useState } from "react";
import { Text, TextInput, StyleSheet, Platform, StatusBar, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView } from "react-native";
import { Icon, SearchBar, ButtonGroup, Overlay, Avatar, Accessory } from "react-native-elements";
import { String, ScreenView, Card, Divider, Heading, RowLeft, Number, NegativeNumber, Wallet, colors, sizeFactor, styles, KindSelect, Title, Category, TouchableText, ScrollSelect, CategoryTable, windowWidth, windowHeight, Heading2, OutlineButton, Row, HeadlessCard, SmallScrollSelect, SmallKindSelect, AddWalletKindSelect, OutlineToggleButton, Button, ToggleButton, ColorSelectButton, RoundedView, TouchableDeleteText } from "./Basic";
import { connect } from "react-redux";

import { openDialog, closeDialog } from '../actions/index';

class AddSubcategoryDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Overlay
                overlayStyle={{
                    borderRadius: sizeFactor,
                    width: windowWidth - sizeFactor * 4,
                    paddingHorizontal: sizeFactor,
                    paddingBottom: sizeFactor,
                    paddingTop: sizeFactor * 1.5,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                isVisible={this.props.isVisible}
            >
                <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                    <TouchableOpacity onPress={this.props.closeDialog}>
                        <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Avatar
                        size={sizeFactor * 4}
                        avatarStyle={{
                            width: sizeFactor * 3.5,
                            height: sizeFactor * 3.5,
                        }}
                        source={require("../assets/categories/tuthien.png")}
                    >
                        <Accessory size={sizeFactor * 1.25} />
                    </Avatar>
                </TouchableOpacity>
                <Divider />
                <String
                    style={{
                        fontSize: sizeFactor,
                        fontWeight: "bold",
                    }}
                >
                    Danh mục con
                </String>
    
                <TextInput multiline style={{ fontSize: sizeFactor * 1.5, marginBottom: sizeFactor * 0.75, textAlign: "center" }} placeholder="Tên danh mục" />
                <Divider />
                <View style={{ width: windowWidth - sizeFactor * 8, flexDirection: "row-reverse", justifyContent: "space-between", marginBottom: 0 }}>
                    <String style={{ color: colors.blue }}>Đồng ý</String>
                    <String style={{ color: colors.redDark }}>Xóa</String>
                </View>
            </Overlay>
        );
    }
    
};

function mapStateToProps(state) {
    return {
        isVisible: state.isVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: () => { dispatch(openDialog())},
        closeDialog: () => { dispatch(closeDialog())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubcategoryDialog);
