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

//firebase
import * as firebase from 'firebase'

//redux
import {connect} from 'react-redux';

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import {rootRef,walletRef} from '../components/DataConnect'

//Redux action
// import { ChangeDefaultAction, UpdateWalletAction } from "../actions";

// //redux define container

// const mapStateToProps = (state) => {
//   return{
//       walletData: state.walletReducer,
//   }
// };

// const mapDispatchToProps = (dispatch) =>{
//   return {
//       ChangeDefault: (walletItem) => {   
//         dispatch(ChangeDefaultAction(walletItem));
//       },
//       Update: () => {
//         dispatch(UpdateWalletAction());
//       }
//   };
// }
// export default WalletContainer = connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

export default class WalletScreen extends Component {
  constructor(props)
  {
    super(props);
  }
  componentDidMount(){
    walletRef.on('value',(snap)=>{this.props.Update(snap)});
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
          data = {this.props.walletData}
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
        walletRef.child(element.key).update({
          //name: element.toJSON().name,
          //color: element.toJSON().color,
          //date: element.toJSON().date,
          //money: element.toJSON().money,
          isDefault: "false"
        });
      }
    });
  });
  walletRef.child(walletItem.key).update({
    //name: walletItem.name,
    //color: walletItem.color,
    //date:walletItem.date,
    //money: walletItem.money,
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