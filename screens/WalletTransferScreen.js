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
    Space,
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
    AddWalletKindSelect,
    OutlineToggleButton,
    Button,
    ToggleButton,
    ColorSelectButton,
    RoundedView,
    TouchableDeleteText,
    HomoTextInput,
    NormalCard,
    Button1,
    Button3,
    LooseDivider,
    ChooseWalletList,
    WalletRow,
} from "../components/Basic";
import {
    Icon,
    SearchBar,
    Input,
    Avatar,
    Accessory,
    ListItem,
    Overlay,
} from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import * as firebase from "firebase";
import { categoryRef, userRef } from "../components/DataConnect";

import { findIcon } from "../components/Image";
import { changeType, changeName, openDialog, UpdateWalletAction, SelectWallet } from "../actions/index";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import ChooseIconDialog from "../components/ChooseIconDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import ChooseWalletDialog from "../components/ChooseWalletDialog";
import { Alert } from "react-native";

const data1 = [
    {
        name: "Ví 1",
        color: colors.purple,
    },
    {
        name: "Ví 2",
        color: colors.blue,
    },
];

export class WalletTransferScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            visible: false,
            select: 1,
            nguon: "",
            dich: "",
            newSoDu: "",
        }
    }
    componentDidMount()
    {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userWalletRef = userRef.child(uid).child('Wallet')
        userWalletRef.on('value',(snap)=>{this.props.Update(snap)});

        this.props.walletData.forEach((element) => {
            if (element.isDefault == "true") {
              if(this.props.selectedWallet != element)
                this.props.SelectWallet(element)
                this.setState({
                    nguon: element,
                    dich: element,
                })
            }
            else
            {
                this.setState({
                    dich: element,
                })
            }
          })
    }
    chuyentien()
    {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userWalletRef = userRef.child(uid).child('Wallet')

        userWalletRef.child(this.state.nguon.key).update({
            money: parseInt(this.state.nguon.money) - parseInt(this.state.newSoDu),
        });
        userWalletRef.child(this.state.dich.key).update({
            money: parseInt(this.state.dich.money) + parseInt(this.state.newSoDu),
        });
        Alert.alert("Thông báo", "Bạn đã chuyển tiền giữa các ví thành công", 
        [
            {
                text: "OK",
                onPress: () => {                            
                    this.props.navigation.goBack();
                }
            }
        ], {cancelable: false}
    );
    }
    render() {
        const Item = ({ name, color }) =>
        <View
            style={{
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginVertical: sizeFactor * 0.5,
            }}
        >
            <Icon
                style={{ marginRight: sizeFactor }}
                name="wallet"
                size={sizeFactor * 2.5}
                type="material-community"
                color={color}
            />
            <String style={{ marginBottom: 0, fontSize: sizeFactor * 1.5 }}>
                {name}
            </String>
        </View>;
        const data = [];
        this.props.walletData.forEach(
            element => {
                var info ={
                    ...element,
                    onPress: () => {
                        this.setState({visible: false});
                        if(this.state.select == 1)
                        {
                            this.setState({nguon: element});
                        }
                        else
                        {
                            this.setState({dich: element})
                        }
                    }
                }
                data.push(info)
            }
        )
        return (
            <ScreenView style={{ backgroundColor: "white" }}>
                <Overlay
                    overlayStyle={{
                        borderRadius: sizeFactor,
                        width: windowWidth - sizeFactor * 4,
                        height: windowHeight - sizeFactor * 20,
                        paddingHorizontal: sizeFactor * 1.5,
                        paddingVertical: sizeFactor * 1,
                        alignContent: "center",
                        alignItems: "stretch",
                    }}
                    isVisible={this.state.visible}
                >
                    <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                        <TouchableOpacity onPress={()=>{this.setState({visible: false})}}>
                            <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                        </TouchableOpacity>
                    </View>

                    <String
                        style={{
                            fontSize: sizeFactor * 1.5,
                            fontWeight: "bold",
                            marginBottom: sizeFactor * 1.5,
                        }}
                    >
                        {"Chọn ví " + (this.state.select == 1? "nguồn" : "đích" )}
                    </String>
                    <ScrollView
                        style={{ paddingHorizontal: sizeFactor / 2, marginBottom: sizeFactor }}
                    >
                        <ChooseWalletList data={data} />
                    </ScrollView>
                </Overlay>

                <View
                    style={{ margin: sizeFactor, marginTop: sizeFactor * 4, alignItems: "center" }}
                >
                    <Image
                        source={require("../assets/transfer.png")}
                        style={[
                            styles.hugeCategory,
                            {
                                opacity: 1,
                                width: styles.hugeCategory.height - sizeFactor * 1.25,
                                height: styles.hugeCategory.height - sizeFactor * 1.25,
                                marginBottom: sizeFactor,
                            },
                        ]}
                    />

                    <String style={{ fontWeight: "bold", fontSize: sizeFactor * 1.5 }}>
                        Chuyển tiền giữa các ví
                    </String>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví nguồn
                        </String>
                    </View>
                    <TouchableOpacity onPress={()=>{this.setState({visible: true, select: 1})}}>
                        <Row style={{ marginBottom: 0 }}>
                            <Item name={this.state.nguon.name} color={this.state.nguon.color} />
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: "stretch",
                        marginTop: sizeFactor,
                        marginHorizontal: sizeFactor * 2,
                    }}
                >
                    <View style={{ alignSelf: "flex-start" }}>
                        <String
                            style={{
                                fontWeight: "bold",
                                fontSize: sizeFactor,
                                color: colors.gray,
                            }}
                        >
                            Ví đích
                        </String>
                    </View>
                    <TouchableOpacity onPress={()=>{this.setState({visible: true, select: 2})}}>
                        <Row style={{ marginBottom: 0 }}>
                            <Item name={this.state.dich.name} color={this.state.dich.color} />   
                            <Icon
                                name="chevron-right"
                                type="material-community"
                                size={sizeFactor * 2}
                                color={colors.gray}
                            />
                        </Row>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        margin: sizeFactor,
                        marginHorizontal: sizeFactor * 1.5,
                    }}
                >
                    <HomoTextInput
                        value = {this.state.newSoDu}
                        label="Số tiền"
                        placeholder="000,000 VNĐ"
                        leftIcon={{
                            type: "material-community",
                            name: "cash",
                            color: colors.gray,
                        }}
                        onChangeText={(text)=>{this.setState({newSoDu: text})}}
                        keyboardType="numeric"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                    />
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={()=>{this.chuyentien()}}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        walletData: state.WalletReducer,
        selectedWallet: state.selectedWalletReducer,
    }
  };
  
const mapDispatchToProps = (dispatch) =>{
return {
    Update: (snap) => {
        dispatch(UpdateWalletAction(snap));
    },
    SelectWallet: (value) => {
        dispatch(SelectWallet(value));
    }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletTransferScreen);
