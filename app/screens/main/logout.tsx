import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Logout = () => {
  const { logout } = useAuth(); // Obtener la función logout desde el contexto
  const router = useRouter();

  useEffect(() => {
    // Ejecutar la función logout cuando el componente se monte
    logout(); 

    // Redirigir al usuario a la pantalla de login
    router.replace("/login");
  }, [logout, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Logout;
