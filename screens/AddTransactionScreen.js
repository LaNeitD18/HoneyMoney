import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, Platform, TextInput } from "react-native";
import { String, ScreenView, Card, Divider, Heading, RowLeft, Number, NegativeNumber, Wallet, colors, sizeFactor, styles, KindSelect, Title, Category, TouchableText, ScrollSelect, CategoryTable, windowWidth, windowHeight, Heading2, OutlineButton, Row, HeadlessCard, SmallScrollSelect, SmallKindSelect, OutlineToggleButton, Button, ToggleButton } from "../components/Basic";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import CategoriesScreen from "../screens/CategoriesScreen";
import DatePicker from "react-native-datepicker";
import IconImage, { findIcon } from '../components/Image';
import DateTimePicker from '@react-native-community/datetimepicker';

//redux
import {connect} from 'react-redux';
import { changeType, updateCategories, reloadCategory, 
  changeSearchText, chooseCategory, changeName, getSubCategories, DeselectCategoryAction, SelectSubAction, DeselectSubAction, UpdateSubAction, SetShowDatePicker, ChangeSoDuTransAction, ChangeDateModeaTransAction
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
      date: new Date(),
      selectedTenVi: this.props.route.params?.walletName ?? '',
      defaultColor: this.props.route.params?.walletColor ?? colors.blue,
      fulllist: false
    };
  }
  toString(date) {
    var day = date.getDate(); //Current Date
    var month = date.getMonth() + 1; //Current Month
    var year = date.getFullYear(); //Current Year
    var fulldate;
    if(day < 10)
    {
      fulldate = '0' + day;
    }
    else
    {
      fulldate = day;
    }
    if(month < 10)
    {
      fulldate = fulldate + '/' + '0' + month;
    }
    else
    {
      fulldate = fulldate + '/' + month;
    }
    fulldate = fulldate + '/' + year;
    return fulldate;
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
  chooseCategory = (category) => {
    if(this.props.selectedCategory.key == category.key)
    {
      this.props.deselectCategory();
      this.props.deselectSub();
    }
    else
    {
      this.props.deselectSub();
      this.props.chooseCategory(category);
      this.props.updateSub(category);
    }
  }
  chooseSub = (sub) => {
    if(this.props.selectedSub.key == sub.key)
    {
      this.props.deselectSub();
    }
    else
    {
      this.props.selectSub(sub);
    }
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
                  choosed = {this.props.selectedCategory.key == categories[index].key? true : false}
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
                        choosed = {this.props.selectedCategory.key == categories[index].key? true : false}
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

  renderSubCategoryTable = () => {
    const categories = this.props.subCategory;
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
                        choosed = {this.props.selectedSub.key == categories[index].key? true : false}
                        key={categories[index].key}
                        source={iconPath}
                        onPress={() => this.chooseSub(categories[index])}>
                        {name}
                    </Category>
                );
            } else if (index == categories.length) {
                row.push(
                    <Category 
                        key={index} 
                        source={require("../assets/categories/themdanhmuc.png")} 
                        onPress={() => {}}>
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

  renderSubCategoryHorizon = () => {
    const categories = this.props.subCategory;
    const rows = [];
    const row = [];
    for(let index=0; index<=categories.length; index++) {
      if(index < categories.length) {
          const name = categories[index].categoryName;
          const icon = categories[index].icon;
          const iconPath = findIcon(icon);
          row.push(
              <Category 
                  choosed = {this.props.selectedSub.key == categories[index].key? true : false}
                  key={categories[index].key} 
                  source={iconPath} 
                  onPress={() => {this.chooseSub(categories[index])}}>
              {name}
              </Category>
          );
      } else if( index == categories.length) {
          row.push(
              <Category 
                  key={index} 
                  source={require("../assets/categories/themdanhmuc.png")} 
                  onPress={() => {/*cho nay de them addSubCategoryScreen navigate*/}}>
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
  renderKindSelect = () => {
    if(this.props.searchText === "") {
        return (
            <KindSelect 
                onPress={(index) => {this.getDataBasedOnType(index); this.props.deselectSub(); this.props.deselectCategory();}}
                selectedIndex={this.props.selectedType}
                buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
        );
    }   return;
  }
  render() {
    let rows = this.state.fulllist? this.renderCategoryTable(): this.renderCategoryHorizon();
    const kindSelect = this.renderKindSelect();
    const subCategoryShow = this.props.selectedCategory.key == ''? <View></View>: 
    <View>
      <View
        style={{
          flex: 1,
          paddingLeft: sizeFactor,
        }}
      >
        <String style={{ fontWeight: "bold" }}>Danh mục con</String>
      </View>
      <ScrollView horizontal={true}>
        <CategoryTable rows={this.state.fulllist? this.renderSubCategoryTable() : this.renderSubCategoryHorizon()}/>
      </ScrollView>
    </View>;
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
            onChangeText={text=>{this.props.changeSoDu(text)}}
            value={this.props.newSoDu}/>
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
          {subCategoryShow}
          <TouchableOpacity onPress={()=>{this.setState({fulllist: !this.state.fulllist})}}>
            <View style={{ justifyContent: "center" }}>
              <Icon
                name={this.state.fulllist? "chevron-up" : "chevron-down"}
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
                    <ToggleButton color={this.state.defaultColor} background="white" choosed={this.props.selectedDateMode == 'Today'? "true" : "false"}
                                  style={{ paddingHorizontal: sizeFactor / 4 }} onPress={()=>{this.props.changeDateMode('Today')}}>
                        Hôm nay
                    </ToggleButton>
                </View>
                <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
                    <ToggleButton color={this.state.defaultColor} background="white" choosed={this.props.selectedDateMode == 'LastDay'? "true" : "false"}
                                  style={{ paddingHorizontal: sizeFactor / 4 }} onPress={()=>{this.props.changeDateMode('LastDay')}}>
                        Hôm qua
                    </ToggleButton>
                </View>
                <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
                    <ToggleButton color={this.state.defaultColor} background="white" choosed={this.props.selectedDateMode == 'NextDay'? "true" : "false"}
                                  style={{ paddingHorizontal: sizeFactor / 4 }} onPress={()=>{this.props.changeDateMode('NextDay')}}>
                        Ngày mai
                    </ToggleButton>
                </View>
            </RowLeft>
            <String >hoặc chọn một ngày khác</String>
            <RowLeft style={{ flex: 9 }}>
                <View style={{ flex: 3.5 }}>
                    <ToggleButton color={this.state.defaultColor} background="white" choosed={this.props.selectedDateMode == 'Custom'? "true" : "false"}
                                  style={{ paddingHorizontal: sizeFactor / 4 }} onPress={()=>{this.props.changeDateMode('Custom'); this.props.setShow(true);}}>
                        {this.toString(this.state.date)}
                    </ToggleButton>
                </View>
            </RowLeft>
            {this.props.show &&
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {this.props.setShow(false); this.setState({date:selectedDate?selectedDate:this.state.date});}}
            />
            }
            <Divider />
            <String style={{ fontWeight: "bold" }}>Ghi chú</String>
            <TextInput style={styles.inputMultilineText} multiline={true} placeholder="Vài điều cần ghi lại..." />
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
      searchText: state.searchText,
      //Thang
      selectedCategory: state.chosenCategory,
      selectedSub: state.selectedSubReducer,
      subCategory: state.allSubReducer,
      show: state.showDatePickerReducer,
      newSoDu: state.sodu_transReducer,
      selectedDateMode: state.datemode_transReducer,
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
      //Thang
      deselectCategory: () => {dispatch(DeselectCategoryAction())},
      selectSub: (category) => {dispatch(SelectSubAction(category))},
      deselectSub: () =>{dispatch(DeselectSubAction())},
      updateSub: (category) => {dispatch(UpdateSubAction(category))},
      setShow: (bool) => {dispatch(SetShowDatePicker(bool))},
      changeSoDu: (sodu) => {dispatch(ChangeSoDuTransAction(sodu))},
      changeDateMode: (datemode) => {dispatch(ChangeDateModeaTransAction(datemode))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen);