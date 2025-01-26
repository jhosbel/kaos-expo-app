import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BANKS } from "@/graphql/queries";
import { CREATE_BANK_MUTATION } from "@/graphql/mutations";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";

const BanksPage = () => {
  const { data: dataAllBanks, refetch } = useQuery(GET_ALL_BANKS);
  const [createBank, { data, loading, error }] =
    useMutation(CREATE_BANK_MUTATION);
  const [name, setName] = useState("");

  const handleCreateBank = async () => {
    try {
      const response = await createBank({
        variables: {
          name, // Reemplaza esto con el nombre del banco que desees crear
        },
      });
      console.log("Banco creado:", response.data.createBank);
      setName("")
      refetch();
    } catch (err) {
      console.error("Error al crear el banco:", err);
    }
  };

  console.log(dataAllBanks);

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View
        style={{
          height: "100%",
          alignItems: "center",
          borderWidth: 1,
          gap: 20,
        }}
      >
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
          Bancos disponibles
        </Text>
        <Text style={{ textAlign: "center", color: "#6F6F6F" }}>
          Nombre del Banco:
        </Text>
        <TextField
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            width: 250,
            height: 40,
            fontSize: 15
          }}
          placeholder={"Bancolombia"}
          keyboardType={"default"}
          onChangeText={(text) => setName(text)}
        />
        <BigButton
          onPress={handleCreateBank}
          style={{
            backgroundColor: "#39B97C",
            width: 140,
            marginTop: 15,
            alignSelf: "center",
          }}
          children={"Agregar"}
        />
        <View style={{gap: 15}}>
          <Text style={{ textAlign: "center", color: "#6F6F6F" }}>
            Lista de bancos agregados:
          </Text>
          {dataAllBanks?.banks
            ? dataAllBanks?.banks?.map((bank: any, i: any) => (
                <View key={i}>
                  <Text style={{fontSize: 25, fontWeight: "bold"}}>{bank.name}</Text>
                </View>
              ))
            : []}
        </View>
      </View>
    </View>
  );
};

export default BanksPage;

const styles = StyleSheet.create({});
