import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, Platform, TextInput } from "react-native";
import { String, ScreenView, Card, Divider, Heading, RowLeft, Number, NegativeNumber, Wallet, colors, sizeFactor, styles, KindSelect, Title, Category, TouchableText, ScrollSelect, CategoryTable, windowWidth, windowHeight, Heading2, OutlineButton, Row, HeadlessCard, SmallScrollSelect, SmallKindSelect, OutlineToggleButton, Button, ToggleButton } from "../components/Basic";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import CategoriesScreen from "../screens/CategoriesScreen";
import DatePicker from "react-native-datepicker";
import IconImage, { findIcon } from '../components/Image';

//redux
import {connect} from 'react-redux';
import { changeType, updateCategories, reloadCategory, 
  changeSearchText, chooseCategory, changeName, getSubCategories,
} from '../actions/index';

//firebase
import * as firebase from 'firebase'

//data connect
import {rootRef,walletRef, categoryRef, subcategoryRef} from '../components/DataConnect'

//Navigator
import { CommonActions } from '@react-navigation/native';
import { color } from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

export class AddTransactionScreen extends Component {
  _isMounted = false;
  constructor(props)
  {
    super(props);
    this.state = {
      selectedCategory: '',
      date: '',
      selectedTenVi: this.props.route.params?.walletName ?? '',
      newSoDu: '',
      defaultColor: this.props.route.params?.walletColor ?? colors.blue,
      refresh: '0',
    };
  }
  onChangeSoDu(text){
    this.setState({newSoDu: text});
  }
  getDataBasedOnType = (selectedType) => {
    this.props.changeType(selectedType);
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
  getData = (typeID) => {
      const categories = this.props.allCategories;
      const temp = categories.filter(item => item.typeID === typeID);
      this.props.reloadCategory(temp);
  }

  // getSubCategories = () => {
  //   const categories = [];
  //   subcategoryRef.orderByChild('ParentID').equalTo(selectedCategory.key).once('value', (snapshot) => {
  //       snapshot.forEach(element => {
  //           categories.push({
  //               key: element.key,
  //               categoryName: element.toJSON().CategoryName,
  //               icon: element.toJSON().Icon,
  //               parentID: element.toJSON().ParentID,
  //               typeID: element.toJSON().TypeID
  //           });
  //       });
  //   });
  //   categories.push({
  //       key: 0,
  //       categoryName: 'Thêm mới',
  //       icon: 'themdanhmuccon',
  //       parentID: '',
  //       typeID: ''
  //   });
  //   return categories;
  // }

  chooseCategory = (category) => {

    if(this.state.selectedCategory == category.key)
    {
      this.setState({selectedCategory:''});
    }
    else
    {
      this.setState({selectedCategory: category.key});
    }
    //this.props.chooseCategory(category);
    //this.props.changeName(category.categoryName);

    //const subCategories = this.getSubCategories(category);
    //this.props.getSubCategories(subCategories);

    //this.props.navigation.navigate('EditCategoryScreen');
  }
  componentDidMount(){
    let tempTen = '';
    let tempColor = '';
    if(this.state.selectedTenVi == '')
    {
      walletRef.orderByChild("isDefault").equalTo('true').on('value', (snap) => {
        snap.forEach(element => {
          tempTen = element.toJSON().name;
          tempColor = element.toJSON().color;
      })
    })
    this.setState({selectedTenVi: tempTen, defaultColor: tempColor});
    }
  }

  componentWillUpdate() {
    this._isMounted = false;
  }

  renderCategoryHorizon = () => {
    const categories = this.props.renderedCategories;
    const rows = [];
    const row = [];
    for(let index=0; index<=categories.length; index++) {
      if(index < categories.length) {
          const name = categories[index].categoryName;
          const icon = categories[index].icon;
          const iconPath = findIcon(icon);
          row.push(
              <Category 
                  choosed = {this.state.selectedCategory == categories[index].key? true : false}
                  key={categories[index].key} 
                  source={iconPath} 
                  onPress={() => this.chooseCategory(categories[index])}>
              {name}
              </Category>
          );
      } else if( index == categories.length) {
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
      <RowLeft>{row}</RowLeft>
    );
    return rows;
  }
  // renderSubCategoryHorizon = () => {
  //   const categories = this.getSubCategories();
  //   const rows = [];
  //   const row = [];
  //   for(let index=0; index<=categories.length; index++) {
  //     if(index < categories.length) {
  //         const name = categories[index].categoryName;
  //         const icon = categories[index].icon;
  //         const iconPath = findIcon(icon);
  //         row.push(
  //             <Category 
  //                 choosed = {this.state.selectedCategory == categories[index].key? true : false}
  //                 key={categories[index].key} 
  //                 source={iconPath} 
  //                 onPress={() => this.chooseCategory(categories[index])}>
  //             {name}
  //             </Category>
  //         );
  //     } else if( index == categories.length) {
  //         row.push(
  //             <Category 
  //                 key={index} 
  //                 source={require("../assets/categories/themdanhmuc.png")} 
  //                 onPress={() => {/*cho nay de them addSubCategoryScreen navigate*/}}>
  //             {'Thêm danh mục'}
  //             </Category>
  //         )
  //     }
  //   }
  //   rows.push(
  //     <RowLeft>{row}</RowLeft>
  //   );
  //   return rows;
  // }
  renderKindSelect = () => {
    if(this.props.searchText === "") {
        return (
            <KindSelect 
                onPress={(index) => this.getDataBasedOnType(index)}
                selectedIndex={this.props.selectedType}
                buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
        );
    }   return;
  }
  render() {
    let rows = this.renderCategoryHorizon();
    const kindSelect = this.renderKindSelect();
    // const subCategoryShow = this.state.selectedCategory == ''? <View></View>: this.renderSubCategoryHorizon() ;
    return (
      <ScreenView style={{ backgroundColor: this.state.defaultColor }}>
        <TouchableOpacity onPress={()=>{
          //this.props.navigation.goBack()
          this.props.navigation.navigate('WalletScreen');2
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              marginHorizontal: sizeFactor * 1.75,
              marginRight: sizeFactor * 3,
            }}
          >
            <Icon
              name="unfold-more-horizontal"
              type="material-community"
              color="white"
              size={sizeFactor * 1.45}
              style={{
                marginRight: sizeFactor / 2,
                opacity: 0,
                marginTop: 1,
              }}
            />
            <Heading style={{ color: "white" }}>{this.state.selectedTenVi}</Heading>
            <Icon
              name="unfold-more-horizontal"
              type="material-community"
              color="white"
              size={sizeFactor * 1.45}
              style={{
                marginLeft: sizeFactor / 2,
                opacity: 0.75,
                marginTop: 1,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "flex-end",
            paddingLeft: sizeFactor,
            paddingRight: sizeFactor * 1.5,
          }}
        >
          <String
            style={{ color: "white", fontWeight: "bold", marginBottom: 0 }}
          >
            Số tiền
          </String>
          <TextInput
            contextMenuHidden={true}
            placeholder='0'
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: sizeFactor * 2,
              marginBottom: sizeFactor * 0.75,
            }}
            keyboardType='number-pad' //dung tam cai nay cho den khi co ban phim so hoc//
            onChangeText={text=>{this.onChangeSoDu(text)}}
            value={this.state.newSoDu}/>
          <String style={{ color: "white", fontWeight: "bold" }}>
            Danh mục
          </String>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: sizeFactor,
            borderRadius: sizeFactor,
            paddingTop: sizeFactor * 0.75,
            paddingBottom: sizeFactor,
            marginBottom: sizeFactor,
          }}
        >
          {kindSelect}
          <ScrollView horizontal={true}>
            <CategoryTable rows={rows}/>
          </ScrollView>
          <View
            style={{
              flex: 1,
              paddingLeft: sizeFactor,
            }}
          >
            <String style={{ fontWeight: "bold" }}>Danh mục con</String>
          </View>
          {/*subCategoryShow*/}
          <TouchableOpacity>
            <View style={{ justifyContent: "center" }}>
              <Icon
                name="chevron-down"
                type="material-community"
                color="black"
                size={sizeFactor * 2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
            style={{
                backgroundColor: "white",
                marginHorizontal: sizeFactor,
                borderRadius: sizeFactor,
                marginBottom: sizeFactor,
                paddingHorizontal: sizeFactor,
                paddingBottom: sizeFactor * 1.25,
            }}
        >
            <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                <TouchableOpacity>
                    {/*  expanded: "chevron-down", collapsed: "chevron-right*/}
                    <Icon name="chevron-down" type="material-community" color={colors.gray} size={sizeFactor * 2} />
                </TouchableOpacity>
            </View>
            <Title style={{ marginLeft: 0 }}>Nâng cao</Title>
            <String style={{ fontWeight: "bold" }}>Chọn ngày</String>
            <RowLeft style={{ flex: 9 }}>
                <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
                    <ToggleButton color={colors.indigo} background="white" choosed="true" style={{ paddingHorizontal: sizeFactor / 4 }}>
                        Hôm nay
                    </ToggleButton>
                </View>
                <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
                    <ToggleButton color={colors.indigo} background="white" choosed="false" style={{ paddingHorizontal: sizeFactor / 4 }}>
                        Hôm qua
                    </ToggleButton>
                </View>
                <View style={{ flex: 3.5 }}>
                    <ToggleButton color={colors.indigo} background="white" choosed="false" style={{ paddingHorizontal: sizeFactor / 4 }}>
                        12/12/2020
                    </ToggleButton>
                </View>
            </RowLeft>
            <Divider />
            <String style={{ fontWeight: "bold" }}>Ghi chú</String>
            <TextInput style={styles.inputMultilineText} multiline={true} placeholder="50k cho một ly trà sữa?" />
        </View>
        <OutlineButton style={{ marginHorizontal: sizeFactor * 1.5 }} backgroundColor="white" color="white">
            Thực hiện giao dịch
        </OutlineButton>
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
      changeType: (selectedType) => { dispatch(changeType(selectedType))},
      updateCategories: (categories) => { dispatch(updateCategories(categories)) }, 
      reloadCategory: (categories) => { dispatch(reloadCategory(categories)) },
      changeSearchText: (text) => { dispatch(changeSearchText(text)) },
      chooseCategory: (category) => { dispatch(chooseCategory(category)) },
      changeName: (text) => { dispatch(changeName(text)) },
      getSubCategories: (categories) => { dispatch(getSubCategories(categories)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen);