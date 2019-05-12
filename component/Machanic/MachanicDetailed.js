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
  TouchableHighlight,
  TouchableOpacity,
  Modal
} from "react-native";
import Circle from "react-native-circle";
import moment from "moment";
import Button from "react-native-button";
import { Icon } from "native-base";
import SewingMachine from "../../assets/images/sewing_machine.png";
import { Dropdown } from "react-native-material-dropdown";
import { YellowBox } from "react-native";
import { updateMachineData } from "../../networking/server";
import Machanic from "./Machanic";
// import GradientButton from "react-native-gradient-buttons";

function Timer({ interval, style }) {
  const pad = n => (n < 10 ? "0" + n : n); // hien thi giao dien so co 2 chu so
  const duration = moment.duration(interval);
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: "bold", color: "#2874A6", fontSize: 18 }}>
        {pad(duration.hours())}:
      </Text>
      <Text style={{ fontWeight: "bold", color: "#2874A6", fontSize: 18 }}>
        {pad(duration.minutes())}:
      </Text>
      <Text style={{ fontWeight: "bold", color: "#2874A6", fontSize: 18 }}>
        {pad(duration.seconds())}{" "}
      </Text>
    </View>
  );
}

function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableHighlight
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default class MachanicDetailed extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(["Warning: ..."]);

    super(props);
    this.state = {
      modalVisible: null,
      modalEndVisible: null,
      start: 0,
      now: 0,
      laps: [],
      disabledTouch: false,
      disableTouchEnd: false,
      disableTouchChangeMachine: false,
      disableTouchBackgroundChangeMachine: "#F8F9F9",
      disableTouchBackground: "#F8F9F9",
      disableTouchEndBackground: "#F8F9F9",
      disableTouchConfirm: false,
      disableTouchConfirmBackground: "#F8F9F9",
      timeFix: "",
      date_start_repair: "",
      date_end_repair: "",
      errorList: [],
      ChangeMachineVisible: true,
      selectedError: "",
      noteFixMachine: "",
      existStartDay: "",
      existFinishDat: ""
    };
  }

  componentWillMount() {
    let sumary = this.props.navigation.state.params;
    let name_machine = sumary.name;
    name_machine === "Máy 1 kim Juki"
      ? this.setState({
          errorList: [
            {
              value: "Bỏ mũi"
            },
            {
              value: "Đứt chỉ"
            },
            {
              value: "Chỉ xấu"
            },
            {
              value: "Gãy móc"
            },
            {
              value: "Mòn cầu răng đưa"
            }
          ]
        })
      : name_machine === "Máy vắt sổ juki"
      ? this.setState({
          errorList: [
            {
              value: "Đứt chỉ"
            },
            {
              value: "Bỏ mũi"
            },
            {
              value: "Hỏng van từ"
            }
          ]
        })
      : this.setState({
          errorList: [
            {
              value: "Lỗi board"
            },
            {
              value: "Mòn móc"
            },
            {
              value: "Mòn cầu răng cưa"
            }
          ]
        });

    let disable_fix_end = sumary.request;
    sumary.request === "4"
      ? this.setState({
          disabledTouch: true,
          disableTouchEnd: true,
          disableTouchBackground: "#707B7C",
          disableTouchEndBackground: "#707B7C",
          ChangeMachineVisible: false,
          disableTouchChangeMachine: true,
          disableTouchBackgroundChangeMachine: "#707B7C",
          disableTouchConfirm: true,
          disableTouchConfirmBackground: "#707B7C"
        })
      : null;

    // this.setState({
    //   selectedError: this.state.errorList[0].value
    // });
  }
  componentDidMount() {
    this.setState({
      selectedError: this.state.errorList[0].value
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalEndVisible(visible) {
    this.setState({ modalEndVisible: visible });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  startCount = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
      laps: [0]
    });
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime() });
    }, 100);
  };
  render() {
    let paramFromScreen = this.props.navigation.state.params;
    const { now, start, laps } = this.state;
    const timer = now - start;
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{}}>
            <View style={{ alignItems: "center", marginBottom: 30 }}>
              <Image
                source={SewingMachine}
                style={{ width: 100, height: 100, paddingTop: 10 }}
              />
            </View>

            <View
              style={{
                flexWrap: "wrap",
                flex: 1,
                marginLeft: "10%",
                marginRight: "10%"
              }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginLeft: 20
              }}
            >
              {laps.length === 0 && (
                <View style={{ marginBottom: 5 }}>
                  <TouchableOpacity
                    style={{ paddingBottom: 10 }}
                    disabled={this.state.disabledTouch}
                    onPress={() => {
                      const now = new Date().getTime();
                      let day_start_repair = moment().format(
                        "DD-MM-YYYY, H:mm:ss"
                      );
                      this.setState({
                        start: now, // luc bay gio
                        now, // rong
                        laps: [0], // mang gia tri 0
                        date_start_repair: day_start_repair
                      });

                      this.timer = setInterval(() => {
                        this.setState({ now: new Date().getTime() });
                      }, 1000);
                      let date_start_repair = moment(); // Lấy ngày hiên  tại
                      let StartRepairUpdate = [];
                      let TimeStartRepair = paramFromScreen.timeStartFix; // lấy danh sách ngày có sẵn
                      let StartRepairUpdateLast = TimeStartRepair.splice(
                        0,
                        1,
                        date_start_repair
                      );

                      let personinchare = paramFromScreen.person_incharge;
                      let tmppersoninchare = personinchare.splice(
                        0,
                        1,
                        "Mai Văn Vĩnh"
                      );

                      let params = {
                        id: paramFromScreen.id,
                        code: paramFromScreen.code,
                        generation: paramFromScreen.generation,
                        name: paramFromScreen.name,
                        status: "Đang sửa máy",
                        color: "#FF4949",
                        location: paramFromScreen.location,
                        model: paramFromScreen.model,
                        historyFix: paramFromScreen.historyFix,
                        errorMessage: paramFromScreen.errorMessage, // Done
                        timeWaitForInCharge:
                          paramFromScreen.timeWaitForInCharge,
                        timeWaitForFixing: paramFromScreen.timeWaitForFixing, //
                        timeStartFix: TimeStartRepair,
                        timeFinish: paramFromScreen.timeFinish, //Done
                        person_incharge: personinchare,
                        repair_result: paramFromScreen.repair_result,
                        // Done
                        request: "2",
                        priority: paramFromScreen.priority,
                        inputCode: paramFromScreen.inputCode,
                        machine_in_day: paramFromScreen.machine_in_day,
                        note: paramFromScreen.note,
                        rating: paramFromScreen.rating,
                        comment: paramFromScreen.comment
                      };

                      updateMachineData(params)
                        .then(result => {
                          console.log("--> update success");
                        })
                        .catch(error => {
                          console.log("====> update failed");
                          console.log(`${error}`);
                        });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        backgroundColor: this.state.disableTouchBackground,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#AAB7B8"
                      }}
                    >
                      <Text>
                        <Icon
                          name="play"
                          style={{
                            fontSize: 60,
                            color: "#2E86C1"
                          }}
                        />
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        Sửa máy
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {start > 0 && (
                <View style={{ marginBottom: 5 }}>
                  <TouchableOpacity
                    style={{ paddingBottom: 10 }}
                    disabled={this.state.disabledTouch}
                    onPress={() => {
                      clearInterval(this.timer);
                      const { laps, now, start } = this.state;
                      const [firstLap, ...other] = laps;
                      this.setState({
                        laps: [firstLap + now - start, ...other],
                        start: 0,
                        now: 0
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        backgroundColor: this.state.disableTouchBackground,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#AAB7B8"
                      }}
                    >
                      <Text>
                        <Icon
                          name="pause"
                          style={{
                            fontSize: 60,
                            color: "#2E86C1"
                          }}
                        />
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        Tạm ngừng
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {laps.length > 0 && start === 0 && (
                <View style={{ marginBottom: 5 }}>
                  <TouchableOpacity
                    disabled={this.state.disabledTouch}
                    style={{ paddingBottom: 10 }}
                    onPress={() => {
                      const now = new Date().getTime();
                      this.setState({
                        start: now,
                        now
                      });
                      this.timer = setInterval(() => {
                        this.setState({ now: new Date().getTime() });
                      }, 100);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: 120,
                        height: 120,
                        borderRadius: 5,
                        backgroundColor: this.state.disableTouchBackground,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#AAB7B8"
                      }}
                    >
                      <Text>
                        <Icon
                          name="play"
                          style={{
                            fontSize: 60,
                            color: "#2E86C1"
                          }}
                        />
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                        Tiếp tục sửa
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ marginTop: 5 }}>
                <TouchableOpacity
                  disabled={this.state.disableTouchEnd}
                  onPress={() => {
                    this.setModalEndVisible(true);
                    const { laps, now, start } = this.state;
                    const [firstLap, ...other] = laps;
                    this.setState({
                      laps: [firstLap + now - start, ...other]
                      // start: 0,
                      // now: 0
                    });
                    clearInterval(this.timer);
                    let date_end_repair = moment(); // Lấy ngày hiên  tại
                    let EndRepairUpdate = [];
                    let TimeEndRepair = paramFromScreen.timeFinish; //
                    let EndRepairUpdateLast = TimeEndRepair.splice(
                      0,
                      1,
                      date_end_repair
                    );

                    let params = {
                      id: paramFromScreen.id,
                      code: paramFromScreen.code,
                      generation: paramFromScreen.generation,
                      name: paramFromScreen.name,
                      status: paramFromScreen.status,
                      color: paramFromScreen.color,
                      location: paramFromScreen.location,
                      model: paramFromScreen.model,
                      historyFix: paramFromScreen.historyFix,
                      errorMessage: paramFromScreen.errorMessage, // Done
                      timeWaitForInCharge: paramFromScreen.timeWaitForInCharge,
                      timeWaitForFixing: paramFromScreen.timeWaitForFixing, //
                      timeStartFix: paramFromScreen.timeStartFix,
                      timeFinish: TimeEndRepair, //Done
                      person_incharge: paramFromScreen.person_incharge,
                      repair_result: paramFromScreen.repair_result,
                      // Done
                      request: paramFromScreen.request,
                      priority: paramFromScreen.priority,
                      inputCode: paramFromScreen.inputCode,
                      machine_in_day: paramFromScreen.machine_in_day,
                      note: paramFromScreen.note,
                      rating: paramFromScreen.rating,
                      comment: paramFromScreen.comment
                    };
                    MachineId = paramFromScreen.id;
                    // End Params area
                    updateMachineData(params)
                      .then(result => {
                        console.log("--> update success");
                      })
                      .catch(error => {
                        console.log("====> update failed");
                        console.log(`${error}`);
                      });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      backgroundColor: this.state.disableTouchEndBackground,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#AAB7B8"
                    }}
                  >
                    <Text>
                      <Icon
                        name="square"
                        style={{
                          fontSize: 60,
                          color: "#E74C3C"
                        }}
                      />
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      Kết thúc
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: "10%",
                marginRight: "10%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  backgroundColor: "#F8F9F9",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 4,
                  borderColor: "#B2BABB",
                  marginTop: 20
                }}
              >
                <Timer
                  interval={
                    laps.reduce((total, curr) => total + curr, 0) + timer
                  }
                />

                {/* <Text>
                  {laps.reduce((total, curr) => total + curr, 0) + timer}
                </Text> */}
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: 15,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#F8F9F9",
              marginTop: 30,
              paddingLeft: 10,
              paddingRight: 10,
              borderWidth: 1,
              borderColor: "#B2BABB",
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 3
              }}
            >
              <Text style={{ fontSize: 14 }}> Thời gian sửa máy: </Text>
              {paramFromScreen.timeStartFix[0] != "" ? (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {moment(paramFromScreen.timeStartFix[0]).format(
                    "DD-MM-YYYY, H:mm:ss"
                  )}
                </Text>
              ) : (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {this.state.date_start_repair}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 3
              }}
            >
              <Text style={{ fontSize: 14 }}> Thời gian kết thúc: </Text>
              {paramFromScreen.timeFinish[0] != "" ? (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {moment(paramFromScreen.timeFinish[0]).format(
                    "DD-MM-YYYY, H:mm:ss"
                  )}
                </Text>
              ) : (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {this.state.date_end_repair}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: 15,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 30,

              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <Dropdown
              label="Lỗi máy may"
              data={this.state.errorList}
              textColor="#EC7063"
              fontSize={15}
              labelFontSize={20}
              itemColor="#52BE80"
              selectedItemColor="#E74C3C"
              value={this.state.errorList[0].value}
              onChangeText={valueSelected => {
                this.state.selectedError = valueSelected;
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 15,
              marginRight: 15,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 30,

              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 3
              }}
            >
              <Text style={{ fontSize: 14 }}> Chú thích : </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 3
              }}
            >
              <TextInput
                style={{
                  height: 100,
                  width: "100%",
                  borderColor: "#B2BABB",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 10
                }}
                onChangeText={noteFixMachine =>
                  this.setState({ noteFixMachine })
                }
                value={this.state.noteFixMachine}
                editable={true}
                maxLength={40}
                multiline={true}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: "10%",
              marginRight: "10%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
              paddingLeft: "5%"
            }}
          >
            <TouchableHighlight
              disabled={this.state.disableTouchChangeMachine}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 100,
                  height: 70,
                  borderRadius: 8,
                  backgroundColor: this.state
                    .disableTouchBackgroundChangeMachine,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#E74C3C"
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                    color: "#E74C3C"
                  }}
                >
                  Thay máy
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableOpacity
              disabled={this.state.disableTouchConfirm}
              onPress={() => {
                let paramFromScreen = this.props.navigation.state.params;

                let tmpErrorMessage = paramFromScreen.errorMessage;
                let tmpErrorMessage3 = tmpErrorMessage.splice(
                  0,
                  1,
                  this.state.selectedError
                );
                // End get error

                // get start fix date

                let tmpStartFixDate = paramFromScreen.timeStartFix;
                let tmpStartFixDate2 = tmpStartFixDate.splice(
                  0,
                  1,
                  this.state.date_start_repair
                );

                let tmpFinishDate = paramFromScreen.timeFinish;
                let tmpFinishDate2 = tmpFinishDate.splice(
                  0,
                  1,
                  this.state.date_end_repair
                );

                let tmpNote = paramFromScreen.note;
                let tmpNote2 = tmpNote.splice(0, 1, this.state.noteFixMachine);

                let tmpperson = paramFromScreen.person_incharge;
                let tmpperson2 = tmpperson.splice(0, 1, "Mai Văn Vĩnh");

                let tmprepairResult = paramFromScreen.repair_result;
                let tmprepairResult2 = tmprepairResult.splice(
                  0,
                  1,
                  "Sửa thành công"
                );

                let params = {
                  id: paramFromScreen.id,
                  code: paramFromScreen.code,
                  generation: paramFromScreen.generation,
                  name: paramFromScreen.name,
                  status: "Chờ xác nhận",
                  color: "#0941F1",
                  location: paramFromScreen.location,
                  model: paramFromScreen.model,
                  historyFix: paramFromScreen.historyFix,
                  errorMessage: tmpErrorMessage, // Done
                  timeWaitForInCharge: paramFromScreen.timeWaitForInCharge,
                  timeWaitForFixing: paramFromScreen.timeWaitForFixing, //
                  timeStartFix: tmpStartFixDate,
                  timeFinish: tmpFinishDate, //Done
                  person_incharge: tmpperson, // Done
                  repair_result: tmprepairResult,
                  request: "5",
                  priority: paramFromScreen.priority,
                  inputCode: paramFromScreen.inputCode,
                  machine_in_day: paramFromScreen.machine_in_day,
                  note: tmpNote,
                  rating: paramFromScreen.rating,
                  comment: paramFromScreen.comment
                };
                MachineId = paramFromScreen.id;
                // End Params area
                updateMachineData(params)
                  .then(result => {
                    console.log("--> update success");
                  })
                  .catch(error => {
                    console.log("====> update failed");
                    console.log(`${error}`);
                  });
                this.props.navigation.navigate("MechanicScreen");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 100,
                  height: 70,
                  borderRadius: 8,
                  backgroundColor: this.state.disableTouchConfirmBackground,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#229954"
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                    color: "#229954"
                  }}
                >
                  Xác nhận
                </Text>
              </View>
            </TouchableOpacity>
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
                  alignItems: "center",
                  backgroundColor: "#F2F3F4",
                  // justifyContent: "center",
                  flexDirection: "column",
                  height: 170,
                  width: "90%",
                  marginLeft: "4%",
                  marginRight: "4%",
                  marginTop: "40%",
                  opacity: 1,
                  borderRadius: 20
                }}
              >
                <View>
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
                    Xác nhận thay máy
                  </Text>
                </View>
                <View
                  style={{
                    height: 70
                  }}
                />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
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
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Huỷ yêu cầu
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      let paramFromScreen = this.props.navigation.state.params;
                      let params = {
                        id: paramFromScreen.id,
                        code: paramFromScreen.code,
                        generation: paramFromScreen.generation,
                        name: paramFromScreen.name,
                        status: "Chờ thay máy",
                        color: "#7D3C98",
                        location: paramFromScreen.location,
                        model: paramFromScreen.model,
                        historyFix: paramFromScreen.historyFix,
                        errorMessage: paramFromScreen.errorMessage,
                        timeWaitForInCharge:
                          paramFromScreen.timeWaitForInCharge,
                        timeWaitForFixing: paramFromScreen.timeWaitForFixing,
                        timeStartFix: paramFromScreen.timeStartFix,
                        timeFinish: paramFromScreen.timeFinish,
                        person_incharge: paramFromScreen.person_incharge,
                        repair_result: paramFromScreen.repair_result,
                        request: "4",
                        priority: paramFromScreen.priority,
                        inputCode: paramFromScreen.inputCode,
                        machine_in_day: paramFromScreen.machine_in_day,
                        note: paramFromScreen.note,
                        rating: paramFromScreen.rating,
                        comment: paramFromScreen.comment
                      };
                      MachineId = paramFromScreen.id;
                      // End Params area
                      updateMachineData(params)
                        .then(result => {
                          console.log("--> update success");
                        })
                        .catch(error => {
                          console.log("====> update failed");
                          console.log(`${error}`);
                        });
                      this.props.navigation.navigate("MechanicScreen");
                    }}
                    style={{
                      backgroundColor: "#229954",
                      marginRight: 15,
                      width: 130,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Thay máy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalEndVisible}
            position="center"
            backdrop={true}
          >
            <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "#F2F3F4",
                  // justifyContent: "center",
                  flexDirection: "column",
                  height: 170,
                  width: "90%",
                  marginLeft: "4%",
                  marginRight: "4%",
                  marginTop: "40%",
                  opacity: 1,
                  borderRadius: 20
                }}
              >
                <View>
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
                    Xác nhận kết thúc
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: "#BFC9CA",
                    width: "90%",
                    height: 70
                  }}
                />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalEndVisible(!this.state.modalEndVisible);
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
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Không
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalEndVisible(!this.state.modalEndVisible);
                      clearInterval(this.timer);
                      const { laps, now, start } = this.state;
                      const [firstLap, ...other] = laps;
                      let day_end_repair = moment().format(
                        "DD-MM-YYYY, H:mm:ss"
                      );
                      this.setState({
                        laps: [firstLap + now - start, ...other],
                        start: 0,
                        now: 0,
                        disabledTouch: true,
                        disableTouchBackground: "#707B7C",
                        date_end_repair: day_end_repair
                      });
                    }}
                    style={{
                      backgroundColor: "#229954",
                      marginRight: 15,
                      width: 130,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Có
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
