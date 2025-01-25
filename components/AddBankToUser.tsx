import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import BigButton from "./BigButton";
import { TextField } from "react-native-ui-lib";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BANKS, GET_USER_BY_EMAIL } from "@/graphql/queries";
import { useAuth } from "@/context/AuthContext";
import { ASSIGN_BANK_TO_USER } from "@/graphql/mutations";

const AddBankToUser = ({ setOpen, refetchUserData, userEmail }: any) => {
  const { dataUser } = useAuth();
  const { data } = useQuery(GET_ALL_BANKS, { fetchPolicy: "no-cache" });
  const { data: userData } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [assingBankToUser] = useMutation(ASSIGN_BANK_TO_USER);
  const [selectedValue, setSelectedValue] = useState("");
  const [binanceId, setBinanceId] = useState("");
  const [codeBank, setCodeBank] = useState("");
  const [dniNum, setDniNum] = useState("");
  const [phoneUser, setPhoneUser] = useState("");

  const saveBinance = async () => {
    try {
      if (!binanceId) {
        Alert.alert("Todos los campos son obligatorios.");
        return;
      }
      const resp = await assingBankToUser({
        variables: {
          input: {
            userId: userEmail,
            bankId: Number(selectedValue),
            binancePayId: binanceId,
            bankName: "Binance",
          },
        },
      });
      console.log("Banco agregado exitosamente: ", resp.data);
      await refetchUserData();
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar el banco: ", error);
    }
  };

  const savePagoMovil = async () => {
    try {
      if (!codeBank || !dniNum || !phoneUser) {
        Alert.alert("Todos los campos son obligatorios.");
        return;
      }
      const resp = await assingBankToUser({
        variables: {
          input: {
            userId: userEmail,
            bankId: Number(selectedValue),
            bankName: "Pago Movíl",
            userBankPhone: phoneUser,
            bankCode: codeBank,
            userDniBank: dniNum,
          },
        },
      });
      console.log("Banco agregado exitosamente: ", resp.data);
      await refetchUserData();
      setOpen(false);
    } catch (error) {
      console.error("Error al guarda el banco: ", error);
    }
  };

  console.log("Datos: ", data);
  console.log(selectedValue);

  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "100%", alignItems: "center", gap: 10 }}>
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
          Agregue sus datos bancarios para retiro y deposito
        </Text>
        <Text
          style={{ fontSize: 18, color: "#6F6F6F", fontWeight: "semibold" }}
        >
          Seleccione el banco con el que usted trabaja
        </Text>
        <RNPickerSelect
          onValueChange={(value) => {
            data?.banks.find((bank: any) => bank.id === value);
            console.log("Valor: ", value);
            setSelectedValue(value?.toString());
          }}
          items={
            data?.banks
              ? data?.banks.map((bank: any) => ({
                  label: bank.name,
                  value: bank.id,
                }))
              : []
          }
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
        {selectedValue === "1" || selectedValue === "2" ? null : (
          <BigButton
            onPress={() => setOpen(false)}
            style={{ backgroundColor: "#39B97C", width: 150 }}
            children={"Cancelar"}
          />
        )}
        {selectedValue === "1" ? (
          <View
            style={{
              height: 300,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "#6F6F6F" }}
            >
              Registre su Binance
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: 350,
                fontSize: 18,
                color: "#6F6F6F",
              }}
            >
              A continuacion ingrese su Pay ID de su cuenta binance
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 18, color: "#6F6F6F" }}
            >
              Numero de ID Binance Pay:
            </Text>
            <TextField
              value={binanceId}
              onChangeText={setBinanceId}
              keyboardType={"number-pad"}
              style={{
                width: 250,
                height: 30,
                backgroundColor: "#fff",
                borderRadius: 5,
                borderWidth: 1,
                padding: 10,
                fontSize: 20,
              }}
            />
            <Text
              style={{
                width: 330,
                fontSize: 20,
                textAlign: "center",
                color: "#F24643",
              }}
            >
              Recuerde verificar sus datos asegurandose que sean correctos y no
              aya ningun error
            </Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <BigButton
                onPress={saveBinance}
                style={{ backgroundColor: "#39B97C", width: 200 }}
                children={"Guardar Binance"}
              />
              <BigButton
                onPress={() => setOpen(false)}
                style={{ backgroundColor: "#39B97C", width: 150 }}
                children={"Cancelar"}
              />
            </View>
          </View>
        ) : selectedValue === "2" ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "#6F6F6F" }}
            >
              Registre su Pago Movíl
            </Text>
            <Text
              style={{
                textAlign: "center",
                width: 350,
                fontSize: 18,
                color: "#6F6F6F",
              }}
            >
              A continuacion ingrese sus datos de pago movíl
            </Text>
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#6F6F6F" }}
              >
                Codigo del banco:
              </Text>
              <TextField
                value={codeBank}
                onChangeText={setCodeBank}
                keyboardType={"number-pad"}
                style={{
                  width: 140,
                  borderWidth: 1,
                  height: 30,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#6F6F6F" }}
              >
                Numero de cedula:
              </Text>
              <TextField
                value={dniNum}
                onChangeText={setDniNum}
                keyboardType={"number-pad"}
                style={{
                  width: 140,
                  borderWidth: 1,
                  height: 30,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#6F6F6F" }}
              >
                Telefono asociado:
              </Text>
              <TextField
                value={phoneUser}
                onChangeText={setPhoneUser}
                keyboardType={"number-pad"}
                style={{
                  width: 140,
                  borderWidth: 1,
                  height: 30,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  padding: 10,
                }}
              />
            </View>
            <Text
              style={{
                width: 330,
                fontSize: 20,
                textAlign: "center",
                color: "#F24643",
              }}
            >
              Recuerde verificar sus datos asegurandose que sean correctos y no
              aya ningun error
            </Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <BigButton
                onPress={savePagoMovil}
                style={{ backgroundColor: "#39B97C", width: 200 }}
                children={"Guardar Pago Movíl"}
              />
              <BigButton
                onPress={() => setOpen(false)}
                style={{ backgroundColor: "#39B97C", width: 150 }}
                children={"Cancelar"}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AddBankToUser;

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
