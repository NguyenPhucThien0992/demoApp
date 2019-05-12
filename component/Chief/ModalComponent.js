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
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Button from "react-native-button";
import { Icon } from "native-base";

import SewingMachine from "../../assets/images/sewing_machine.png";

import { ChiefMainMachineDetailedScreen } from "../Screen";

import ChiefMainMachineDetailed from "./ChiefMainMachineDetailed";
import { GetMachineFromServer } from "../../networking/server";
import moment from "moment";

class FlatlistItem extends Component {
  render() {
    timeReport = this.props.item.historyFix;
    length = timeReport.length;
    let i = -1;
    return (
      <View>
        <Text>asda</Text>
      </View>
    );
  }
}

export default class ChiefDeparment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MachineFromServer: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }
  refreshDataFromServer() {
    this.setState({ refreshing: false });
    GetMachineFromServer()
      .then(machines => {
        this.setState({ MachineFromServer: machines, refreshing: false });
      })
      .catch(error => {
        this.setState({ MachineFromServer: [], refreshing: false });
      });
  }

  _onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                paddingLeft: 20,
                maxWidth: 20,
                flex: 1,
                marginRight: 40
              }}
            />

            <Text style={styles.headerText}>Danh sách máy may chuyền 1</Text>
          </View>

          <FlatList
            // data={FetchMachinesData}
            data={this.state.MachineFromServer}
            renderItem={({ item, index }) => {
              return (
                <Button
                  onPress={() => {
                    this.props.navigation.navigate(
                      "ChiefMainMachineDetailedScreen",
                      item
                    );
                  }}
                  style={{ backgroundColor: "#0000ff" }}
                >
                  <FlatlistItem item={item} index={index} />
                </Button>
              );
            }}
            keyExtractor={(item, index) => item.key}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={{ backgroundColor: "#fff", paddingTop: 20 }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  header: {
    justifyContent: "flex-start",
    height: 70,
    flex: 1,
    flexDirection: "row"
  },
  headerText: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold"
  },

  ImageView: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20,
    paddingRight: 10,
    maxWidth: 140
  },
  TextView: {
    flex: 1
  },
  TimeView: {
    flex: 1
  },
  FlatListItemName: {
    fontSize: 20,
    paddingBottom: 3
  }
});
