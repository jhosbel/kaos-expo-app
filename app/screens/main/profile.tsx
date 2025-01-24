import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import BigButton from "@/components/BigButton";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import SmallModalComponent from "@/components/SmallModalComponent";
import { TextField } from "react-native-ui-lib";
import { UPDATE_USER } from "@/graphql/mutations";

const Profile = () => {
  const { dataUser } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [openName, setOpenName] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const updateName = async () => {
    await updateUser({
      variables: {
        updateUserInput: { id: data.userByEmail.id, name: userName },
      },
    });
    refetch();
    setUserName("");
    setOpenName(false);
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  /* if (error) {
    console.error("Error en la consulta: ", error);
    return <Text>Error al obtener los datos</Text>;
  } */

  //console.log("Datos: ", data.userByEmail);
  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/Glacius_KI2.png")}
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
          {data.userByEmail.name}
        </Text>
        <View style={{ gap: 25 }}>
          <BigButton
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
              style={{ backgroundColor: "#F15C26", width: 150 }}
            />
            <BigButton
              children={"Cancelar"}
              onPress={() => setOpenName(false)}
              style={{ backgroundColor: "#F15C26", width: 150 }}
            />
          </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
