import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Alert } from "react-native";
import { MainApplication } from "./screens";

const ApplicationNavigator = StackNavigator(
  {
    ...MainApplication
  },
  { headerMode: "none" }
);

export default ApplicationNavigator;
