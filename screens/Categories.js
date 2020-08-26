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
import IconImage, { findIcon } from '../components/Image';

export default class CategoriesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
    };
    this.arrayholder = [];
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  // demo functions 
  getData = () => {
    firebase.database().ref().child('Category').on('value', (snapshot) => {
      const temp = [];
      snapshot.forEach(element => {
          temp.push({
              key: element.key,
              categoryName: element.toJSON().CategoryName,
              icon: element.toJSON().Icon,
              parentID: element.toJSON().ParentID,
              typeID: element.toJSON().TypeID
          });
          
      });
      this.setState({
        categories: temp
      });
      this.arrayholder = temp;
    });
  }

  renderCategoryTable = () => {
    const categories = this.state.categories;
    const numberOfRows = Math.ceil(categories.length / 4);
    const rows = [];

    for(let i=0; i<numberOfRows; i++) {
        const row = [];
        for(let j=0; j<4; j++) {
            const index = 4*i + j;
            if(index < categories.length) {
              const name = categories[index].categoryName;
              const icon = categories[index].icon;
              const path = findIcon(icon);
              row.push(
                <Category key={categories[index].key} source={path}>
                    {name}
                </Category>  
              );
            }
        }
        rows.push(
            <RowLeft key={i}>{row}</RowLeft>
        );
    }
    //console.log(this.state.categories[0]);
    return rows;
  }

  createDatabase = () => {
    for(let i=4; i<22; i++) {
      const temp = this.state.categories[i];
      firebase.database().ref('Category/').child(temp.key).update({
        Icon: 'thuno'
      })
    }
  }

  componentDidMount() {
     this.getData();
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.categoryName ? item.categoryName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      categories: newData,
      search: text,
    });
    //console.log(this.arrayholder);
    //console.log(newData);
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    const search = this.state.search;
    let rows = this.renderCategoryTable();

    return (
      <ScreenView style={{ flex: 1 }}>
        <SearchBar
          platform={Platform.OS}
          placeholder="Tìm danh mục..."
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.search}
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
        <CategoryTable onPress={this.createDatabase} rows={rows}/>
        <Divider />
      </ScreenView>
    );
  }
}
