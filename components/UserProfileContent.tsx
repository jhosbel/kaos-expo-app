import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const UserProfileContent = (props: any) => {
  const { dataUser } = useAuth();
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta UserProfile: ", error);
    return <ErrorPage />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            //borderColor: "#ABABAB",
            width: "100%",
            height: 235,
            justifyContent: "center",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#082032",
            borderRadius: 17,
            elevation: 10,
            marginBottom: 25,
          }}
        >
          <Image
            source={
              data && data?.userByEmail?.avatar !== ""
                ? { uri: data?.userByEmail?.avatar }
                : require("../assets/images/avatar.png")
            }
            className="rounded-full object-fill"
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              backgroundColor: "#fff"
            }}
          />
          <Text style={{ fontSize: 20, color: "#fff" }}>
            {data?.userByEmail?.name}
          </Text>
        </View>
        <View style={{ height: 500 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default UserProfileContent;

const styles = StyleSheet.create({});
