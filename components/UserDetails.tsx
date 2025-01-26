import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextField } from "react-native-ui-lib";
import SmallModalComponent from "./SmallModalComponent";
import RNPickerSelect from "react-native-picker-select";
import BigButton from "./BigButton";
import { useMutation } from "@apollo/client";
import { REMOVE_USER, UPDATE_USER_ROLE } from "@/graphql/mutations";

const UserDetails = ({
  name,
  usdBalance,
  crdBalance,
  userId,
  refetchUsers,
  rol,
}: any) => {
  const [removeUser] = useMutation(REMOVE_USER);
  const [updateUserRole] = useMutation(UPDATE_USER_ROLE);
  const [showUser, setShowUser] = useState(false);
  const [banear, setBanear] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [changeRol, setChangeRol] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const deleteAlert = () => {
    Alert.alert(
      "Estas seguro que desea retirar?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => setDeleteUser(false),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: removeUserFunction,
        },
      ],
      { cancelable: false }
    );
  };

  const removeUserFunction = async () => {
    try {
      await removeUser({
        variables: { id: userId },
      });
      Alert.alert("Usuario eliminado correctamente");
      setDeleteUser(false);
      refetchUsers();
    } catch (error) {
      console.error("Error al borrar el usuario:", error);
    }
  };

  const handleUpdateRole = async () => {
    if (!userId) {
      Alert.alert(
        "Error",
        "Por favor, ingresa el ID del usuario y el nuevo rol"
      );
      return;
    }
    try {
      await updateUserRole({
        variables: {
          id: userId,
          newRole: selectedValue,
        },
      });
      refetchUsers();
      setChangeRol(false);
      Alert.alert(`Rol de usuario cambiado exitosamente por ${selectedValue}`);
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowUser(true)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: 35,
            backgroundColor: "#F8F8F8",
            elevation: 10,
            marginTop: 5,
          }}
        >
          <Text style={{ width: 25, textAlign: "center" }}>Ver</Text>
          <Text style={{ width: 80, textAlign: "center" }}>{name}</Text>
          <Text style={{ color: "#39B97C" }}>{`${usdBalance}`}</Text>
          <Text
            style={{ textAlign: "center", color: "#F15C26" }}
          >{`${crdBalance}`}</Text>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={showUser}
        setIsVisible={setShowUser}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>ID del usuario: {userId}</Text>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          <Text style={{ fontSize: 20 }}>
            Saldo USD: <Text style={{ color: "#39B97C" }}>${usdBalance}</Text>
          </Text>
          <Text style={{ fontSize: 20 }}>
            Saldo Crd: <Text style={{ color: "#F15C26" }}>{crdBalance}</Text>
          </Text>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <TouchableOpacity
              onPress={() => setBanear(true)}
              style={{
                width: 100,
                height: 35,
                backgroundColor: "#39B97C",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Banear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChangeRol(true)}
              style={{
                width: 100,
                height: 35,
                backgroundColor: "#F15C26",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Cambiar rol</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteAlert}
              style={{
                width: 100,
                height: 35,
                backgroundColor: "#F24643",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          <BigButton
            onPress={() => setShowUser(false)}
            style={{ backgroundColor: "#F15C26" }}
            children={"Volver"}
          />
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 250 }}
        isVisible={banear}
        setIsVisible={setBanear}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
            }}
          >
            Banear usuario
          </Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              Ingrese el ID:
            </Text>
            <TextField
              placeholder={"86513518123135135"}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              //onPress={() => setConfirmBan(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Continuar"}
            />
            <BigButton
              onPress={() => setBanear(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={changeRol}
        setIsVisible={setChangeRol}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
            }}
          >
            Eliminar usuario
          </Text>

          <View style={{ width: 350, gap: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
              items={[
                { label: "Usuario", value: "USER" },
                { label: "Moderador", value: "MODERATOR" },
                { label: "Administrador", value: "ADMIN" },
              ]}
              style={{
                inputAndroid: styles.input,
                inputIOS: styles.input,
              }}
              placeholder={{ label: "Eliga una opcion...", value: null }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 20, color: "6F6F6F" }}>
              Tipo de usuario:
            </Text>
            <Text style={{ fontSize: 20 }}>
              {rol === "USER"
                ? "Usuario"
                : rol === "ADMIN"
                ? "Administrador"
                : rol === "MODERATOR"
                ? "Moderador"
                : ""}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={handleUpdateRole}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Continuar"}
            />
            <BigButton
              onPress={() => setChangeRol(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
});
