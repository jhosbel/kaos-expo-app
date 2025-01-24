import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface BigButtonProps {
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const BigButton = ({ children, onPress, style }: BigButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={{color: "white", fontSize: 20, fontWeight: "semibold"}}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default BigButton;

const styles = StyleSheet.create({
  button: {
    width: 360,
    height: 45,
    backgroundColor: "#d0ff52",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
