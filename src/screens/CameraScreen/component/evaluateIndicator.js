import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";

class EvaluateIndicator extends Component {
  componentDidMount() {
    this.refs["evaluateLayer"].setNativeProps({
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 20,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        opacity: 0.5
      }
    });
    this.refs["evaluateText"].setNativeProps({
      style: {
        color: "white",
        fontWeight: "bold",
        fontSize: 29,
        marginTop: 20
      }
    });
  }

  render() {
    return (
      <View ref="evaluateLayer">
        <ActivityIndicator animating={true} size="large" color="white" />
        <Text ref="evaluateText">Evaluating ...</Text>
      </View>
    );
  }
}

export default EvaluateIndicator;
