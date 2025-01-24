import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "@/components/NavBar";
import CardGame from "@/components/CardGame";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";

const WaitingRoom = () => {
  const router = useRouter();

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View
        style={{
          height: "100%",
          alignItems: "center",
          borderWidth: 1,
          gap: 20,
        }}
      >
        <CardGame
          cardStyles={{ marginTop: 20 }}
          cardImage={require("@/assets/images/CODMbile.png")}
          gameName={"Call Of Duty Mobile"}
        />
        <Text style={{ color: "#6F6F6F", fontSize: 25, marginTop: 20 }}>
          Partida finalizada
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: 359,
              height: 34,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#082032",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Datos personales de la partida
            </Text>
          </View>
          <View style={{ gap: 10, padding: 20 }}>
            <Text
              style={{ fontSize: 20 }}
            >{`Puesto de la partida: ${"1"}`}</Text>
            <Text style={{ fontSize: 20 }}>{`Numero de muertes: ${"15"}`}</Text>
            <Text
              style={{ fontSize: 20 }}
            >{`Tiempo en la partida: ${"20:53"} min`}</Text>
            <Text style={{ fontSize: 20 }}>{`Saldo generado: $${"22.5"}`}</Text>
          </View>
        </View>
        <BigButton
          onPress={() => router.replace("/screens/main/main")}
          style={{ backgroundColor: "#39B97C", width: 140 }}
          children={"Finalizar"}
        />
      </View>
    </View>
  );
};

export default WaitingRoom;

const styles = StyleSheet.create({});
