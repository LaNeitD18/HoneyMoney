import React, { Component, useState } from "react";
import {
    Text,
    TextInput,
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
import { Icon, SearchBar, ButtonGroup, Overlay, Avatar, Accessory } from "react-native-elements";
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
} from "./Basic";
import { connect } from "react-redux";
import IconImage, { findIcon, getIndex } from '../components/Image';
import { openDialog, closeDialog, updateSubCategories, addSubCategory, openIconDialog, selectIcon, setSubIcon, DeselectSubAction, editSubName, editSubCategory, getSubCategories } from '../actions/index';

class AddSubcategoryDialog extends Component {
    constructor(props) {
        super(props);
    }

    resetState = () => {
        const defaultIconIndex = 9;

        this.props.setSubIcon(defaultIconIndex);
        this.props.selectIcon(defaultIconIndex);
        //this.props.DeselectSubAction();

    }

    addSubCategory = () => {
        const name = this.props.subcategoryName;
        
        const subCategory = {
            key: this.props.selectedSub.key,
            categoryName: name,
            icon: IconImage[this.props.selectedIcon.subIndex].type,
            isDeleted: false
        }

        if(this.props.selectedSub.key === "") {
            // neu la them thi code day
            this.props.updateSubCategories(subCategory);
            this.props.addSubCategory(subCategory);
        }
        else {
            // day la code cho edit sub
            var subCategories = this.props.subCategories;
            subCategories.forEach((item, index) => {
                if(subCategory.key === item.key) {
                    subCategories[index] = subCategory;
                }
            })

            this.props.getSubCategories(subCategories);
            this.props.editSubCategory(subCategory);
        }
        
        this.closeDialog();
        // đang tạo ra 1 state addedSub và mỗi lần nhấn đồng ý thì vừa thêm cate đó vô subs vừa thêm vô addedSubs 
    }

    // delete = edit isDeleted to true
    deleteSubcategory = () => {
        const subCategory = {
            ...this.props.selectedSub,
            isDeleted: true
        }

        var subCategories = this.props.subCategories;
        subCategories.forEach((item, index) => {
            if(subCategory.key === item.key) {
                subCategories.splice(index, 1);
            }
        })

        this.props.getSubCategories(subCategories);
        this.props.editSubCategory(subCategory);

        this.closeDialog();
    }

    closeDialog = () => {
        this.resetState();
        this.props.closeDialog();
    }


    render() {
        const iconPath = IconImage[this.props.selectedIcon.subIndex].iconPath;

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
                    <TouchableOpacity onPress={() => this.closeDialog()}>
                        <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.props.openIconDialog}>
                    <Avatar
                        size={sizeFactor * 4}
                        avatarStyle={{
                            width: sizeFactor * 3.5,
                            height: sizeFactor * 3.5,
                        }}
                        source={iconPath}
                    >
                        <Accessory size={sizeFactor * 1.25} />
                    </Avatar>
                </TouchableOpacity>
                <Space />
                <String
                    style={{
                        fontSize: sizeFactor,
                        fontWeight: "bold",
                    }}
                >
                    Danh mục con
                </String>
    
                <TextInput 
                    multiline 
                    style={{ fontSize: sizeFactor * 1.5, marginBottom: sizeFactor * 0.75, textAlign: "center" }} 
                    placeholder="Tên danh mục" 
                    onChangeText={(text) => this.props.editSubName(text)}
                    value={this.props.subcategoryName}
                />
                <Space />
                <View 
                    style={{ 
                        width: windowWidth - sizeFactor * 8, 
                        flexDirection: "row-reverse", 
                        justifyContent: "space-between", 
                        marginBottom: 0 }}>
                    <TouchableOpacity onPress={() => this.addSubCategory()}>
                        <String style={{ color: colors.blue }}>Đồng ý</String>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteSubcategory()}>
                        <String style={{ color: colors.redDark }} >{this.props.deleteBtn_name}</String>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }
}

function mapStateToProps(state) {
    return {
        isVisible: state.isVisible,
        subCategories: state.subCategories,
        selectedSub: state.selectedSubReducer,
        selectedIcon: state.selectedIcon,
        addedSubCategories: state.addedSubCategories,
        selectedSub: state.selectedSubReducer,
        subcategoryName: state.subcategoryName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: () => { dispatch(openDialog())},
        openIconDialog: () => { dispatch(openIconDialog())},
        closeDialog: () => { dispatch(closeDialog())},
        updateSubCategories: (subCategory) => { dispatch(updateSubCategories(subCategory))},
        addSubCategory: (subCategory) => { dispatch(addSubCategory(subCategory))},
        selectIcon: (index) => { dispatch(selectIcon(index))},
        setSubIcon: (index) => { dispatch(setSubIcon(index))},
        DeselectSubAction: () => { dispatch(DeselectSubAction())},
        editSubName: (name) => { dispatch(editSubName(name))},
        editSubCategory: (subCategory) => { dispatch(editSubCategory(subCategory))},
        getSubCategories: (subCategories) => { dispatch(getSubCategories(subCategories))},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSubcategoryDialog);
