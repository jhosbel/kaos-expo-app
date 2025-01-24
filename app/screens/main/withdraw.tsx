import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "@/components/NavBar";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";


const Withdraw = () => {
  const router = useRouter();

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center", gap: 60 }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
          }}
        >
          Recarge/Retire su saldo personal
        </Text>
        <BigButton
          onPress={() => router.replace("/screens/main/withdrawPage")}
          children={"Recargar"}
          style={{ backgroundColor: "#F15C26", width: 140 }}
        />
        <BigButton
          onPress={() => router.replace("/screens/main/changeBalance")}
          children={"Cambiar"}
          style={{ backgroundColor: "#F15C26", width: 140 }}
        />
        <BigButton
          onPress={() => router.replace("/screens/main/withdrawPage")}
          children={"Retirar"}
          style={{ backgroundColor: "#39B97C", width: 140 }}
        />
        <BigButton
          onPress={() => router.replace("/screens/main/main")}
          children={"Regresar"}
          style={{ backgroundColor: "#F24643", width: 140 }}
        />
      </View>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
