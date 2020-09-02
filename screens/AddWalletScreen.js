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
  OutlineToggleButton,
  Button,
  ToggleButton,
  ColorSelectButton,
  RoundedView,
} from "../components/Basic";
import { Icon, SearchBar, Avatar, Input } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { walletRef } from "../components/DataConnect";

export default class AddWalletScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      newTenVi: '',
      newSoDu: '',
      selectedColor: colors.blue,
    };
  }
  onChangeTenVi(text){
    this.setState({newTenVi: text});
  }
  onChangeSoDu(text){
    this.setState({newSoDu: text});
  }
  checkWalletValid(){
    var TenVi = this.state.newTenVi;
    var SoDu = this.state.newSoDu;
    var Mau = this.state.selectedColor;
    if(!TenVi)
    {
      return false;
    }
    if(!SoDu)
    {
      if(SoDu != '0')
        return false;
    }
    return true;
  }
  addNewWallet(){
    var TenVi = this.state.newTenVi;
    var SoDu = this.state.newSoDu;
    var Mau = this.state.selectedColor;
    if(this.checkWalletValid())
    {
      walletRef.push({
        name: TenVi,
        money: SoDu,
        date: this.state.date,
        isDefault: 'false',
        color: Mau
      });
      //them vao day mot cai rhong bao pop up da tao vi thanh cong
      this.setState({
        newTenVi: '',
        newSoDu: '',
        selectedColor: colors.blue
      })
    }
    else
    {this.setState({newTenVi: "Lỗi"})}
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var fulldate;
    if(date < 10)
    {
      fulldate = '0' + date;
    }
    else
    {
      fulldate = date;
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
    that.setState({
      //Setting the value of the date time
      date: fulldate
    });
  }
  render() {
    return (
      <ScreenView>
        <Icon
          name="wallet"
          type="material-community"
          color="black"
          size={sizeFactor * 6}
        />
        <Title style={{ marginLeft: sizeFactor * 1.5 }}>Thông tin ví</Title>
        <RoundedView>
          <String style={{ fontWeight: "bold" }}>Tên ví</String>
          <TextInput
            style={styles.inputText}
            placeholder="Ví của tôi"
            onChangeText={text=>{this.onChangeTenVi(text)}}
            value={this.state.newTenVi}/>
          <Divider />
          <String style={{ fontWeight: "bold" }}>Số dư</String>
          <TextInput
            contextMenuHidden={true}
            style={styles.inputText}
            placeholder="000,000,000"
            keyboardType='number-pad' //dung tam cai nay cho den khi co ban phim so hoc//
            onChangeText={text=>{this.onChangeSoDu(text)}}
            value={this.state.newSoDu}/>
          <Divider />
          <String style={{ fontWeight: "bold" }}>Màu sắc</String>
          <Row>
            <ColorSelectButton color={colors.yellow} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.yellow})}}/>
            <ColorSelectButton color={colors.green} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.green})}}/>
            <ColorSelectButton color={colors.blue} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.blue})}}/>
            <ColorSelectButton color={colors.purple} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.purple})}}/>
            <ColorSelectButton color={colors.red} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.red})}}/>
            <ColorSelectButton color={colors.orange} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.orange})}}/>
            <ColorSelectButton color={colors.dark} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.dark})}}/>
            <ColorSelectButton color={colors.indigo} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.indigo})}}/>
            <ColorSelectButton color={colors.pink} selected={this.state.selectedColor} onPress={()=>{this.setState({selectedColor: colors.pink})}}/>
          </Row>
          <Divider />
          <String style={{ fontWeight: "bold" }}>Ngày tạo</String>
          <String style={styles.inputText}>{this.state.date}</String>
        </RoundedView>
        <Divider />
        <Button
          color="white"
          background={colors.blue}
          style={{ marginHorizontal: sizeFactor }}
          onPress={()=>{this.addNewWallet()}}
        >
          Lưu thay đổi
        </Button>
      </ScreenView>
    );
  }
}
