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
  AlertIOS
} from "react-native";
import Button from "react-native-button";
import { Dropdown } from "react-native-material-dropdown";
import { getAllMachines } from "../../networking/server";
import { Icon } from "native-base";
import SewingMachine from "../../assets/images/sewing_machine.png";

class FlatlistWork extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default class MainTeamleader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MachineFromServerChuyen1: [],
      MachineFromServerChuyen2: [],
      selectedAllCabin: "Chuyền 1",
      allCabin: [
        {
          value: "Chuyền 1"
        },
        {
          value: "Chuyền 2"
        }
      ]
    };
  }
  componentDidMount() {
    this.refreshDataFromServerChuyen1();
  }
  refreshDataFromServerChuyen1() {
    getAllMachines()
      .then(machines => {
        this.setState({
          MachineFromServerChuyen: machines.filter(
            item => item.id === "1" || item.id === "2" || item.id === "3"
          )
        });
      })
      .catch(error => {
        this.setState({
          MachineFromServerChuyen: []
        });
      });
  }
  refreshDataFromServerChuyen2() {
    GetMachineFromServer()
      .then(machines => {
        this.setState({
          MachineFromServerChuyen2: machines.filter(item => {
            item => item.id === "1" || item.id === "2" || item.id === "3";
          })
        });
      })
      .catch(error => {
        this.setState({
          MachineFromServerChuyen2: []
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 20 }}>
          <View
            style={{
              width: "70%",
              borderRadius: 10,
              marginLeft: 20
            }}
          >
            <Dropdown
              label="Danh sách chuyền"
              data={this.state.allCabin}
              textColor="#EC7063"
              fontSize={15}
              labelFontSize={20}
              itemColor="#52BE80"
              selectedItemColor="#E74C3C"
              value={this.state.allCabin[0].value}
              onChangeText={valueSelected => {
                this.state.selectedAllCabin = valueSelected;
              }}
            />
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#129C55",
                marginLeft: 30,
                width: 100,
                height: 30,
                borderRadius: 20
              }}
              onPress={() => {
                if (this.state.selectedAllCabin === "Chuyền 1") {
                  getAllMachines()
                    .then(machines => {
                      this.setState({
                        MachineFromServerChuyen: machines.filter(item => {
                          return item.location === "Chuyền 1";
                        })
                      });
                    })
                    .catch(error => {
                      this.setState({
                        MachineFromServerChuyen: []
                      });
                    });
                  this.props.navigation.navigate("MainTeamleaderScreen");
                } else {
                  getAllMachines()
                    .then(machines => {
                      this.setState({
                        MachineFromServerChuyen: machines.filter(item => {
                          return item.location === "Chuyền 2";
                        })
                      });
                    })
                    .catch(error => {
                      this.setState({
                        MachineFromServerChuyen: []
                      });
                    });
                  this.props.navigation.navigate("MainTeamleaderScreen");
                }
              }}
            >
              <Text style={{ fontSize: 20, marginLeft: 20 }}>Xem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <FlatList
            data={this.state.MachineFromServerChuyen}
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
                        "MainTeamDetailedScreen",
                        item
                      );
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
      </View>
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
