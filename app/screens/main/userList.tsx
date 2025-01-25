import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import UserDetails from "@/components/UserDetails";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/queries";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const UserList = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [selectedValue, setSelectedValue] = useState("");

  console.log("Usuarios:", data);

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
      <View style={{ alignItems: "center", gap: 25 }}>
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: 25,
            marginTop: 25,
            textAlign: "center",
          }}
        >
          Lista de usuarios registrados
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: "Call Of Duty Mobile", value: "cofmobile" },
            { label: "PUBG Mobile", value: "pubgmobile" },
            { label: "Counter Strike 2", value: "cs2" },
            { label: "Fortnite", value: "fortnite" },
          ]}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Text
            style={{ fontWeight: "semibold", fontSize: 15, color: "#6F6F6F" }}
          >
            Buscar ID especifico:
          </Text>
          <TextField
            style={{
              width: 100,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#fff",
              padding: 5,
            }}
            placeholder={"4654354356"}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Text
            style={{ fontWeight: "semibold", fontSize: 15, color: "#6F6F6F" }}
          >
            Buscar nombre especifico:
          </Text>
          <TextField
            style={{
              width: 100,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#fff",
              padding: 5,
            }}
            placeholder={"Usuario123"}
          />
        </View>
        <View style={{ elevation: 10, height: 377 }}>
          <View
            style={{
              flexDirection: "row",
              width: 359,
              height: 44,
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#082032",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <Text style={{ color: "#fff", width: 25, textAlign: "center" }}>
              ID
            </Text>
            <Text style={{ color: "#fff", width: 80, textAlign: "center" }}>
              Nombre
            </Text>
            {/* <Text style={{color: "#fff", width: 60, textAlign: "center"}}>Baneos</Text>
            <Text style={{color: "#fff", width: 60, textAlign: "center"}}>Eliminar</Text> */}
            <Text style={{ color: "#fff", width: 60, textAlign: "center" }}>
              Saldo $
            </Text>
            <Text style={{ color: "#fff", width: 40, textAlign: "center" }}>
              Saldo Crd.
            </Text>
          </View>
          <ScrollView style={{ backgroundColor: "#fff", padding: 0 }}>
            {data?.users?.map((user: any, index: number) => {
              console.log(user);
              return (
                <View key={index}>
                  <UserDetails
                    name={user.name}
                    crdBalance={user.crdBalance}
                    usdBalance={user.usdBalance}
                    userId={user.id}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UserList;

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
