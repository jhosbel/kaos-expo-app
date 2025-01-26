import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import NavBar from "@/components/NavBar";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";
import GameInfo from "@/components/GameInfo";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { GET_ALL_GAMES, GET_USER_BY_EMAIL } from "@/graphql/queries";
import { ASSIGN_GAME_TO_USER } from "@/graphql/mutations";
import { useAuth } from "@/context/AuthContext";
import SmallModalComponent from "@/components/SmallModalComponent";
import AddGameToUser from "@/components/AddGameToUser";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const AddGame = () => {
  const { dataUser } = useAuth();
  const {
    data: userData,
    loading,
    error,
    refetch: refetchUserData,
  } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: dataUser },
    fetchPolicy: "no-cache",
  });
  const [open, setOpen] = useState(false);

  console.log("Usuario", userData);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta: ", error);
    return <ErrorPage />;
  }

  return (
    <View>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center", gap: 20 }}>
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
          Agregue sus juegos para participar
        </Text>
        <View>
          <View style={{ height: 140 }}>
            <BigButton
              onPress={() => setOpen(true)}
              style={{
                backgroundColor: "#39B97C",
                width: 140,
                marginTop: 15,
                alignSelf: "center",
              }}
              children={"Agregar"}
            />
          </View>
          <ScrollView style={{ height: 330 }}>
            {userData?.userByEmail
              ? userData?.userByEmail?.userGameDetails.map(
                  (game: any, i: any) => (
                    <View key={i}>
                      <GameInfo
                        gameName={game.gameName}
                        gameUserId={game.gameUserId}
                        userNick={game.nickname}
                        gameId={game.gameId}
                        gameAvatar={game.gameAvatar}
                        refetch={refetchUserData}
                        userId={userData?.userByEmail?.id}
                      />
                    </View>
                  )
                )
              : []}
          </ScrollView>
        </View>
      </View>
      <SmallModalComponent
        isVisible={open}
        setIsVisible={setOpen}
        containerStyles={{ height: 450 }}
      >
        <AddGameToUser
          setOpen={setOpen}
          userEmail={userData?.userByEmail?.id}
          refetchUserData={refetchUserData}
        />
      </SmallModalComponent>
    </View>
  );
};

export default AddGame;

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
