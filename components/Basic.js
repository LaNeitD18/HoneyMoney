import React, { Component } from "react";
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
} from "react-native";
import { Icon, SearchBar, ButtonGroup } from "react-native-elements";
import TextTicker from "react-native-text-ticker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//UNIVERSAL SIZE UNIT
export const sizeFactor = 16;

export const colors = {
  red: "#ff3b30",
  orange: "#ff9500",
  yellow: "#ffcc00",
  green: "#34c759",
  blue: "#007aff",
  indigo: "#5856d6",
  purple: "#af52de",
  pink: "#ff2d55",
  gray: "#8e8e93",
  gray3: "#c7c7cc",
  gray5: "#e5e5ea",
  gray6: "#f2f2f7",
  dark: "#48484a",
  white: "#ffffff",
  black: "#000000",
};

export const styles = StyleSheet.create({
  text: {
    fontSize: sizeFactor,
    marginBottom: sizeFactor * 0.75,
  },
  number: {
    fontWeight: "bold",
    color: colors.green,
  },
  negativeNumber: {
    fontWeight: "bold",
    color: colors.red,
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    marginHorizontal: sizeFactor,
    marginBottom: sizeFactor * 0.75,
    paddingTop: sizeFactor,
    paddingBottom: sizeFactor * 0.25,
    paddingHorizontal: sizeFactor,
    borderRadius: sizeFactor,
  },
  divider: {
    height: 1,
    marginBottom: sizeFactor * 0.5,
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
    width: (windowWidth - 8 * sizeFactor) / 4,
    height: (windowWidth - 8 * sizeFactor) / 4,
  },
});

export class String extends Component {
  render() {
    return (
      <TextTicker
        duration={5000}
        loop
        bounce
        repeatSpacer={5}
        style={[styles.text, this.props.style]}
      >
        {this.props.children}
      </TextTicker>
    );
  }
}

export class Title extends Component {
  render() {
    return (
      <Text style={[styles.title, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export class Number extends Component {
  render() {
    return (
      <String style={[styles.number, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class NegativeNumber extends Component {
  render() {
    return (
      <String style={[styles.negativeNumber, this.props.style]}>
        -{this.props.children}
      </String>
    );
  }
}

export class Heading extends Component {
  render() {
    return (
      <Text style={[styles.heading, this.props.style]}>
        {this.props.children}
      </Text>
    );
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
          <TouchableOpacity>
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

export class ScreenView extends Component {
  render() {
    return (
      <SafeAreaView style={[styles.background, this.props.style]}>
        <ScrollView>{this.props.children}</ScrollView>
      </SafeAreaView>
    );
  }
}

export class Divider extends Component {
  render() {
    return <View style={styles.divider} />;
  }
}

export class Row extends Component {
  render() {
    return (
      <View style={[styles.row, this.props.style]}>{this.props.children}</View>
    );
  }
}

export class RowLeft extends Component {
  render() {
    return (
      <View style={[styles.rowLeft, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          {
            justifyContent: "center",
            borderWidth: 1,
            backgroundColor: this.props.background,
            paddingHorizontal: sizeFactor,
            borderColor: this.props.background,
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

export class OutlineToggleButton extends Component {
  render() {
    //change this to state instead
    const checked = this.props.checked;
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          borderWidth: 1.5,
          paddingHorizontal: sizeFactor,
          borderColor: this.props.color,
          borderRadius: 9999,
          borderStyle: checked == "false" ? "dashed" : "solid",
          paddingTop: sizeFactor * 0.75,
          flexDirection: "row",
          marginBottom: sizeFactor,
        }}
      >
        <Icon
          name={
            checked == "false" ? this.props.uncheckIcon : this.props.checkIcon
          }
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
      >
        <Row>
          <String style={{ color: "white", fontSize: sizeFactor * 2 }}>
            VNĐ
          </String>
          <Number style={{ color: "white", fontSize: sizeFactor * 2 }}>
            {this.props.children}
          </Number>
        </Row>
        <Row>
          <String style={{ color: "white" }}>Ngày tạo</String>
          <String style={{ color: "white", fontWeight: "bold" }}>
            {this.props.date}
          </String>
        </Row>
        <Divider />
        <Row>
          <OutlineToggleButton
            checked={this.props.isDefault}
            checkIcon="check-circle-outline"
            color="white"
          >
            Ví mặc định
          </OutlineToggleButton>
          <Button color={this.props.color} background="white">
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
        <TouchableOpacity>
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

export class KindSelect extends Component {
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

export class Category extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={{ marginHorizontal: sizeFactor }}>
          <Image
            source={this.props.source}
            style={styles.largeCategory}
          ></Image>
          <View
            style={{ width: styles.largeCategory.width, alignItems: "center" }}
          >
            <String style={{ fontSize: sizeFactor * 0.75 }}>
              {this.props.children}
            </String>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class CategoryTable extends Component {
  render() {
    return (
      <View>
        <RowLeft>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
        </RowLeft>
        <RowLeft>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
        </RowLeft>
        <RowLeft>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
          <Category source={require("../assets/categories/tuthien.png")}>
            Từ thiện
          </Category>
        </RowLeft>
        <TouchableText>Tạo danh mục mới</TouchableText>
      </View>
    );
  }
}

export class LargeScrollSelect extends Component {
  render() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện
        </Category>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện
        </Category>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện
        </Category>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện nhiều lên nhé bạn tôi ơi
        </Category>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện
        </Category>
        <Category source={require("../assets/categories/tuthien.png")}>
          Từ thiện
        </Category>
      </ScrollView>
    );
  }
}
