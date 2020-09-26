import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import {
  String,
  ScreenView,
  UnScrollScreenView,
  Card,
  Divider,
  Row,
  PositiveNumber,
  NegativeNumber,
  Wallet,
  colors,
  Title,
  Button,
  styles,
  OutlineToggleButton,
  sizeFactor,
  TouchableText,
  Heading2,
  HeadlessCard,
  windowWidth,
  AddWalletButton, windowHeight
} from "../components/Basic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SignedNumber from '../components/SignedNumber'
import { FlatList } from "react-native-gesture-handler";
import AddWalletScreen from "./AddWalletScreen";

//firebase
import * as firebase from 'firebase'

//redux
import {connect} from 'react-redux';

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import {rootRef,walletRef} from '../components/DataConnect'

//Redux action
import {UpdateWalletAction } from "../actions";

//Navigator
import { CommonActions, useScrollToTop } from '@react-navigation/native';
import { Extrapolate } from "react-native-reanimated";

export class WalletScreen extends Component {
  _isMounted = false;
  constructor(props)
  {
    super(props);
  }
  walletScroll(){
    
  }
  componentDidMount(){
    walletRef.on('value',(snap)=>{this.props.Update(snap)});
  }
  render() {
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{nativeEvent:{contentOffset: {y}}}],{useNativeDriver: true})
    return (
      <UnScrollScreenView>
        <Animated.FlatList 
          scrollEventThrottle = {16}
          bounces={false}
          onScroll = {()=> this.walletScroll()}
          data = {this.props.walletData}
          renderItem={({index, item})=>{
            const position = Animated.subtract(index * sizeFactor*14.7,y)
            const translateY = Animated.add(y,y.interpolate({
              inputRange: [0, (index) * sizeFactor*14.7],
              outputRange: [0, -(index) * sizeFactor*14.7],
              extrapolateRight: "clamp"
            }));
            const scale = position.interpolate({
              inputRange: [-sizeFactor*14.7, 0, windowHeight - sizeFactor*14.7, windowHeight],
              outputRange: [0.5,1,1,0.5]
            })
            const opacity = position.interpolate({
              inputRange: [-sizeFactor*14.7, 0, windowHeight - sizeFactor*14.7, windowHeight],
              outputRange: [0.5,1,1,0.5]
            })
            return (
            <Animated.View style={[{opacity, transform: [{translateY},{scale}]}]}>
              <Wallet 
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
                onPressSuDung={()=>{this.props.navigation.navigate({name: 'AddTransactionScreen', params:{
                  walletName: item.name,
                  walletColor: item.color}})}}
              >
                {item.money}
              </Wallet>
            </Animated.View>)}}
          {...{onScroll}}
          >
            
        </Animated.FlatList>
      </UnScrollScreenView>
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

//redux define container

const mapStateToProps = (state) => {
  return{
      walletData: state.WalletReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (snap) => {
        dispatch(UpdateWalletAction(snap));
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);


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
