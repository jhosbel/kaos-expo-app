import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";
import SmallModalComponent from "@/components/SmallModalComponent";
import { TextField } from "react-native-ui-lib";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations";
import { useAuth } from "@/context/AuthContext";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";

const Settings = () => {
  const { dataUser } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const router = useRouter();
  const [updateUser] = useMutation(UPDATE_USER);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeEmailConfirm, setChangeEmailConfirm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const updateEmail = async () => {
    try {
      if (!newEmail) {
        Alert.alert("Debe introducir un correo valido");
        return;
      }
      await updateUser({
        variables: { id: data.userByEmail.id, email: newEmail },
      });
      refetch();
      setNewEmail("");
      setChangeEmail(false);
    } catch (error) {
      console.error("Error al cambiar el correo: ", error);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center", gap: 14 }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          Configuración de usuario
        </Text>
        <BigButton
          onPress={() => router.replace("/screens/main/addGame")}
          children={"Agregar juegos"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
        <BigButton
          onPress={() => router.replace("/screens/main/userBankData")}
          children={"Agregar datos bancarios"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
        <BigButton
          onPress={() => setChangeEmail(true)}
          children={"Cambio de correo"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
        <BigButton
          onPress={() => setChangePassword(true)}
          children={"Cambio de contraseña"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
        <BigButton
          children={"Termino y condiciones"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
        <BigButton
          children={"Acerca de"}
          style={{ backgroundColor: "#F15C26", width: 250 }}
        />
      </View>
      <SmallModalComponent
        isVisible={changeEmail}
        setIsVisible={setChangeEmail}
        containerStyles={{ height: 300 }}
      >
        <View style={{ height: "100%", alignItems: "center", gap: 15 }}>
          <Text
            style={{
              fontSize: 25,
              color: "#6F6F6F",
              textAlign: "center",
              marginTop: 25,
              marginBottom: 15,
            }}
          >
            Cambie su correo electronico
          </Text>
          <Text style={{ color: "#6F6F6F" }}>
            Ingrese su nuevo correo electronico a continuación
          </Text>
          <TextField
            style={{
              backgroundColor: "#fff",
              width: 200,
              borderRadius: 5,
              height: 40,
              fontSize: 20,
              padding: 10,
              borderWidth: 1,
            }}
            value={newEmail}
            onChangeText={setNewEmail}
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              //onPress={() => setFinishRecharge(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Cambiar"}
            />
            <BigButton
              style={{ backgroundColor: "#F24643", width: 140 }}
              onPress={() => setChangeEmail(false)}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        isVisible={changePassword}
        setIsVisible={setChangePassword}
        containerStyles={{ height: 450 }}
      >
        <View style={{ height: "100%", alignItems: "center", gap: 15 }}>
          <Text
            style={{
              fontSize: 25,
              color: "#6F6F6F",
              textAlign: "center",
              marginTop: 25,
              marginBottom: 15,
            }}
          >
            Cambie su contraseña
          </Text>
          <Text style={{ color: "#6F6F6F" }}>
            Ingrese su antigua contraseña a continuación
          </Text>
          <TextField
            style={{
              backgroundColor: "#fff",
              width: 200,
              borderRadius: 5,
              height: 40,
              fontSize: 20,
              padding: 10,
              borderWidth: 1,
            }}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <Text style={{ color: "#6F6F6F" }}>
            Ingrese su nueva contraseña a continuación
          </Text>
          <TextField
            style={{
              backgroundColor: "#fff",
              width: 200,
              borderRadius: 5,
              height: 40,
              fontSize: 20,
              padding: 10,
              borderWidth: 1,
            }}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={{ color: "#6F6F6F" }}>
            Repita su nueva contraseña a continuación
          </Text>
          <TextField
            style={{
              backgroundColor: "#fff",
              width: 200,
              borderRadius: 5,
              height: 40,
              fontSize: 20,
              padding: 10,
              borderWidth: 1,
            }}
            value={repeatNewPassword}
            onChangeText={setRepeatNewPassword}
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              //onPress={() => setFinishRecharge(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Cambiar"}
            />
            <BigButton
              style={{ backgroundColor: "#F24643", width: 140 }}
              onPress={() => setChangePassword(false)}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
