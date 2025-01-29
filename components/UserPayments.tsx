import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SmallModalComponent from "./SmallModalComponent";
import BigButton from "./BigButton";
import { useMutation } from "@apollo/client";
import { UPDATE_USER, UPDATE_USER_DEPOSIT_ROLE } from "@/graphql/mutations";

const UserPayments = ({
  name,
  phone,
  email,
  crdBalance,
  usdBalance,
  deposit,
  rol,
  image,
  userId,
  depositId,
  refetch,
}: any) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateUserDepositRole] = useMutation(UPDATE_USER_DEPOSIT_ROLE);
  const [open, setOpen] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const confirmPay = () => {
    Alert.alert(
      "Revisaste los datos correctamente?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: updateUserPetition,
        },
      ],
      { cancelable: false }
    );
  };

  const updateUserPetition = async () => {
    if (!deposit) {
      console.log("No se esta depositando nada!");
      return;
    }
    let sum = Number(deposit) + crdBalance;
    try {
      await updateUser({
        variables: {
          updateUserInput: { id: userId, crdBalance: sum },
        },
      });
      await updateUserDepositRole({
        variables: {
          id: depositId,
          newRole: "FINISH",
        },
      });
      refetch();
    } catch (error) {
      console.error("Error al actualizar la petición:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          marginTop: 20,
          borderBottomWidth: 1,
          borderColor: "#6F6F6F",
          borderRadius: 5,
          height: 35,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: 350,
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 15 }}>{name}</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#38a169" }}>
            {deposit}$
          </Text>
          <Text
            style={{
              borderColor: "#000",
              width: 75,
              borderRadius: 5,
              backgroundColor: rol === "PENDING" ? "#feb2b2" : "#9ae6b4",
              color: rol === "PENDING" ? "#9b2c2c" : "#276749",
              fontSize: 15,
            }}
          >
            {" "}
            {rol === "PENDING"
              ? "Pendiente"
              : rol === "FINISH"
              ? "Finalizado"
              : ""}
          </Text>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        isVisible={open}
        setIsVisible={setOpen}
        containerStyles={{ height: 500 }}
      >
        <View style={{ gap: 15, marginTop: 15, alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
                Usuario
              </Text>
              <Text
                style={{ color: "#6F6F6F", fontSize: 20, fontWeight: "bold" }}
              >
                {name}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
                Valor depositado:
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#38a169" }}
              >
                {deposit}$
              </Text>
            </View>
          </View>
          <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
            Numero de telefono: {phone}
          </Text>
          <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
            Correo: {email}
          </Text>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
                Crd. balance:
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#F15C26" }}
              >
                Crd.{crdBalance}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#6F6F6F", fontWeight: "bold" }}>
                USD balance:
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#38a169" }}
              >
                {usdBalance}$
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 20, color: "#6F6F6F", fontWeight: "bold" }}
            >
              Estatus:{" "}
            </Text>
            <Text
              style={{
                borderColor: "#000",
                width: 100,
                borderRadius: 5,
                backgroundColor: rol === "PENDING" ? "#feb2b2" : "#9ae6b4",
                color: rol === "PENDING" ? "#9b2c2c" : "#276749",
                fontSize: 20,
              }}
            >
              {" "}
              {rol === "PENDING"
                ? "Pendiente"
                : rol === "FINISH"
                ? "Finalizado"
                : ""}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsImageExpanded(true)}>
            <Text style={{ textAlign: "center" }}>Captura:</Text>
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
          <View>
            {rol === "FINISH" ? (
              <BigButton
                onPress={() => setOpen(false)}
                style={{ backgroundColor: "#F24643", width: 140 }}
                children={"Atras"}
              />
            ) : (
              <View style={{ flexDirection: "row", gap: 20 }}>
                <BigButton
                  onPress={confirmPay}
                  style={{ backgroundColor: "#39B97C", width: 140 }}
                  children={"Confirmar"}
                />
                <BigButton
                  onPress={() => setOpen(false)}
                  style={{ backgroundColor: "#F24643", width: 140 }}
                  children={"Cancelar"}
                />
              </View>
            )}
          </View>
        </View>
      </SmallModalComponent>

      <SmallModalComponent
        isVisible={isImageExpanded}
        setIsVisible={setIsImageExpanded}
        containerStyles={{ height: "50%", width: "90%" }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
          <BigButton
            onPress={() => setIsImageExpanded(false)}
            style={{ backgroundColor: "#F24643", width: 140 }}
            children={"Cerrar"}
          />
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default UserPayments;

const styles = StyleSheet.create({});
