import React, { Component } from "react";
import FlatlistWork from "./FlatListWork";
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
  RefreshControl,
  Modal,
  ActivityIndicator
} from "react-native";
import Button from "react-native-button";

import {
  ChiefMainMachineDetailedScreen,
  ChiefWaitForConfirmScreen
} from "../Screen";

import ChiefMainMachineDetailed from "./ChiefMainMachineDetailed";
import ChiefWaitForConfirm from "./ChiefWaitForConfirm";
import { getAllMachines } from "../../networking/server";

export default class ChiefDeparment extends Component {
  constructor(props) {
    super(props);
    // console.disableYellowBox = true;
    this.state = {
      MachineFromServer: [],
      refreshing: false,
      reportDate: "",
      modalVisible: null,
      start: 0,
      now: 0,
      refresh: false,
      backgroundColorChange: "#A7FCD2",
      colorChange: "#05723C"
    };
  }

  _onRefresh() {
    this.setState({
      refresh: true,
      backgroundColorChange: "#e5b616"
    });

    this.refreshDataFromServer();
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    this.refreshDataFromServer();
  }
  refreshDataFromServer() {
    this.setState({ refresh: true });
    getAllMachines()
      .then(machines => {
        this.setState({
          MachineFromServer: machines.filter(
            item => item.location === "Chuyền 1"
          ),
          refresh: false
        });
      })
      .catch(error => {
        this.setState({
          MachineFromServer: []
        });
      });
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Danh sách máy chuyền 1</Text>
          </View>

          <FlatList
            data={this.state.MachineFromServer}
            numColumns={2}
            renderItem={({ item, index }) => {
              const itemData = { ...item };

              return (
                <View
                  style={{
                    width: "50%",
                    paddingLeft: 5,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  key={index}
                >
                  <Button
                    onPress={() => {
                      itemData.request === "" ||
                      itemData.request === "1" ||
                      itemData.request === "2"
                        ? this.props.navigation.navigate(
                            "ChiefMainMachineDetailedScreen",
                            item
                          )
                        : null;

                      itemData.request === "4"
                        ? this.setModalVisible(true)
                        : null;
                      itemData.request === "5"
                        ? this.props.navigation.navigate(
                            "ChiefWaitForConfirmScreen",
                            item
                          )
                        : null;
                    }}
                  >
                    <FlatlistWork
                      item={item}
                      index={index}
                      backgroundPrivate={this.state.backgroundColorChange}
                    />
                  </Button>
                </View>
              );
            }}
            // keyExtractor={(item, index) => item.id}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          position="center"
          backdrop={true}
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
            <View
              style={{
                // alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#F2F3F4",
                // justifyContent: "center",
                flexDirection: "column",
                height: 230,
                width: "90%",
                marginLeft: "4%",
                marginRight: "4%",
                marginTop: "40%",
                opacity: 1,
                borderRadius: 20
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#2C3E50",
                    alignItems: "center",
                    // flex: 1,
                    justifyContent: "center",
                    fontSize: 25,
                    marginTop: 20,
                    // height: 30,
                    paddingBottom: 10
                  }}
                >
                  Thông báo thay máy
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  paddingLeft: 15,
                  justifyContent: "flex-start"
                }}
              >
                <Text style={{ fontSize: 17 }}>Nhân viên phụ trách: </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Mai Văn Vĩnh
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  paddingLeft: 15,
                  justifyContent: "flex-start"
                }}
              >
                <Text style={{ fontSize: 17 }}>Máy dự kiến thay: </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Máy cắt chỉ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  paddingLeft: 15,
                  justifyContent: "flex-start"
                }}
              >
                <Text style={{ fontSize: 17 }}>Mã máy: </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  MXP-5820
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={{
                    backgroundColor: "#E74C3C",
                    marginRight: 15,
                    width: 130,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    // fontFamily: "Copse-Regular"
  },
  FlatListItemName: {
    fontSize: 20,
    paddingBottom: 3
  }
});
