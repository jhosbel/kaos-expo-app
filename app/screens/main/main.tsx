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

const Main = () => {
  const { data, refetch } = useQuery(GET_ALL_GAMES, {
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

  console.log(data);

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
                cardImage={{ uri: game.avatar }}
                gameName={game.name}
                onPress={() =>
                  router.replace(
                    `/screens/main/selectedGame?name=${game.name}&avatar=${game.avatar}`
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
