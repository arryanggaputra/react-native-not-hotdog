import { StyleSheet, Dimensions } from "react-native";

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBF2",
    flex: 1
  },
  //   Floating Area
  floatingArea: {
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    paddingHorizontal: 30,
    paddingVertical: 10,
    bottom: 50,
    alignItems: "center"
  },

  //   Button Styling
  button: {
    marginHorizontal: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    elevation: 2
  },
  buttonRed: {
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 2
  },
  buttonGreen: {
    backgroundColor: "#77FA4C",
    borderColor: "white",
    borderWidth: 2
  },
  buttonBlue: {
    backgroundColor: "#3AE0FF",
    borderColor: "white",
    borderWidth: 2
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18
  },

  //   Camera Preview
  cameraPreview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default stylesheet;
