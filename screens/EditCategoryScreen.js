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
    Divider,
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
import {
    Icon,
    SearchBar,
    Input,
    Avatar,
    Accessory,
    ListItem,
} from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from 'react-redux';

import * as firebase from 'firebase';
import { categoryRef } from '../components/DataConnect';

import { findIcon } from '../components/Image';
import { changeType, changeName } from '../actions/index';
import ChooseIconDialog from '../components/ChooseIconDialog'

class EditCategoryScreen extends Component {
    constructor(props) {
        super(props);
    }

    getSelectedIndex = () => {
        const type = this.props.chosenCategory.typeID;
        switch (type) {
            case '001':
                return 0;
            case '002':
                return 1;
            case '003':
                return 2;
        }
    }

    updateCategory = () => {
        const category = this.props.chosenCategory;
        categoryRef.child(category.key).update({
            CategoryName: this.props.categoryName
        });

        // exit this screen
    }

    deleteCategory = () => {
        const category = this.props.chosenCategory;
        categoryRef.child(category.key).remove();

        this.props.navigation.goBack();
    }

    render() {
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

        const iconPath = findIcon(this.props.chosenCategory.icon);

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
                    <TouchableOpacity>
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
                <Title style={{ marginLeft: sizeFactor * 1.5 }}>
                    Chỉnh sửa danh mục
            </Title>
                <RoundedView>
                    <String style={{ fontWeight: "bold" }}>Tên danh mục</String>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Danh mục của tôi"
                        value={this.props.categoryName}
                        onChangeText={(text) => this.props.changeName(text)} />
                    <Divider />
                    <String style={{ fontWeight: "bold" }}>Mục đích</String>
                    <AddWalletKindSelect
                        selectedIndex={this.getSelectedIndex()}
                        buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]} />
                    <Divider />
                    <String style={{ fontWeight: "bold" }}>Danh mục con</String>
                    <View>
                        {list.map((item, i) => (
                            <TouchableOpacity>
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    leftAvatar={{
                                        source: item.source,
                                        width: sizeFactor * 2.5,
                                        height: sizeFactor * 2.5,
                                        rounded: false,
                                    }}
                                    chevron={
                                        //sorry for bad code, pls edit this
                                        item.title == "Thêm mới"
                                            ? false
                                            : { size: sizeFactor * 1.5 }
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
                    <TouchableDeleteText onPress={this.deleteCategory}>
                        Xóa danh mục
            </TouchableDeleteText>
                </RoundedView>

                <Divider />
                <Button
                    color="white"
                    background={colors.blue}
                    style={{ marginHorizontal: sizeFactor }}
                    onPress={this.updateCategory}
                >
                    Lưu thay đổi
            </Button>
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {
        chosenCategory: state.chosenCategory,
        categoryName: state.categoryName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeType: (selectedType) => { dispatch(changeType(selectedType)) },
        changeName: (text) => { dispatch(changeName(text)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryScreen);
