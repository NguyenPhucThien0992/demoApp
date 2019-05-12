/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import Input from "../../ultils/input";
import Button from "react-native-button";
import Factory from "../../assets/images/factory.png";
import Factory2 from "../../assets/images/factory2.png";
import LoginForm from "./LoginForm";

import {
  ChiefDeparmentScreen,
  MechanicScreen,
  MainTeamleaderScreen
} from "../Screen";

import ChiefDeparment from "../Chief/ChiefDeparment";
import Mechanic from "../Machanic/Machanic";
import MainTeamleader from "../TeamLeader/MainTeamleader";
export default class MainLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailContent: "",
      passwordContent: "",
      form: {
        email: {
          type: "textinput",
          content: ""
        },
        password: {
          type: "textinput",
          content: ""
        }
      }
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, flexDirection: "column" }}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.loginHeader}>Quản lý hệ thống máy may</Text>
          </View>

          <View style={styles.Image}>
            <Image
              source={Factory2}
              styles={styles.ImageLogin}
              resizeMode="contain"
            />
          </View>

          <View style={styles.LoginForm}>
            <View style={styles.input}>
              <Input
                placeholder="Nhập tên"
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={text => {
                  this.setState(() => {
                    return {
                      emailContent: text
                    };
                  });
                }}
              />

              <Input
                placeholder="Nhập mật khẩu"
                type={this.state.form.password.type}
                value={this.state.form.email.value}
                autoCapitalize={"none"}
                keyboardType={"default"}
                secureTextEntry
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={text => {
                  this.setState(() => {
                    return {
                      passwordContent: text
                    };
                  });
                }}
              />
            </View>
            <Button
              style={{ fontSize: 15, color: "white" }}
              containerStyle={{
                padding: 10,
                margin: 5,
                borderRadius: 10,
                backgroundColor: "darkviolet"
              }}
              onPress={() => {
                email = this.state.emailContent;
                password = this.state.passwordContent;
                if (
                  email != null &&
                  email === "1" &&
                  password != null &&
                  password === "1"
                ) {
                  this.props.navigation.navigate("ChiefDeparmentScreen");
                } else if (
                  email != null &&
                  email === "2" &&
                  password != null &&
                  password === "1"
                ) {
                  this.props.navigation.navigate("MechanicScreen");
                } else if (
                  email != null &&
                  email === "3" &&
                  password != null &&
                  password === "1"
                ) {
                  this.props.navigation.navigate("MainTeamleaderScreen");
                }
              }}
            >
              Đăng nhập
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  loginHeader: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center"
  },
  Image: {
    marginBottom: 30,
    top: 20,
    maxHeight: 100,
    maxWidth: 100
  },
  ImageLogin: {
    width: 100,
    height: 100
  },
  LoginForm: {
    // flex: 1,
    width: "80%",
    flexDirection: "column"
  },
  input: {
    paddingBottom: 30
  }
});
