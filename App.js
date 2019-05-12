/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button
} from "react-native";

import { createAppContainer, createStackNavigator } from "react-navigation";

import {
  MainLoginSreen,
  ChiefDeparmentScreen,
  MechanicScreen,
  ChiefMainMachineDetailedScreen,
  MachanicDetailedScreen,
  HistoryStatScreen,
  ModalComponentScreen,
  ChiefWaitForConfirmScreen,
  MachanicOnFixingScreen,
  MainTeamleaderScreen,
  MainTeamDetailedScreen
} from "./component/Screen";

import ChiefDeparment from "./component/Chief/ChiefDeparment";
import Mechanic from "./component/Machanic/Machanic";
import MainLogin from "./component/Login/MainLogin";
import ChiefMainMachineDetailed from "./component/Chief/ChiefMainMachineDetailed";
import MachanicDetailed from "./component/Machanic/MachanicDetailed";
import HistoryStat from "./component/Chief/HistoryStat";
import ModalComponent from "./component/Chief/ModalComponent";
import ChiefWaitForConfirm from "./component/Chief/ChiefWaitForConfirm";
import MachanicOnFixing from "./component/Machanic/MachanicOnFixing";
import MainTeamleader from "./component/TeamLeader/MainTeamleader";
import MainTeamDetailed from "./component/TeamLeader/MainTeamDetailed";
import { Icon } from "native-base";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={{ flex: 1 }}>
          <ManageMachine />
        </View>
      </SafeAreaView>
    );
  }
}

const Machine = createStackNavigator(
  {
    MainLoginSreen: {
      screen: MainLogin,
      navigationOptions: {
        headerTitle: "Đăng nhập",
        headerBackTitle: "Logout",
        headerTitleStyle: {
          fontSize: 25
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      }
    },
    ChiefDeparmentScreen: {
      screen: ChiefDeparment,
      navigationOptions: {
        headerTitle: "Trưởng Chuyền",
        headerTitleStyle: {
          fontSize: 25
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      },
      headerBackTitleVisible: "true"
    },
    ChiefMainMachineDetailedScreen: {
      screen: ChiefMainMachineDetailed,
      navigationOptions: {
        headerTitle: "Chi tiết máy",
        headerTitleStyle: {
          fontSize: 30
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      }
    },
    HistoryStatScreen: {
      screen: HistoryStat,
      navigationOptions: {
        headerTitle: "Lịch sử sửa máy",
        headerTitleStyle: {
          fontSize: 25
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      }
    },
    ChiefWaitForConfirmScreen: {
      screen: ChiefWaitForConfirm,
      navigationOptions: {
        headerTitle: "Hoàn thành sửa máy",
        headerBackTitle: "Trưởng chuyền",
        headerTitleStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      }
    },
    // ModalComponentScreen: {
    //   screen: ModalComponent,
    //   navigationOptions: {
    //     headerTitle: "Báo hỏng",
    //     headerTitleStyle: {
    //       fontSize: 30
    //     },
    //     headerStyle: {
    //       backgroundColor: "#48b1bf",
    //       fontSize: 30
    //     }
    //   }
    // },
    MechanicScreen: {
      screen: Mechanic,
      navigationOptions: {
        headerTitle: "Sửa máy",
        headerTitleStyle: {
          fontSize: 30
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 30
        }
      }
    },
    MachanicDetailedScreen: {
      screen: MachanicDetailed,
      navigationOptions: {
        headerTitle: "Chi tiết sửa máy",
        headerTitleStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 20
        }
      }
    },
    MainTeamleaderScreen: {
      screen: MainTeamleader,
      navigationOptions: {
        headerTitle: "Trưởng nhóm cơ điện",
        headerTitleStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 20
        }
      }
    },
    MainTeamDetailedScreen: {
      screen: MainTeamDetailed,
      navigationOptions: {
        headerTitle: "Chi tiết máy",
        headerTitleStyle: {
          fontSize: 20
        },
        headerStyle: {
          backgroundColor: "#48b1bf",
          fontSize: 20
        }
      }
    }
  },
  {
    // initialRouteName: "MainLoginSreen"
  }
);

const ManageMachine = createAppContainer(Machine);

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "gold"
  }
});
