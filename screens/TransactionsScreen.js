import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
    Animated,
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
import { categoryRef, userRef } from "../components/DataConnect";
import { rootRef, walletRef } from "../components/DataConnect";

import { UpdateWalletAction, SelectWallet, SelectTransaction, updateCategories } from "../actions";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";
import { FlatList } from "react-native-gesture-handler";
import toMoneyString from '../components/toMoneyString'
import selectedTransactionReducer from "../reducers/selectedTransactionReducer";

export class TransactionsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
            monthlist: [],
            offset: 0,
            firstscroll: 0,
        };
    }
    componentWillMount(){
        // let uid = 'none';
        // if(firebase.auth().currentUser) {
        //     uid = firebase.auth().currentUser.uid;
        // }
        // const userWalletRef = userRef.child(uid).child('Wallet')
        // userWalletRef.on('value',(snap)=>{this.props.Update(snap)});
        // const userCategoryRef = userRef.child(uid).child('Category')
        // userCategoryRef.on("value", (snapshot) => {
        //     this.props.updateCategories(snapshot);
        // });
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

        //setTimeout(()=>{this.setState({monthlist: this.getMonthList()})}, 1500)
    }

    componentDidUpdate(){
        // if(this.state.firstscroll == 0)
        // {
        //     var month = this.getMonthList()
        //     if(month.length > 0)
        //     {
        //         var today = new Date()
        //         var x = today.getMonth() + 1 + today.getFullYear()*12
        //         var get = month[0].index
        //         //this.Carousel.scrollref.scrollTo({y: ((x-get))*(Math.ceil(windowWidth - 2 * sizeFactor)) + 1, animated: false})
        //         this.setState({firstscroll: 1})
        //     }
        // }
    }

    toDate(datestring) {
        var parts = datestring.split("/");
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    getDataAll() {
        var temp = [];
        this.props.walletData.forEach((element) => {
            if (element.transactionList !== undefined && element.isDefault == "true") {
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
        if (data[0] === undefined) {
            return [];
        }

        var startmonth = this.toDate(data[0].date).getMonth() + 1;
        var startyear = this.toDate(data[0].date).getFullYear();

        var endmonth = this.toDate(data[data.length - 1].date).getMonth() + 1;
        var endyear = this.toDate(data[data.length - 1].date).getFullYear();

        var today = new Date();

        if(endmonth+endyear*12 < today.getMonth + 1 + today.getFullYear*12)
        {
            endmonth = today.getMonth() + 1;
            endyear = today.getFullYear();
        }

        var transactionList = this.getDataInMonth(startmonth, startyear)
        var cal = this.caculateChange(transactionList)
        //dau tien
        var item = {
            index: startmonth + startyear*12,
            month: "Tháng " + startmonth + "/" + startyear,
            left: 0,
            right: 1,
            transactionList: transactionList,
            change: cal.change,
            openBalance: cal.gain,
            endBalance: cal.lose,
        };
        monthlist.push(item);
        startmonth += 1;
        if (startmonth == 13) {
            startmonth = 1;
            startyear += 1;
        }
        //doan giua
        while (startyear*12 + startmonth < endyear*12 + endmonth)
        {
            transactionList = this.getDataInMonth(startmonth, startyear)
            cal = this.caculateChange(transactionList)
            var item = {
                index: startmonth + startyear*12,
                month: "Tháng " + startmonth + "/" + startyear,
                left: 1,
                right: 1,
                transactionList: transactionList,
                change: cal.change,
                openBalance: cal.gain,
                endBalance: cal.lose,
            };
            monthlist.push(item);
            startmonth += 1;
            if (startmonth == 13) {
                startmonth = 1;
                startyear += 1;
            }
        }
        transactionList = this.getDataInMonth(startmonth, startyear)
        cal = this.caculateChange(transactionList)
        //phan tu cuoi cung
        var item = {
            index: startmonth + startyear*12,
            month: "Tháng " + startmonth + "/" + startyear,
            left: 1,
            right: 0,
            transactionList: transactionList,
            change: cal.change,
            openBalance: cal.gain,
            endBalance: cal.lose,
        };
        monthlist.push(item);

        return monthlist;
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

    caculateChange(data)
    {
        var change = 0
        var gain = 0;
        var lose = 0;
        data.forEach((item) => 
            {
                var category = {}

                // let uid = 'none';
                // if(firebase.auth().currentUser) {
                //     uid = firebase.auth().currentUser.uid;
                // }
                // const userCategoryRef = userRef.child(uid).child('Category')

                // userCategoryRef.orderByKey().equalTo(item.category).on('value', (snapshot) => {

                //     snapshot.forEach(element => {
                //         category = {
                //             key: element.key,
                //             categoryName: element.toJSON().CategoryName,
                //             icon: element.toJSON().Icon,
                //             parentID: element.toJSON().ParentID,
                //             typeID: element.toJSON().TypeID
                //         }
                //     });
                // });
                if(this.props.allCategories.filter(citem => citem.key == item.category).length > 0)
                    category = this.props.allCategories.filter(citem => citem.key == item.category)[0]

                var b;

                if(category.typeID == "002")
                {
                    b = false;
                }
                else
                {
                    if(category.typeID == "003")
                    {
                        b = true;
                    }
                    else
                    {
                        if(category.categoryName == "Đi vay" ||category.categoryName == "Thu nợ")
                        {
                            b = true;
                        }
                        else
                        {
                            b = false;
                        }
                    }
                }
                if(b)
                {
                    gain += parseInt(item.money);
                    change += parseInt(item.money)
                }
                else
                {
                    lose -= parseInt(item.money);
                    change -= parseInt(item.money);
                }
            })

        return {
            change: change > 0 ? "+" + change : change,
            gain: gain > 0 ? "+" + gain : gain,
            lose: lose
        }
    }

    getDataInMonth(month, year)
    {
        var start = new Date(year, month - 1, 1);
        var end = new Date(year, month - 1, this.numberOfDayInMonth(month,year));
        return this.getDataInTimeRangeDate(start, end);
    }

    // scrollToItem(month, year)
    // {
    //     if(this.flatListRef.props.data.length > 0)
    //         this.flatListRef.scrollToIndex({animated: false, index: 1})
    // }

    getDataInTimeRange(start, end) {
        var startDate = this.toDate(start);
        var endDate = this.toDate(end);
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

    mergeDataByDate(data)
    {
        var clone = []
        var d = 0;

        var weekday = new Array(7);
        weekday[0] = "Chủ nhật";
        weekday[1] = "Thứ hai";
        weekday[2] = "Thứ ba";
        weekday[3] = "Thứ tư";
        weekday[4] = "Thứ năm";
        weekday[5] = "Thứ sáu";
        weekday[6] = "Thứ bảy";

        data.sort((a, b) => {
            return - this.toDate(a.date) + this.toDate(b.date);
        });
        
        data.forEach(item =>
            {
                var info = {
                    date: "",
                    dayOfWeek: "",
                    month: "",
                    change: 0,
                    list: [],
                }
                if(d < this.toDate(item.date).getDate())
                {
                    d = this.toDate(item.date).getDate();
                    if(d < 10)
                    {
                        info.date = "0" + d
                    }
                    else
                    {
                        info.date = d;
                    }
                    info.dayOfWeek = weekday[this.toDate(item.date).getDay()];
                    info.month = "Tháng " +(this.toDate(item.date).getMonth()+1)+"/"+this.toDate(item.date).getFullYear();

                    var category = {}

                    let uid = 'none';
                    if(firebase.auth().currentUser) {
                        uid = firebase.auth().currentUser.uid;
                    }
                    const userCategoryRef = userRef.child(uid).child('Category')

                    userCategoryRef.orderByKey().equalTo(item.category).on('value', (snapshot) => {
                        snapshot.forEach(element => {
                            category = {
                                key: element.key,
                                categoryName: element.toJSON().CategoryName,
                                icon: element.toJSON().Icon,
                                parentID: element.toJSON().ParentID,
                                typeID: element.toJSON().TypeID
                            }
                        });
                    });

                    var b;

                    if(category.typeID == "002")
                    {
                        b = false;
                    }
                    else
                    {
                        if(category.typeID == "003")
                        {
                            b = true;
                        }
                        else
                        {
                            if(category.categoryName == "Đi vay" ||category.categoryName == "Thu nợ")
                            {
                                b = true;
                            }
                            else
                            {
                                b = false;
                            }
                        }
                    }
                    //item to new data
                    var itemdata = {
                        subcategory: category.categoryName,
                        onPress: ()=>{this.props.SelectTransaction(item.key); this.props.navigation.navigate("EditTransaction")},
                        source: findIcon(category.icon),
                        amount: b? "+" + item.money : "-" + item.money,
                        color: b? colors.greenDark : colors.redDark,
                    }

                    info.list.push(itemdata);
                    info.change = 0;
                    info.change += parseInt(itemdata.amount);

                    clone.push(info);
                }
                else
                {
                    var category = {}

                    let uid = 'none';
                    if(firebase.auth().currentUser) {
                        uid = firebase.auth().currentUser.uid;
                    }
                    const userCategoryRef = userRef.child(uid).child('Category')

                    userCategoryRef.orderByKey().equalTo(item.category).on('value', (snapshot) => {
                        snapshot.forEach(element => {
                            category = {
                                key: element.key,
                                categoryName: element.toJSON().CategoryName,
                                icon: element.toJSON().Icon,
                                parentID: element.toJSON().ParentID,
                                typeID: element.toJSON().TypeID
                            }
                        });
                    });

                    var b;

                    if(category.typeID == "002")
                    {
                        b = false;
                    }
                    else
                    {
                        if(category.typeID == "003")
                        {
                            b = true;
                        }
                        else
                        {
                            if(category.categoryName == "Đi vay" || category.categoryName == "Thu nợ")
                            {
                                b = true;
                            }
                            else
                            {
                                b = false;
                            }
                        }
                    }

                    
                    //item to new data
                    var itemdata = {
                        subcategory: category.categoryName,
                        onPress: ()=>{this.props.SelectTransaction(item.key); this.props.navigation.navigate("EditTransaction")},
                        source: findIcon(category.icon),
                        amount: b? "+" + item.money : "-" + item.money,
                        color: b? colors.greenDark : colors.redDark,
                    }

                    clone.find(i => i.date == d).change += parseInt(itemdata.amount)

                    
                    clone.find(i => i.date == d).list.push(itemdata)
                }
            })
            return clone;
    }
    getTransactionFullListData(offsetIndex)
    {
        var x = Math.ceil(offsetIndex) / Math.ceil(windowWidth - 2 * sizeFactor);
        if(this.getMonthList().length == 0)
        return []
        if(Math.ceil(offsetIndex) % Math.ceil(windowWidth - 2 * sizeFactor) == 0)
        {
            var monthcode = this.getMonthList()[x].index
            var m = monthcode % 12
            var y = monthcode / 12
            if(m == 0)
            {
                m = 12;
                y = y-1;
            }
            // this.setState({
            //     transactionData: this.mergeDataByDate(this.getDataInMonth(m, y))
            // })
            return this.mergeDataByDate(this.getDataInMonth(m,y));
        }
        return []
    }

    render() {
        //const month = this.getMonthList();
        return (
            <ScreenView>
                <Title>Lịch sử giao dịch </Title>
                <SimpleCarousel
                    //scrollref={(ref)=>this.Carousel = ref}
                    ref={(ref) => {this.Carousel = ref}}
                    onScroll = {(event)=>{
                        this.setState({offset : event.nativeEvent.contentOffset.x})
                        //this.getTransactionFullListData(event.nativeEvent.contentOffset.x)
                    }}
                >
                    <FlatList
                        ref={(ref) => { this.flatListRef = ref; }}
                        data={this.getMonthList()}
                        scrollEnabled={false}
                        horizontal={true}
                        keyExtractor={item => item.index}
                        renderItem={({ item }) => {
                            return (
                                <TransactionMonthSummary
                                    month={item.month}
                                    openBalance={toMoneyString(item.openBalance)}
                                    endBalance={toMoneyString(item.endBalance)}
                                    change={toMoneyString(item.change)}
                                    changeColor={item.change > 0?  colors.greenDark : colors.redDark}
                                    leftChevronOpacity={item.left}
                                    rightChevronOpacity={item.right}
                                />
                            );
                        }}
                        ></FlatList>
                </SimpleCarousel>
                <TransactionsFullList data={this.getTransactionFullListData(this.state.offset)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
