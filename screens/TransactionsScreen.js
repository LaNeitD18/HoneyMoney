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
    SimpleCarousel,
    TransactionsFullList,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef } from "../components/DataConnect";
import { rootRef, walletRef } from "../components/DataConnect";

import { UpdateWalletAction, SelectWallet } from "../actions";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";
import { FlatList } from "react-native-gesture-handler";

export class TransactionsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthlist: [],
        };
    }
    componentDidMount() {
        walletRef.on("value", (snap) => {
            this.props.Update(snap);
        });
        this.getMonthList();
    }
    toDate(datestring) {
        var parts = datestring.split("/");
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    getDataAll() {
        var temp = [];
        this.props.walletData.forEach((element) => {
            if (element.transactionList != undefined && element.isDefault == "true") {
                Object.keys(element.transactionList).forEach((transaction) => {
                    //console.log(transaction)
                    var tempInfo = {
                        date: element.transactionList[transaction].date,
                        money: element.transactionList[transaction].money,
                        category: element.transactionList[transaction].category,
                    };
                    temp.push(tempInfo);
                });
            }
        });
        return temp.sort((a, b) => {
            return this.toDate(a.date) - this.toDate(b.date);
        });
    }

    getMonthList() {
        var monthlist = [];
        var data = this.getDataAll();
        if (data[0] == undefined) {
            return [];
        }

        var startmonth = this.toDate(data[0].date).getMonth() + 1;
        var startyear = this.toDate(data[0].date).getFullYear();

        var endmonth = this.toDate(data[data.length - 1].date).getMonth() + 1;
        var endyear = this.toDate(data[data.length - 1].date).getFullYear();

        while (startyear <= endyear || startmonth < endmonth) {
            var item = {
                month: "Tháng " + startmonth + "/" + startyear,
            };
            monthlist.push(item);
            startmonth += 1;
            if (startmonth == 13) {
                startmonth = 1;
                startyear += 1;
            }
        }
        this.setState({ monthlist });
    }

    getDataInTimeRange(start, end) {
        var startDate = this.toDate(start);
        var endDate = this.toDate(end);
        var temp = [];
        this.props.walletData.forEach((element) => {
            if (element.transactionList != undefined && element.isDefault == "true") {
                Object.keys(element.transactionList).forEach((transaction) => {
                    //console.log(transaction)
                    var tempInfo = {
                        date: element.transactionList[transaction].date,
                        money: element.transactionList[transaction].money,
                        category: element.transactionList[transaction].category,
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

    getDataInTimeRangeDate(startDate, endDate) {
        var temp = [];
        this.props.walletData.forEach((element) => {
            if (element.transactionList != undefined && element.isDefault == "true") {
                Object.keys(element.transactionList).forEach((transaction) => {
                    //console.log(transaction)
                    var tempInfo = {
                        date: element.transactionList[transaction].date,
                        money: element.transactionList[transaction].money,
                        category: element.transactionList[transaction].category,
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
    render() {
        const DATA = [
            {
                date: "18",
                dayOfWeek: "Hôm nay",
                month: "Tháng 1/2021",
                change: "+15.000 VNĐ",
            },
            {
                date: "02",
                dayOfWeek: "Thứ 7",
                month: "Tháng 1/2021",
                change: "+15.000 VNĐ",
            },
        ];
        return (
            <ScreenView>
                <Title>Lịch sử giao dịch</Title>
                <SimpleCarousel>
                    <FlatList
                        scrollEnabled={false}
                        horizontal={true}
                        data={this.state.monthlist}
                        renderItem={({ item }) => {
                            return (
                                <TransactionMonthSummary
                                    month={item.month}
                                    openBalance="+200.000 VNĐ"
                                    endBalance="+300.000 VNĐ"
                                    change="+100.000 VNĐ"
                                    changeColor={colors.greenDark}
                                    leftChevronOpacity={0}
                                    rightChevronOpacity={1}
                                />
                            );
                        }}
                    ></FlatList>
                </SimpleCarousel>
                <TransactionsFullList data={DATA} />
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        walletData: state.WalletReducer,
        //selectedWallet: state.selectedWalletReducer,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
