import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { TextField } from "react-native-ui-lib";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_GAMES } from "@/graphql/queries";
import BigButton from "@/components/BigButton";
import { CREATE_GAME } from "@/graphql/mutations";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import SmallModalComponent from "@/components/SmallModalComponent";
import AddImage from "@/components/Icons/AddImage";
import * as ImagePicker from "expo-image-picker";

const Games = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_GAMES, {
    fetchPolicy: "no-cache",
  });
  const [createGame] = useMutation(CREATE_GAME);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });
  const [openImg, setOpenImg] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Lo siento necesita los permisos de camara para buscar su imagen!"
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      if (base64Image) {
        handleInputChange("avatar", base64Image);
        setOpenImg(false);
        refetch();
      }
    }
  };

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
      await createGame({
        variables: {
          input: {
            name: formData.name,
            avatar: formData.avatar,
          },
        },
      });
      await refetch();
      setFormData({ name: "", avatar: "" });
    } catch (error) {
      console.error("Error al crear el juego: ", error);
    }
  };

  const closeModal = () => {
    setFormData({ name: "", avatar: "" });
    setOpenImg(false);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta Games: ", error);
    return <ErrorPage />;
  }

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
          <BigButton
            style={{ backgroundColor: "#39B97C", width: 140 }}
            children={"Subir images"}
            onPress={() => setOpenImg(true)}
          />
        </View>
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
            height: 200,
          }}
        >
          <ScrollView style={{ width: 320 }}>
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
      <SmallModalComponent
        isVisible={openImg}
        setIsVisible={setOpenImg}
        containerStyles={{ height: 450 }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
        >
          <View
            style={{
              //flexDirection: "row",
              justifyContent: "space-around",
              width: 300,
              alignItems: "center",
              marginTop: 15,
              gap: 15,
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <View style={{ alignItems: "center" }}>
                <Text>Subir imagen desde el movíl</Text>
                <AddImage />
              </View>
            </TouchableOpacity>
            <Text>Subir imagen con url</Text>
            <TextField
              style={{
                fontSize: 18,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 5,
                width: 300,
                height: 30,
              }}
              keyboardType={"default"}
              placeholder={"https://imagen.jpg"}
              value={formData.avatar}
              onChangeText={(text) => handleInputChange("avatar", text)}
            />
          </View>
          <View>
            <BigButton
              children={"Cancelar"}
              onPress={closeModal}
              style={{ backgroundColor: "#F24643", width: 150 }}
            />
          </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default Games;

const styles = StyleSheet.create({});
