import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SmallModalComponent from "./SmallModalComponent";
import BigButton from "./BigButton";

const BankInfo = ({
  bankName,
  binancePay,
  userBankPhone,
  bankCode,
  userDniBank,
}: any) => {
  const [infoBank, setInfoBank] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#6F6F6F",
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setInfoBank(true)}
      >
        <View
          style={{
            //flexDirection: "row",
            justifyContent: "space-around",
            width: 360,
          }}
        >
          <Text
            style={{ color: "#6F6F6F" }}
          >{`Nombre del banco: ${bankName}`}</Text>
          {binancePay ? (
            <View>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Binance Pay ID: ${binancePay}`}</Text>
            </View>
          ) : (
            <View>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Numbero del Banco: ${userBankPhone}`}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Codigo del Banco: ${bankCode}`}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`DNI del Banco: ${userDniBank}`}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        isVisible={infoBank}
        setIsVisible={setInfoBank}
        containerStyles={{ height: 300 }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text style={{ marginTop: 15, color: "#6F6F6F" }}>
            Informacion sobre el Banco
          </Text>
          {binancePay ? (
            <View style={{ gap: 15 }}>
              <Text style={{ color: "#6F6F6F", fontSize: 25 }}>{bankName}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Binance Pay ID: ${binancePay}`}</Text>
            </View>
          ) : (
            <View style={{ gap: 15 }}>
              <Text style={{ color: "#6F6F6F", fontSize: 25 }}>{bankName}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Numbero del Banco: ${userBankPhone}`}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`Codigo del Banco: ${bankCode}`}</Text>
              <Text
                style={{ color: "#6F6F6F" }}
              >{`DNI del Banco: ${userDniBank}`}</Text>
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
              //onPress={deleteGame}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Eliminar"}
            />
            <BigButton
              onPress={() => setInfoBank(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cerrar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </>
  );
};

export default BankInfo;

const styles = StyleSheet.create({});
