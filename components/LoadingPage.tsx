import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import KaosLogo from "./Icons/KaosLogo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const LoadingPage = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000, // Duración de la animación (2 segundos)
        easing: Easing.linear, // Animación lineal
      }),
      -1, // Repetir indefinidamente
      true // Revertir la animación (ida y vuelta)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${rotation.value}deg`, // Rotación en el eje Y
        },
      ],
    };
  });

  return (
    <View>
      <NavBar />
      <View
        style={{ height: 650, justifyContent: "center", alignItems: "center" }}
      >
        <Animated.View style={[styles.box, animatedStyle]}>
          <KaosLogo width={200} height={200} />
        </Animated.View>
      </View>
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
  },
});
