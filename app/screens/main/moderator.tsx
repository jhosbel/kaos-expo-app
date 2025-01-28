import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";
import SmallModalComponent from "@/components/SmallModalComponent";
import { TextField } from "react-native-ui-lib";

const Moderator = () => {
  const router = useRouter();
  const [deleteRoom, setDeleteRoom] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false);

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          Modo moderador
        </Text>
        <View style={{ gap: 25 }}>
          <BigButton
            children={"Crear juegos"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/games")}
          />
          <BigButton
            children={"Crear sala"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/makeRoom")}
          />
          <BigButton
            children={"Crear banco"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/banksPage")}
          />
          <BigButton
            children={"Todas las salas"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/roomList")}
          />
          <BigButton
            children={"Editar sala"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/editRoom")}
          />
          <BigButton
            onPress={() => setDeleteRoom(true)}
            children={"Eliminar sala"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
          />
          <BigButton
            children={"Lista de usuarios"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/userList")}
          />
          <BigButton
            children={"Lista de Pagos"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
            onPress={() => router.navigate("/screens/main/paymentList")}
          />
        </View>
      </View>
      <SmallModalComponent
        containerStyles={{ height: 300 }}
        isVisible={deleteRoom}
        setIsVisible={setDeleteRoom}
      >
        <View style={{ alignItems: "center", gap: 20 }}>
          <Text style={{ fontSize: 30, color: "#6F6F6F", marginTop: 20 }}>
            Eliminar sala
          </Text>
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 20,
              width: 230,
              textAlign: "center",
            }}
          >
            Ingrese el ID de la sala que desea eliminar
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "#6F6F6F", fontSize: 20 }}>
              ID de la sala:
            </Text>
            <TextField
              placeholder={"7541218135"}
              style={{
                borderRadius: 5,
                borderWidth: 1,
                width: 100,
                padding: 5,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <BigButton
            onPress={() => setConfirmationDelete(true)}
            style={{ backgroundColor: "#39B97C", width: 140 }}
            children={"Eliminar"}
          />
          <BigButton
            onPress={() => setDeleteRoom(false)}
            style={{ backgroundColor: "#F24643", width: 140 }}
            children={"Cancelar"}
          />
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 300 }}
        isVisible={confirmationDelete}
        setIsVisible={setConfirmationDelete}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            width: 260,
          }}
        >
          <Text style={{ fontSize: 30, color: "#6F6F6F", marginTop: 20 }}>
            Sala eliminada
          </Text>
          <Text
            style={{ fontSize: 20, color: "#6F6F6F", textAlign: "center" }}
          >{`Sala con el ID ${"125047"} ah sido eliminada exitosamente`}</Text>
          <BigButton
            onPress={() => setConfirmationDelete(false)}
            style={{ backgroundColor: "#39B97C", width: 140 }}
            children={"Finalizar"}
          />
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default Moderator;

const styles = StyleSheet.create({});
