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
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { categoryRef } from "../components/DataConnect";
import * as firebase from "firebase";

import { changeType, changeName, openDialog } from "../actions/index";
import { findIcon } from "../components/Image";
import { sub } from "react-native-reanimated";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import Swipeout from "react-native-swipeout";

import { VictoryBar } from "victory-native";
import { PieChart, LineChart, Path, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Circle, G, Line, Image, Defs, LinearGradient, Stop } from "react-native-svg";

export default class ReportScreen extends Component {
    render() {
        const data = [50, 25, 40, 95, 85, 91];

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

        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: shadesOfGreen() },
                key: `pie-${index}`,
            }));

        const pieData2 = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: shadesOfRed() },
                key: `pie-${index}`,
            }));
        const Labels = ({ slices }) => {
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
                            href={require("../assets/categories/vanchuyen.png")}
                        />
                    </G>
                );
            });
        };

        const lineData1 = [50000, 10000, 40000, 95000, 85000, 91000, 35000];
        const lineData2 = [87000, 66000, 69000, 92000, 40000, 61000, 16000];

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
            <ScrollView style={{ backgroundColor: "whitesmoke" }}>
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
                        <Picker>
                            <Picker.Item label="2020" value="2020" />
                            <Picker.Item label="2019" value="2019" />
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 8, fontWeight: "bold", marginBottom: -8 }}>
                            Chọn tháng
                        </Text>
                        <Picker style={{ flex: 1 }}>
                            <Picker.Item label="Tháng 1" value="1" />
                            <Picker.Item label="Tháng 2" value="2" />
                        </Picker>
                    </View>
                </View>
                <View style={{ paddingHorizontal: sizeFactor }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 8, fontWeight: "bold", marginBottom: -8 }}>
                            Chọn tuần
                        </Text>
                        <Picker>
                            <Picker.Item label="14/12/2020 - 20/12/2020" value="1412" />
                            <Picker.Item label="21/12/2020 - 27/12/2020" value="2112" />
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
                            color: colors.greenDark,
                            marginBottom: sizeFactor / 2,
                        }}
                    >
                        +50.000
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
                                    formatLabel={(value, index) => "T" + (index + 1)}
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
                        70.000
                    </Text>
                    <PieChart
                        style={{ height: 300 }}
                        data={pieData}
                        innerRadius={30}
                        outerRadius={82}
                        labelRadius={120}
                    >
                        <Labels />
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
                        20.000
                    </Text>
                    <PieChart
                        style={{ height: 300 }}
                        data={pieData2}
                        innerRadius={30}
                        outerRadius={82}
                        labelRadius={120}
                    >
                        <Labels />
                    </PieChart>
                </View>
            </ScrollView>
        );
    }
}
