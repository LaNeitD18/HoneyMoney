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
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";

class AddCategoryScreen extends Component {
    createCategory = () => {
        const name = this.props.categoryName;
        const type =
            this.props.selectedType == 0 ? "001" : this.props.selectedType == 1 ? "002" : "003";

        categoryRef.push({
            CategoryName: name,
            Icon: "",
            ParentID: "",
            TypeID: type,
        });
        this.props.navigation.goBack();
    };

    renderSubCategoriesView = () => {
        const subCategories = this.props.subCategories;
        return (
            <View>
                {subCategories.map((item, i) => (
                    <TouchableOpacity>
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
                                // if button is used to add new sub category, don't show the right arrow (set false), else set size for it
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
        );
    };

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secID, rowID, direction) => {},
            onOpen: (secID, rowID, direction) => {},
            right: [
                {
                    onPress: () => {},
                    text: "Xóa",
                    type: "delete",
                },
            ],
        };
        const subCategoriesView = this.renderSubCategoriesView();

        const list = [
            {
                title: "Từ tiện",
                source: require("../assets/categories/tuthien.png"),
            },
            {
                title: "Thêm mới",
                source: require("../assets/categories/themdanhmuccon.png"),
            },
        ];
        return (
            <ScreenView>
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
                    <TouchableOpacity>
                        <Avatar
                            size={sizeFactor * 6}
                            avatarStyle={{
                                width: sizeFactor * 4.5,
                                height: sizeFactor * 4.5,
                                marginLeft: sizeFactor * 0.75,
                                marginTop: sizeFactor * 0.75,
                            }}
                            source={require("../assets/categories/tuthien.png")}
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
                        onChangeText={(text) => this.props.changeName(text)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Loại chi tiêu</String>
                    <AddWalletKindSelect
                        buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
                        selectedIndex={this.props.selectedType}
                        onPress={(index) => this.props.changeType(index)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Danh mục con</String>

                    {subCategoriesView}

                    <Swipeout style={{ marginBottom: sizeFactor / 2 }} {...swipeSettings}>
                        <TouchableOpacity onPress={() => this.props.openDialog()}>
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
                                    source={require("../assets/categories/tuthien.png")}
                                ></Avatar>
                                <String
                                    style={{
                                        marginLeft: sizeFactor / 2,
                                        marginTop: sizeFactor * 0.75,
                                    }}
                                >
                                    Từ thiện
                                </String>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
                    <TouchableOpacity onPress={() => this.props.openDialog()}>
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
                    background={colors.blue}
                    style={{ marginHorizontal: sizeFactor }}
                    onPress={this.createCategory}
                >
                    Lưu thay đổi
                </Button>
                <AddSubcategoryDialog></AddSubcategoryDialog>
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {
        categoryName: state.categoryName,
        selectedType: state.selectedType,
        subCategories: state.subCategories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeName: (text) => {
            dispatch(changeName(text));
        },
        changeType: (index) => {
            dispatch(changeType(index));
        },
        openDialog: () => {
            dispatch(openDialog());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryScreen);
