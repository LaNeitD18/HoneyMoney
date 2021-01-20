import React, { Component } from "react";
import { Modal } from "react-native";
import {
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    KeyboardAvoidingView,
} from "react-native";
import { Icon, SearchBar, ButtonGroup, Overlay, Input, Divider } from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import TextTicker from "react-native-text-ticker";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

//UNIVERSAL SIZE UNIT
export const sizeFactor = windowWidth / 25.7;

export const colors = {
    red: "#F55555",
    orange: "#ff9500",
    yellow: "#ffcc00",
    green: "#34c759",
    blue: "#007aff",
    indigo: "#5856d6",
    purple: "#af52de",
    pink: "#ff2d55",
    gray: "#8e8e93",
    dark: "#48484a",
    redDark: "#F55555",
    greenDark: "#32a852",
    gray2: "#aeaeb2",
    gray3: "#c7c7cc",
    gray5: "#e5e5ea",
    gray6: "#f2f2f7",
    white: "#ffffff",
    black: "#000000",
};

export const styles = StyleSheet.create({
    text: {
        fontSize: sizeFactor,
        marginBottom: sizeFactor * 0.75,
    },
    inputText: {
        fontSize: sizeFactor * 1.5,
        marginBottom: sizeFactor * 0.75,
    },
    inputMultilineText: {
        fontSize: sizeFactor,
        marginBottom: sizeFactor * 0.75,
    },
    positiveNumber: {
        fontWeight: "bold",
        color: colors.greenDark,
        fontSize: sizeFactor * 1.25,
    },
    negativeNumber: {
        fontWeight: "bold",
        color: colors.redDark,
        fontSize: sizeFactor * 1.25,
    },
    heading: {
        fontSize: sizeFactor * 1.25,
        fontWeight: "bold",
        marginBottom: sizeFactor * 0.75,
        color: colors.gray,
        textTransform: "uppercase",
    },
    title: {
        fontSize: sizeFactor * 1.75,
        fontWeight: "bold",
        marginVertical: sizeFactor,
        marginHorizontal: sizeFactor * 1.25,
        color: "black",
    },
    background: {
        flex: 1,
        backgroundColor: colors.gray6,
    },
    container: {
        marginHorizontal: sizeFactor,
        marginBottom: sizeFactor * 0.75,
        paddingTop: sizeFactor,
        paddingBottom: sizeFactor * 0.25,
        paddingHorizontal: sizeFactor,
        borderRadius: sizeFactor,
    },
    space: {
        height: 0,
        marginBottom: sizeFactor / 2,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    rowLeft: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    largeCategory: {
        alignSelf: "center",
        marginBottom: sizeFactor / 2,
        width: (windowWidth - 8 * sizeFactor) / 4.5,
        height: (windowWidth - 8 * sizeFactor) / 4.5,
    },
    hugeCategory: {
        alignSelf: "center",
        marginBottom: sizeFactor / 2,
        width: (windowWidth - 5 * sizeFactor) / 4,
        height: (windowWidth - 5 * sizeFactor) / 4,
    },
    smallCategory: {
        marginBottom: sizeFactor,
        width: (windowWidth - 8 * sizeFactor) / 4,
        height: (windowWidth - 8 * sizeFactor) / 4,
    },
    colorSelect: (thecolor, selected) => {
        return {
            width: (windowWidth - 10 * sizeFactor) / 9,
            height: (windowWidth - 10 * sizeFactor) / 9,
            borderRadius: (windowWidth - 6 * sizeFactor) / 4.5,
            backgroundColor: thecolor,
            opacity: selected == thecolor ? 1 : 0.2,
            marginBottom: sizeFactor * 0.75,
        };
    },
});

export class String extends Component {
    render() {
        return (
            <TextTicker
                duration={5000}
                loop
                bounce
                repeatSpacer={50}
                style={[styles.text, this.props.style]}
            >
                {this.props.children}
            </TextTicker>
        );
    }
}

export class Heading2 extends Component {
    render() {
        return (
            <String style={{ color: colors.black, fontWeight: "bold" }}>
                {this.props.children}
            </String>
        );
    }
}

export class Title extends Component {
    render() {
        return <Text style={[styles.title, this.props.style]}>{this.props.children}</Text>;
    }
}

export class PositiveNumber extends Component {
    render() {
        return (
            <String style={[styles.positiveNumber, this.props.style]}>{this.props.children}</String>
        );
    }
}

export class NegativeNumber extends Component {
    render() {
        return (
            <String style={[styles.negativeNumber, this.props.style]}>{this.props.children}</String>
        );
    }
}
export class Heading extends Component {
    render() {
        return <String style={[styles.heading, this.props.style]}>{this.props.children}</String>;
    }
}

export class Card extends Component {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.color }]}>
                <Row>
                    <Heading style={[styles.heading, { color: this.props.headingColor }]}>
                        {this.props.heading}
                    </Heading>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Icon
                            name={this.props.icon}
                            type="material-community"
                            color={this.props.iconColor}
                            size={sizeFactor * 1.5}
                        />
                    </TouchableOpacity>
                </Row>
                {this.props.children}
            </View>
        );
    }
}

export class HeadlessCard extends Component {
    render() {
        return (
            <View
                name="headLessCard"
                style={[
                    styles.container,
                    {
                        marginHorizontal: 0,
                        backgroundColor: this.props.color,
                        width: this.props.width,
                    },
                    this.props.style,
                ]}
            >
                <View
                    style={{
                        alignSelf: "flex-end",
                        flexDirection: "row",
                        position: "absolute",
                        paddingRight: sizeFactor,
                        paddingTop: sizeFactor,
                    }}
                ></View>
                <Row>{this.props.children}</Row>
            </View>
        );
    }
}

export class LooseDivider extends Component {
    render() {
        return <Divider style={{ marginBottom: sizeFactor }} />;
    }
}

export class NormalCard extends Component {
    render() {
        return (
            <View
                style={[
                    {
                        backgroundColor: "white",
                        borderRadius: sizeFactor,
                        margin: sizeFactor,
                        marginBottom: 0,
                        paddingHorizontal: sizeFactor,
                        paddingTop: sizeFactor,
                    },
                    this.props.style,
                ]}
            >
                {this.props.children}
            </View>
        );
    }
}

export class TransactionMonthSummary extends Component {
    render() {
        return (
            <View
                style={{
                    width: windowWidth - sizeFactor * 2,
                    paddingHorizontal: sizeFactor,
                    paddingTop: sizeFactor,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginBottom: sizeFactor * 0.75,
                        alignItems: "center",
                    }}
                >
                    <Icon
                        name="chevron-left"
                        type="material-community"
                        color={colors.gray3}
                        size={sizeFactor * 2}
                        style={{ marginTop: 2, opacity: this.props.leftChevronOpacity }}
                    />
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: sizeFactor * 1.5,
                            marginHorizontal: sizeFactor / 2,
                        }}
                    >
                        {this.props.month}
                    </Text>
                    <Icon
                        name="chevron-right"
                        type="material-community"
                        color={colors.gray3}
                        size={sizeFactor * 2}
                        style={{ marginTop: 2, opacity: this.props.rightChevronOpacity }}
                    />
                </View>
                <Row>
                    <String style={{ color: colors.gray }}>Số dư đầu kỳ</String>
                    <String>{this.props.openBalance}</String>
                </Row>
                <Row>
                    <String style={{ color: colors.gray }}>Số dư cuối kỳ</String>
                    <String>{this.props.endBalance}</String>
                </Row>
                <Divider style={{ marginBottom: sizeFactor }} />
                <Row style={{ marginBottom: sizeFactor * 0.5 }}>
                    <String style={{ fontWeight: "bold" }}>Thay đổi</String>
                    <String style={{ fontWeight: "bold", color: this.props.changeColor }}>
                        {this.props.change}
                    </String>
                </Row>
            </View>
        );
    }
}
export class AddWalletButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon
                    name="credit-card-plus-outline"
                    type="material-community"
                    color={this.props.color}
                    size={sizeFactor * 2}
                    style={{ marginRight: sizeFactor / 2 }}
                />
            </TouchableOpacity>
        );
    }
}

export class ScreenView extends Component {
    render() {
        return (
            <SafeAreaView style={[styles.background, this.props.style]}>
                <KeyboardAvoidingView
                    behavior="position"
                    enabled={Platform.OS === "android" ? false : true}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingBottom: 40, paddingTop: 20 }}>
                            {this.props.children}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export class Space extends Component {
    render() {
        return <View style={styles.space} />;
    }
}

export class Row extends Component {
    render() {
        return <View style={[styles.row, this.props.style]}>{this.props.children}</View>;
    }
}

export class RowLeft extends Component {
    render() {
        return <View style={[styles.rowLeft, this.props.style]}>{this.props.children}</View>;
    }
}

export class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    {
                        justifyContent: "center",
                        borderWidth: 0,
                        paddingHorizontal: sizeFactor,
                        borderRadius: 9999,
                        paddingTop: sizeFactor * 0.6,
                        flexDirection: "row",
                        marginBottom: sizeFactor,
                        backgroundColor: this.props.backgroundColor,
                    },
                    this.props.style,
                ]}
            >
                <String
                    style={{
                        color: this.props.color,
                        fontWeight: "bold",
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class Button1 extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    {
                        justifyContent: "center",
                        borderWidth: 0,
                        backgroundColor: colors.blue,
                        paddingHorizontal: sizeFactor,
                        borderRadius: 9999,
                        paddingTop: sizeFactor * 0.6,
                        flexDirection: "row",
                        marginBottom: sizeFactor,
                    },
                    this.props.style,
                ]}
            >
                <String
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class Button2 extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    {
                        justifyContent: "center",
                        borderWidth: 0,
                        backgroundColor: colors.gray6,
                        paddingHorizontal: sizeFactor,
                        borderRadius: 9999,
                        paddingTop: sizeFactor * 0.6,
                        flexDirection: "row",
                        marginBottom: sizeFactor,
                    },
                    this.props.style,
                ]}
            >
                <String
                    style={{
                        color: "black",
                        fontWeight: "bold",
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class Button3 extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    {
                        justifyContent: "center",

                        paddingHorizontal: sizeFactor,
                        flexDirection: "row",
                    },
                    this.props.style,
                ]}
            >
                <String
                    style={{
                        color: colors.blue,
                        fontWeight: "bold",
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class ToggleButton extends Component {
    render() {
        var choosed = this.props.choosed;
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    {
                        justifyContent: "center",
                        borderWidth: 1,
                        backgroundColor:
                            choosed == "true" ? this.props.color : this.props.background,
                        paddingHorizontal: sizeFactor,
                        borderColor: this.props.color,
                        borderRadius: 9999,
                        paddingTop: sizeFactor * 0.75,
                        flexDirection: "row",
                        marginBottom: sizeFactor,
                    },
                    this.props.style,
                ]}
            >
                <String
                    style={{
                        color: choosed == "true" ? this.props.background : this.props.color,
                        fontWeight: "bold",
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class OutlineToggleButton extends Component {
    render() {
        //change this to state instead
        const checked = this.props.checked;
        return (
            <TouchableOpacity
                style={{
                    justifyContent: "center",
                    borderWidth: 1.25,
                    paddingHorizontal: sizeFactor,
                    borderColor: this.props.color,
                    borderRadius: 9999,
                    borderStyle: checked == "false" ? "dashed" : "solid",
                    paddingTop: sizeFactor * 0.75,
                    flexDirection: "row",
                    marginBottom: sizeFactor,
                }}
                onPress={this.props.onPress}
            >
                <Icon
                    name={checked == "false" ? this.props.uncheckIcon : this.props.checkIcon}
                    type="material-community"
                    color={this.props.color}
                    size={sizeFactor * 1.25}
                />
                <String
                    style={{
                        color: this.props.color,
                        fontWeight: checked == "false" ? "normal" : "bold",
                    }}
                >
                    {this.props.uncheckIcon == "" ? "" : " "}
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class OutlineButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[
                    {
                        justifyContent: "center",
                        borderWidth: 1.25,
                        paddingHorizontal: sizeFactor,
                        borderColor: this.props.color,
                        borderRadius: 9999,
                        paddingTop: sizeFactor * 0.75,
                        flexDirection: "row",
                        marginBottom: sizeFactor,
                    },
                    this.props.style,
                ]}
                onPress={this.props.onPress}
            >
                <String
                    style={{
                        color: this.props.color,
                    }}
                >
                    {this.props.children}
                </String>
            </TouchableOpacity>
        );
    }
}

export class Wallet extends Component {
    render() {
        const isDefault = this.props.isDefault;
        return (
            <Card
                heading={this.props.heading}
                headingColor="white"
                color={this.props.color}
                icon="tune"
                iconColor="white"
                onPress={this.props.onPressEdit}
            >
                <Row>
                    <String style={{ color: "white", fontSize: sizeFactor * 2 }}>VNĐ</String>
                    <PositiveNumber style={{ color: "white", fontSize: sizeFactor * 2 }}>
                        {this.props.children}
                    </PositiveNumber>
                </Row>
                <Row>
                    <String style={{ color: "white" }}>Ngày tạo</String>
                    <String style={{ color: "white", fontWeight: "bold" }}>
                        {this.props.date}
                    </String>
                </Row>
                <Space />
                <Row>
                    <OutlineToggleButton
                        checked={this.props.isDefault}
                        checkIcon="check-circle-outline"
                        color="white"
                        onPress={this.props.onPressDefault}
                    >
                        Ví mặc định
                    </OutlineToggleButton>
                    <Button
                        color={this.props.color}
                        backgroundColor="white"
                        onPress={this.props.onPressSuDung}
                    >
                        Sử dụng
                    </Button>
                </Row>
            </Card>
        );
    }
}

export class TouchableText extends Component {
    render() {
        return (
            <Row style={{ marginHorizontal: sizeFactor * 1.5 }}>
                <String></String>
                <TouchableOpacity onPress={this.props.onPress}>
                    <String
                        style={{
                            fontSize: sizeFactor,
                            color: colors.blue,
                        }}
                    >
                        {this.props.children}
                    </String>
                </TouchableOpacity>
            </Row>
        );
    }
}

export class TouchableDeleteText extends Component {
    render() {
        return (
            <Row style={{ marginHorizontal: sizeFactor * 0.5 }}>
                <String></String>
                <TouchableOpacity onPress={this.props.onPress}>
                    <String
                        style={{
                            fontSize: sizeFactor,
                            color: colors.redDark,
                        }}
                    >
                        {this.props.children}
                    </String>
                </TouchableOpacity>
            </Row>
        );
    }
}

export class KindSelect extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        };
    }
    render() {
        const buttons = this.props.buttons;
        //const { selectedIndex } = this.state;
        return (
            <ButtonGroup
                onPress={this.props.onPress}
                selectedIndex={this.props.selectedIndex}
                buttons={buttons}
                containerStyle={{
                    borderRadius: sizeFactor * 0.75,
                    borderWidth: 1.25,
                    borderColor: colors.gray3,
                    marginBottom: sizeFactor,
                    marginHorizontal: sizeFactor,
                    backgroundColor: colors.gray5,
                    height: sizeFactor * 2,
                }}
                textStyle={{
                    fontSize: sizeFactor * 0.75,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: colors.gray,
                }}
                innerBorderStyle={{ color: colors.gray3 }}
                selectedButtonStyle={{ backgroundColor: "white" }}
                selectedTextStyle={{ color: colors.dark }}
            />
        );
    }
}

export class SmallKindSelect extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 1,
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex });
    }
    render() {
        const buttons = this.props.buttons;
        const { selectedIndex } = this.state;
        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{
                    borderRadius: sizeFactor,
                    borderWidth: 0,
                    borderColor: colors.gray3,
                    marginBottom: sizeFactor,
                    marginHorizontal: sizeFactor,
                    backgroundColor: colors.gray5,
                    height: sizeFactor * 2,
                }}
                textStyle={{
                    fontSize: sizeFactor * 0.75,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: colors.gray,
                }}
                buttonStyle={{
                    borderWidth: 0,
                    backgroundColor: colors.gray5,
                }}
                buttonContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: colors.gray5,
                    borderColor: colors.gray5,
                }}
                innerBorderStyle={{ color: colors.gray3 }}
                selectedButtonStyle={{ backgroundColor: colors.blue }}
                selectedTextStyle={{ color: "white" }}
            />
        );
    }
}

export class AddWalletKindSelect extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 1,
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex });
    }
    render() {
        const buttons = this.props.buttons;
        const { selectedIndex } = this.state;
        return (
            <ButtonGroup
                onPress={this.props.onPress}
                selectedIndex={this.props.selectedIndex}
                buttons={buttons}
                containerStyle={{
                    borderRadius: sizeFactor,
                    borderWidth: 0,
                    borderColor: colors.gray3,
                    marginBottom: sizeFactor,
                    marginHorizontal: 0,
                    backgroundColor: colors.gray5,
                    height: sizeFactor * 2.5,
                }}
                textStyle={{
                    fontSize: sizeFactor * 0.75,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: colors.gray,
                }}
                buttonStyle={{
                    borderWidth: 0,
                    backgroundColor: colors.gray5,
                }}
                buttonContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: colors.gray5,
                    borderColor: colors.gray5,
                }}
                innerBorderStyle={{ color: colors.gray3 }}
                selectedButtonStyle={{ backgroundColor: colors.blue }}
                selectedTextStyle={{ color: "white" }}
            />
        );
    }
}

export class SmallCategory extends Component {
    render() {
        var choosed = this.props.choosed;
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{ marginRight: sizeFactor }}>
                    <View
                        style={{
                            height: styles.largeCategory.height + sizeFactor / 2,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={require("../assets/categories/choosed.png")}
                            style={[
                                styles.largeCategory,
                                { opacity: this.props.choosed ? 1 : 0, position: "absolute" },
                            ]}
                        ></Image>
                        <Image
                            source={this.props.source}
                            style={[
                                styles.largeCategory,
                                {
                                    opacity: 1,
                                    width: styles.largeCategory.height - sizeFactor * 1.25,
                                    height: styles.largeCategory.height - sizeFactor * 1.25,
                                },
                            ]}
                        ></Image>
                    </View>
                    <View
                        style={{
                            width: styles.largeCategory.width,
                            alignItems: "center",
                        }}
                    >
                        <String
                            style={{
                                fontSize: sizeFactor * 0.75,
                                fontWeight: this.props.choosed ? "bold" : "normal",
                                color: this.props.choosed ? colors.blue : "black",
                            }}
                        >
                            {this.props.children}
                        </String>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export class IconCategory extends Component {
    render() {
        var choosed = this.props.choosed;
        return (
            <TouchableOpacity>
                <View
                    style={{
                        height: (windowWidth - sizeFactor * 9) / 4,
                        width: (windowWidth - sizeFactor * 9) / 4,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: sizeFactor / 2,
                    }}
                >
                    <Image
                        source={require("../assets/categories/choosed.png")}
                        style={[
                            styles.largeCategory,
                            {
                                opacity: this.props.choosed ? 1 : 0,
                                position: "absolute",
                                height: (windowWidth - sizeFactor * 9) / 4,
                                width: (windowWidth - sizeFactor * 9) / 4,
                            },
                        ]}
                    ></Image>
                    <Image
                        source={this.props.source}
                        style={[
                            styles.largeCategory,
                            {
                                marginTop: sizeFactor / 2,
                                opacity: 1,
                                width: sizeFactor * 2.5,
                                height: sizeFactor * 2.5,
                            },
                        ]}
                    ></Image>
                </View>
            </TouchableOpacity>
        );
    }
}

export class Category extends Component {
    render() {
        var choosed = this.props.choosed;
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{ marginRight: sizeFactor }}>
                    <View
                        style={{
                            height: styles.hugeCategory.height + sizeFactor / 2,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={require("../assets/categories/choosed.png")}
                            style={[
                                styles.hugeCategory,
                                { opacity: this.props.choosed ? 1 : 0, position: "absolute" },
                            ]}
                        ></Image>
                        <Image
                            source={this.props.source}
                            style={[
                                styles.hugeCategory,
                                {
                                    opacity: 1,
                                    width: styles.hugeCategory.height - sizeFactor * 1.25,
                                    height: styles.hugeCategory.height - sizeFactor * 1.25,
                                },
                            ]}
                        ></Image>
                    </View>
                    <View
                        style={{
                            width: styles.hugeCategory.width,
                            alignItems: "center",
                        }}
                    >
                        <String
                            style={{
                                fontSize: sizeFactor * 0.75,
                                fontWeight: this.props.choosed ? "bold" : "normal",
                                color: this.props.choosed ? colors.blue : "black",
                            }}
                        >
                            {this.props.children}
                        </String>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export class TransactionsList extends Component {
    render() {
        const Item = ({ subcategory, onPress, source, amount, color }) => (
            <TouchableOpacity onPress={onPress}>
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
                                source={source}
                                style={{
                                    width: sizeFactor * 2.25,
                                    height: sizeFactor * 2.25,
                                }}
                            ></Image>
                        </View>
                        <String style={{ marginBottom: 0 }}>{subcategory}</String>
                    </View>
                    <String style={{ marginBottom: 0, color: color }}>{amount}</String>
                </Row>
            </TouchableOpacity>
        );
        const renderItem = ({ item }) => (
            <Item
                subcategory={item.subcategory}
                onPress={item.onPress}
                source={item.source}
                amount={item.amount}
                color={item.color}
            />
        );
        return <FlatList data={this.props.data} renderItem={renderItem} />;
    }
}

export class TransactionsFullList extends Component {
    render() {

        const Item = ({ date, dayOfWeek, month, change, list }) => (
            <NormalCard>
                <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <String
                            style={{
                                marginBottom: 0,
                                fontSize: sizeFactor * 2,
                                marginRight: sizeFactor,
                                marginTop: 0,
                            }}
                        >
                            {date}
                        </String>
                        <View>
                            <String
                                style={{
                                    fontSize: sizeFactor * 0.75,
                                    marginBottom: 0,
                                    fontWeight: "bold",
                                    color: colors.gray,
                                }}
                            >
                                {dayOfWeek}
                            </String>
                            <String
                                style={{
                                    fontSize: sizeFactor * 0.75,
                                    marginBottom: 0,
                                    color: colors.gray,
                                }}
                            >
                                {month}
                            </String>
                        </View>
                    </View>
                    <String style={{ marginBottom: 0, fontWeight: "bold" }}>{change}</String>
                </Row>
                <LooseDivider />
                <View style={{ marginBottom: sizeFactor / 2 }}>
                    <TransactionsList data={list} />
                </View>
            </NormalCard>
        );
        const renderItem = ({ item }) => (
            <Item
                date={item.date}
                dayOfWeek={item.dayOfWeek}
                month={item.month}
                change={item.change}
                list={item.list}
            />
        );
        return <FlatList data={this.props.data} renderItem={renderItem} />;
    }
}

export class SimpleCarousel extends Component {
    render() {
        return (
            <ScrollView
                horizontal
                snapToInterval={windowWidth - sizeFactor * 2}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={{
                    backgroundColor: "white",
                    borderRadius: sizeFactor,
                    margin: sizeFactor,
                    marginBottom: 0,
                }}
                onScroll={this.props.onScroll}
            >
                {this.props.children}
            </ScrollView>
        );
    }
}

export class CategoryTable extends Component {
    render() {
        return <View>{this.props.rows}</View>;
    }
}

export class ScrollSelect extends Component {
    render() {
        return (
            <ScrollView
                style={{ marginHorizontal: sizeFactor }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <SmallCategory choosed="true" source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
                <SmallCategory source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
                <SmallCategory source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
                <SmallCategory source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
                <SmallCategory source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
                <SmallCategory source={require("../assets/categories/tuthien.png")}>
                    Từ thiện
                </SmallCategory>
            </ScrollView>
        );
    }
}

export class RoundedView extends Component {
    render() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    marginHorizontal: sizeFactor,
                    borderRadius: sizeFactor,
                    paddingHorizontal: sizeFactor,
                    paddingVertical: sizeFactor,
                    marginBottom: sizeFactor,
                }}
            >
                {this.props.children}
            </View>
        );
    }
}

export class ColorSelectButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.colorSelect(this.props.color, this.props.selected)} />
            </TouchableOpacity>
        );
    }
}

//onChangeText works
export class HomoTextInput extends Component {
    render() {
        return (
            <Input
                labelStyle={{ color: colors.gray }}
                label="Email"
                placeholder="example@email.com"
                leftIconContainerStyle={{ marginRight: sizeFactor / 2 }}
                leftIcon={{ name: "person", color: colors.gray }}
                containerStyle={{
                    width: windowWidth - sizeFactor * 6,
                    padding: 0,
                }}
                inputContainerStyle={{
                    margin: 0,
                    padding: 0,
                    borderWidth: 0,
                }}
                errorStyle={{ color: colors.red, alignSelf: "flex-end" }}
                {...this.props}
            />
        );
    }
}

//new class
export class DialogModal extends Component {
    render() {
        return (
            <Modal animationType="slide" transparent={true} visible={this.props.visible}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "gray",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0.8,
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                            backgroundColor: "white",
                            borderRadius: 20,
                            padding: 35,
                            alignItems: "center",
                            width: this.props.width,
                            height: this.props.height,
                        }}
                    >
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}
export class SettingRow extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Row style={{ marginBottom: sizeFactor / 4, paddingHorizontal: sizeFactor }}>
                        <View
                            style={{
                                alignContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginBottom: sizeFactor * 0.75,
                            }}
                        >
                            <Icon
                                style={{ marginRight: sizeFactor }}
                                name={this.props.iconName}
                                size={sizeFactor * 1.5}
                                type="material-community"
                                color={this.props.color}
                            />
                            <String style={{ marginBottom: 0 }}>{this.props.text}</String>
                        </View>
                        <Icon name="chevron-right" type="material-community" color={colors.gray} />
                    </Row>
                    <View style={{ paddingLeft: sizeFactor * 3.5 }}>
                        <LooseDivider />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
