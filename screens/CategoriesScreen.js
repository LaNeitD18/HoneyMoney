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
    Alert,
} from "react-native";
import {
    String,
    ScreenView,
    Card,
    Space,
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
    LargeScrollSelect,
    CategoryTable,
} from "../components/Basic";
import { Icon, SearchBar, Avatar } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import * as firebase from "firebase";
import { categoryRef, userRef } from "../components/DataConnect";
import IconImage, { findIcon, getIndex } from "../components/Image";
import { connect } from "react-redux";
import {
    changeType,
    updateCategories,
    reloadCategory,
    changeSearchText,
    chooseCategory,
    changeName,
    getSubCategories,
    reloadAddedSubCategories,
    showType,
    selectIcon,
    workWithCategory,
    closeIconDialog,
    setAddingIcon
} from "../actions/index";

import EditCategoryScreen from "./EditCategoryScreen";
import { CommonActions } from "@react-navigation/native";
import chosenCategoryReducer from "../reducers/chosenCategoryReducer";

class CategoriesScreen extends React.Component {
    _isMounted = false;

    constructor() { 
        super();
    }

    getDataBasedOnType = (selectedType) => {
        this.props.changeType(selectedType);
        switch (selectedType) {
            case 0:
                this.getData("001");
                break;
            case 1:
                this.getData("002");
                break;
            case 2:
                this.getData("003");
                break;
            case 3:
                this.getData("004");
                break;
        }
    };

    getData = (typeID) => {
        const categories = this.props.allCategories;
        const temp = categories.filter((item) => item.typeID === typeID);
        this.props.reloadCategory(temp);
    };

    createNewCategory = () => {
        const category = [];
        this.props.getSubCategories(category);
        this.props.setAddingIcon(9);
        this.props.navigation.navigate("AddCategoryScreen");
    };

    getSubCategories = (chosenCategory) => {
        const categories = [];
        categoryRef.child(chosenCategory.key).child('SubCategories').once('value', (snapshot) => {
            snapshot.forEach(element => {
                categories.push({
                    key: element.key,
                    categoryName: element.toJSON().CategoryName,
                    icon: element.toJSON().Icon,
                });
            });
        });
        // categories.push({
        //     key: 0,
        //     categoryName: 'Thêm mới',
        //     icon: 'themdanhmuccon',
        //     parentID: '',
        //     typeID: ''
        // });
        // console.log("ZZZ");
        // console.log(categories);
        return categories;
    }

    chooseCategory = async(category) => {
        await this.props.chooseCategory(category);
        await this.props.workWithCategory();

        const iconIndex = getIndex(this.props.chosenCategory.icon);
        this.props.selectIcon(iconIndex);
        this.props.closeIconDialog();

        this.props.changeName(category.categoryName);
        this.props.showType(this.props.selectedType);

        const subCategories = this.getSubCategories(category);
        this.props.getSubCategories(subCategories);
        this.props.reloadAddedSubCategories();

        this.props.navigation.navigate("EditCategoryScreen");
    }

    renderCategoryTable = () => {
        const categories = this.props.renderedCategories;
        const numberOfRows = Math.ceil((categories.length + 1) / 4);
        const rows = [];

        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const index = 4 * i + j;
                if (index < categories.length) {
                    const name = categories[index].categoryName;
                    const icon = categories[index].icon;
                    const iconPath = findIcon(icon);
                    row.push(
                        <Category
                            key={categories[index].key}
                            source={iconPath}
                            onPress={() => this.chooseCategory(categories[index])}
                        >
                            {name}
                        </Category>
                    );
                } else if (index == categories.length) {
                    row.push(
                        <Category
                            key={index}
                            source={require("../assets/categories/themdanhmuc.png")}
                            onPress={() => this.createNewCategory()}
                        >
                            {"Thêm danh mục"}
                        </Category>
                    );
                }
            }
            rows.push(<RowLeft key={i}>{row}</RowLeft>);
        }
        return rows;
    };

    componentDidMount() {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        // const categoryRef = rootRef.child('users').child(uid).child('Category');
        // console.log(categoryRef);
        const userCategoryRef = userRef.child(uid).child('Category')

        this._isMounted = true;
        userCategoryRef.on("value", (snapshot) => {
            this.props.updateCategories(snapshot);
        });
    }

    componentDidUpdate(prevProps) {
        // when allCategories is updated after creating new category, renderedCategories is also updated
        if (
            this.props.allCategories !== prevProps.allCategories ||
            this.props.selectedType !== prevProps.selectedType
        ) {
            this.getDataBasedOnType(this.props.selectedType);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    searchFilterFunction(text) {
        if (text !== "") {
            //passing the inserted text in textinput
            const newData = this.props.allCategories.filter(function (item) {
                //applying filter for the inserted text in search bar
                const itemData = item.categoryName
                    ? item.categoryName.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            this.props.reloadCategory(newData);
        } else {
            this.getDataBasedOnType(this.props.selectedType);
        }
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        this.props.changeSearchText(text);
    }

    renderKindSelect = () => {
        if (this.props.searchText === "") {
            return (
                <KindSelect
                    onPress={(index) => this.getDataBasedOnType(index)}
                    selectedIndex={this.props.selectedType}
                    buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]}
                />
            );
        }
        return;
    };

    render() {
        let rows = this.renderCategoryTable();
        const kindSelect = this.renderKindSelect();

        return (
            <View style={{ flex: 1 }}>
                <Space />
                <Space />
                <Space />
                <SearchBar
                    platform={Platform.OS}
                    placeholder="Tìm danh mục..."
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    value={this.props.searchText}
                    lightTheme="true"
                    containerStyle={{
                        backgroundColor: "",
                        marginHorizontal: Platform.OS == "ios" ? sizeFactor / 2 : sizeFactor,
                        flex: 0.1,
                    }}
                    inputContainerStyle={{
                        backgroundColor: "white",
                        borderRadius: 99,
                        paddingHorizontal: sizeFactor / 2.5,
                    }}
                />
                <ScrollView style={{ flex: 0.9 }}>
                    <Title style={{ marginTop: 0 }}>Danh mục</Title>
                    {kindSelect}
                    <CategoryTable rows={rows} />
                    <Space />
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedType: state.selectedType,
        allCategories: state.allCategories,
        renderedCategories: state.renderedCategories,
        searchText: state.searchText,
        chosenCategory: state.chosenCategory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeType: (selectedType) => { dispatch(changeType(selectedType)) },
        updateCategories: (categories) => { dispatch(updateCategories(categories)) },
        reloadCategory: (categories) => { dispatch(reloadCategory(categories)) },
        changeSearchText: (text) => { dispatch(changeSearchText(text)) },
        chooseCategory: (category) => { dispatch(chooseCategory(category)) },
        changeName: (text) => { dispatch(changeName(text)) },
        getSubCategories: (categories) => { dispatch(getSubCategories(categories)) },
        reloadAddedSubCategories: () => { dispatch(reloadAddedSubCategories()) },
        showType: (selectedType) => { dispatch(showType(selectedType)) },
        selectIcon: (index) => { dispatch(selectIcon(index))},
        workWithCategory: () => { dispatch(workWithCategory())},
        closeIconDialog: () => { dispatch(closeIconDialog())},
        setAddingIcon: (index) => { dispatch(setAddingIcon(index))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
