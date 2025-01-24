import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import KaosLogo from "./Icons/KaosLogo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import MenuIcon from "./Icons/MenuIcon";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";

const NavBar = () => {
  const { dataUser } = useAuth();
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    //fetchPolicy: "no-cache",
  });
  const navigation = useNavigation();

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <View
        style={{
          height: 116,
          width: "100%",
          backgroundColor: "#082032",
          alignItems: "center",
          paddingHorizontal: 22,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <View
            style={{
              borderRadius: 100,
              width: 50,
              height: 50,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuIcon />
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#fff",
            width: 157,
            height: 48,
            borderRadius: 11,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {`Crd. disponibles: `}
            <Text
              style={{ color: "#F15C26" }}
            >{`${data.userByEmail.crdBalance}`}</Text>
          </Text>
          <Text style={{ textAlign: "center" }}>
            {`Saldo de retiro: `}
            <Text
              style={{ color: "#39B97C" }}
            >{`$${data.userByEmail.usdBalance}`}</Text>
          </Text>
        </View>
        <KaosLogo width={38} height={48} />
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
