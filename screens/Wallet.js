import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  String,
  ScreenView,
  Card,
  Divider,
  Row,
  Number,
  NegativeNumber,
  Wallet,
  colors,
  Title,
  Button,
  OutlineToggleButton,
  sizeFactor,
  TouchableText,
} from "../components/Basic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SignedNumber from '../components/SignedNumber'
import { FlatList } from "react-native-gesture-handler";
import * as firebase from 'firebase'

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import {rootRef,walletRef} from '../components/DataConnect'

export default class WalletScreen extends Component {
  constructor(props)
  {
    super(props);
    this.state = ({
      wallet: [],
    })
  }
  componentDidMount(){
    walletRef.on('value',(snap)=>{
      const wallet = [];
      snap.forEach(element => {
        wallet.push(
        {
          key: element.key,
          name: element.toJSON().name,
          color: element.toJSON().color,
          date: element.toJSON().date,
          isDefault:element.toJSON().isDefault,
          money: element.toJSON().money
        });
        this.setState({
          wallet: wallet.sort((a,b) => {if(a.isDefault == "true") return false; else return true;})
        })
        console.log(this.state.wallet);
      });
    });
  }
  render() {
    return (
      <ScreenView>
        <Title>Tổng quan</Title>
        <Card heading="Tất cả ví" headingColor={colors.dark} color="white">
          <Row>
            <String>Số dư</String>
            <SignedNumber>5,000,000</SignedNumber>
          </Row>
          <Row>
            <String>Tháng này</String>
            <SignedNumber>-250,000</SignedNumber>
          </Row>
        </Card>
        <Title>Quản lí ví</Title>
        <FlatList 
          data = {this.state.wallet}
          renderItem={({item})=>{return (<Wallet
            heading={item.name}
            color={item.color}
            date={item.date}
            isDefault={item.isDefault}
            onPressDefault={()=>{
              if(item.isDefault == "false")
              {
                defaultChanged(item);
              }
            }}
            onPressSuDung={()=>{}}
          >
            {item.money}
          </Wallet>)}}>
        </FlatList>
        <TouchableText onPress={()=>{walletRef.push({
          name: "Ví cho người yêu",
          color: "#ff2d55",
          date: "01/01/2014",
          isDefault: "false",
          money: "25,000,000"})}}>
            Tạo ví mới
        </TouchableText>
        <Divider/>
      </ScreenView>
    );
  }
}

defaultChanged = (walletItem)=>{
  walletRef.once('value',(snap)=>{
    snap.forEach(element => {
      if(element.toJSON().isDefault == "true")
      {
        walletRef.child(element.key).set({
          name: element.toJSON().name,
          color: element.toJSON().color,
          date: element.toJSON().date,
          money: element.toJSON().money,
          isDefault: "false"
        });
      }
    });
  });
  walletRef.child(walletItem.key).set({
    name: walletItem.name,
    color: walletItem.color,
    date:walletItem.date,
    money: walletItem.money,
    isDefault: "true"
    });
}

var WalletData = [
  {
    "key":"WL000001",
    "name": "Ví chính",
    "color": "#5856d6",
    "date": "20/08/2020",
    "isDefault":"true",
    "money": "1,500,000"
  },
  {
    "key":"WL000002",
    "name": "Ví cho người yêu",
    "color": "#ff2d55",
    "date": "01/01/2014",
    "isDefault":"false",
    "money": "25,000,000"
  },
  {
    "key":"WL000003",
    "name": "Tiền dưỡng già",
    "color": "#ff9500",
    "date": "01/01/2018",
    "isDefault":"false",
    "money": "5,000,000"
  }
]