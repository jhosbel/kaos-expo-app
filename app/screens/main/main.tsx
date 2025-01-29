import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import CardGame from "@/components/CardGame";
import { useRouter } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ALL_GAMES } from "@/graphql/queries";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const Main = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_GAMES, {
    fetchPolicy: "no-cache",
  });
  const router = useRouter();

  const games = data?.games || [];

  const groupedGames = [];
  for (let i = 0; i < games.length; i += 2) {
    groupedGames.push(games.slice(i, i + 2));
  }

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta Main: ", error);
    return <ErrorPage />;
  }

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
      <NavBar />
      <Text style={{ fontSize: 50, color: "#6F6F6F" }}>Juegos</Text>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {groupedGames.map((gamePair: any, index: any) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
              gap: 25,
            }}
          >
            {gamePair.map((game: any, i: any) => (
              <CardGame
                key={i}
                cardImage={game.avatar}
                gameName={game.name}
                onPress={() =>
                  router.replace(
                    `/screens/main/selectedGame?name=${game.name}&avatar=${game.avatar}&gameId=${game.id}`
                  )
                }
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
