import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableHighlight,
  Picker,
  AppState,
  SafeAreaView,
  TextInput
} from "react-native";
import { Icon } from "native-base";
import { updateMachineData } from "../../networking/server";
import SewingMachine from "../../assets/images/sewing_machine.png";
import {
  ChieftMachineDetailedScreen,
  ChieftMachineHistoryScreen,
  HistoryStatScreen,
  ChiefDeparmentScreen
} from "../Screen";
import Button from "react-native-button";
import ChiefMachineDetailed from "./ChiefMachineDetailed";
import ChiefMachineHistory from "./ChiefMachineHistory";
import HistoryStat from "./HistoryStat";
import ChiefDeparment from "./ChiefDeparment";
import moment, { isMoment } from "moment";
import { Rating, AirbnbRating } from "react-native-elements";

export default class ChiefWaitForConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machine_timelife: null,
      ratingMachanic: 0,
      userComment: ""
    };
  }
  componentWillMount() {
    let paramFromScreen2 = this.props.navigation.state.params;
    const machine_dateIn = moment(paramFromScreen2.machine_in_day);
    let machine_usedToNow = moment();
    let machine_TotalTime = machine_usedToNow.diff(machine_dateIn, "days");
    let machine_WorkingTime = machine_TotalTime * 8;
    this.setState({
      machine_timelife: machine_WorkingTime
    });
  }

  componentDidMount() {
    let paramFromScreen3 = this.props.navigation.state.params;
    let tmplatestReportDate = paramFromScreen3.historyFix[0];
    let latestReportDate = moment(tmplatestReportDate).format(
      "DD-MM-YYYY, HH:mm:ss"
    );

    let tmpStartFix = paramFromScreen3.timeStartFix[0];
    let DatetimeStartFix = moment(tmpStartFix).format("DD-MM-YYYY, HH:mm:ss");

    let GapDateTimeWaitForFix = moment(tmpStartFix, "DD/MM/YYYY HH:mm:ss").diff(
      moment(latestReportDate, "DD/MM/YYYY HH:mm:ss")
    );
    let GapDateTimeWaitForFix2 = moment
      .utc(moment.duration(GapDateTimeWaitForFix).asMilliseconds())
      .format("HH:mm:ss");

    this.setState({
      GapTimeInterval: GapDateTimeWaitForFix2
    });
  }
  render() {
    let paramFromScreen = this.props.navigation.state.params;
    length = paramFromScreen.historyFix.length;
    return (
      <ScrollView style={{ flex: 1 }}>
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
                  fontSize: 15,
                  flexWrap: "wrap",
                  paddingTop: 5
                }}
              >
                {moment(paramFromScreen.historyFix[length - 1]).format(
                  "DD-MM-YYYY, k:mm:ss"
                )}
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
                {/* {this.state.machine_timelife
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} */}
                3,200 giờ
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
                  name="help-circle-outline"
                  style={{ fontSize: 25, color: "#6008B8" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Nguyên nhân hỏng: </Text>
              <Text style={styles.info}>{paramFromScreen.errorMessage[0]}</Text>
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
                <Icon name="alarm" style={{ fontSize: 25, color: "#B8AD08" }} />
              </Text>
              <Text style={styles.TextTitle}>Thời gian chờ nhận sửa máy: </Text>
              <Text style={styles.info}>{this.state.GapTimeInterval}</Text>
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
                <Icon name="timer" style={{ fontSize: 25, color: "#E74C3C" }} />
              </Text>
              <Text style={styles.TextTitle}>Thời gian bắt đầu sửa: </Text>
              <Text style={styles.info}>{paramFromScreen.timeStartFix}</Text>
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
                <Icon name="clock" style={{ fontSize: 25, color: "#B308B8" }} />
              </Text>
              <Text style={styles.TextTitle}>Thời gian kết thúc sửa: </Text>
              <Text style={styles.info}>{paramFromScreen.timeFinish[0]}</Text>
            </View>

            {/* <View
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
                  name="stopwatch"
                  style={{ fontSize: 25, color: "#B87508" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Tổng thời gian sửa máy: </Text>
              <Text style={styles.info}>0:00:00</Text>
            </View> */}

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
                  name="contact"
                  style={{ fontSize: 25, color: "#0DA216" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Nhân viên sửa máy: </Text>
              <Text style={styles.info}>
                {paramFromScreen.person_incharge[0]}
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
                <Icon name="stats" style={{ fontSize: 25, color: "#A735C5" }} />
              </Text>
              <Text style={styles.TextTitle}>Kết quả sửa máy: </Text>
              <Text style={styles.info}>
                {paramFromScreen.repair_result[0]}
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
                  name="star-half"
                  style={{ fontSize: 25, color: "#87A20D" }}
                />
              </Text>
              <Text style={styles.TextTitle}>Đánh giá nhân viên sửa máy </Text>
              <View style={{ justifyContent: "center" }}>
                <Rating
                  type="star"
                  // ratingImage="star"
                  ratingColor="#3498db"
                  ratingBackgroundColor="#c8c7c8"
                  ratingCount={5}
                  imageSize={30}
                  readonly={false}
                  // showRating={true}
                  fractions="{1}"
                  startingValue={5}
                  onFinishRating={rating => {
                    this.setState({
                      ratingMachanic: rating
                    });
                  }}
                  style={{
                    paddingVertical: 10,
                    fontWeight: "bold",
                    fontSize: 15,
                    flexWrap: "wrap",
                    paddingTop: 5
                  }}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: "flex-start",
                marginLeft: "2%",
                flexDirection: "column",
                paddingTop: 10,
                flexWrap: "wrap"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text>
                  <Icon
                    name="pricetag"
                    style={{ fontSize: 25, color: "#6028AB" }}
                  />
                </Text>
                <Text style={styles.TextTitle}>Nhận xét </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextInput
                  style={{
                    height: 100,
                    width: 340,
                    borderColor: "#B2BABB",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 10
                  }}
                  onChangeText={userComment => this.setState({ userComment })}
                  value={this.state.userComment}
                  editable={true}
                  maxLength={40}
                  multiline={true}
                />
              </View>
            </View>
          </View>
          <TouchableHighlight
            style={{
              marginBottom: 20,
              marginLeft: "20%",
              marginRight: "20%",
              height: 50,
              justifyContent: "center",
              borderWidth: 2,
              backgroundColor: "#5DADE2",
              borderRadius: 25,
              borderColor: "#2874A6"
            }}
            onPress={() => {
              let tmpRatingEnd = paramFromScreen.rating;
              let tmpRatingEnd2 = tmpRatingEnd.splice(
                0,
                1,
                this.state.ratingMachanic
              );

              let tmpComment = paramFromScreen.comment;
              let tmpComment2 = tmpComment.splice(0, 1, this.state.userComment);

              let params = {
                id: paramFromScreen.id,
                code: paramFromScreen.code,
                generation: paramFromScreen.generation,
                name: paramFromScreen.name,
                status: "Hoạt động tốt",
                color: "#27AE60",
                location: paramFromScreen.location,
                model: paramFromScreen.model,
                historyFix: paramFromScreen.historyFix,
                errorMessage: paramFromScreen.errorMessage,
                timeWaitForInCharge: paramFromScreen.timeWaitForInCharge,
                timeWaitForFixing: paramFromScreen.timeWaitForFixing,
                timeStartFix: paramFromScreen.timeStartFix,
                timeFinish: paramFromScreen.timeFinish,
                person_incharge: paramFromScreen.person_incharge,
                repair_result: paramFromScreen.repair_result,
                request: "",
                priority: paramFromScreen.priority,
                inputCode: paramFromScreen.inputCode,
                machine_in_day: paramFromScreen.machine_in_day,
                note: paramFromScreen.note,
                rating: tmpRatingEnd,
                comment: tmpComment
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
              this.props.navigation.navigate("ChiefDeparmentScreen");
            }}
            underlayColor="#17A589"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                Xác nhận đánh giá
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F4"
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
