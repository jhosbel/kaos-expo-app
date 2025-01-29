import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import CardGame from "@/components/CardGame";
import RoomSelected from "@/components/RoomSelected";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROOMS } from "@/graphql/queries";
import { useLocalSearchParams } from "expo-router";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const SelectedGame = () => {
  const { name, avatar, gameId }: any = useLocalSearchParams();
  const { loading, data, error, refetch } = useQuery(GET_ALL_ROOMS, {
    fetchPolicy: "no-cache",
  });

  console.log("Avatar: ", avatar);
  console.log("ID del juego: ", gameId);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) {
    console.error("Error en la consulta SelectedGame: ", error);
    <ErrorPage />;
  }
  if (!data || !data.rooms) return <Text>No rooms available</Text>;

  const filteredRooms = data.rooms.filter(
    (room: any) => room.gameName === name
  );

  console.log("Filtrados: ", filteredRooms)

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
        {/* <View style={{ width: 300, height: 300 }}>
          <Image source={{uri: avatar}} />
        </View> */}
        <CardGame
          cardStyles={{ marginTop: 20 }}
          cardImage={avatar}
          gameName={name}
        />
        <Text style={{ color: "#6F6F6F", fontSize: 25, marginTop: 20 }}>
          Salas disponibles
        </Text>
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
            <Text style={{ color: "#fff", width: 50, textAlign: "center" }}>
              Fecha
            </Text>
            <Text style={{ color: "#fff", width: 50, textAlign: "center" }}>
              Hora
            </Text>
            <Text style={{ color: "#fff", width: 70, textAlign: "center" }}>
              Jugadores
            </Text>
            <Text style={{ color: "#fff", width: 70, textAlign: "center" }}>
              Modalidad
            </Text>
          </View>
          <ScrollView style={{ backgroundColor: "#fff", padding: 0 }}>
            {filteredRooms.map((room: any, i: any) => (
              <RoomSelected
                key={i}
                date={room.date}
                time={room.time}
                mode={room.mode}
                players={room.playersNum}
                roomId={room.id}
                gameId={gameId}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SelectedGame;

const styles = StyleSheet.create({});
