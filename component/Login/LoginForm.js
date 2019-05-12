import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

import Input from "../../ultils/input";

export default class LoginForm extends Component {
  state = {
    form: {
      email: {
        type: "textinput"
      },
      password: {
        type: "textinput"
      }
    }
  };

  // _Login = () => {
  //   this.props.navigation.navigate("ChiefDeparment");
  // };
  render() {
    return (
      <View style={styles.input}>
        <Input
          placeholder="Nhập tên"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Input
          placeholder="Nhập mật khẩu"
          type={this.state.form.password.type}
          value={this.state.form.email.value}
          autoCapitalize={"none"}
          keyboardType={"default"}
          secureTextEntry
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    minWidth: 200
  },
  LoginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#17B466",
    color: "red",
    alignItems: "center",
    top: 20,
    justifyContent: "center"
  }
});
