import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    TextInput,
    ImageBackground,
    Animated,
    Picker,
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
    HomoTextInput,
    Button1,
    Button2,
    Button3,
    DialogModal,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef, userRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog, updateCategories } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";
import {rootRef,walletRef} from '../components/DataConnect'

import {UpdateWalletAction, SelectWallet } from "../actions";

import { VictoryBar } from "victory-native";
import { PieChart, LineChart, Path, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Circle, G, Line, Image, Defs, LinearGradient, Stop } from "react-native-svg";
import toMoneyString from "../components/toMoneyString";

export class ReportScreen extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            selectedMonth: (new Date().getMonth() + 1),
            selectedYear: new Date().getFullYear(),
            selectedWeek: this.toString(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay())),
            yearlist: [],
        }
    }
    componentDidMount(){
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
    
    toDate(datestring)
    {
        var parts = datestring.split("/");
        return new Date(parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10));
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

    getYearList()
    {
        var yearlist = [];
        var data = this.getDataAll();
        if (data[0] === undefined) {
            return [];
        }   
        var startyear = this.toDate(data[0].date).getFullYear();
        var endyear = this.toDate(data[data.length - 1].date).getFullYear();

        var today = new Date();

        if(endyear <  today.getFullYear)
        {
            endyear = today.getFullYear();
        }
        while (startyear <= endyear)
        {
            var item = {
                index: startyear,
                monthdata: []
            };
            yearlist.push(item);
            startyear +=1
        }
        return yearlist;
    }

    renderPickerYearItem(data)
    {
        var yearlistresult = []
        data.forEach(item=>
            {
                yearlistresult.push(
                    <Picker.Item label={item.index.toString()} value={item.index} />
                )
            })
        return yearlistresult;
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

    renderPickerWeekItem()
    {
        var week =[]
        var month = this.state.selectedMonth;
        var year = this.state.selectedYear;
        var firstDate = new Date(year, month-1, 1);
        firstDate = new Date(year, month-1, 1 - firstDate.getDay());
        if(this.toDate(this.state.selectedWeek).getDay() != 0)
        {
            this.setState({selectedWeek: this.toString(firstDate)})
        }
        while(firstDate.getMonth() + firstDate.getFullYear()*12 < month + year*12)
        {
            
            var infoweek =
            {
                start: firstDate,
                end: new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 6),
            }
            week.push(
                <Picker.Item label={this.toString(infoweek.start) + " - " + this.toString(infoweek.end)} value={this.toString(infoweek.start)} />
            )
            firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 7)
        }
        return week
    }

    getDataInTimeRange(start, end)
    {
        var startDate = this.toDate(start);
        var endDate = this.toDate(end);
        var temp = [];
        this.props.walletData.forEach(element =>
            {
                if(element.transactionList != undefined && element.isDefault == "true")
                {
                    Object.keys(element.transactionList).forEach(transaction =>
                        {
                            //console.log(transaction)
                            var tempInfo = {
                                date: element.transactionList[transaction].date,
                                money: element.transactionList[transaction].money,
                                category: element.transactionList[transaction].category,
                            }
                            if(this.toDate(tempInfo.date) >= startDate && this.toDate(tempInfo.date) <= endDate)
                            {
                                temp.push(tempInfo);
                            }
                        })
                }
            });
        return temp.sort((a,b)=>
        {
            return this.toDate(a.date)-this.toDate(b.date);
        });;
    }

    getDataInTimeRangeDate(startDate, endDate)
    {
        var temp = [];
        this.props.walletData.forEach(element =>
            {
                if(element.transactionList != undefined && element.isDefault == "true")
                {
                    Object.keys(element.transactionList).forEach(transaction =>
                        {
                            //console.log(transaction)
                            var tempInfo = {
                                date: element.transactionList[transaction].date,
                                money: element.transactionList[transaction].money,
                                category: element.transactionList[transaction].category.key,
                            }
                            if(this.toDate(tempInfo.date) >= startDate && this.toDate(tempInfo.date) <= endDate)
                            {
                                temp.push(tempInfo);
                            }
                        })
                }
            });
        return temp.sort((a,b)=>
        {
            return this.toDate(a.date)-this.toDate(b.date);
        });;
    }

    mergeDataByCategory()
    {
        var gain = 0;
        var lose = 0;
        var gainpie = [];
        var losepie = [];
        var start = this.toDate(this.state.selectedWeek);
        var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
        var data = this.getDataInTimeRangeDate(start, end)
        const categories = this.props.allCategories;
        var temp = categories.filter((item) => item.typeID === "003" || item.categoryName == "Đi vay" || item.categoryName == "Thu nợ");
        for(let i = 0; i < temp.length; i++)
        {
            gainpie[i] = {
                icon: findIcon(temp[i].icon),
                money: 0,
            }
            data.forEach(item =>
            {
                if(item.category == temp[i].key)
                {
                    gainpie[i].money += parseInt(item.money);
                    gain += parseInt(item.money);
                }
            })
        }
        temp = categories.filter((item) => item.typeID === "002" || item.categoryName == "Cho vay" || item.categoryName == "Trả nợ");
        for(let i = 0; i < temp.length; i++)
        {
            losepie[i] = {
                icon: findIcon(temp[i].icon),
                money: 0,
            }
            data.forEach(item =>
            {
                if(item.category == temp[i].key)
                {
                    losepie[i].money += parseInt(item.money);
                    lose += parseInt(item.money);
                }
            })
        }
        return {
            gain: gain,
            lose: lose,
            gainpie: gainpie,
            losepie: losepie,
        }
    }

    mergeDataByDateInWeek()
    {
        var gain = []
        var lose = []
        var change = 0
        var start = this.toDate(this.state.selectedWeek);
        var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
        var data = this.getDataInTimeRangeDate(start, end)
        for(let i = 0; i < 7; i++)
        {
            gain[i] = 0;
            lose[i] = 0;
            data.forEach(item =>
                {
                    if(this.toDate(item.date).valueOf() == start.valueOf() )
                    {
                        var category

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
                        if(b)
                        {
                            gain[i] += parseInt(item.money);
                            change += parseInt(item.money);
                        }
                        else
                        {
                            lose[i] += parseInt(item.money);
                            change -= parseInt(item.money);
                        }
                    }
                })
                start= new Date(start.getFullYear(), start.getMonth(), start.getDate()+1)
        }

        return {
            gain: gain,
            lose: lose,
            change: change
        };
    }

    render() {
        const weeklist = this.renderPickerWeekItem();
        //this.getYearList();
        const yearlist = this.renderPickerYearItem(this.getYearList())
        const clonedata = this.mergeDataByDateInWeek();
        const lineData1 = clonedata.gain;
        const lineData2 = clonedata.lose; 
        const pie = this.mergeDataByCategory();
        const greenpie = pie.gainpie;
        const redpie = pie.losepie;
        //console.log(this.getDataInTimeRange("23/12/2020","25/12/2020"));
        //console.log(this.getDataInTimeRangeDate(new Date({date: 23, month: 12, year: 2020}),new Date({date: 24, month: 12, year: 2020})));
        const data = [50, 25, 40, 95, 85, 91];
        this.mergeDataByDateInWeek()

        //shade of color by hau :v
        const shadesOfGreen = () =>
            "hsl( " +
            (Math.floor(Math.random() * 40) + 115) +
            ", " +
            (Math.floor(Math.random() * 60) + 29) +
            "%, " +
            (Math.floor(Math.random() * 20) + 39) +
            "%)";

        const shadesOfRed = () =>
            "hsl( " +
            ((Math.floor(Math.random() * 40) - 17) % 360) +
            ", " +
            (Math.floor(Math.random() * 30) + 70) +
            "%, " +
            (Math.floor(Math.random() * 20) + 49) +
            "%)";

        const pieData = greenpie
            .filter((value) => value.money > 0)
            .map((value, index) => ({
                value: value.money,
                svg: { fill: shadesOfGreen() },
                key: `pie-${index}`,
                icon: value.icon,
            }));

        const pieData2 = redpie
            .filter((value) => value.money > 0)
            .map((value, index) => ({
                value: value.money,
                svg: { fill: shadesOfRed() },
                key: `pie-${index}`,
                icon: value.icon,
            }));
        const Labels1 = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={index}>
                        <Line
                            x1={labelCentroid[0]}
                            y1={labelCentroid[1]}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />
                        <Circle
                            cx={labelCentroid[0]}
                            cy={labelCentroid[1]}
                            r={20}
                            fill="white"
                            stroke={data.svg.fill}
                            strokeWidth={2}
                        />
                        <Image
                            x={labelCentroid[0] - 12.25}
                            y={labelCentroid[1] - 12.25}
                            width={25}
                            height={25}
                            preserveAspectRatio="xMidYMid slice"
                            opacity="1"
                            href={pieData[index].icon}
                        />
                    </G>
                );
            });
        };

        const Labels2 = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={index}>
                        <Line
                            x1={labelCentroid[0]}
                            y1={labelCentroid[1]}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />
                        <Circle
                            cx={labelCentroid[0]}
                            cy={labelCentroid[1]}
                            r={20}
                            fill="white"
                            stroke={data.svg.fill}
                            strokeWidth={2}
                        />
                        <Image
                            x={labelCentroid[0] - 12.25}
                            y={labelCentroid[1] - 12.25}
                            width={25}
                            height={25}
                            preserveAspectRatio="xMidYMid slice"
                            opacity="1"
                            href={pieData2[index].icon}
                        />
                    </G>
                );
            });
        };

        //Array of datasets, following this syntax:
        const lineData = [
            {
                data: lineData1,
                svg: {
                    strokeWidth: 3,
                    stroke: "url(#gradient1)",
                },
            },
            {
                data: lineData2,
                svg: {
                    strokeWidth: 3,
                    stroke: "url(#gradient2)",
                },
            },
        ];
        const Gradient = () => (
            <Defs key={"gradient"}>
                <LinearGradient id={"gradient1"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#59d463"} />
                    <Stop offset={"100%"} stopColor={"#009488"} />
                </LinearGradient>
                <LinearGradient id={"gradient2"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#ff5c8d"} />
                    <Stop offset={"100%"} stopColor={"#c73f00"} />
                </LinearGradient>
            </Defs>
        );
        const axesSvg = { fontSize: 10, fill: "grey" };
        const xAxisHeight = 30;

        return (
            <ScreenView>
                {/* {<Title>Báo cáo</Title>} */}
                <View
                    style={{
                        padding: sizeFactor,
                        paddingBottom: 0,
                        flex: 2,
                        flexDirection: "row",
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 8, fontWeight: "bold", marginBottom: -8 }}>
                            Chọn năm
                        </Text>
                        <Picker selectedValue={this.state.selectedYear}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({selectedYear: itemValue})}>
                            {yearlist}
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 8, fontWeight: "bold", marginBottom: -8 }}>
                            Chọn tháng
                        </Text>
                        <Picker style={{ flex: 1 }} selectedValue={this.state.selectedMonth}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({selectedMonth: itemValue})
                            }>
                            <Picker.Item label="Tháng 1" value={1} />
                            <Picker.Item label="Tháng 2" value={2} />
                            <Picker.Item label="Tháng 3" value={3} />
                            <Picker.Item label="Tháng 4" value={4} />
                            <Picker.Item label="Tháng 5" value={5} />
                            <Picker.Item label="Tháng 6" value={6} />
                            <Picker.Item label="Tháng 7" value={7} />
                            <Picker.Item label="Tháng 8" value={8} />
                            <Picker.Item label="Tháng 9" value={9} />
                            <Picker.Item label="Tháng 10" value={10} />
                            <Picker.Item label="Tháng 11" value={11} />
                            <Picker.Item label="Tháng 12" value={12} />
                        </Picker>
                    </View>
                </View>
                <View style={{ paddingHorizontal: sizeFactor }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 8, fontWeight: "bold", marginBottom: -8 }}>
                            Chọn tuần
                        </Text>
                        <Picker selectedValue={this.state.selectedWeek}
                            onValueChange={(itemValue, itemIndex) =>{
                                this.setState({selectedWeek: itemValue})
                            }
                            }>
                            {weeklist}
                        </Picker>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: sizeFactor,
                        margin: sizeFactor,
                        marginBottom: 0,
                        paddingHorizontal: sizeFactor,
                        paddingTop: sizeFactor * 1.5,
                    }}
                >
                    <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "normal",
                                fontSize: sizeFactor * 1.25,
                            }}
                        >
                            Thay đổi trong tuần
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: sizeFactor * 2,
                                color: clonedata.change < 0 ? colors.redDark:colors.greenDark,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                            {toMoneyString(clonedata.change)}
                        </Text>
                        <View style={{ backgroundColor: "white", height: 330 }}>
                            <View style={{ alignSelf: "center", height: 340, flexDirection: "row" }}>
                                <YAxis
                                    data={lineData1}
                                    style={{ marginBottom: xAxisHeight, marginRight: 10 }}
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={axesSvg}
                                    formatLabel={(value, index) => value / 1000}
                                />
                                <View>
                                    <LineChart
                                        style={{
                                            height: 300,
                                            width: windowWidth - sizeFactor * 4 - 30,
                                        }}
                                        data={lineData}
                                        contentInset={{ top: 20, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Grid />
                                        <Gradient />
                                    </LineChart>
                                    <XAxis
                                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                                        data={lineData1}
                                        formatLabel={(value, index) => index? "T" + (index + 1) : "CN" }
                                        contentInset={{ left: 20, right: 20 }}
                                        svg={axesSvg}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: sizeFactor,
                            margin: sizeFactor,
                            marginBottom: 0,
                            paddingTop: sizeFactor * 1.5,
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "normal",
                                fontSize: sizeFactor * 1.25,
                            }}
                        >
                            Thu nhập
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: sizeFactor * 2,
                                color: colors.greenDark,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                            {toMoneyString(pie.gain)}
                        </Text>
                        <PieChart
                            style={{ height: 300 }}
                            data={pieData}
                            innerRadius={30}
                            outerRadius={82}
                            labelRadius={120}
                        >
                            <Labels1 />
                        </PieChart>
                    </View>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: sizeFactor,
                            margin: sizeFactor,
                            marginBottom: 0,
                            paddingTop: sizeFactor * 1.5,
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "normal",
                                fontSize: sizeFactor * 1.25,
                            }}
                        >
                            Chi tiêu
                        </Text>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontWeight: "bold",
                                fontSize: sizeFactor * 2,
                                color: colors.redDark,
                                marginBottom: sizeFactor / 2,
                            }}
                        >
                        {toMoneyString(pie.lose)}
                    </Text>
                    <PieChart
                        style={{ height: 300 }}
                        data={pieData2}
                        innerRadius={30}
                        outerRadius={82}
                        labelRadius={120}
                    >
                        <Labels2 />
                    </PieChart>
                </View>
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        walletData: state.WalletReducer,
        //selectedWallet: state.selectedWalletReducer,
        allCategories: state.allCategories,
    }
  };
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        Update: (snap) => {
          dispatch(UpdateWalletAction(snap));
        },
        SelectWallet: (value) => {
          dispatch(SelectWallet(value));
        },
        updateCategories: (categories) => {
            dispatch(updateCategories(categories));
        },
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);

