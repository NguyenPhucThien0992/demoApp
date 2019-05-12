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
    console.log(`${JSON.stringify(this.props.navigation)}`);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is History</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "coral"
  },
  text: {
    fontSize: 20,
    color: "#ec9b8e"
  }
});
