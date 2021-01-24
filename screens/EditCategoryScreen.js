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
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import * as firebase from "firebase";
import { userRef } from "../components/DataConnect";

import IconImage, { findIcon, getIndex } from '../components/Image';
import { 
    changeType, 
    changeName, 
    openDialog, 
    openIconDialog, 
    selectIcon, 
    setSubIcon, 
    workWithSubCategory, 
    workWithCategory, 
    reloadAddedSubCategories, 
    SelectSubAction, 
    editSubName, 
    DeselectSubAction, 
    reloadEditedSubCategories
} from '../actions/index';
import AddSubcategoryDialog from '../components/AddSubcategoryDialog';
import ChooseIconDialog from '../components/ChooseIconDialog'

class EditCategoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedSubCategories: [],
            deleteBtn_name: "Xóa",
        };
        // ko sd props subcate để push nữa mà tạo ra 1 state khác sẽ chỉ nhận các subcate cần thêm vào, update state này
        // và sd nó cho vc push các cate mới
    }

    getSelectedIndex = () => {
        const type = this.props.chosenCategory.typeID;
        switch (type) {
            case "001":
                return 0;
            case "002":
                return 1;
            case "003":
                return 2;
        }
    };

    updateCategory = async () => {
        // update parent category
        const category = this.props.chosenCategory;
        const type =
            this.props.selectedType == 0 ? "001" : this.props.selectedType == 1 ? "002" : "003";
        const icon = IconImage[this.props.selectedIcon.editIndex].type;

        let uid = "none";
        if (firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child("Category");

        userCategoryRef.child(category.key).update({
            CategoryName: this.props.categoryName,
            Icon: icon,
            TypeID: type,
        });

        // update sub categories of category
        const addedSubCategories = this.props.addedSubCategories;
        const editedSubCategories = this.props.editedSubCategories;
        const userSubcategoryRef = userCategoryRef.child(category.key).child("SubCategories/");

        // add new subs
        await addedSubCategories.map((item) => {
            userSubcategoryRef.push({
                CategoryName: item.categoryName,
                Icon: item.icon,
                IsDeleted: item.isDeleted
            });
        });

        // update edited subs
        await editedSubCategories.map((item) => {
            userSubcategoryRef.child(item.key).update({
                CategoryName: item.categoryName,
                Icon: item.icon,
                IsDeleted: item.isDeleted
            });
        });

        this.props.reloadAddedSubCategories();
        this.props.reloadEditedSubCategories();

        // exit this screen
        this.props.navigation.goBack();
    };

    deleteCategory = () => {
        // edit isDeleted
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child("Category");

        const category = this.props.chosenCategory;
        //console.log(this.props.chosenCategory);
        userCategoryRef.child(category.key).update({
            CategoryName: category.categoryName,
            Icon: category.icon,
            IsDeleted: true
        });

        // exit this screen
        this.props.navigation.goBack();
    };

    renderSubCategoriesView = () => {
        const subCategories = this.props.subCategories;
        return <View>
            {subCategories.map((item, i) => (
                <TouchableOpacity onPress={() => this.openEditSubDialog(item)}>
                    <ListItem
                        key={item.key}
                        title={item.categoryName}
                        leftAvatar={{
                            source: findIcon(item.icon),
                            width: sizeFactor * 2.5,
                            height: sizeFactor * 2.5,
                            rounded: false,
                        }}
                        chevron={
                            //sorry for bad code, pls edit this
                            item.categoryName == "Thêm mới" ? false : { size: sizeFactor * 1.5 }
                        }
                        contentContainerStyle={{ marginHorizontal: 0 }}
                        rightContentContainerStyle={{ marginHorizontal: 0 }}
                        containerStyle={{ paddingHorizontal: 0 }}
                        titleStyle={{ fontSize: sizeFactor }}
                        pad={sizeFactor}
                    />
                </TouchableOpacity>
            ))}
            
        </View>
    }

    openIconDialog = () => {
        // reset selectedIndex whenever open icon dialog
        // b/c if choose icon and close dialog, without reseting, selectedIndex != editIndex (expect ==)
        this.props.selectIcon(this.props.selectedIcon.editIndex);
        this.props.openIconDialog();
    };

    openAddSubDialog = () => {
        this.props.workWithSubCategory();
        this.setState({
            deleteBtn_name: ""
        });
        this.props.DeselectSubAction();
        this.props.editSubName("");

        this.props.openDialog();
    }

    openEditSubDialog = (subCategory) => {
        this.props.workWithSubCategory();
        this.setState({
            deleteBtn_name: "Xóa"
        });

        const subIconIndex = getIndex(subCategory.icon);
        this.props.setSubIcon(subIconIndex);
        this.props.selectIcon(subIconIndex);
        this.props.editSubName(subCategory.categoryName);
        this.props.SelectSubAction(subCategory);

        this.props.openDialog();
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secID, rowID, direction) => {},
            onOpen: (secID, rowID, direction) => {},
            right: [
                {
                    onPress: () => {
                        this.deleteCategory;
                    },
                    text: "Xóa",
                    type: "delete",
                },
            ],
        };
        const subCategoriesView = this.renderSubCategoriesView();
        // console.log("a ");
        // console.log(this.props.addedSubCategories);

        const iconPath = IconImage[this.props.selectedIcon.editIndex].iconPath;

        return (
            <ScreenView>
                <ChooseIconDialog />
                <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Space />
                    <Space />
                    <Space />
                    <TouchableOpacity
                        onPress={() => {
                            this.openIconDialog();
                        }}
                    >
                        <Avatar
                            size={sizeFactor * 6}
                            avatarStyle={{
                                width: sizeFactor * 4.5,
                                height: sizeFactor * 4.5,
                                marginLeft: sizeFactor * 0.75,
                                marginTop: sizeFactor * 0.75,
                            }}
                            source={iconPath}
                        >
                            <Accessory size={sizeFactor * 1.75} />
                        </Avatar>
                    </TouchableOpacity>
                </View>
                <Title style={{ marginLeft: sizeFactor * 1.5 }}>Chi tiết danh mục</Title>
                <RoundedView>
                    <String style={{ fontWeight: "bold" }}>Tên danh mục</String>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Danh mục của tôi"
                        value={this.props.categoryName}
                        onChangeText={(text) => this.props.changeName(text)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Mục đích</String>
                    <AddWalletKindSelect
                        selectedIndex={this.props.selectedType}
                        buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
                        onPress={(index) => this.props.changeType(index)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Danh mục con</String>

                    {/* {subCategoriesView} */}

                    <Swipeout style={{ marginBottom: sizeFactor / 2 }} {...swipeSettings}>
                        {this.renderSubCategoriesView()}
                    </Swipeout>
                    <TouchableOpacity onPress={() => this.openAddSubDialog()}>
                        <View
                            style={{
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                size={sizeFactor * 3}
                                avatarStyle={{
                                    width: sizeFactor * 2.5,
                                    height: sizeFactor * 2.5,
                                    marginTop: sizeFactor * 0.25,
                                    marginLeft: sizeFactor * 0.25,
                                }}
                                source={require("../assets/categories/themdanhmuccon.png")}
                            ></Avatar>
                            <String
                                style={{
                                    marginLeft: sizeFactor / 2,
                                    marginTop: sizeFactor * 0.75,
                                }}
                            >
                                Thêm danh mục con
                            </String>
                        </View>
                    </TouchableOpacity>
                </RoundedView>
                <Space />
                <Button
                    color="white"
                    backgroundColor={colors.blue}
                    style={{ marginHorizontal: sizeFactor }}
                    onPress={() => this.updateCategory()}
                >
                    Lưu thay đổi
                </Button>
                <Button
                    color="white"
                    backgroundColor={colors.red}
                    style={{ marginHorizontal: sizeFactor }}
                    onPress={() => this.deleteCategory()}
                >
                    Xóa danh mục
                </Button>
                <AddSubcategoryDialog
                    deleteBtn_name={this.state.deleteBtn_name}
                ></AddSubcategoryDialog>
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    // if don't have state isVisible, screen isn't rerendered although state subCategories is updated
    return {
        chosenCategory: state.chosenCategory,
        categoryName: state.categoryName,
        subCategories: state.subCategories,
        selectedType: state.selectedType,
        isVisible: state.isVisible,
        addedSubCategories: state.addedSubCategories,
        editableButtonGroup: state.editableButtonGroup,
        selectedIcon: state.selectedIcon,
        editedSubCategories: state.editedSubCategories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeType: (selectedType) => { dispatch(changeType(selectedType))},
        changeName: (text) => { dispatch(changeName(text))},
        openDialog: () => { dispatch(openDialog())},
        openIconDialog: () => { dispatch(openIconDialog())},
        selectIcon: (index) => { dispatch(selectIcon(index))},
        setSubIcon: (index) => { dispatch(setSubIcon(index))},
        workWithSubCategory: () => { dispatch(workWithSubCategory())},
        workWithCategory: () => { dispatch(workWithCategory())},
        reloadAddedSubCategories: () => { dispatch(reloadAddedSubCategories())},
        SelectSubAction: (category) => { dispatch(SelectSubAction(category))},
        DeselectSubAction: () => { dispatch(DeselectSubAction())},
        editSubName: (name) => { dispatch(editSubName(name))},
        reloadEditedSubCategories: () => { dispatch(reloadEditedSubCategories())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryScreen);
