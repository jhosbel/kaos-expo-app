import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { TextField } from "react-native-ui-lib";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_GAMES } from "@/graphql/queries";
import BigButton from "@/components/BigButton";
import { CREATE_GAME } from "@/graphql/mutations";

const Games = () => {
  const { data, refetch } = useQuery(GET_ALL_GAMES, {fetchPolicy: "no-cache"});
  const [createGame] = useMutation(CREATE_GAME);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateRoom = async () => {
    if (!formData.name.trim() || !formData.avatar.trim()) {
      console.error("El nombre del juego o la imagen están vacíos.");
      return;
    }
    try {
      const response = await createGame({
        variables: {
          input: {
            name: formData.name, // Asegura que sea un número
            avatar: formData.avatar, // Convierte el número de jugadores a un entero
          },
        },
      });
      console.log("Juego creado: ", response.data);
      await refetch();
    } catch (error) {
      console.error("Error al crear el juego: ", error);
    }
  };

  console.log(data);
  console.log(formData);
  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View
        style={{
          height: 650,
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: 25,
            marginTop: 25,
            fontWeight: "semibold",
          }}
        >
          Crear juegos
        </Text>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18 }}>Nombre del juego: </Text>
          <TextField
            style={{
              fontSize: 18,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 5,
            }}
            keyboardType={"default"}
            placeholder={"Call of Duty"}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18 }}>Imagen del juego: </Text>
          <TextField
            style={{
              fontSize: 18,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 5,
            }}
            keyboardType={"default"}
            placeholder={"https://imagen.jpg"}
            value={formData.avatar}
            onChangeText={(text) => handleInputChange("avatar", text)}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
            borderWidth: 1,
            height: 200,
          }}
        >
          <ScrollView style={{width: 320}}>
            {data?.games
              ? data?.games.map((game: any, i: any) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Image
                      style={{
                        width: 60,
                        height: 72,
                        borderRadius: 5,
                      }}
                      source={{ uri: game.avatar }}
                    />
                    <Text style={{ fontSize: 20 }}>{game.name}</Text>
                  </View>
                ))
              : []}
          </ScrollView>
        </View>
        <BigButton
          style={{ backgroundColor: "#39B97C", width: 140 }}
          children={"Crear juego"}
          onPress={handleCreateRoom}
        />
      </View>
    </View>
  );
};

export default Games;

const styles = StyleSheet.create({});
