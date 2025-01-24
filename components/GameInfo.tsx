import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import BigButton from "./BigButton";
import SmallModalComponent from "./SmallModalComponent";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_USER_GAME } from "@/graphql/mutations";

const GameInfo = ({
  refetch,
  gameAvatar,
  gameId,
  gameName,
  userId,
  userNick,
}: any) => {
  const [removeUserGame] = useMutation(REMOVE_USER_GAME)
  const [infoGame, setInfoGame] = useState(false);

  function truncateText(text: string) {
    if (text.length > 4) {
      return text.slice(0, 4) + "...";
    }
    return text;
  }

  const handleRemoveGame = async () => {
    try {
      const response = await removeUserGame({
        variables: { userId: Number(userId), gameId},
      });
      console.log('Game removed:', response.data.removeUserGame);
      refetch()
      setInfoGame(false)
    } catch (err) {
      console.error('Error removing game:', err);
    }
  };

  console.log("ID User:", userId)
  console.log("ID Juego:", gameId)

  const deleteGame = () => {
    Alert.alert(
      "Estas seguro que desea eliminar este juego?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => setInfoGame(true),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: handleRemoveGame,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#6F6F6F",
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setInfoGame(true)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 360,
          }}
        >
          <Image
            source={{ uri: gameAvatar }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#6F6F6F" }}>Juego</Text>
            <Text style={{ color: "#6F6F6F" }}>{gameName}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#6F6F6F" }}>ID</Text>
            <Text style={{ color: "#6F6F6F" }}>{truncateText(userId)}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#6F6F6F" }}>Nickname</Text>
            <Text style={{ color: "#6F6F6F" }}>{userNick}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        isVisible={infoGame}
        setIsVisible={setInfoGame}
        containerStyles={{ height: 400 }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text style={{ marginTop: 15, color: "#6F6F6F" }}>
            Informacion sobre el juego
          </Text>
          <Image
            source={{ uri: gameAvatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 5,
            }}
          />
          <Text style={{ color: "#6F6F6F", fontSize: 25 }}>{gameName}</Text>
          <Text style={{ color: "#6F6F6F" }}>ID dentro del juego:</Text>
          <Text style={{ color: "#6F6F6F" }}>{userId}</Text>
          <Text style={{ color: "#6F6F6F" }}>
            Nickname / Nombre dentro del juego:
          </Text>
          <Text style={{ color: "#6F6F6F" }}>{userNick}</Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              onPress={deleteGame}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Eliminar"}
            />
            <BigButton
              onPress={() => setInfoGame(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cerrar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </>
  );
};

export default GameInfo;

const styles = StyleSheet.create({});
