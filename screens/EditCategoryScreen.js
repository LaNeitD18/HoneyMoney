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
import { changeType, changeName, openDialog, openIconDialog } from '../actions/index';
import AddSubcategoryDialog from '../components/AddSubcategoryDialog';
import ChooseIconDialog from '../components/ChooseIconDialog'

class EditCategoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedSubCategories: []
        }
        // ko sd props subcate để push nữa mà tạo ra 1 state khác sẽ chỉ nhận các subcate cần thêm vào, update state này
        // và sd nó cho vc push các cate mới
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
        const type = this.props.selectedType == 0 ? '001' : this.props.selectedType == 1 ? '002' : '003';
        categoryRef.child(category.key).update({
            CategoryName: this.props.categoryName,
            TypeID: type
        });

        const subCategories = this.props.addedSubCategories;
        //let update = {};
        subCategories.map(item => {
            categoryRef.child(category.key).child('SubCategories').push({
                CategoryName: item.categoryName,
                Icon: item.icon
            });
        })
        

        

        // exit this screen
        this.props.navigation.goBack();
    }

    deleteCategory = () => {
        const category = this.props.chosenCategory;
        categoryRef.child(category.key).remove();

        // exit this screen
        this.props.navigation.goBack();
    }

    renderSubCategoriesView = () => {
        const subCategories = this.props.subCategories;
        return <View>
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

    render() {
        const subCategoriesView = this.renderSubCategoriesView();
        // console.log("a ");
        // console.log(this.props.addedSubCategories);

        const iconPath = findIcon(this.props.chosenCategory.icon);

        return (
            <ScreenView>
                
                <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={this.props.openIconDialog}>
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
                onChangeText={(text) => this.props.changeName(text)}/>
            <Divider />
            <String style={{ fontWeight: "bold" }}>Mục đích</String>
            <AddWalletKindSelect 
                selectedIndex={this.props.selectedType}
                buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]} 
                onPress={(index) => this.props.changeType(index)}/>
            <Divider />
            <String style={{ fontWeight: "bold" }}>Danh mục con</String>

            {subCategoriesView}

            <TouchableOpacity onPress={() => this.props.openDialog()}>
                <ListItem
                    title="Thêm mới"
                    leftAvatar={{
                        source: require("../assets/categories/themdanhmuccon.png"),
                        width: sizeFactor * 2.5,
                        height: sizeFactor * 2.5,
                        rounded: false,
                    }}
                    chevron={false}
                    contentContainerStyle={{ marginHorizontal: 0 }}
                    rightContentContainerStyle={{ marginHorizontal: 0 }}
                    containerStyle={{ paddingHorizontal: 0 }}
                    titleStyle={{ fontSize: sizeFactor }}
                    pad={sizeFactor}>
                </ListItem>
            </TouchableOpacity>
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
            <AddSubcategoryDialog></AddSubcategoryDialog>
            <ChooseIconDialog></ChooseIconDialog>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeType: (selectedType) => { dispatch(changeType(selectedType))},
        changeName: (text) => { dispatch(changeName(text))},
        openDialog: () => { dispatch(openDialog())},
        openIconDialog: () => { dispatch(openIconDialog())},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryScreen);
