import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import CardGame from "@/components/CardGame";
import RoomSelected from "@/components/RoomSelected";
import SmallModalComponent from "@/components/SmallModalComponent";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROOMS } from "@/graphql/queries";
import { useLocalSearchParams } from "expo-router";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const SelectedGame = () => {
  const { name, avatar }: any = useLocalSearchParams();
  const { loading, data, error, refetch } = useQuery(GET_ALL_ROOMS, {
    fetchPolicy: "no-cache",
  });
  const [sure, setSure] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refetch()
  }, [])

  if (data?.rooms) {
    data.rooms.forEach((room: any) => {
      console.log("UserStats: ", room.userStats);
      console.log("UsersId: ", room.usersId);
      console.log("Estatus: ", room.status);
      console.log("Nombre: ", room.gameName);
    });
  }

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  if (!data || !data.rooms) return <Text>No rooms available</Text>;

  const filteredRooms = data.rooms.filter(
    (room: any) => room.gameName === name
  );

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
          cardImage={{ uri: avatar }}
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
                onPress={() => setSure(true)}
                date={room.date}
                time={room.time}
                mode={room.mode}
                players={room.playersNum}
              />
            ))}
          </ScrollView>
        </View>
      </View>
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
            aceptes se automáticamente el saldo de créditos correspondiente,
            deseas continuar?
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              onPress={() => router.replace("/screens/main/waitingRoom")}
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
    </View>
  );
};

export default SelectedGame;

const styles = StyleSheet.create({});
