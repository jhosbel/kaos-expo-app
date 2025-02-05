import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { TextField } from "react-native-ui-lib";
import UserGameDetails from "@/components/UserGameDetails";
import RNPickerSelect from "react-native-picker-select";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_ROOM_BY_ID, GET_USER_GAMES_BY_ID } from "@/graphql/queries";
import client from "@/app/apolloClient";
import {
  UPDATE_ROOM_STATUS_TO_FINISHED,
  UPDATE_USER_STATS,
} from "@/graphql/mutations";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const EditRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState<any>(null);
  const router = useRouter();
  const [usersData, setUsersData] = useState<any>([]);
  const [getRoomById, { loading, error, refetch }] =
    useLazyQuery(GET_ROOM_BY_ID);
  const [updateRoomStatusToFinished] = useMutation(
    UPDATE_ROOM_STATUS_TO_FINISHED
  );


  const confirmEnterRoom = () => {
    Alert.alert(
      "Seguro que desea finalizar la sala?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: handleFinishRoom,
        },
      ],
      { cancelable: false }
    );
  };

  const handleFinishRoom = async () => {
    console.log("Room ID:", roomId);
    try {
      await updateRoomStatusToFinished({
        variables: { id: Number(roomId) },
      });
      alert("Sala finalizada!");
      router.replace("/screens/main/moderator");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.error("Error al actualizar la sala:", error.message);
      }
    }
  };

  const handleSearch = async () => {
    if (!roomId.trim()) {
      alert("Por favor, ingrese un ID válido.");
      return;
    }
    await getRoomById({
      variables: { id: Number(roomId) },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (data?.room) {
          setRoomData(data.room);
          setUsersData(data.room.userStats);
        } else {
          setRoomData(null);
          setUsersData([]);
        }
      },
      onError: (error) => {
        alert("No se encontro ninguna sala con ese ID");
        setRoomData(null);
        setUsersData([]);
      },
    });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta Main: ", error);
    return <ErrorPage />;
  }

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
        <Text style={{ color: "#6F6F6F", fontSize: 25, marginTop: 25 }}>
          Editar sala
        </Text>
        <View style={{ alignItems: "center", gap: 20, flexDirection: "row" }}>
          <Text style={{ color: "#6F6F6F", fontSize: 15 }}>
            Ingrese el ID de la sala
          </Text>
          <TextField
            value={roomId}
            onChangeText={(text) => setRoomId(text)}
            style={{
              width: 118,
              height: 27,
              borderRadius: 5,
              backgroundColor: "#fff",
              borderWidth: 1,
              paddingHorizontal: 10,
            }}
            keyboardType={"number-pad"}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <BigButton
            onPress={handleSearch}
            style={{ backgroundColor: "#39B97C", width: 120, height: 35 }}
            children={"Buscar"}
          />
          {roomData && roomData.status === "finished" ? null : (
            <BigButton
              onPress={confirmEnterRoom}
              style={{ backgroundColor: "#39B97C", width: 120, height: 35 }}
              children={"Finalizar"}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 10, fontWeight: "semibold" }}>Juego</Text>
            <Text style={{ fontSize: 10 }}>{roomData?.gameName}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 10, fontWeight: "semibold" }}>
              Modalidad
            </Text>
            <Text style={{ fontSize: 10 }}>{roomData?.mode}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 10, fontWeight: "semibold" }}>
              Contraseña
            </Text>
            <Text style={{ fontSize: 10 }}>{roomData?.roomPassword}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 10, fontWeight: "semibold" }}>
              Num. de jugadores
            </Text>
            <Text style={{ fontSize: 10 }}>{roomData?.playersNum}</Text>
          </View>
        </View>
        <View style={{ elevation: 10, height: 360 }}>
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
            <Text style={{ color: "#fff", width: 25, textAlign: "center" }}>
              ID
            </Text>
            <Text style={{ color: "#fff", width: 80, textAlign: "center" }}>
              Nombre
            </Text>
            <Text style={{ color: "#fff", width: 60, textAlign: "center" }}>
              Posicion
            </Text>
            <Text style={{ color: "#fff", width: 60, textAlign: "center" }}>
              Muertes
            </Text>
            <Text style={{ color: "#fff", width: 60, textAlign: "center" }}>
              Tiempo
            </Text>
            <Text style={{ color: "#fff", width: 40, textAlign: "center" }}>
              Saldo
            </Text>
          </View>
          <ScrollView style={{ backgroundColor: "#fff", padding: 0 }}>
            <View>
              {usersData &&
                usersData.map((user: any, i: any) => (
                  <View key={i}>
                    <UserGameDetails
                      name={user.nickname}
                      userId={user.userId}
                      idRoom={roomId}
                      kills={user.kills}
                      position={user.position}
                      timePlayed={user.timePlayed}
                      refetch={refetch}
                      crdBalance={user.crdBalance}
                    />
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default EditRoom;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
});
