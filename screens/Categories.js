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
import Cate from '../components/Category';

export default class CategoriesScreen extends React.Component {
  state = {
    search: "",
    categories: [],
    rowsOfCategory: []
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  // demo functions 
  getData = () => {
    firebase.database().ref('Category/').on('value', (snapshot) => {
        snapshot.forEach(element => {
            //let temp = new Cate(element.val().TypeID, element.val().CategoryName, element.val().Icon, element.val().ParentID);
            this.state.categories.push(element.val());
            //Alert.alert(temp.CategoryName);
        });
    });
  }

  renderCategoryTable = () => {
    const categories = this.state.categories;
    const numberOfRows = Math.ceil(categories.length / 4);

    for(let i=0; i<numberOfRows; i++) {
        let row = [];
        for(let j=0; j<4; j++) {
            const index = 4*i + j;
            if(index < categories.length) {
              const name = categories[index].CategoryName;
              row.push(
                <Category source={require("../assets/categories/tuthien.png")}>
                    {name}
                </Category>  
              );
            }
        }
        this.state.rowsOfCategory.push(
            <RowLeft>{row}</RowLeft>
        );
    }
    //Alert.alert(this.state.categories[5].CategoryName);
  }

  createDatabase = () => {
    // firebase.database().ref('users/' + 2).set({
    //   highscore: 4
    // });
    firebase.database()
    .ref('Category/').push({
        TypeID: "003",
        CategoryName: "Khoản thu khác",
        Icon: "",
        ParentID: ""
    });
  }

  render() {
    const { search } = this.state;
    this.getData();
    this.renderCategoryTable();

    return (
      <ScreenView style={{ flex: 1 }}>
        <SearchBar
          platform={Platform.OS}
          placeholder="Tìm danh mục..."
          onChangeText={this.updateSearch}
          value={search}
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
        <Title>Gần đây</Title>
        <LargeScrollSelect />
        <Title>Danh mục</Title>
        <KindSelect buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
        <CategoryTable onPress={() => this.getData()} rows={this.state.rowsOfCategory}/>
        <Divider />
        <TouchableOpacity onPress={() => this.renderCategoryTable()}>
          <Text>ZZZ</Text>
        </TouchableOpacity>
      </ScreenView>
    );
  }
}
