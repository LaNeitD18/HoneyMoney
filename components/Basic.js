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
} from "react-native";
import { Icon, withTheme } from "react-native-elements";

//UNIVERSAL SIZE UNIT
export const sizeFactor = 16;

export const colors = {
  //UI
  yellow: "#feca57",
  green: "#1dd1a1",
  red: "#ff6b6b",
  background: "#e6e6e6",
  darkYellow: "#ff9f43",
  darkGreen: "#10ac84",
  darkRed: "#ee5253",
  darkBackground: "#8395a7",
  //CUSTOM
  pink: "#ff9ff3",
  cyan: "#48dbfb",
  aqua: "#00d2d3",
  blue: "#54a0ff",
  purple: "#5f27cd",
  gray: "#576574",
  darkPink: "#f368e0",
  darkCyan: "#0abde3",
  darkAqua: "#01a3a4",
  darkBlue: "#2e86de",
  darkPurple: "#341f97",
  darkGray: "#222f3e",
};

export const styles = StyleSheet.create({
  text: {
    fontSize: sizeFactor,
    marginBottom: sizeFactor * 0.75,
  },
  number: {
    fontWeight: "bold",
    color: colors.darkGreen,
  },
  negativeNumber: {
    fontWeight: "bold",
    color: colors.darkRed,
  },
  title: {
    fontSize: sizeFactor * 1.5,
    fontWeight: "bold",
    marginBottom: sizeFactor * 0.75,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 100,
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
    marginHorizontal: sizeFactor * 3,
    backgroundColor: colors.darkBackground,
    marginBottom: sizeFactor * 0.75,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export class String extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
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
      <Text style={[styles.title, this.props.style]}>
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
          <Heading style={{ color: this.props.headingColor }}>
            {this.props.heading}
          </Heading>
          <TouchableOpacity>
            <Icon
              name={this.props.icon}
              type="material-community"
              color={this.props.iconColor}
              size={sizeFactor * 1.75}
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
      <SafeAreaView style={styles.background}>
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

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          borderWidth: 1,
          backgroundColor: "white",
          paddingHorizontal: sizeFactor,
          borderColor: "white",
          borderRadius: sizeFactor,
          borderStyle: "dashed",
          paddingTop: sizeFactor * 0.75,
          flexDirection: "row",
          marginVertical: sizeFactor,
        }}
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
          borderWidth: 1,
          paddingHorizontal: sizeFactor,
          borderColor: "white",
          borderRadius: sizeFactor,
          borderStyle: checked == "true" ? "dashed" : "solid",
          paddingTop: sizeFactor * 0.75,
          flexDirection: "row",
          marginVertical: sizeFactor,
        }}
      >
        <Icon
          name={
            checked == "true" ? this.props.uncheckIcon : this.props.checkIcon
          }
          type="material-community"
          color="white"
          size={sizeFactor * 1.25}
        />
        <String
          style={{
            color: "white",
            fontWeight: checked == "true" ? "normal" : "bold",
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
        <Row>
          <OutlineToggleButton
            checked={this.props.isDefault}
            checkIcon="check-circle-outline"
          >
            Ví mặc định
          </OutlineToggleButton>
          <Button color={this.props.color}>Sử dụng</Button>
        </Row>
      </Card>
    );
  }
}
