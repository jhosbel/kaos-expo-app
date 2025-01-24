import { ApolloProvider } from "@apollo/client";
import { Stack } from "expo-router";
import "react-native-reanimated";
import client from "./apolloClient";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/main" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ApolloProvider>
  );
}
