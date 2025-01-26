import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import BigButton from "@/components/BigButton";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import SmallModalComponent from "@/components/SmallModalComponent";
import { TextField } from "react-native-ui-lib";
import { UPDATE_USER } from "@/graphql/mutations";
import * as ImagePicker from "expo-image-picker";
import TakePhoto from "@/components/Icons/TakePhoto";
import AddImage from "@/components/Icons/AddImage";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const Profile = () => {
  const { dataUser } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [openName, setOpenName] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [userName, setUserName] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Lo siento necesita los permisos de camara para buscar su imagen!"
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
    });
    if (!result.canceled) {
      const image = result.assets[0].uri;
      await updateUser({
        variables: {
          updateUserInput: { id: data?.userByEmail?.id, avatar: image },
        },
      });
      refetch();
    }
  };

  const takePhone = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Lo siento necesita los permisos de camara para buscar su imagen!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 1,
    });
    if (!result.canceled) {
      const image = result.assets[0].uri;
      await updateUser({
        variables: {
          updateUserInput: { id: data?.userByEmail?.id, avatar: image },
        },
      });
      refetch();
    }
  };

  const updateName = async () => {
    await updateUser({
      variables: {
        updateUserInput: { id: data?.userByEmail?.id, name: userName },
      },
    });
    refetch();
    setUserName("");
    setOpenName(false);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta: ", error);
    return <ErrorPage />;
  }

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center" }}>
        <Image
          source={
            data && data?.userByEmail?.avatar !== ""
              ? { uri: data?.userByEmail?.avatar }
              : require("../../../assets/images/avatar.png")
          }
          className="rounded-full object-fill"
          style={{
            width: 130,
            height: 130,
            borderRadius: 100,
            marginTop: 25,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          {data?.userByEmail?.name}
        </Text>
        <View style={{ gap: 25 }}>
          <BigButton
            onPress={() => setOpenImg(true)}
            children={"Cambiar avatar"}
            style={{ backgroundColor: "#F15C26", width: 223 }}
          />
          <BigButton
            children={"Cambiar nombre"}
            onPress={() => setOpenName(true)}
            style={{ backgroundColor: "#F15C26", width: 223 }}
          />
        </View>
      </View>
      <SmallModalComponent
        isVisible={openName}
        setIsVisible={setOpenName}
        containerStyles={{ height: 150 }}
      >
        <View style={{ gap: 15 }}>
          <TextField
            style={{
              width: "auto",
              borderBottomWidth: 1,
              borderColor: "#E9E9E9",
              fontSize: 18,
            }}
            placeholder={"Nuevo nombre"}
            floatingPlaceholder
            autoCapitalize="none"
            floatingPlaceholderStyle={{ fontSize: 18 }}
            onChangeText={setUserName}
            value={userName}
          />
          <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
            <BigButton
              children={"Cambiar"}
              onPress={updateName}
              style={{ backgroundColor: "#39B97C", width: 150 }}
            />
            <BigButton
              children={"Cancelar"}
              onPress={() => setOpenName(false)}
              style={{ backgroundColor: "#F24643", width: 150 }}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        isVisible={openImg}
        setIsVisible={setOpenImg}
        containerStyles={{ height: 180 }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 250,
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <TouchableOpacity onPress={takePhone}>
              <View style={{ alignItems: "center" }}>
                <TakePhoto />
                <Text>Tomar foto</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <View style={{ alignItems: "center" }}>
                <AddImage />
                <Text>Subir imagen</Text>
              </View>
            </TouchableOpacity>
          </View>
          <BigButton
            children={"Cancelar"}
            onPress={() => setOpenImg(false)}
            style={{ backgroundColor: "#F24643", width: 150 }}
          />
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
