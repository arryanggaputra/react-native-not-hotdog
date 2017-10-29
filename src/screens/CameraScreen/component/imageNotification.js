import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Sound from "react-native-sound";

const soundPath = "chime.mp3";

class ImageNotification extends Component {
  /**
   * whenever props has changed
   * we need to change the visibility property
   *
   * @param {props.visible} props
   */
  componentWillReceiveProps(props) {
    // if image is showing, we play the sound
    if (props.visible) {
      this.sound = new Sound(soundPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
        this.sound.setNumberOfLoops(0);
        this.sound.play();
      });
    }
  }

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
