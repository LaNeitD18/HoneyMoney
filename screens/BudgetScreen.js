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
    ImageBackground,
} from "react-native";
import {
    String,
    ScreenView,
    Card,
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
    HomoTextInput,
    Button1,
    Button2,
    Button3,
    TransactionMonthSummary,
    NormalCard,
    LooseDivider,
    TransactionRow,
    TransactionDate,
    SimpleCarousel,
    SettingRow,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem, Space } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef, userRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog, UpdateWalletAction, SelectWallet, SelectTransaction, updateCategories } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";
import { ProgressBar } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import toMoneyString from "../components/toMoneyString";

export class BudgetScreen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userWalletRef = userRef.child(uid).child('Wallet')
        userWalletRef.on('value',(snap)=>{this.props.Update(snap)});
        const userCategoryRef = userRef.child(uid).child('Category')
        userCategoryRef.on("value", (snapshot) => {
            this.props.updateCategories(snapshot);
        });
    }
    getBudgetInfo() {
        this.props.walletData;
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child('Category')
        var categories = []
         userCategoryRef.orderByChild('budget').on("value", (snap) =>{
             snap.forEach(element =>{
                if(parseInt(element.toJSON().budget) > 0)
                {
                    categories.push({
                        key: element.key,
                        ...element.toJSON()});
                }
             })
        })
        return categories;
    }
    getDataInMonth(month, year)
    {
        var start = new Date(year, month - 1, 1);
        var end = new Date(year, month - 1, this.numberOfDayInMonth(month,year));
        return this.getDataInTimeRangeDate(start, end);
    }

    numberOfDayInMonth(month, year)
    {
        switch (month){
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                return 31;
            case 4: case 6: case 9: case 11:
                return 30;
            default:
        }
        if(month == 2)
        {
            if((year % 4 == 0 && year % 100 != 0)|| year % 400 == 0)
            {
                return 29;
            }
            else
            {
                return 28;
            }
        }
    }

    getDataInTimeRangeDate(startDate, endDate) {
        var temp = [];
        this.props.walletData.forEach((element) => {
            if (element.transactionList != undefined && element.isDefault == "true") {
                Object.keys(element.transactionList).forEach((transaction) => {
                    //console.log(transaction)
                    var tempInfo = {
                        key: transaction,
                        category: element.transactionList[transaction].category.key,
                        subCategory: element.transactionList[transaction].subCategory,
                        date: element.transactionList[transaction].date,
                        money: element.transactionList[transaction].money,
                    };
                    if (
                        this.toDate(tempInfo.date) >= startDate &&
                        this.toDate(tempInfo.date) <= endDate
                    ) {
                        temp.push(tempInfo);
                    }
                });
            }
        });
        return temp.sort((a, b) => {
            return this.toDate(a.date) - this.toDate(b.date);
        });
    }

    mergeDataByCategory()
    {
        var lose = 0;
        var losepie = [];

        var data = this.getDataInMonth(new Date().getMonth() + 1, new Date().getFullYear())

        const categories = this.getBudgetInfo()

        for(let i = 0; i < categories.length; i++)
        {
            losepie[i] = {
                category: categories[i],
                money: 0,
            }
            data.forEach(item =>
            {
                if(item.category == categories[i].key)
                {
                    losepie[i].money += parseInt(item.money);
                    lose += parseInt(item.money);
                }
            })
        }
        return losepie;
    }

    toDate(datestring)
    {
        var parts = datestring.split("/");
        return new Date(parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10));
    }

    render() {
        this.mergeDataByCategory();
        this.getBudgetInfo();
        return (
            <ScreenView>
                <View style={{
                    alignSelf: "flex-end",
                    marginRight: sizeFactor,
                    flexDirection: "row",
                }}>
                    <Button3 color={colors.blue} onPress={()=>{this.props.navigation.navigate('AddBudgetScreen')}}>Thêm hạn mức</Button3>
                </View>
                <FlatList 
                    data = {this.mergeDataByCategory()}
                    renderItem={({item})=>{return (
                    <TouchableOpacity>
                        <NormalCard>
                            <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            marginRight: sizeFactor,
                                        }}
                                    >
                                        <Image
                                            source={findIcon(item.category.Icon)}
                                            style={{
                                                width: sizeFactor * 2.25,
                                                height: sizeFactor * 2.25,
                                            }}
                                        ></Image>
                                    </View>
                                    <View>
                                        <String style={{ marginBottom: 0 }}>{item.category.CategoryName}</String>
                                        <String
                                            style={{
                                                marginBottom: 0,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {toMoneyString(item.category.budget)}
                                        </String>
                                    </View>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    <String
                                        style={{
                                            fontSize: sizeFactor * 0.85,
                                            marginBottom: 0,
                                            color: colors.gray,
                                        }}
                                    >
                                        {"Tháng " + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()}
                                    </String>
                                    <String
                                        style={{
                                            marginBottom: 0,
                                            fontWeight: "bold",
                                            color: colors.gray,
                                        }}
                                    >
                                        {"Còn " + (this.numberOfDayInMonth(new Date().getMonth() + 1, new Date().getFullYear()) - new Date().getDate()) + " ngày"}
                                    </String>
                                </View>
                            </Row>
                            <LooseDivider />
                            <Row>
                                <String
                                    style={{
                                        color: (item.money / parseFloat(item.category.budget))<1? colors.blue : colors.red,
                                        fontSize: sizeFactor * 0.9,
                                        marginBottom: 0,
                                    }}
                                >
                                    {toMoneyString(item.money)}
                                </String>
                                <String
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: sizeFactor * 0.9,
                                        marginBottom: 0,
                                    }}
                                >
                                    {"Còn lại " + toMoneyString(parseInt(item.category.budget) - item.money)}
                                </String>
                            </Row>
                            <ProgressBar
                                style={{
                                    height: sizeFactor * 0.5,
                                    borderRadius: 999,
                                    marginTop: sizeFactor / 2,
                                    marginBottom: sizeFactor / 2,
                                }}
                                progress={(item.money / parseFloat(item.category.budget))}
                                color={(item.money / parseFloat(item.category.budget))<1? colors.blue : colors.red}
                            />
                            <View style={{ alignItems: "flex-end" }}>
                                <String
                                    style={{ marginBottom: sizeFactor, fontSize: sizeFactor * 0.9 }}
                                >
                                    
                                </String>
                            </View>
                        </NormalCard>
                    </TouchableOpacity>)
                }}>
                </FlatList>
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        walletData: state.WalletReducer,
        //selectedWallet: state.selectedWalletReducer,
        allCategories: state.allCategories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        Update: (snap) => {
            dispatch(UpdateWalletAction(snap));
        },
        SelectWallet: (value) => {
            dispatch(SelectWallet(value));
        },
        SelectTransaction: (value) => {
            dispatch(SelectTransaction(value))
        },
        updateCategories: (categories) => { dispatch(updateCategories(categories)) }, 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen);
