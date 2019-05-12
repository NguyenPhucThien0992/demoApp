import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class ChiefMachineHistory extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is Machine detaild screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "turquoise"
  },
  text: {
    fontSize: 20,
    color: "#ec9b8e"
  }
});
