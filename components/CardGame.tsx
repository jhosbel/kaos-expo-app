import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

const CardGame = ({ onPress, cardImage, gameName, cardStyles }: any) => {
  return (
    <TouchableOpacity
      style={[
        cardStyles,
        {
          borderRadius: 17,
          elevation: 10,
          backgroundColor: "#DFDFDF",
        },
      ]}
      onPress={onPress}
    >
      <View
        style={{
          width: 150,
          height: 191,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          source={{uri: cardImage}}
          className="rounded-full object-fill"
          style={{
            width: 130,
            height: 142,
            borderRadius: 17,
          }}
        />
        <Text style={{ fontSize: 13 }}>{gameName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardGame;

const styles = StyleSheet.create({});
