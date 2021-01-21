import React, { Component, useState } from "react";
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
import { Icon, SearchBar, ButtonGroup, Overlay } from "react-native-elements";
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
} from "./Basic";

const ConfirmDialog = () => {
    const [visible, setVisible] = useState(false);

    return (
        <Overlay
            overlayStyle={{
                borderRadius: sizeFactor,
                width: windowWidth - sizeFactor * 4,
                paddingHorizontal: sizeFactor * 1.5,
                paddingVertical: sizeFactor * 1.5,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
            }}
            isVisible={true}
        >
            <View style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}>
                <TouchableOpacity>
                    <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
                </TouchableOpacity>
            </View>
            <Icon
                name="wallet"
                type="material-community"
                color="black"
                size={sizeFactor * 3}
                style={{ marginBottom: sizeFactor }}
            />
            <String
                style={{
                    fontSize: sizeFactor * 1.5,
                    fontWeight: "bold",
                }}
            >
                Tiêu đề
            </String>
            <Text
                style={{
                    marginBottom: sizeFactor * 1.5,
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: sizeFactor,
                }}
            >
                Đây là một custom alert bao gồm 1 icon và 2 nút. T sẽ tạo 1 component riêng và thêm
                loại dialog 3 nút nếu cần nhưng giờ buồn ngủ quá push cái ngủ đây.
            </Text>
            <Space />
            <View
                style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    width: windowWidth - sizeFactor * 8,
                }}
            >
                <Button
                    color="white"
                    background={colors.blue}
                    style={{ height: sizeFactor * 3, flex: 1 / 2, marginLeft: sizeFactor / 2 }}
                >
                    Được
                </Button>
                <OutlineButton
                    color={colors.redDark}
                    style={{ height: sizeFactor * 3, flex: 1 / 2 }}
                >
                    Xàm
                </OutlineButton>
            </View>
        </Overlay>
    );
};

export default ConfirmDialog;
