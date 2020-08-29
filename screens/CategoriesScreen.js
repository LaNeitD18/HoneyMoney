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
import { connect } from 'react-redux';
import { changeType } from '../actions/index';

class CategoriesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
      //selectedIndex: 1
    };
    this.arrayholder = [];
  }

  // updateIndex = (selectedIndex) => {
  //   // update selected index when pressing on a button in kindselect to change type of category
  //   this.setState({ selectedIndex }); 
  //   // after changing type, reload to get categories which belong to this type
  //   this.getDataBasedOnType(selectedIndex);
  // }

  getDataBasedOnType = (selectedType) => {
      switch(selectedType) {
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

  // demo functions 
  getData = (typeID) => {
    firebase.database().ref().child('Category').orderByChild('TypeID').equalTo(typeID).on('value', (snapshot) => {
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
              const path = findIcon(name);
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
     this.getDataBasedOnType(this.props.selectedType);
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
    //const selectedIndex = this.state.selectedIndex;
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
        <Title>Danh mục</Title>
        <KindSelect 
            onPress={(type) => this.props.changeType(type)}
            selectedIndex={this.props.selectedType}
            buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
        <CategoryTable onPress={this.createDatabase} rows={rows}/>
        <Divider />
      </ScreenView>
    );
  }
}

function mapStateToProps(state) {
    return {
        selectedType: state.selectedType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeType: (selectedType) => { dispatch(changeType(selectedType))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
