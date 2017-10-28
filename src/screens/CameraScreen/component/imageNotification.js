import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

class ImageNotification extends Component {
  render() {
    return (
      <View style={style.floatingViewTop}>
        {this.props.visible && (
          <Image
            source={this.props.source}
            style={{ margin: 0, height: 150 }}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }
}

export default ImageNotification;

const style = StyleSheet.create({
  floatingViewTop: {
    width: Dimensions.get("window").width,
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
    alignItems: "center"
  }
});
