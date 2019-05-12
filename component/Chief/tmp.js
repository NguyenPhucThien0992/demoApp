// chức năng collaspe cho history
<Collapse
  style={{
    flexDirection: "column-reverse",
    justifyContent: "space-between"
  }}
>
  >
  <CollapseHeader
    onToggle={() =>
      this.setState({
        collapsed: !this.state.collapsed
      })
    }
  >
    <View
      style={{
        marginLeft: "3%",
        marginBottom: 5
      }}
    >
      {/* {!this.state.collapsed ? (
                          <Icon
                            name="arrow-dropdown"
                            style={{
                              fontSize: 25,
                              color: "#117A65"
                            }}
                          />
                        ) : (
                          <Icon
                            name="arrow-dropup"
                            style={{
                              fontSize: 25,
                              color: "#117A65"
                            }}
                          />
                        )} */}

      <Icon
        name="arrow-dropdown"
        style={{
          fontSize: 25,
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
          name="time"
          style={{
            fontSize: 15,
            color: "#52BE80"
          }}
        />
      </Text>

      <Text style={{ fontSize: 15 }}>Thời gian báo hỏng:</Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: "1%",
          fontStyle: "italic",
          fontWeight: "700",
          color: "#52BE80"
        }}
      >
        {/* {moment(number).format("DD-MM-YYYY, k-mm-ss")} */}
      </Text>
    </View>

    {/* {paramFromScreen.request === "1" ? (
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
                                name="timer"
                                style={{
                                  fontSize: 15,
                                  color: "#BA4A00"
                                }}
                              />
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                              Thời gian chờ nhận sửa máy:
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
                              {this.state.GapTimeInterval}
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
                              Thời gian chờ nhận sửa máy:
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: "1%",
                                fontStyle: "italic",
                                fontWeight: "700",
                                color: "#BA4A00"
                              }}
                            />
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
                                name="timer"
                                style={{
                                  fontSize: 15,
                                  color: "#BA4A00"
                                }}
                              />
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                              Thời gian chờ nhận sửa máy:
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
                              {this.state.GapTimeIntervalForFix}
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
                              Thời gian chờ nhận sửa máy:
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
                              {this.state.GapTimeForFix}
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
                                name="timer"
                                style={{
                                  fontSize: 15,
                                  color: "#BA4A00"
                                }}
                              />
                            </Text>
                            <Text style={{ fontSize: 15 }}>
                              Thời gian chờ nhận sửa máy:
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
                              {this.state.GapTimeWaitAndFix}
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
                              Thời gian chờ nhận sửa máy:
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
                              {this.state.GapTimeWaitAndFixInterval}
                            </Text>
                          </View>
                        </View>
                      )}

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
                            name="stopwatch"
                            style={{
                              fontSize: 15,
                              color: "#9B59B6"
                            }}
                          />
                        </Text>
                        <Text style={{ fontSize: 15 }}>Thời gian sửa máy:</Text>
                        <Text
                          style={{
                            fontSize: 15,
                            marginLeft: "1%",
                            fontStyle: "italic",
                            fontWeight: "700",
                            color: "#9B59B6"
                          }}
                        >
                          {timeWaitForInCharge[i]}
                        </Text>
                      </View>

                      {paramFromScreen.request === "" ? (
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
                              name="star"
                              style={{
                                fontSize: 15,
                                color: "#9B59B6"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>
                            Đánh giá sửa máy:
                          </Text>
                          <View style={{ justifyContent: "center" }}>
                            <Rating
                              type="star"
                              // ratingImage="star"
                              ratingColor="#3498db"
                              ratingBackgroundColor="#c8c7c8"
                              ratingCount={5}
                              imageSize={30}
                              readonly={true}
                              fractions="{1}"
                              startingValue={paramFromScreen.rating[i]}
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
                      ) : null}
                      {paramFromScreen.request === "" ? (
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
                              name="pricetag"
                              style={{
                                fontSize: 15,
                                color: "#6028AB"
                              }}
                            />
                          </Text>
                          <Text style={{ fontSize: 15 }}>Nhận xét:</Text>
                          <View style={{ justifyContent: "center" }}>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: "1%",
                                fontStyle: "italic",
                                fontWeight: "700",
                                color: "#BA4A00"
                              }}
                            >
                              {paramFromScreen.comment[i]}
                            </Text>
                          </View>
                        </View>
                      ) : null} */}
  </CollapseBody>
</Collapse>;
