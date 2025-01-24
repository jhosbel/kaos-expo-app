import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import { UPDATE_USER_STATS } from "@/graphql/mutations";

const EditRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState<any>(null);
  const router = useRouter();
  const [usersData, setUsersData] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [getRoomById] = useLazyQuery(GET_ROOM_BY_ID);

  const fetchUsersData = async (userIds: any) => {
    try {
      const userPromises = userIds.map((id: any) =>
        client.query({
          query: GET_USER_GAMES_BY_ID,
          fetchPolicy: "no-cache",
          variables: { userId: id },
        })
      );
      const users = await Promise.all(userPromises);
      const userDetails = users.map((result) => {
        const userGame = result.data.userGameDetails[0];
        return {
          nickname: userGame?.nickname,
          userId: userGame?.userId,
        };
      });
      setUsersData(userDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (!roomId.trim()) {
      alert("Por favor, ingrese un ID válido.");
      return;
    }
    getRoomById({
      variables: { id: Number(roomId) },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (data?.room) {
          setRoomData(data.room);
          fetchUsersData(data.room.usersId.map((stat: any) => stat));
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

  console.log("Datos una sala: ", roomData?.userStats);
  console.log("Usuarios: ", usersData);
  console.log("Numero: ", usersData.length);

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
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: "Call Of Duty Mobile", value: "cofmobile" },
            { label: "PUBG Mobile", value: "pubgmobile" },
            { label: "Counter Strike 2", value: "cs2" },
            { label: "Fortnite", value: "fortnite" },
          ]}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
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
          <BigButton
            onPress={() => router.replace("/screens/main/moderator")}
            style={{ backgroundColor: "#39B97C", width: 120, height: 35 }}
            children={"Finalizar"}
          />
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
              {usersData?.map((user: any, index: number) => {
                const userStats = roomData?.userStats?.find(
                  (stat: any) => stat.userId === user.userId
                );
                return (
                  <View key={index}>
                    <UserGameDetails
                      name={user.nickname}
                      userId={user.userId}
                      idRoom={roomId}
                      kills={userStats.kills}
                      position={userStats.position}
                      timePlayed={userStats.timePlayed}
                    />
                  </View>
                );
              })}
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
