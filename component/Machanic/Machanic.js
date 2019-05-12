import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  RefreshControl
} from "react-native";
import Button from "react-native-button";
import { Icon } from "native-base";
import { MachanicDetailedScreen, MachanicOnFixingScreen } from "../Screen";
import MachanicDetailed from "./MachanicDetailed";
import MachanicOnFixing from "./MachanicOnFixing";

import SewingMachine from "../../assets/images/sewing_machine.png";
import { getAllMachines } from "../../networking/server";
import moment from "moment";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import { YellowBox } from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

class FlatlistItemWait extends Component {
  render() {
    const navigation = this.props;
    const paramFromScreen = this.props.item;
    const request = this.props.item.request;
    let machine_dateIn = moment(this.props.item.machine_in_day);
    let machine_usedToNow = moment();
    let machine_TotalTime = machine_usedToNow.diff(machine_dateIn, "days");
    let machine_WorkingTime = machine_TotalTime * 8;
    timeReport = paramFromScreen.historyFix[0];
    timeReport2 = moment(timeReport).format("DD-MM-YYYY, HH:mm:ss");

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: this.props.index % 2 == 0 ? "#EAECEE" : "#F7F7FC",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        {request === "1" ? (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingLeft: 10,
                paddingBottom: 20,
                paddingRight: 10,
                maxWidth: 140,
                paddingTop: 5
              }}
            >
              <Image source={SewingMachine} style={{ width: 80, height: 80 }} />
            </View>
            <View style={{ paddingTop: 5, flexDirection: "column" }}>
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
                    name="paper-plane"
                    style={{
                      fontSize: 15,
                      color: "#52BE80"
                    }}
                  />
                </Text>
                <Text style={{ fontSize: 12, paddingBottom: 3 }}>Tên máy:</Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  {this.props.item.name};
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
                    name="timer"
                    style={{
                      fontSize: 15,
                      color: "#AF16C8"
                    }}
                  />
                </Text>
                <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                  Thời gian báo hỏng:
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  {timeReport2}
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
                    name="pulse"
                    style={{
                      fontSize: 15,
                      color: "#BDC816"
                    }}
                  />
                </Text>
                <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                  Độ ưu tiên:
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold",
                    color: "#E74C3C"
                  }}
                >
                  {" "}
                  {this.props.item.priority}
                </Text>
              </View>
              <Collapse
                style={{
                  flexDirection: "column-reverse",
                  justifyContent: "space-between"
                }}
              >
                <CollapseHeader>
                  <View
                    style={{
                      marginLeft: "3%",
                      marginBottom: 5
                    }}
                  >
                    <Icon
                      name="arrow-dropdown"
                      style={{
                        fontSize: 20,
                        color: "#117A65"
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody>
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
                        name="barcode"
                        style={{
                          fontSize: 15,
                          color: "#F8C471"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Mã tài sản:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.code}
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
                        name="funnel"
                        style={{
                          fontSize: 15,
                          color: "#808B96"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Đời máy:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.generation}
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
                          color: "#A569BD"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Vị trí:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.location}
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
                        name="clock"
                        style={{
                          fontSize: 15,
                          color: "#117864"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12 }}>Thời gian sử dụng:</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: "1%",
                        fontStyle: "italic",
                        fontWeight: "700"
                      }}
                    >
                      3,200 giờ
                    </Text>
                  </View>
                </CollapseBody>
              </Collapse>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
class FlatlistItemFix extends Component {
  render() {
    const paramFromScreen = this.props.item;
    // const request = this.props.item.request;
    let machine_dateIn2 = moment(paramFromScreen.machine_in_day);
    let machine_usedToNow2 = moment();
    let machine_TotalTime2 = machine_usedToNow2.diff(machine_dateIn2, "days");
    let machine_WorkingTime2 = machine_TotalTime2 * 8;
    timeReport = paramFromScreen.historyFix[0];
    timeReport2 = moment(timeReport).format("DD-MM-YYYY, HH:mm:ss");

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: this.props.index % 2 == 0 ? "#EAECEE" : "#F7F7FC",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              paddingLeft: 10,
              paddingBottom: 20,
              paddingRight: 10,
              maxWidth: 140,
              paddingTop: 5
            }}
          >
            <Image source={SewingMachine} style={{ width: 80, height: 80 }} />
          </View>
          <View style={{ paddingTop: 5, flexDirection: "column" }}>
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
                  name="paper-plane"
                  style={{
                    fontSize: 15,
                    color: "#52BE80"
                  }}
                />
              </Text>
              <Text style={{ fontSize: 12, paddingBottom: 3 }}>Tên máy:</Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingBottom: 3,
                  fontWeight: "bold"
                }}
              >
                {" "}
                {this.paramFromScreen.name}
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
                  name="timer"
                  style={{
                    fontSize: 15,
                    color: "#AF16C8"
                  }}
                />
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  paddingBottom: 3
                }}
              >
                Thời gian báo hỏng:
              </Text>
              <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  {timeReport2}
                </Text>
              </View>
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
                  name="pulse"
                  style={{
                    fontSize: 15,
                    color: "#BDC816"
                  }}
                />
              </Text>
              <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                Độ ưu tiên:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingBottom: 3,
                  fontWeight: "bold",
                  color: "#E74C3C"
                }}
              >
                {" "}
                {this.props.item.priority}
              </Text>
            </View>
            <Collapse
              style={{
                flexDirection: "column-reverse",
                justifyContent: "space-between"
              }}
            >
              <CollapseHeader>
                <View
                  style={{
                    marginLeft: "3%",
                    marginBottom: 5
                  }}
                >
                  <Icon
                    name="arrow-dropdown"
                    style={{
                      fontSize: 20,
                      color: "#117A65"
                    }}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
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
                      name="barcode"
                      style={{
                        fontSize: 15,
                        color: "#F8C471"
                      }}
                    />
                  </Text>
                  <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                    Mã tài sản:
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingBottom: 3,
                      fontWeight: "bold"
                    }}
                  >
                    {" "}
                    {this.props.item.code}
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
                      name="funnel"
                      style={{
                        fontSize: 15,
                        color: "#808B96"
                      }}
                    />
                  </Text>
                  <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                    Đời máy:
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingBottom: 3,
                      fontWeight: "bold"
                    }}
                  >
                    {" "}
                    {this.props.item.generation}
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
                        color: "#A569BD"
                      }}
                    />
                  </Text>
                  <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                    Vị trí:
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingBottom: 3,
                      fontWeight: "bold"
                    }}
                  >
                    {" "}
                    {this.props.item.location}
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
                      name="clock"
                      style={{
                        fontSize: 15,
                        color: "#117864"
                      }}
                    />
                  </Text>
                  <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                    Thời gian sử dụng:
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      paddingBottom: 3,
                      fontWeight: "bold"
                    }}
                  >
                    3,200 giờ
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>
    );
  }
}

class FlatlistItemChange extends Component {
  render() {
    const paramFromScreen = this.props.item;
    const request = this.props.item.request;
    let machine_dateIn2 = moment(this.props.item.machine_in_day);
    let machine_usedToNow2 = moment();
    let machine_TotalTime2 = machine_usedToNow2.diff(machine_dateIn2, "days");
    let machine_WorkingTime2 = machine_TotalTime2 * 8;
    timeReport = paramFromScreen.historyFix[0];
    timeReport2 = moment(timeReport).format("DD-MM-YYYY, HH:mm:ss");

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: this.props.index % 2 == 0 ? "#EAECEE" : "#F7F7FC",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        {request === "4" ? (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                paddingLeft: 10,
                paddingBottom: 20,
                paddingRight: 10,
                maxWidth: 140,
                paddingTop: 5
              }}
            >
              <Image source={SewingMachine} style={{ width: 80, height: 80 }} />
            </View>
            <View style={{ paddingTop: 5, flexDirection: "column" }}>
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
                    name="paper-plane"
                    style={{
                      fontSize: 15,
                      color: "#52BE80"
                    }}
                  />
                </Text>
                <Text style={{ fontSize: 12, paddingBottom: 3 }}>Tên máy:</Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  {this.props.item.name}
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
                    name="timer"
                    style={{
                      fontSize: 15,
                      color: "#AF16C8"
                    }}
                  />
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    paddingBottom: 3
                  }}
                >
                  Thời gian báo hỏng:
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold"
                  }}
                >
                  {" "}
                  {timeReport2}
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
                    name="pulse"
                    style={{
                      fontSize: 15,
                      color: "#BDC816"
                    }}
                  />
                </Text>
                <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                  Độ ưu tiên:
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    paddingBottom: 3,
                    fontWeight: "bold",
                    color: "#E74C3C"
                  }}
                >
                  {" "}
                  {this.props.item.priority}
                </Text>
              </View>
              <Collapse
                style={{
                  flexDirection: "column-reverse",
                  justifyContent: "space-between"
                }}
              >
                <CollapseHeader>
                  <View
                    style={{
                      marginLeft: "3%",
                      marginBottom: 5
                    }}
                  >
                    <Icon
                      name="arrow-dropdown"
                      style={{
                        fontSize: 20,
                        color: "#117A65"
                      }}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody>
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
                        name="barcode"
                        style={{
                          fontSize: 15,
                          color: "#F8C471"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Mã tài sản:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.code}
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
                        name="funnel"
                        style={{
                          fontSize: 15,
                          color: "#808B96"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Đời máy:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.generation}
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
                          color: "#A569BD"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Vị trí:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {this.props.item.location}
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
                        name="clock"
                        style={{
                          fontSize: 15,
                          color: "#117864"
                        }}
                      />
                    </Text>
                    <Text style={{ fontSize: 12, paddingBottom: 3 }}>
                      Thời gian sử dụng:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingBottom: 3,
                        fontWeight: "bold"
                      }}
                    >
                      3,200 giờ
                    </Text>
                  </View>
                </CollapseBody>
              </Collapse>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

class FlatlistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machine_raiseIssue: ""
    };
  }

  render() {
    const params = this.props.item;

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
                {params.name}
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
                  {params.code}
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
                  {params.location}
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
                    color: params.color,
                    fontWeight: "bold",
                    fontSize: 13
                  }}
                >
                  {params.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default class Machanic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MachineFromServerChange: [],
      MachineFromServerFix: [],
      MachineFromServer: [],
      MachineFromServerWait: [],
      refreshing: false
    };
  }

  _onRefresh() {
    this.setState({ refresh: true });
    this.refreshDataFromServer();
  }
  componentDidMount() {
    this.refreshDataFromServerChange();
    this.refreshDataFromServerWait();
    this.refreshDataFromServerFix();
    this.refreshDataFromServer();
  }
  refreshDataFromServerWait() {
    getAllMachines()
      .then(machines => {
        this.setState({
          MachineFromServerWait: machines.filter(item => item.request === "1")
        });
      })
      .catch(error => {
        this.setState({
          MachineFromServerWait: []
        });
      });
  }

  refreshDataFromServerFix() {
    getAllMachines()
      .then(machines => {
        if (machines && machines.length > 0) {
          this.setState({
            MachineFromServerFix: machines.filter(item => item.request === "2")
          });
        }
      })
      .catch(error => {
        this.setState({
          MachineFromServerFix: [],
          refreshingChange: false
        });
      });
  }

  refreshDataFromServerChange() {
    getAllMachines()
      .then(machines => {
        if (machines && machines.length > 0) {
          this.setState({
            MachineFromServerChange: machines.filter(
              item => item.request === "4"
            )
          });
        }
      })
      .catch(error => {
        this.setState({
          MachineFromServerChange: [],
          refreshingChange: false
        });
      });
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
  _onRefresh() {
    this.setState({ refresh: true });
    this.refreshDataFromServer();
  }

  componentDidMount() {
    this.refreshDataFromServer();
    this.refreshDataFromServerChange();
    this.refreshDataFromServerFix();
    this.refreshDataFromServerWait();
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              fontWeight: "bold",
              color: "#150B09"
            }}
          >
            Danh sách máy đang sửa
          </Text>
        </View>
        <FlatList
          data={this.state.MachineFromServerFix}
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
                key={index}
              >
                <Button
                  onPress={() => {
                    this.props.navigation.navigate(
                      "MachanicDetailedScreen",
                      item
                    );
                  }}
                >
                  <FlatlistItemFix
                    item={item}
                    index={index}
                    keyExtractor={(item, index) => item.id}
                  />
                </Button>
              </View>
            );
          }}
        />

        {/* {this.state.refreshingWait != false ? ( */}
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              fontWeight: "bold",
              color: "#150B09"
            }}
          >
            Danh sách máy chờ sửa
          </Text>
        </View>
        {/* ) : null} */}

        <View>
          <FlatList
            style={{ backgroundColor: "#fff", paddingTop: 20 }}
            data={this.state.MachineFromServerWait}
            renderItem={({ item, index }) => {
              return (
                <Button
                  onPress={() => {
                    this.props.navigation.navigate(
                      "MachanicDetailedScreen",
                      item
                    );
                  }}
                >
                  <FlatlistItemWait item={item} index={index} />
                </Button>
              );
            }}
            keyExtractor={(item, index) => item.id}
          />
        </View>

        {this.state.refreshingChange != false ? (
          <View
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                fontWeight: "bold",
                color: "#150B09"
              }}
            >
              Danh sách chờ thay máy
            </Text>
          </View>
        ) : null}
        <View>
          <FlatList
            style={{ backgroundColor: "#fff", paddingTop: 20 }}
            data={this.state.MachineFromServerChange}
            renderItem={({ item, index }) => {
              return (
                <Button
                  onPress={() => {
                    this.props.navigation.navigate(
                      "MachanicDetailedScreen",
                      item
                    );
                  }}
                >
                  <FlatlistItemChange item={item} index={index} />
                </Button>
              );
            }}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  waitView: {
    flex: 1,
    backgroundColor: "#bedbd7"
  },
  fixView: {
    flex: 1,
    backgroundColor: "#ffec8b"
  },
  headerText: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold"
    // fontFamily: "Copse-Regular"
  }
});
