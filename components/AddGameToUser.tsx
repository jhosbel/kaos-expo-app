import { Alert, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React, { useState } from "react";
import { GET_ALL_GAMES } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import BigButton from "./BigButton";
import { TextField } from "react-native-ui-lib";
import { ASSIGN_GAME_TO_USER } from "@/graphql/mutations";
import { useAuth } from "@/context/AuthContext";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const AddGameToUser = ({ userEmail, setOpen, refetchUserData }: any) => {
  const { dataUser, token } = useAuth();
  const { data: dataAllGames, refetch: refetchAllGames } = useQuery(
    GET_ALL_GAMES,
    {
      fetchPolicy: "no-cache",
    }
  );
  const [assingGameToUser, { data, loading, error }] = useMutation(
    ASSIGN_GAME_TO_USER,
    {
      update(cache, { data: { updateUserStats } }) {
        cache.modify({
          fields: {},
        });
      },
    }
  );
  const [gameId, setGameId] = useState<Number>();
  const [nickname, setNickname] = useState<String>();
  const [gameUserId, setgameUserId] = useState<String>();

  const addGame = async () => {
    try {
      if (!gameId || !nickname || !gameUserId) {
        Alert.alert("Todos los campos son obligatorios.");
        return;
      }
      const response = await assingGameToUser({
        variables: {
          input: {
            gameId: Number(gameId),
            userId: userEmail,
            nickname: nickname.toString(),
            gameUserId: gameUserId.toString(),
          },
        },
        /* context: {
          headers: { Authorization: `Bearer ${token}` },
        }, */
      });
      console.log("Juego agregado exitosamente: ", response.data);
      await refetchUserData();
      refetchAllGames();
      setOpen(false);
    } catch (error) {
      console.error("Error al agregar el juego: ", error);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) {
    console.error("Error en la consulta Payment List: ", error);
    return <ErrorPage />;
  }

  return (
    <View style={{ height: "100%", alignItems: "center", gap: 20 }}>
      <Text
        style={{
          fontSize: 25,
          color: "#6F6F6F",
          textAlign: "center",
          marginTop: 25,
          marginBottom: 25,
          width: 300,
        }}
      >
        Seleccione los juegos de su preferencia
      </Text>
      <RNPickerSelect
        onValueChange={(value) => {
          dataAllGames?.games.find((game: any) => game.id === value);
          setGameId(value);
        }}
        items={
          dataAllGames?.games
            ? dataAllGames.games.map((game: any) => ({
                label: game.name,
                value: game.id,
              }))
            : []
        }
        style={{
          inputAndroid: styles.input,
          inputIOS: styles.input,
        }}
        placeholder={{ label: "Eliga una opcion...", value: null }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{ width: 150, gap: 5 }}>
            <Text style={{ textAlign: "center", color: "#6F6F6F" }}>
              ID de tu cuenta en el juego:
            </Text>
            <TextField
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
              placeholder={"123456789"}
              keyboardType={"number-pad"}
              onChangeText={(text) => setgameUserId(text)}
            />
          </View>
          <View style={{ width: 180, gap: 5 }}>
            <Text style={{ textAlign: "center", color: "#6F6F6F" }}>
              Nickname / Nombre de tu personaje en el juego
            </Text>
            <TextField
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
              placeholder={"Nickname"}
              onChangeText={(text) => setNickname(text)}
            />
          </View>
        </View>
        <View
          style={{ flexDirection: "row", gap: 15, justifyContent: "center" }}
        >
          <BigButton
            onPress={addGame}
            style={{
              backgroundColor: "#39B97C",
              width: 140,
              marginTop: 15,
              alignSelf: "center",
            }}
            children={"Guardar"}
          />
          <BigButton
            onPress={() => setOpen(false)}
            style={{
              backgroundColor: "#F24643",
              width: 140,
              marginTop: 15,
              alignSelf: "center",
            }}
            children={"Cancelar"}
          />
        </View>
      </View>
    </View>
  );
};

export default AddGameToUser;

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
