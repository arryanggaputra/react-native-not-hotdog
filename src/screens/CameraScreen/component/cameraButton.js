import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Style from "../../../assets/style.js";

class CameraButton extends Component {
  render() {
    return (
      <Animatable.View
        animation={this.props.animation}
        duration={this.props.duration ? this.props.duration : 1000}
        style={Style.floatingArea}
      >
        <TouchableOpacity
          style={[Style.button, this.props.style, { width: 180 }]}
          onPress={() => {
            this.props.onPress();
          }}
        >
          <Text
            style={[Style.buttonText, { color: "white" }, this.props.textStyle]}
          >
            {this.props.text}
          </Text>
        </TouchableOpacity>
        {this.props.children}
      </Animatable.View>
    );
  }
}

export default CameraButton;
