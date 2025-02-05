import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextField } from "react-native-ui-lib";
import SmallModalComponent from "./SmallModalComponent";
import BigButton from "./BigButton";
import { UPDATE_USER, UPDATE_USER_STATS } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

const UserGameDetails = ({
  name,
  userId,
  idRoom,
  position,
  kills,
  timePlayed,
  refetch,
  crdBalance,
}: any) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [showUser, setShowUser] = useState(false);
  const [stats, setStats] = useState({
    userId: Number(userId),
    kills,
    timePlayed,
    position,
  });

  console.log("Muertes: ", crdBalance);

  const [updateUserStats] = useMutation(UPDATE_USER_STATS, {
    update(cache, { data: { updateUserStats } }) {
      cache.modify({
        fields: {
          rooms(existingRooms = []) {
            const updatedRoom = updateUserStats;
            return [...existingRooms, updatedRoom];
          },
        },
      });
    },
  });

  const handleInputChange = (key: string, value: any) => {
    setStats((prev) => ({
      ...prev,
      [key]:
        key === "kills" || key === "position"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      let sum = crdBalance + stats.kills;
      await updateUser({
        variables: {
          updateUserInput: { id: userId, crdBalance: sum },
        },
      });
      await updateUserStats({
        variables: {
          roomId: Number(idRoom),
          stats: [stats],
        },
      });
      refetch();
      setShowUser(false);
    } catch (error) {
      setShowUser(true);
      console.error(
        "Error en la mutación:",
        error /* JSON.stringify(error, null, 2) */
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowUser(true)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: 40,
            backgroundColor: "#F8F8F8",
            elevation: 10,
            marginTop: 5,
          }}
        >
          <Text style={{ width: 25, textAlign: "center" }}>Ver</Text>
          <Text style={{ width: 80, textAlign: "center" }}>{name}</Text>
          <Text>{position ? position : "0"}</Text>
          <Text>{kills ? kills : "0"}</Text>
          <Text>{`${timePlayed ? timePlayed : "0:00"} min`}</Text>
          <Text style={{ textAlign: "center" }}>{`Crd. ${kills}`}</Text>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        containerStyles={{ height: 350 }}
        isVisible={showUser}
        setIsVisible={setShowUser}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>ID: </Text>
            <Text style={{ fontSize: 20 }}>{userId}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Nombre: </Text>
            <Text style={{ fontSize: 20 }}>{name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Posicion: </Text>
            <TextField
              keyboardType={"number-pad"}
              placeholder={"1"}
              value={stats.position?.toString()}
              onChangeText={(text) => handleInputChange("position", text)}
              style={{
                width: 60,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20 }}>Muertes: </Text>
            <TextField
              keyboardType={"number-pad"}
              placeholder={"15"}
              value={stats.kills}
              onChangeText={(text) => handleInputChange("kills", text)}
              style={{
                width: 60,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Tiempo jugado: </Text>
            <TextField
              placeholder={"15:30"}
              value={stats.timePlayed}
              onChangeText={(text) => handleInputChange("timePlayed", text)}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
            <Text style={{ fontSize: 20 }}> min</Text>
          </View>
          <BigButton
            onPress={() => {
              handleUpdate();
            }}
            style={{ backgroundColor: "#39B97C" }}
            children={"Guardar"}
          />
          <BigButton
            onPress={() => setShowUser(false)}
            style={{ backgroundColor: "#F24643" }}
            children={"Cancelar"}
          />
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default UserGameDetails;

const styles = StyleSheet.create({});
