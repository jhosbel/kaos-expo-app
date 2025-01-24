import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";

const ChangeBalance = () => {
  const [selectedValue, setSelectedValue] = useState("");

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
          items={[{ label: "$125.5", value: "balance" }]}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
        <Text style={{ color: "#6F6F6F" }}>
          Ingrese la cantidad que desea cambiar
        </Text>
        <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
          <Text style={{fontSize: 25, color: "#F15A24"}}>Crd.</Text>
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
          placeholder={"6.5"}
          keyboardType={"number-pad"}
        />
        </View>
        <BigButton
          //onPress={deleteGame}
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
