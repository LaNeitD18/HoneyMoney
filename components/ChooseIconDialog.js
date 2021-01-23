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

import { closeIconDialog, selectIcon } from '../actions/index';
import IconImage from './Image';



class ChooseIconDialog extends Component {
    constructor() {
        super();

        // this.state = {
        //     selectedIndex: 0
        // }
    }

    selectIcon = (index) => {
        console.log("in " + index);
        this.props.selectIcon(index);
    }

    IconRows = () => {
        // dang phan van chuyen chon selectedIcon xong thi icon cua cate va cua subcate doi tum lum, lq chon icon cho cate va subcate
        // ranh thi them het icon trong asset vo Image.js
        const numberOfRows = Math.ceil((IconImage.length - 2) / 4);
        let rows = [];

        for(let i=0; i<numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                const index = 4 * i + j;
                if (index < IconImage.length - 2) {
                    const iconPath = IconImage[index].iconPath;
                    const isSelected = this.props.selectedIcon === index ? true : false;
                    row.push(
                        <IconCategory 
                            choosed={isSelected} 
                            source={iconPath}
                            onPress={() => {this.selectIcon(index)}}    
                        />
                    );
                    //console.log("dia " + this.props.selectedIcon);
                }
            }
            rows.push(
                <View style={{flexDirection: "row", marginRight: -sizeFactor / 2, marginBottom: sizeFactor / 2 }}>
                    {row}
                </View>
            );
        }
        return rows;
    }

    closeDialog = () => {
        const iconIndex = getIndex(this.props.chosenCategory.icon);
        this.props.selectIcon(iconIndex);

        this.props.closeIconDialog();
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
                        {this.IconRows()}
                    </View>
                </ScrollView>
                <Space />
                <Space />
                <TouchableOpacity onPress={() => this.props.closeIconDialog()}>
                    <String style={{ color: colors.blue }}>Đồng ý</String>
                </TouchableOpacity>
            </Overlay>
        );
    }
};

function mapStateToProps(state) {
    return {
        isVisibleIconDialog: state.isVisibleIconDialog,
        selectedIcon: state.selectedIcon,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeIconDialog: () => { dispatch(closeIconDialog())},
        selectIcon: (index) => { dispatch(selectIcon(index))},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIconDialog);
