import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  DeviceEventEmitter,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import { NavigationActions } from "react-navigation";
import * as Animatable from "react-native-animatable";
import Camera from "react-native-camera";
import ImageNotification from "./component/imageNotification";
import CameraButton from "./component/cameraButton";
import Style from "../../assets/style.js";

const hotdogTrue = require("../../assets/hotdog_true.png");
const hotdogFalse = require("../../assets/hotdog_false.png");

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRetake: true,
      showRetakeAnimation: "slideInUp",
      showEvaluating: false,
      showEvaluatingAnimation: "slideInUp",
      showResult: false,
      showResultAnimation: "slideInUp"
    };
  }

  componentDidMount() {
    this.handleBackButton = this.handleBackButton.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.showEvaluating = this.showEvaluating.bind(this);
    this.showResult = this.showResult.bind(this);
    this.showRetake = this.showRetake.bind(this);

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    DeviceEventEmitter.emit("refreshAnimation", {});
    this.props.navigation.dispatch(NavigationActions.back());
    return true;
  }

  takePicture() {
    this.showResult();
    // const options = {};
    // this.camera
    //   .capture({ metadata: options })
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
  }

  showRetake() {
    this.setState(
      {
        showRetake: true,
        showRetakeAnimation: "slideInUp",
        showResultAnimation: "zoomOut" //zoom out Result area
      },
      () => {
        setTimeout(() => {
          this.setState({
            showResult: false, // hide result area
            showEvaluating: false // hide evaluating area
          });
        }, 1500);
      }
    );
  }
  showEvaluating() {}

  showResult() {
    this.setState(
      {
        showResult: true,
        showResultAnimation: "slideInUp",
        showRetakeAnimation: "zoomOut"
      },
      () => {
        setTimeout(() => {
          this.setState({
            showRetake: false
          });
        }, 1500);
      }
    );
  }

  render() {
    return (
      <View style={[Style.container, { flexDirection: "row", flex: 1 }]}>
        <StatusBar hidden={true} />

        <ImageNotification source={hotdogTrue} visible={false} />

        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={Style.cameraPreview}
          aspect={Camera.constants.Aspect.fill}
        />

        {this.state.showRetake && (
          <CameraButton
            onPress={() => {
              this.takePicture();
            }}
            animation={this.state.showRetakeAnimation}
            style={Style.buttonRed}
            text={"Take it!"}
          />
        )}

        {this.state.showResult && (
          <CameraButton
            onPress={() => {}}
            animation={this.state.showResultAnimation}
            style={Style.buttonBlue}
            text={"SHARE!"}
          >
            <Text
              style={{ fontWeight: "bold", color: "white", marginTop: 20 }}
              onPress={() => {
                this.showRetake();
              }}
            >
              No, Thanks
            </Text>
          </CameraButton>
        )}
      </View>
    );
  }
}

export default CameraScreen;
