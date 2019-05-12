import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Icon } from "native-base";
import SewingMachine from "../../assets/images/sewing_machine.png";
export default class FlatlistWork extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   backgroundColorChange: "#A7FCD2",
    //   colorChange: "#05723C"
    // };
  }

  // componentDidMount() {
  //   let params = this.props.item;
  //   params.request === ""
  //     ? this.setState({
  //         backgroundColorChange: "#A7FCD2",
  //         colorChange: "#054B28"
  //       })
  //     : params.request === "1"
  //     ? this.setState({
  //         backgroundColorChange: "#E5B616"
  //       })
  //     : this.params.request === "2"
  //     ? this.setState({
  //         backgroundColorChange: "#E41458"
  //       })
  //     : this.params.request === "4"
  //     ? this.setState({
  //         backgroundColorChange: "#8D20F0"
  //       })
  //     : this.setState({
  //         backgroundColorChange: "#2027F0"
  //       });
  // }
  render() {
    const params = this.props.item;

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#f9f2d9"
          // backgroundColor: this.state.backgroundColorChange
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
                    // color: this.state.colorChange,
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
