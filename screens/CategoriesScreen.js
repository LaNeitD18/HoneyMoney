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
} from "react-native";
import {
    String,
    ScreenView,
    Card,
    Divider,
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
    LargeScrollSelect,
    CategoryTable,
} from "../components/Basic";
import { Icon, SearchBar, Avatar } from "react-native-elements";
import TextTicker from "react-native-text-ticker";

export default class CategoriesScreen extends React.Component {
    state = {
        search: "",
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <ScreenView style={{ flex: 1 }}>
                <SearchBar
                    platform={Platform.OS}
                    placeholder="Tìm danh mục..."
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme="true"
                    containerStyle={{
                        backgroundColor: "",
                        marginHorizontal:
                            Platform.OS == "ios" ? sizeFactor / 2 : sizeFactor,
                    }}
                    inputContainerStyle={{
                        backgroundColor: "white",
                        borderRadius: 99,
                        paddingHorizontal: sizeFactor / 2.5,
                    }}
                />
                <Title>Danh mục</Title>
                <KindSelect buttons={["Vay/Trả", "Chi tiêu", "Thu nhập", "Các ví"]} />
                <CategoryTable />
                <Divider />
            </ScreenView>
        );
    }
}
