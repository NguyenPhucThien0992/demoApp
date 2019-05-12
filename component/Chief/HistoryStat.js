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
import Button from "react-native-button";
import { Icon } from "native-base";

import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import { Rating, AirbnbRating } from "react-native-elements";
import moment from "moment";

export default class HistoryStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  componentDidMount() {
    let paramFromScreen2 = this.props.navigation.state.params;
    if (paramFromScreen2.request === "1") {
      let tmplatestReportDate = paramFromScreen2.historyFix[0];
      let latestReportDate = moment(tmplatestReportDate).format(
        "DD-MM-YYYY, HH:mm:ss"
      );
      this.interval = setInterval(() => {
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
      }, 1000);
    }
    if (paramFromScreen2.request === "2") {
      let tmpissue_raise_day = paramFromScreen2.historyFix[0];
      let issue_raise_day = moment(tmpissue_raise_day).format(
        "DD-MM-YYYY, HH:mm:ss"
      );
      let tmpstart_repair_day = paramFromScreen2.timeStartFix[0];
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
      let tmplatestRepairDate = paramFromScreen2.timeStartFix[0];
      let latestRepairDate = moment(tmplatestRepairDate).format(
        "DD-MM-YYYY, HH:mm:ss"
      );
      this.intervalFix = setInterval(() => {
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
      }, 1000);
      this.setState({
        GapTimeIntervalForFix2: GapTimeForFix
      });
    }

    if (
      paramFromScreen2.request === "" &&
      paramFromScreen2.historyFix[0] != ""
    ) {
      let tmpissue_raise_day = paramFromScreen2.historyFix[0];
      let issue_raise_day = moment(tmpissue_raise_day).format(
        "DD-MM-YYYY, HH:mm:ss"
      );

      let tmpstart_repair_day = paramFromScreen2.timeStartFix[0];
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

      let tmpstartFix = paramFromScreen2.timeStartFix[0];
      let startFix = moment(tmpstartFix).format("DD-MM-YYYY, HH:mm:ss");
      let tmpEndFix = paramFromScreen2.timeFinish[0];
      let EndFix = moment(tmpEndFix).format("DD-MM-YYYY, HH:mm:ss");

      let GapTimeEndFix = moment(startFix, "DD/MM/YYYY HH:mm:ss").diff(
        moment(EndFix, "DD/MM/YYYY HH:mm:ss")
      );

      let GapTimeWaitAndFix = moment
        .utc(moment.duration(GapTimeEndFix).asMilliseconds())
        .format("HH:mm:ss");

      this.setState({
        GapTimeIntervalForFix2: GapTimeForFix,
        GapTimeWaitAndFixInterval: GapTimeWaitAndFix
      });
      console.log(this.state.GapTimeIntervalForFix2);
    }
    // this.timeWaitFix();
  }

  timeWaitFix(i) {
    let paramFromScreen2 = this.props.navigation.state.params;
    let tmpissue_raise_day = paramFromScreen2.historyFix[i];
    let issue_raise_day = moment(tmpissue_raise_day).format(
      "DD-MM-YYYY, HH:mm:ss"
    );
    let tmpstart_repair_day = paramFromScreen2.timeStartFix[i];
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
    this.setState({
      GapTimeIntervalForFix: GapTimeForFix
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalFix);
  }
  render() {
    console.log(this.props.navigation.state.params);
    let paramFromScreen = this.props.navigation.state.params;
    timeReport = paramFromScreen.historyFix;
    errorMessage = paramFromScreen.errorMessage;
    timeWaitForFixing = paramFromScreen.timeWaitForFixing;
    timeWaitForInCharge = paramFromScreen.timeWaitForInCharge;
    Status = paramFromScreen.status;
    person_incharge = paramFromScreen.person_incharge;

    timeReportlength = timeReport.length;
    let i = -1;
    return (
      <ScrollView>
        <View style={styles.container}>
          {timeReportlength != 0 ? (
            timeReport.map(number => {
              i = i + 1;
              console.log(number);
              return (
                <View
                  style={{
                    // i % 2 == 0 ? "#EAECEE" : "#F7F7FC",
                    flexDirection: "column",
                    marginLeft: 15,
                    marginRight: 15,
                    backgroundColor: "#fff",
                    marginBottom: 10,
                    borderWidth: 1,
                    borderRadius: 3,
                    marginTop: 20,
                    paddingTop: 10,
                    shadowOffset: {
                      width: 0,
                      height: 1
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 2,
                    elevation: 3
                  }}
                >
                  <View
                    style={{
                      marginLeft: "3%",
                      marginBottom: 5,
                      flexDirection: "row",
                      flexWrap: "wrap"
                    }}
                  >
                    {paramFromScreen.request === "1" ? (
                      <View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="medical"
                              style={{
                                fontSize: 15,
                                color: "#D68910"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>Tình trạng máy:</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#D68910"
                            }}
                          >
                            {Status}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexWrap: "wrap",
                            flexDirection: "row"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="time"
                              style={{
                                fontSize: 15,
                                color: "#52BE80"
                              }}
                            />
                          </Text>

                          <Text style={{ fontSize: 14 }}>
                            Thời điểm báo hỏng:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#52BE80"
                            }}
                          >
                            {moment(
                              paramFromScreen.historyFix[timeReportlength - 1]
                            ).format("DD-MM-YYYY, HH:mm:ss")}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#BA4A00"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Thời điểm sửa máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#BA4A00"
                            }}
                          >
                            {paramFromScreen.timeStartFix[timeReportlength - 1]}{" "}
                          </Text>
                        </View>
                      </View>
                    ) : paramFromScreen.request === "2" ? (
                      <View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="medical"
                              style={{
                                fontSize: 15,
                                color: "#D68910"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>Tình trạng máy:</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#D68910"
                            }}
                          >
                            {Status}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexWrap: "wrap",
                            flexDirection: "row"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="time"
                              style={{
                                fontSize: 15,
                                color: "#52BE80"
                              }}
                            />
                          </Text>

                          <Text style={{ fontSize: 14 }}>
                            Thời điểm báo hỏng:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#52BE80"
                            }}
                          >
                            {moment(
                              paramFromScreen.historyFix[timeReportlength - 1]
                            ).format("DD-MM-YYYY, HH:mm:ss")}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#BA4A00"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Thời gian chờ nhận máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#BA4A00"
                            }}
                          >
                            {this.timeWaitFix(i)}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#1E34E9"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Thời điểm bắt đầu sửa máy
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#1E34E9"
                            }}
                          >
                            {moment(
                              paramFromScreen.timeStartFix[timeReportlength - 1]
                            ).format("DD-MM-YYYY, HH:mm:ss")}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#BE1EE9"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Nhân viên sửa máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#BE1EE9"
                            }}
                          >
                            {
                              paramFromScreen.person_incharge[
                                timeReportlength - 1
                              ]
                            }
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="medical"
                              style={{
                                fontSize: 15,
                                color: "#D68910"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>Tình trạng máy:</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#D68910"
                            }}
                          >
                            {paramFromScreen.repair_result[i]}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexWrap: "wrap",
                            flexDirection: "row"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="time"
                              style={{
                                fontSize: 15,
                                color: "#52BE80"
                              }}
                            />
                          </Text>

                          <Text style={{ fontSize: 14 }}>
                            Thời điểm báo hỏng:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#52BE80"
                            }}
                          >
                            {moment(
                              paramFromScreen.historyFix[timeReportlength - 1]
                            ).format("DD-MM-YYYY, HH:mm:ss")}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#BA4A00"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Thời điểm sửa máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#BA4A00"
                            }}
                          >
                            {paramFromScreen.timeStartFix[timeReportlength - 1]}{" "}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#1E34E9"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Thời điểm kết thúc sửa máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#1E34E9"
                            }}
                          >
                            {paramFromScreen.timeFinish[timeReportlength - 1]}
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: "3%",
                            marginBottom: 5,
                            flexDirection: "row",
                            flexWrap: "wrap"
                          }}
                        >
                          <Text style={{ marginRight: 10 }}>
                            <Icon
                              name="timer"
                              style={{
                                fontSize: 15,
                                color: "#BE1EE9"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Nhân viên sửa máy:
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: "1%",
                              fontStyle: "italic",
                              fontWeight: "700",
                              color: "#BE1EE9"
                            }}
                          >
                            {
                              paramFromScreen.person_incharge[
                                timeReportlength - 1
                              ]
                            }
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            // Th1 chưa có dữ liệu
            <View>
              <Text style={{ fontSize: 20, color: "#809521" }}>
                {" "}
                Chưa có dữ liệu bảo dưỡng máy
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#D7DBDD"
  }
});
