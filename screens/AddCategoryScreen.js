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
} from "../components/Basic";
import {
  Icon,
  SearchBar,
  Input,
  Avatar,
  Accessory,
  ListItem,
} from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from 'react-redux';
import { categoryRef } from '../components/DataConnect';
import * as firebase from 'firebase';

import { changeType, changeName } from '../actions/index';

class AddCategoryScreen extends Component {

    createCategory = () => {
        const name = this.props.categoryName;
        const type = this.props.selectedType == 0 ? '001' : this.props.selectedType == 1 ? '002' : '003';

        categoryRef.push({
            CategoryName: name,
            Icon: '',
            ParentID: '',
            TypeID: type
        });
        this.props.navigation.goBack();
    }

    render() {
        const list = [
        {
            title: "Từ tiện",
            source: require("../assets/categories/tuthien.png"),
        },
        {
            title: "Thêm mới",
            source: require("../assets/categories/themdanhmuccon.png"),
        },
        ];
        return (
        <ScreenView>
            <View
            style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
            }}
            >
            <TouchableOpacity>
                <Avatar
                size={sizeFactor * 6}
                avatarStyle={{
                    width: sizeFactor * 4.5,
                    height: sizeFactor * 4.5,
                    marginLeft: sizeFactor * 0.75,
                    marginTop: sizeFactor * 0.75,
                }}
                source={require("../assets/categories/tuthien.png")}
                >
                <Accessory size={sizeFactor * 1.75} />
                </Avatar>
            </TouchableOpacity>
            </View>
            <Title style={{ marginLeft: sizeFactor * 1.5 }}>Tạo danh mục</Title>
            <RoundedView>
            <String style={{ fontWeight: "bold" }}>Tên danh mục</String>
            <TextInput 
                style={styles.inputText} 
                placeholder="Danh mục của tôi" 
                onChangeText={(text) => this.props.changeName(text)}/>
            <Divider />
            <String style={{ fontWeight: "bold" }}>Loại chi tiêu</String>
            <AddWalletKindSelect 
                buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
                selectedIndex={this.props.selectedType} 
                onPress={(index) => this.props.changeType(index)}/>
            <Divider />
            <String style={{ fontWeight: "bold" }}>Danh mục con</String>
            <View>
                {list.map((item, i) => (
                <TouchableOpacity>
                    <ListItem
                    key={i}
                    title={item.title}
                    leftAvatar={{
                        source: item.source,
                        width: sizeFactor * 2.5,
                        height: sizeFactor * 2.5,
                        rounded: false,
                    }}
                    chevron={
                        //sorry for bad code, pls edit this
                        item.title == "Thêm mới"
                        ? false
                        : { size: sizeFactor * 1.5 }
                    }
                    contentContainerStyle={{ marginHorizontal: 0 }}
                    rightContentContainerStyle={{ marginHorizontal: 0 }}
                    containerStyle={{ paddingHorizontal: 0 }}
                    titleStyle={{ fontSize: sizeFactor }}
                    pad={sizeFactor}
                    />
                </TouchableOpacity>
                ))}
            </View>
            </RoundedView>
            <Divider />
            <Button
            color="white"
            background={colors.blue}
            style={{ marginHorizontal: sizeFactor }}
            onPress={this.createCategory}
            >
            Lưu thay đổi
            </Button>
        </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {
        categoryName: state.categoryName,
        selectedType: state.selectedType,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeName: (text) => {dispatch(changeName(text))}, 
        changeType: (index) => {dispatch(changeType(index))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryScreen);
