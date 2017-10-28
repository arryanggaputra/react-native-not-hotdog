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
import Style from "../../assets/style.js";

const logo = require("../../assets/logo.png");
const background = require("../../assets/background.jpg");

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheButton: false,
      logoAnimation: "",
      logoAnimationIteration: 1,
      takePictureAnimation: ""
    };
    this.goToCameraScreen = this.goToCameraScreen.bind(this);
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("refreshAnimation", () => {
      setTimeout(() => {
        this.setState({
          takePictureAnimation: "slideInUp"
        });
      }, 1000);
    });
  }

  componentDidMount() {
    this.setState({
      logoAnimation: "bounceIn",
      takePictureAnimation: "slideInUp"
    });

    setTimeout(() => {
      this.setState({ showTheButton: true });
    }, 2000);
  }

  goToCameraScreen() {
    this.setState(
      {
        takePictureAnimation: "slideOutDown"
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
            animation={this.state.logoAnimation}
            easing="ease-out"
            iterationCount={this.state.logoAnimationIteration}
            onAnimationEnd={() => {
              this.setState({
                logoAnimation: "pulse",
                logoAnimationIteration: "infinite"
              });
            }}
            style={{ width: 240, resizeMode: "contain" }}
            source={logo}
          />
        </View>

        {this.state.showTheButton && (
          <Animatable.View
            animation={this.state.takePictureAnimation}
            duration={500}
            style={Style.floatingArea}
          >
            <TouchableOpacity
              style={[Style.button, Style.buttonGreen, { width: 200 }]}
              onPress={() => {
                this.goToCameraScreen();
              }}
            >
              <Text style={Style.buttonText}>Take a picture!</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    );
  }
}

export default SplashScreen;
