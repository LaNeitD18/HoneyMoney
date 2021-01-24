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
    ChooseWalletList,
    WalletRow,
    LooseDivider,
} from "../components/Basic";
import { Icon, SearchBar, Input, Avatar, Accessory, ListItem, Overlay } from "react-native-elements";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import Swipeout from "react-native-swipeout";

import * as firebase from "firebase";
import { categoryRef, userRef } from "../components/DataConnect";

import { findIcon } from "../components/Image";
import { changeType, changeName, openDialog, updateCategories } from "../actions/index";
import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
import ChooseIconDialog from "../components/ChooseIconDialog";
import { FlatList } from "react-native-gesture-handler";
import { Alert } from "react-native";

export class AddBudgetScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            visible: false,
            category: "",
            newSoDu: "",
        }
    }
    componentDidMount()
    {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child('Category')
        userCategoryRef.on("value", (snapshot) => {
            this.props.updateCategories(snapshot);
        });
    }
    luuNganSach()
    {
        if(parseInt(this.state.newSoDu) == 0 || this.state.newSoDu =="")
        {
            Alert.alert("Thông báo", "Giới hạn phải lớn hơn 0", 
            [
                {
                    text: "OK",
                    onPress: () => {                            
                    }
                }
            ], {cancelable: false}
            );
            return 0;
        }
        if(this.state.category == "")
        {
            Alert.alert("Thông báo", "Bạn chưa chọn danh mục áp dụng hạn mức", 
            [
                {
                    text: "OK",
                    onPress: () => {                            
                    }
                }
            ], {cancelable: false}
            );
            return 0;
        }
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child('Category')
        userCategoryRef.child(this.state.category.key).update({
            budget: this.state.newSoDu,
        });
        this.resetall();
        Alert.alert("Thông báo", "Bạn đã thêm giới hạn mức chi cho danh mục này thành công", 
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
    resetall()
    {
        this.setState({
            newSoDu: 0,
            category: "",
        })
    }
    render() {
        const data = [];
        this.props.allCategories.filter(cate => cate.typeID == "002").forEach(
            element => {
                var info ={
                    ...element,
                    onPress: () => {
                        this.setState({visible: false});
                        this.setState({category: element});
                    }
                }
                data.push(info)
            }
        )
        const Item = ({ name }) => <View>
            <Row style={{ marginBottom: sizeFactor / 2 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <String style={{ marginBottom: 0 }}>{name}</String>
                </View>
            </Row>
            <LooseDivider />
        </View>;
        const renderSelector = (this.state.category === "")? 
        <   View style={{ margin: sizeFactor, alignItems: "center" }}>
                <Image
                    source={require("../assets/categories/themdanhmuccon.png")}
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
                    Chọn danh mục
                </String>
            </View> : <View style={{ margin: sizeFactor, alignItems: "center" }}>
                        <Image
                            source={findIcon(this.state.category.icon)}
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
                            {this.state.category.categoryName}
                        </String>
                    </View>
        return (
            <ScreenView style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}>
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
                        {"Chọn danh mục "}
                    </String>
                    <ScrollView
                        style={{ paddingHorizontal: sizeFactor / 2, marginBottom: sizeFactor }}
                    >
                        <FlatList data={data}
                            renderItem={(item)=>{return (
                            <TouchableOpacity onPress={item.item.onPress}>
                                <Item name={item.item.categoryName} />
                            </TouchableOpacity>
                        )}} />
                    </ScrollView>
                </Overlay>

                <TouchableOpacity onPress={()=>{this.setState({visible: true})}}>
                    {renderSelector}
                </TouchableOpacity>
                <View style={{ alignItems: "center", margin: sizeFactor }}>
                    <HomoTextInput
                        value = {this.state.newSoDu}
                        label="Mức chi tối đa tháng này"
                        placeholder="000,000 VNĐ"
                        leftIcon={{
                            type: "material-community",
                            name: "cash",
                            color: colors.gray,
                        }}
                        onChangeText={(text)=>{this.setState({newSoDu: text})}}
                        keyboardType="number-pad"
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
                    <Button1 onPress={()=>{this.luuNganSach()}}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allCategories: state.allCategories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCategories: (categories) => { dispatch(updateCategories(categories)) }, 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetScreen);