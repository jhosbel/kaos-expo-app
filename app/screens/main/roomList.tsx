import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROOMS } from "@/graphql/queries";
import SmallModalComponent from "@/components/SmallModalComponent";
import BigButton from "@/components/BigButton";

const RoomList = () => {
  const { loading, data, error } = useQuery(GET_ALL_ROOMS, {
    fetchPolicy: "no-cache",
  });
  const [openRoom, setOpenRoom] = useState(false);

  console.log(data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data || !data.rooms) return <Text>No rooms available</Text>;

  if (data?.rooms) {
    data.rooms.forEach((room: any) => {
      console.log("UsersId: ", room.usersId);
      console.log("Estatus: ", room.status);
      console.log("Nombre: ", room.gameName);
      console.log("ID: ", room.id);
    });
  }

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View
        style={{
          elevation: 10,
          height: 360,
        }}
      >
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: 25,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Todas las salas disponibles
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#082032",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text style={{ color: "#fff", width: 50, textAlign: "center" }}>
            ID
          </Text>
          <Text style={{ color: "#fff", width: 50, textAlign: "center" }}>
            Fecha
          </Text>
          <Text style={{ color: "#fff", width: 50, textAlign: "center" }}>
            Juego
          </Text>
          <Text style={{ color: "#fff", width: 70, textAlign: "center" }}>
            Modalidad
          </Text>
          <Text style={{ color: "#fff", width: 70, textAlign: "center" }}>
            Max. Jugadores
          </Text>
        </View>
        <ScrollView style={{ backgroundColor: "#fff", padding: 0 }}>
          {data?.rooms?.map((room: any, i: any) => (
            <TouchableOpacity onPress={() => setOpenRoom(true)} key={i}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: "auto",
                  backgroundColor: "#F8F8F8",
                  elevation: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#000", textAlign: "center", width: 50 }}>
                  {room.id}
                </Text>
                <Text style={{ color: "#000", textAlign: "center", width: 50 }}>
                  {room.date}
                </Text>
                <Text style={{ color: "#000", textAlign: "center", width: 50 }}>
                  {room.gameName}
                </Text>
                <Text style={{ color: "#000", textAlign: "center", width: 70 }}>
                  {room.mode}
                </Text>
                <Text style={{ color: "#000", textAlign: "center", width: 70 }}>
                  {room.playersNum}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <SmallModalComponent
        containerStyles={{ height: 300 }}
        isVisible={openRoom}
        setIsVisible={setOpenRoom}
      >
        <BigButton
          onPress={() => setOpenRoom(false)}
          style={{ backgroundColor: "#F24643", width: 140 }}
          children={"Cancelar"}
        />
      </SmallModalComponent>
    </View>
  );
};

export default RoomList;

const styles = StyleSheet.create({});
