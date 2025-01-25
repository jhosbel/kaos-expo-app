import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "./NavBar";

const ErrorPage = () => {
  return (
    <View>
      <NavBar />
      <View
        style={{ height: 650, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{fontSize: 25}}>Error al obtener los datos</Text>
      </View>
    </View>
  );
};

export default ErrorPage;

const styles = StyleSheet.create({});
