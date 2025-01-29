import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import BigButton from "./BigButton";
import SmallModalComponent from "./SmallModalComponent";
import { useRouter } from "expo-router";
import { ADD_USER_TO_ROOM, UPDATE_USER } from "@/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "@/context/AuthContext";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";

const RoomSelected = ({ date, time, mode, players, roomId }: any) => {
  const { dataUser } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [addUserToRoom] = useMutation(ADD_USER_TO_ROOM);
  const [updateUser] = useMutation(UPDATE_USER);
  const [sure, setSure] = useState(false);
  const router = useRouter();

  console.log(roomId);
  console.log("Datos de usuario", data?.userByEmail?.crdBalance);

  const confirmEnterRoom = () => {
    Alert.alert(
      "Seguro que desea continuar?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: handleAdduser,
        },
      ],
      { cancelable: false }
    );
  };

  const handleAdduser = async () => {
    if (!data?.userByEmail?.id) {
      console.log("Usuario no encontrado")
      return
    }
    try {
      let pay = data?.userByEmail?.crdBalance - 1.5;
      await updateUser({
        variables: {
          updateUserInput: { id: data?.userByEmail?.id, crdBalance: pay },
        },
      });
      await addUserToRoom({
        variables: {
          roomId: roomId,
          userId: data?.userByEmail?.id,
        },
      });
      refetch()
      router.replace("/screens/main/waitingRoom")
    } catch (error) {
      console.error("Error al agregarse a la sala:", error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setSure(true)}>
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
          <Text style={{ color: "#000", textAlign: "center" }}>{date}</Text>
          <Text style={{ color: "#000", textAlign: "center" }}>
            {`${time}`}
          </Text>
          <Text style={{ color: "#000", textAlign: "center" }}>{players}</Text>
          <Text style={{ color: "#000", textAlign: "center" }}>{mode}</Text>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        isVisible={sure}
        setIsVisible={setSure}
        containerStyles={{ height: 185 }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 15,
              width: 350,
              fontWeight: "bold",
            }}
          >
            Haz seleccionado la sala en la que deseas participar, una vez
            aceptes se automáticamente el saldo de créditos correspondiente, el
            coste de la entrada es de{" "}
            <Text
              style={{ fontWeight: "bold", color: "#F15C26", fontSize: 20 }}
            >
              1.5 Crd.
            </Text>
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              onPress={confirmEnterRoom}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Ingresar"}
            />
            <BigButton
              onPress={() => setSure(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </>
  );
};

export default RoomSelected;

const styles = StyleSheet.create({});
