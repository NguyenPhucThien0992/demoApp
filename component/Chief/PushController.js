// import React, { Component } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import PushNotification from "react-native-push-notification";

// // export default class PushController extends Component {
// //   componentDidMount() {
// //     PushNotification.configure({
// //       onNotification: function(notification) {
// //         console.log("NOTIFICATION:", notification);
// //         handleNotification(notification);
// //         // process the notification

// //         // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
// //         // notification.finish(PushNotificationIOS.FetchResult.NoData);
// //       },
// //       popInitialNotification: true,
// //       requestPermissions: true
// //     });
// //   }
// //   render() {
// //     return null;
// //   }
// // }

// export function PushController(handleNotification) {
//   PushNotification.configure({
//     onNotification: function(notification) {
//       handleNotification(notification);
//     },

//     popInitialNotification: true,
//     requestPermissions: true
//   });
//   return PushNotification;
// }
