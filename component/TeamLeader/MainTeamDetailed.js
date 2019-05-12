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
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import moment, { isMoment } from "moment";
import { Icon } from "native-base";
import { Dropdown } from "react-native-material-dropdown";
import SewingMachine from "../../assets/images/sewing_machine.png";
import { HistoryStatScreen } from "../Screen";
import HistoryStat from "../Chief/HistoryStat";

export default class MainTeamDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: null,
      seconds: 5,
      tmp: "",
      selectedPrority: "Mai Văn Vĩnh",
      selectedOption: null,
      priority: [
        {
          value: "Mai Văn Vĩnh"
        },
        {
          value: "Nguyễn Văn Đông"
        },
        {
          value: "Trần Bình Trọng"
        }
      ],
      disabledTouchableHightLight: false,
      opacityTouchableHightLight: 1,
      textTouchableHighLight: "Chọn nhân viên sửa máy",
      colorTouchableHightLight: "#CB4335",
      borderColorTouchableHightLight: "#A93226",
      machine_timelife: null,
      day_issue: null,
      month_issue: null,
      year_issue: null,
      hour_issue: null,
      minute_issue: null,
      second_issue: null,
      full_day_issue: null,
      day_issue_enable: 0
    };
  }

  componentDidMount() {
    const paramFromScreen = this.props.navigation.state.params;

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
    // clearInterval(this.intervalFix);
  }

  componentWillMount() {
    let paramFromScreen = this.props.navigation.state.params;
    const machine_dateIn = moment(paramFromScreen.machine_in_day);

    let machine_usedToNow = moment();
    let machine_TotalTime = machine_usedToNow.diff(machine_dateIn, "days");
    let machine_WorkingTime = machine_TotalTime * 8;
    this.setState({
      machine_timelife: machine_WorkingTime
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    let paramFromScreen = this.props.navigation.state.params;
    timeReport = paramFromScreen.historyFix;
    length = timeReport.length;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#fff",
              marginLeft: "2%",
              marginRight: "2%",
              flexDirection: "column",
              paddingTop: 10,
              paddingBottom: 20,
              borderWidth: 1,
              borderRadius: 20,
              marginTop: 13,
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 8,
              shadowOffset: {
                width: 0,
                height: 9
              },
              shadowOpacity: 0.48,
              shadowRadius: 6,
              elevation: 18
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={SewingMachine}
                style={{
                  width: 120,
                  height: 120,
                  justifyContent: "center"
                }}
              />
            </View>

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon
                  name="checkmark-circle"
                  style={{ fontSize: 25, color: "#82E0AA" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Mã Tài Sản:</Text>
              <Text style={styles.info}> {paramFromScreen.code}</Text>
            </View>

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon name="pie" style={{ fontSize: 25, color: "#F1C40F" }} />
              </Text>
              <Text style={styles.TextTitle}>Tên Máy:</Text>
              <Text style={styles.info}> {paramFromScreen.name}</Text>
            </View>
            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon
                  name="aperture"
                  style={{ fontSize: 25, color: "#2E86C1" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Đời Máy:</Text>
              <Text style={styles.info}> {paramFromScreen.model}</Text>
            </View>

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon name="pin" style={{ fontSize: 25, color: "#8E44AD" }} />
              </Text>
              <Text style={styles.TextTitle}>Vị Trí Hiện Tại Của Máy:</Text>
              <Text style={styles.info}> {paramFromScreen.location}</Text>
            </View>

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon name="call" style={{ fontSize: 25, color: "#EC7063" }} />
              </Text>
              <Text style={styles.TextTitle}>Lần Bảo Dưỡng Gần Nhất:</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12.5,
                  flexWrap: "wrap",
                  paddingTop: 5
                }}
              >
                {paramFromScreen.historyFix[0] != null ? (
                  <Text style={styles.info}>
                    {moment(paramFromScreen.historyFix[0]).format(
                      "DD-MM-YYYY, k:mm:ss"
                    )}
                    {/* {paramFromScreen.historyFix[length - 1]} */}
                  </Text>
                ) : (
                  <Text style={styles.info}>Không có</Text>
                )}
              </Text>
            </View>

            {paramFromScreen.request === "1" ? (
              <View
                style={{
                  alignItems: "flex-start",
                  marginLeft: "2%",
                  flexDirection: "row",
                  paddingTop: 10,
                  flexWrap: "wrap"
                }}
              >
                <Text>
                  <Icon
                    name="timer"
                    style={{ fontSize: 25, color: "#9013B0" }}
                  />
                </Text>
                <Text style={styles.TextTitle}>Thời gian chờ nhận máy :</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    flexWrap: "wrap",
                    paddingTop: 5,
                    color: "#D4A51C"
                  }}
                >
                  {paramFromScreen.historyFix[0] != null ? (
                    <Text style={styles.info}>
                      {this.state.GapTimeInterval}
                    </Text>
                  ) : (
                    <Text style={styles.info}>Không có</Text>
                  )}
                </Text>
              </View>
            ) : null}

            {paramFromScreen.request === "2" ? (
              <View>
                <View
                  style={{
                    alignItems: "flex-start",
                    marginLeft: "2%",
                    flexDirection: "row",
                    paddingTop: 10,
                    flexWrap: "wrap"
                  }}
                >
                  <Text>
                    <Icon
                      name="timer"
                      style={{ fontSize: 25, color: "#9013B0" }}
                    />
                  </Text>
                  <Text style={styles.TextTitle}>Thời gian chờ nhận máy:</Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 12.5,
                      flexWrap: "wrap",
                      paddingTop: 5
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        flexWrap: "wrap",
                        paddingTop: 5,
                        color: "#D4A51C"
                      }}
                    >
                      {this.state.GapTimeIntervalForFix}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-start",
                    marginLeft: "2%",
                    flexDirection: "row",
                    paddingTop: 10,
                    flexWrap: "wrap"
                  }}
                >
                  <Text>
                    <Icon
                      name="timer"
                      style={{ fontSize: 25, color: "#1C9CD4" }}
                    />
                  </Text>
                  <Text style={styles.TextTitle}>Thời gian chờ sửa máy:</Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 12.5,
                      flexWrap: "wrap",
                      paddingTop: 5
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        flexWrap: "wrap",
                        paddingTop: 5,
                        color: "#F10A6C"
                      }}
                    >
                      {this.state.GapTimeWaitAndFixInterval}
                    </Text>
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon name="pulse" style={{ fontSize: 25, color: "#273746" }} />
              </Text>
              <Text style={styles.TextTitle}>Tình trạng:</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  flexWrap: "wrap",
                  paddingTop: 5,
                  color: paramFromScreen.color
                }}
              >
                {paramFromScreen.status}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "row",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <Text>
                <Icon name="time" style={{ fontSize: 25, color: "#E74C3C" }} />
              </Text>
              <Text style={styles.TextTitle}>Thời gian sử dụng máy:</Text>
              <Text style={styles.info}>
                {this.state.machine_timelife
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                giờ
              </Text>
            </View>
          </View>
          {paramFromScreen.request === "2" ||
          paramFromScreen.request === "1" ? (
            <View
              style={{
                paddingTop: 20,
                flexDirection: "column"
              }}
            >
              <TouchableHighlight
                style={{
                  marginBottom: 20,
                  marginLeft: "10%",
                  marginRight: "10%",
                  height: 50,
                  width: 300,
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: this.state.borderColorTouchableHightLight,
                  borderRadius: 25,
                  backgroundColor: this.state.colorTouchableHightLight,
                  opacity: this.state.opacityTouchableHightLight
                }}
                underlayColor="#17A589"
                onPress={() => {
                  this.setModalVisible(true);
                }}
                disabled={this.state.disabledTouchableHightLight}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    {this.state.textTouchableHighLight}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          ) : null}

          <View
            style={{
              paddingTop: 20,
              flexDirection: "column"
            }}
          >
            <TouchableHighlight
              style={{
                marginBottom: 20,
                marginLeft: "10%",
                marginRight: "10%",
                height: 50,
                width: 300,
                justifyContent: "center",
                borderWidth: 2,
                borderRadius: 25,
                backgroundColor: "#067D42",
                opacity: this.state.opacityTouchableHightLight
              }}
              underlayColor="#17A589"
              onPress={() => {
                this.props.navigation.navigate(
                  "HistoryStatScreen",
                  paramFromScreen
                );
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  Lịch sử sửa máy
                </Text>
              </View>
            </TouchableHighlight>
          </View>
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
                height: 230,
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
                  Chọn nhân viên sửa máy
                </Text>
              </View>
              <View
                style={{
                  // backgroundColor: "#BFC9CA",
                  width: "90%",
                  borderRadius: 10
                }}
              >
                <Dropdown
                  label="Nhân viên sửa máy"
                  data={this.state.priority}
                  textColor="#EC7063"
                  fontSize={15}
                  labelFontSize={20}
                  itemColor="#52BE80"
                  selectedItemColor="#E74C3C"
                  value={this.state.priority[0].value}
                  onChangeText={valueSelected => {
                    this.state.selectedPrority = valueSelected;
                  }}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableHighlight
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
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={{
                    backgroundColor: "#239B56",
                    marginLeft: 15,
                    width: 130,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    Gửi yêu cầu
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          position="center"
          backdrop={true}
        >
          {paramFromScreen.request === "" ? (
            <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
              <View
                style={{
                  alignItems: "center",
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
                    Xác nhận báo hỏng
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: "#BFC9CA",
                    width: "90%",
                    borderRadius: 10
                  }}
                >
                  <Dropdown
                    label="Danh sách nhân viên sửa máy"
                    data={this.state.priority}
                    textColor="#EC7063"
                    fontSize={15}
                    labelFontSize={20}
                    itemColor="#52BE80"
                    selectedItemColor="#E74C3C"
                    value={this.state.priority[0].value}
                    onChangeText={valueSelected => {
                      this.state.selectedPrority = valueSelected;
                    }}
                  />
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableHighlight
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
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={{
                      backgroundColor: "#239B56",
                      marginLeft: 15,
                      width: 130,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Gửi yêu cầu
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "#F2F3F4",
                  // justifyContent: "center",
                  flexDirection: "column",
                  height: 180,
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
                    Xác nhận huỷ bỏ báo hỏng
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableHighlight
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
                      Không
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      let tmp_hixtoryFix = paramFromScreen.historyFix;
                      tmp_hixtoryFix = tmp_hixtoryFix.splice(0, 0, "");

                      let errorSub = paramFromScreen.errorMessage.splice(
                        0,
                        0,
                        ""
                      );
                      let timeInChargeSub = paramFromScreen.timeWaitForInCharge.splice(
                        0,
                        0,
                        ""
                      );
                      let timeForFixSub = paramFromScreen.timeWaitForFixing.splice(
                        0,
                        0,
                        ""
                      );
                      let timeStarFixsub = paramFromScreen.timeStartFix.splice(
                        0,
                        0,
                        ""
                      );
                      let timeFinishSub = paramFromScreen.timeFinish.splice(
                        0,
                        0,
                        ""
                      );
                      let personSub = paramFromScreen.person_incharge.splice(
                        0,
                        0,
                        ""
                      );
                      let noteSub = paramFromScreen.note.splice(0, 0, "");
                      let ratingSub = paramFromScreen.rating.splice(0, 0, "");
                      let commentSub = paramFromScreen.comment.splice(0, 0, "");

                      let repairResultSub = paramFromScreen.repair_result.splice(
                        0,
                        0,
                        ""
                      );

                      let params = {
                        id: paramFromScreen.id,
                        code: paramFromScreen.code,
                        generation: paramFromScreen.generation,
                        name: paramFromScreen.name,
                        status: "Hoạt động tốt",
                        color: "#27AE60",
                        location: paramFromScreen.location,
                        model: paramFromScreen.model,
                        historyFix: tmp_hixtoryFix,
                        errorMessage: errorSub,
                        timeWaitForInCharge: timeInChargeSub,
                        timeWaitForFixing: timeForFixSub,
                        timeStartFix: timeStarFixsub,
                        timeFinish: timeFinishSub,
                        person_incharge: personSub,
                        repair_result: repairResultSub,
                        request: "",
                        priority: "",
                        inputCode: paramFromScreen.inputCode,
                        machine_in_day: paramFromScreen.machine_in_day,
                        note: noteSub,
                        rating: ratingSub,
                        comment: commentSub
                      };
                      MachineId = paramFromScreen.id;
                      // End Params area
                      UpdateMachineToServer(params, MachineId)
                        .then(result => {
                          if (result === "ok") {
                          }
                        })
                        .catch(error => {
                          console.log(`${error}`);
                        });
                      this.props.navigation.navigate("HistoryStatScreen");
                    }}
                    style={{
                      backgroundColor: "#239B56",
                      marginLeft: 15,
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
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        </Modal> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: "3%",
    // marginRight: "3%",
    backgroundColor: "#F2F4F4"
    // marginTop: "5%"
  },
  info: {
    fontWeight: "bold",
    fontSize: 15,
    flexWrap: "wrap",
    paddingTop: 5
  },
  TextTitle: {
    fontSize: 15,
    marginRight: 3,
    paddingTop: 5,
    marginLeft: 7
  }
});
