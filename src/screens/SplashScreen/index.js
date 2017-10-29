import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  DeviceEventEmitter
} from "react-native";
import * as Animatable from "react-native-animatable";
import CameraButton from "../CameraScreen/component/cameraButton";
import Style from "../../assets/style.js";

const logo = require("../../assets/logo.png");
const background = require("../../assets/background.jpg");

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheButton: false,
      takePictureAnimation: "zoomIn"
    };
    this.goToCameraScreen = this.goToCameraScreen.bind(this);
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("refreshAnimation", () => {
      setTimeout(() => {
        this.setState({
          takePictureAnimation: "zoomIn"
        });
      }, 1000);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showTheButton: true });
    }, 2000);
  }

  goToCameraScreen() {
    this.setState(
      {
        takePictureAnimation: "zoomOut"
      },
      () => {
        setTimeout(() => {
          this.props.navigation.navigate("CameraScreen");
        }, 1500);
      }
    );
  }

  render() {
    return (
      <View
        style={[
          Style.container,
          {
            justifyContent: "center",
            alignItems: "center"
          }
        ]}
      >
        {/* background image */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: 0.2,
            height: "100%"
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "cover"
            }}
            source={background}
          />
        </View>

        {/* Logo */}
        <View>
          <Animatable.Image
            duration={2000}
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ width: 240, resizeMode: "contain" }}
            source={logo}
          />
        </View>

        {this.state.showTheButton && (
          <CameraButton
            onPress={() => {
              this.goToCameraScreen();
            }}
            duration={2000}
            animation={this.state.takePictureAnimation}
            style={Style.buttonGreen}
            textStyle={{ color: "black" }}
            text={"Take a picture!"}
          />
        )}
      </View>
    );
  }
}

export default SplashScreen;
