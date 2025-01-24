import { View, Text } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import UserProfileContent from "@/components/UserProfileContent";
import UserProfileIcon from "@/components/Icons/UserProfileIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import ModeratorIcon from "@/components/Icons/ModeratorIcon";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import LoadingPage from "@/components/LoadingPage";

const Layout = () => {
  const { dataUser } = useAuth();
  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          backgroundColor: "#F8F8F8",
          flex: 1,
          gap: 25,
        }}
      >
        <LoadingPage />
      </View>
    );
  }

  console.log("Datos: ", data.userByEmail.rol);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={UserProfileContent}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#fff",
            width: 320,
          },
        }}
      >
        <Drawer.Screen
          name="main"
          options={{
            title: "Mapa",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="makeRoom"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="editRoom"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="withdrawPage"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="rechargePage"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="userBankData"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="userList"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="addGame"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="selectedGame"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="banksPage"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="changeBalance"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="games"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="roomList"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="waitingRoom"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: () => (
              <>
                <View style={{ flexDirection: "row" }}>
                  <UserProfileIcon width={25} height={25} />
                  <Text
                    style={{ color: "#000000", fontSize: 20, marginLeft: 10 }}
                  >
                    Perfil de usuario
                  </Text>
                </View>
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: () => (
              <>
                <View style={{ flexDirection: "row" }}>
                  <SettingsIcon width={25} height={25} />
                  <Text
                    style={{ color: "#000000", fontSize: 20, marginLeft: 10 }}
                  >
                    Configuración
                  </Text>
                </View>
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="moderator"
          options={{
            drawerLabel: () => (
              <>
                {data.userByEmail.rol === "MODERATOR" ||
                data.userByEmail.rol === "ADMIN" ? (
                  <View style={{ flexDirection: "row" }}>
                    <ModeratorIcon width={25} height={25} />
                    <Text
                      style={{ color: "#000000", fontSize: 20, marginLeft: 10 }}
                    >
                      Moderador
                    </Text>
                  </View>
                ) : null}
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: () => (
              <>
                <View style={{ flexDirection: "row" }}>
                  <LogoutIcon width={25} height={25} />
                  <Text
                    style={{ color: "#000000", fontSize: 20, marginLeft: 10 }}
                  >
                    Salir
                  </Text>
                </View>
              </>
            ),
          }}
        />
        <Drawer.Screen
          name="withdraw"
          options={{
            drawerLabel: () => (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#000000",
                    fontWeight: "semibold",
                    alignSelf: "center",
                  }}
                >
                  Saldo para jugar:
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "semibold",
                    color: "#F15C26",
                    alignSelf: "center",
                  }}
                >{`Crd. ${data.userByEmail.crdBalance}`}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#000000",
                    fontWeight: "semibold",
                    alignSelf: "center",
                  }}
                >
                  Saldo para retirar:
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "semibold",
                    color: "#39B97C",
                    alignSelf: "center",
                  }}
                >{`$${data.userByEmail.usdBalance}`}</Text>
              </>
            ),
            drawerItemStyle: {
              backgroundColor: "#F8F8F8",
              borderRadius: 12,
              height: 170,
              width: 245,
              justifyContent: "space-around",
              alignSelf: "center",
              elevation: 10,
              marginTop: 25,
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
