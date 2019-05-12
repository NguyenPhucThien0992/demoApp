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
  RefreshControl,
  Modal,
  ActivityIndicator
} from "react-native";
import Button from "react-native-button";
import { Icon } from "native-base";

import SewingMachine from "../../assets/images/sewing_machine.png";
import {
  ChiefMainMachineDetailedScreen,
  ChiefWaitForConfirmScreen
} from "../Screen";

import ChiefMainMachineDetailed from "./ChiefMainMachineDetailed";
import ChiefWaitForConfirm from "./ChiefWaitForConfirm";
import { GetMachineFromServer } from "../../networking/server";
import moment from "moment";
import { YellowBox } from "react-native";

class FlatlistWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machine_raiseIssue: ""
    };
  }

  componentDidMount() {
    const paramFromScreen = this.props.item;

    if (paramFromScreen.request === "1") {
      let tmplatestReportDate = paramFromScreen.historyFix[0];
      let latestReportDate = moment(tmplatestReportDate).format(
        "DD-MM-YYYY, HH:mm:ss"
      );
      this.interval = setInterval(
        () => {
          let currentDateTime = moment().format("DD-MM-YYYY, HH:mm:ss");
          let GapDateTime = moment(currentDateTime, "DD/MM/YYYY HH:mm:ss").diff(
            moment(latestReportDate, "DD/MM/YYYY HH:mm:ss")
          );
          let GapTime = moment
            .utc(moment.duration(GapDateTime).asMilliseconds())
            .format("HH:mm:ss");

          this.setState({
            GapTimeInterval: GapTime
          });
        },

        1000
      );
    }
    if (paramFromScreen.request === "2") {
      let tmpissue_raise_day = paramFromScreen.historyFix[0];
      let issue_raise_day = moment(tmpissue_raise_day).format(
        "DD-MM-YYYY, HH:mm:ss"
      );
      let tmpstart_repair_day = paramFromScreen.timeStartFix[0];
      let start_repair_day = moment(tmpstart_repair_day).format(
        "DD-MM-YYYY, HH:mm:ss"
      );

      let GapDateTimeForFix = moment(
        start_repair_day,
        "DD/MM/YYYY HH:mm:ss"
      ).diff(moment(issue_raise_day, "DD/MM/YYYY HH:mm:ss"));
      let GapTimeForFix = moment
        .utc(moment.duration(GapDateTimeForFix).asMilliseconds())
        .format("HH:mm:ss");

      // phan thoi gian  sua may
      let tmplatestRepairDate = paramFromScreen.timeStartFix[0];
      let latestRepairDate = moment(tmplatestRepairDate).format(
        "DD-MM-YYYY, HH:mm:ss"
      );

      this.intervalFix = setInterval(
        () => {
          let currentDateTime = moment().format("DD-MM-YYYY, HH:mm:ss");
          let GapDateTimeWaitAndFix = moment(
            currentDateTime,
            "DD/MM/YYYY HH:mm:ss"
          ).diff(moment(latestRepairDate, "DD/MM/YYYY HH:mm:ss"));
          let GapTimeWaitAndFix = moment
            .utc(moment.duration(GapDateTimeWaitAndFix).asMilliseconds())
            .format("HH:mm:ss");

          this.setState({
            GapTimeWaitAndFixInterval: GapTimeWaitAndFix
          });
        },

        1000
      );

      this.setState({
        GapTimeIntervalForFix: GapTimeForFix
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalFix);
  }
  render() {
    const request = this.props.item.request;
    let i = -1;

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#FEF5E7"
        }}
      >
        <View
          style={{
            width: "100%",
            borderWidth: 0.5,
            borderColor: "#273746",
            paddingBottom: 8,
            shadowColor: "#000"
          }}
        >
          <Image source={SewingMachine} style={{ width: "100%", height: 90 }} />
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 3
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  fontStyle: "italic",
                  paddingTop: 3
                }}
              >
                {this.props.item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                paddingLeft: 3,
                paddingRight: 2,
                flexWrap: "wrap"
              }}
            >
              <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                <Icon
                  name="navigate"
                  style={{
                    fontSize: 12,
                    color: "#196F3D",
                    marginRight: 5,
                    marginLeft: 3,
                    marginTop: 3
                  }}
                />

                <Text style={{ fontSize: 12, paddingTop: 3 }}>
                  {this.props.item.code}
                </Text>
              </View>
              <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                <Icon
                  name="pin"
                  style={{
                    fontSize: 12,
                    color: "#2874A6",
                    marginRight: 5,
                    marginLeft: 3,
                    marginTop: 3
                  }}
                />
                <Text
                  style={{
                    fontSize: 13
                  }}
                >
                  {this.props.item.location}
                </Text>
              </View>
              <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                <Icon
                  name="barcode"
                  style={{
                    fontSize: 12,
                    color: "#A04000",
                    marginRight: 5,
                    marginLeft: 3,
                    marginTop: 3
                  }}
                />
                <Text
                  style={{
                    color: this.props.item.color,
                    fontWeight: "bold",
                    fontSize: 13
                  }}
                >
                  {this.props.item.status}
                </Text>
              </View>

              {/* {request === "1" ? (
                <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Icon
                      name="time"
                      style={{
                        fontSize: 12,
                        color: "#6008B8",
                        marginRight: 5,
                        marginLeft: 3,
                        marginTop: 3
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13
                      }}
                    >
                      Chờ nhận sửa máy
                    </Text>
                  </View>

                  <View style={{ justifyContent: "flex-end" }}>
                    <Text style={{ justifyContent: "flex-end" }}>
                      {this.state.GapTimeInterval}
                    </Text>
                  </View>
                </View>
              ) : null}
              {request === "2" ? (
                <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Icon
                        name="time"
                        style={{
                          fontSize: 12,
                          color: "#6008B8",
                          marginRight: 5,
                          marginLeft: 3,
                          marginTop: 3
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13
                        }}
                      >
                        Chờ nhận sửa máy
                      </Text>
                    </View>

                    <View style={{ justifyContent: "flex-end" }}>
                      <Text style={{ justifyContent: "flex-end" }}>
                        {this.state.GapTimeIntervalForFix}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Icon
                        name="time"
                        style={{
                          fontSize: 12,
                          color: "#28AB3A",
                          marginRight: 5,
                          marginLeft: 3,
                          marginTop: 3
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 13
                        }}
                      >
                        Thời gian chờ sửa máy
                      </Text>
                    </View>

                    <View style={{ justifyContent: "flex-end" }}>
                      <Text style={{ justifyContent: "flex-end" }}>
                        {this.state.GapTimeWaitAndFixInterval}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null} */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default class ChiefDeparment extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      MachineFromServer: [],
      refreshing: false,
      reportDate: "",
      modalVisible: null,
      start: 0,
      now: 0,
      refresh: false
    };
  }
  fetchData = async () => {
    let response = await fetch("http://192.168.219:106:3000/FetchMachinesData");
    let responseJSON = await response.json();
    this.setState({ MachineFromServer: responseJSON }); // filled data with dynamic array
  };
  _onRefresh() {
    this.setState({ refresh: true });
    this.fetchData().then(() => {
      this.setState({ refresh: false });
    });
  }

  componentDidMount() {
    this.refreshDataFromServer();
    this.fetchData();
  }
  refreshDataFromServer() {
    this.setState({ refreshing: false });
    GetMachineFromServer()
      .then(machines => {
        this.setState({
          MachineFromServer: machines,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({
          MachineFromServer: [],
          refreshing: false
        });
      });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
              return (
                <View
                  style={{
                    width: "50%",
                    paddingLeft: 5,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                >
                  <Button
                    onPress={() => {
                      item.request === "" ||
                      item.request === "1" ||
                      item.request === "2"
                        ? this.props.navigation.navigate(
                            "ChiefMainMachineDetailedScreen",
                            item
                          )
                        : null;

                      item.request === "4" ? this.setModalVisible(true) : null;
                      item.request === "5"
                        ? this.props.navigation.navigate(
                            "ChiefWaitForConfirmScreen",
                            item
                          )
                        : null;
                    }}
                  >
                    <FlatlistWork item={item} index={index} />
                  </Button>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id}
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
