import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TextInput
} from "react-native";

const input = props => {
  let template = null;
  switch (props.type) {
    case "textinput":
      template = (
        <TextInput
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.Input, props.overrideStyle]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#eaeaea",
    fontSize: 18,
    padding: 5,
    marginTop: 10
  }
});
export default input;
