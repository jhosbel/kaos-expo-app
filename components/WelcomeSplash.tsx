import { View, Image } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

const WelcomeSplash = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <Animatable.Image
        source={require("../assets/images/KaosLogo.png")}
        duration={2000}
        animation={"bounceInDown"}
        style={{width: 350, height: 380}}
      />
    </View>
  );
};

export default WelcomeSplash;
