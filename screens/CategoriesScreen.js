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
    Platform, Alert
} from "react-native";
import {
    String,
    ScreenView,
    Card,
    Divider,
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
    CategoryTable
} from "../components/Basic";
import { Icon, SearchBar, Avatar } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import * as firebase from 'firebase';
import { categoryRef } from '../components/DataConnect';
import IconImage, { findIcon } from '../components/Image';
import { connect } from 'react-redux';
import { changeType, updateCategories, reloadCategory, 
        changeSearchText, chooseCategory, changeName, getSubCategories,
        reloadAddedSubCategories
} from '../actions/index';

import EditCategoryScreen from './EditCategoryScreen';
import { CommonActions } from '@react-navigation/native';
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
                this.getData('001');
                break;
            case 1:
                this.getData('002');
                break;
            case 2:
                this.getData('003');
                break;
            case 3:
                this.getData('004');
                break;
        }
    }

    getData = (typeID) => {
        const categories = this.props.allCategories;
        const temp = categories.filter(item => item.typeID === typeID);
        this.props.reloadCategory(temp);
    }

    createNewCategory = () => {
        const category = [{
            key: 0,
            categoryName: 'Thêm mới',
            icon: 'themdanhmuccon',
            parentID: '',
            typeID: ''
        }];
        this.props.getSubCategories(category);
        this.props.navigation.navigate('AddCategoryScreen');
    }

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

    chooseCategory = (category) => {
        this.props.chooseCategory(category);
        this.props.changeName(category.categoryName);

        const subCategories = this.getSubCategories(category);
        this.props.getSubCategories(subCategories);
        this.props.reloadAddedSubCategories();

        this.props.navigation.navigate('EditCategoryScreen');
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
                            onPress={() => this.chooseCategory(categories[index])}>
                            {name}
                        </Category>
                    );
                } else if (index == categories.length) {
                    row.push(
                        <Category 
                            key={index} 
                            source={require("../assets/categories/themdanhmuc.png")} 
                            onPress={() => this.createNewCategory()}>
                        {'Thêm danh mục'}
                        </Category>
                    )
                }
            }
            rows.push(
                <RowLeft key={i}>{row}</RowLeft>
            );
        }
        return rows;
    }

    componentDidMount() {
        this._isMounted = true;
        categoryRef.on('value', (snapshot) => { this.props.updateCategories(snapshot) });
    }

    componentDidUpdate(prevProps) {
        // when allCategories is updated after creating new category, renderedCategories is also updated
        if ((this.props.allCategories !== prevProps.allCategories) || (this.props.selectedType !== prevProps.selectedType)) {
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
                const itemData = item.categoryName ? item.categoryName.toUpperCase() : ''.toUpperCase();
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
                    buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
            );
        } return;
    }

    render() {
        let rows = this.renderCategoryTable();
        const kindSelect = this.renderKindSelect();

        return (
            <ScreenView style={{ flex: 1 }}>
                <SearchBar
                    platform={Platform.OS}
                    placeholder="Tìm danh mục..."
                    onChangeText={text => this.searchFilterFunction(text)}
                    value={this.props.searchText}
                    lightTheme="true"
                    containerStyle={{
                        backgroundColor: "",
                        marginHorizontal:
                            Platform.OS == "ios" ? sizeFactor / 2 : sizeFactor,
                    }}
                    inputContainerStyle={{
                        backgroundColor: "white",
                        borderRadius: 99,
                        paddingHorizontal: sizeFactor / 2.5,
                    }}
                />
                <Title>Danh mục</Title>
                {kindSelect}
                <CategoryTable rows={rows} />
                <Divider />
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedType: state.selectedType,
        allCategories: state.allCategories,
        renderedCategories: state.renderedCategories,
        searchText: state.searchText
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
