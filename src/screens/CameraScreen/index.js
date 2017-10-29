import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  DeviceEventEmitter,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { NavigationActions } from "react-navigation";
import * as Animatable from "react-native-animatable";
import Camera from "react-native-camera";
import ImageNotification from "./component/imageNotification";
import EvaluateIndicator from "./component/evaluateIndicator";
import CameraButton from "./component/cameraButton";
import Style from "../../assets/style.js";
import {
  ValidateTheHotdog,
  ConvertToBase64,
  DeleteImage
} from "../../lib/ImageProcessing";

const hotdogTrue = require("../../assets/hotdog_true.png");
const hotdogFalse = require("../../assets/hotdog_false.png");

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.showEvaluating = this.showEvaluating.bind(this);
    this.showResult = this.showResult.bind(this);
    this.showRetakeCamera = this.showRetakeCamera.bind(this);
    this.processImage = this.processImage.bind(this);

    this.state = {
      showRetakeCamera: true,
      showRetakeCameraAnimation: "slideInUp",
      showEvaluating: false,
      showResult: false,
      showResultAnimation: "slideInUp",
      isHotdog: false,
      showImageNotification: false,
      previewImage: false,
      previewImageUri: null
    };
  }

  componentDidMount() {
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
    const options = {};
    this.camera
      .capture({ metadata: options })
      .then(data => {
        setTimeout(() => {
          this.setState({
            // showRetakeCamera: false,
            previewImage: true,
            previewImageUri: data.path
          });
          this.processImage(data);
        }, 100);
      })
      .catch(err => console.error(err));
  }

  processImage(data) {
    this.showEvaluating();
    ConvertToBase64(data.path).done(res => {
      ValidateTheHotdog(res).done(res => {
        this.setState(
          {
            showEvaluating: false, //hide evaluating area
            isHotdog: res,
            showImageNotification: true // show image notification
          },
          () => this.showResult()
        );
      });
    });
  }

  showRetakeCamera() {
    this.setState(
      {
        showRetakeCamera: true,
        previewImage: false,
        showImageNotification: false,
        showRetakeCameraAnimation: "slideInUp",
        showResultAnimation: "zoomOut" //zoom out Result area
      },
      () => {
        setTimeout(() => {
          this.setState({
            showResult: false // hide result area
          });
          DeleteImage(this.state.previewImageUri);
        }, 1500);
      }
    );
  }

  showEvaluating() {
    this.setState(
      {
        showEvaluating: true,
        showRetakeCameraAnimation: "zoomOut" //zoom out capture camera button
      },
      () => {
        //   wait 1.5 second
        setTimeout(() => {
          this.setState({
            showRetakeCamera: false // hide capture camera button
          });
        }, 1500);
      }
    );
  }

  showResult() {
    this.setState({
      showResult: true,
      showResultAnimation: "slideInUp"
    });
  }

  render() {
    return (
      <View style={[Style.container, { flexDirection: "row", flex: 1 }]}>
        <StatusBar hidden={true} />

        <ImageNotification
          source={this.state.isHotdog ? hotdogTrue : hotdogFalse}
          visible={this.state.showImageNotification}
        />

        {this.state.showEvaluating && <EvaluateIndicator />}

        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality={Camera.constants.CaptureQuality.preview}
          style={Style.cameraPreview}
          aspect={Camera.constants.Aspect.fill}
        />

        {this.state.previewImage && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: this.state.previewImageUri,
              isStatic: true
            }}
          />
        )}

        {this.state.showRetakeCamera && (
          <CameraButton
            onPress={() => {
              this.takePicture();
            }}
            animation={this.state.showRetakeCameraAnimation}
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
                this.showRetakeCamera();
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
