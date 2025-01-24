import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RoomSelected = ({onPress, date, time, mode, players}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: 25,
          backgroundColor: "#F8F8F8",
          elevation: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#000", textAlign: "center" }}>
          {date}
        </Text>
        <Text style={{ color: "#000", textAlign: "center" }}>
          {`${time}`}
        </Text>
        <Text style={{ color: "#000", textAlign: "center" }}>{players}</Text>
        <Text style={{ color: "#000", textAlign: "center" }}>
          {mode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoomSelected;

const styles = StyleSheet.create({});
