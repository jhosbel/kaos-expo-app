import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import { CONVERT_CRD_TO_USD } from "@/graphql/mutations";

const ChangeBalance = () => {
  const { dataUser } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [convertCrdToUsd] = useMutation(CONVERT_CRD_TO_USD);
  const [selectedValue, setSelectedValue] = useState();
  const [amount, setAmount] = useState("");
  console.log("Usuario: ", data?.userByEmail?.id);

  console.log(selectedValue);
  console.log(amount);

  const deleteAlert = () => {
    Alert.alert(
      "Estas seguro que desea cambiar?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: handleConver,
        },
      ],
      { cancelable: false }
    );
  };

  const handleConver = async () => {
    if (Number(amount) > data?.userByEmail?.crdBalance) {
      Alert.alert("No posees el saldo suficiente!");
      return;
    }
    try {
      const result = await convertCrdToUsd({
        variables: { id: data?.userByEmail?.id, amount: Number(amount) },
      });
      console.log("Conversion successful:", result.data.convertCrdToUsd);
      refetch()
    } catch (error) {
      console.error("Error convirtiendo el balance:", error);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta ChangeBalance: ", error);
    return <ErrorPage />;
  }

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View
        style={{
          height: "100%",
          alignItems: "center",
          borderWidth: 1,
          gap: 40,
        }}
      >
        <Text style={{ color: "#6F6F6F", fontSize: 25, marginTop: 25 }}>
          Cambie su saldo de $ a Crd.
        </Text>
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: 18,
            width: 300,
            textAlign: "center",
          }}
        >
          Aqui puede cambiar sus dinero para retirar a saldo en Crd. para seguir
          jugando sin necesidad de recargar
        </Text>
        <Text style={{ color: "#6F6F6F" }}>
          Seleccione su saldo de retiro disponible
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            {
              label: data?.userByEmail?.crdBalance,
              value: data?.userByEmail?.crdBalance,
            },
          ]}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
        <Text style={{ color: "#6F6F6F" }}>
          Ingrese la cantidad que desea cambiar
        </Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 25, color: "#F15A24" }}>Crd.</Text>
          <TextField
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              fontSize: 25,
              width: 100,
              height: 50,
            }}
            placeholder={"6"}
            keyboardType={"number-pad"}
            onChangeText={setAmount}
            value={amount}
          />
        </View>
        <BigButton
          onPress={deleteAlert}
          style={{ backgroundColor: "#39B97C", width: 140 }}
          children={"Cambiar"}
        />
      </View>
    </View>
  );
};

export default ChangeBalance;

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
