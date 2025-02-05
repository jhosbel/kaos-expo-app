import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import KaosLogo from "@/components/Icons/KaosLogo";
import KaosLogoText from "@/components/Icons/KaosLogoText";
import { TextField, Colors } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function login() {
  const { setDataUser, setToken } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email.trim().length < 4 || password.trim().length < 4) {
      Alert.alert(
        "Error de validación",
        "El nombre de usuario y/o la contraseña deben tener al menos 4 caracteres.",
        [{ text: "Aceptar" }]
      );
      return;
    }
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${errorData.message}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.status === "FIELD_ERROR") {
        Alert.alert(
          "Error de validación",
          "El nombre de usuario y/o la contraseña no existen.",
          [{ text: "Aceptar" }]
        );
        return;
      }
      if (data.status === "WRONG_CREDENTIALS_ERROR") {
        Alert.alert(
          "Error de validación",
          "El nombre de usuario y/o la contraseña no existen.",
          [{ text: "Aceptar" }]
        );
        return;
      } else {
        console.log("Respuesta de la API:", data.email);
        setDataUser(data.email);
        setToken(data.token);
        router.navigate("/screens/main/main");
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Ocurrió un error inesperado.", [
          { text: "Aceptar" },
        ]);
        console.log("Error al hacer login: ", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 390,
          backgroundColor: "#fff",
          gap: 100,
        }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <KaosLogo width={214} height={224} />
          <KaosLogoText width={144} height={31} />
        </View>
        <View style={{ justifyContent: "center", gap: 65 }}>
          <View style={{ gap: 37 }}>
            <TextField
              style={{
                width: 171,
                borderBottomWidth: 1,
                borderColor: "#E9E9E9",
                fontSize: 18,
              }}
              placeholder={"Correo"}
              floatingPlaceholder
              autoCapitalize="none"
              floatingPlaceholderStyle={{ fontSize: 18 }}
              onChangeText={setEmail}
              value={email}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextField
                style={{
                  width: 171,
                  borderBottomWidth: 1,
                  borderColor: "#E9E9E9",
                  fontSize: 18,
                }}
                placeholder={"Contraseña"}
                floatingPlaceholder
                autoCapitalize="none"
                floatingPlaceholderStyle={{ fontSize: 18 }}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.grey40}
                />
              </TouchableOpacity>
            </View>
          </View>
          <BigButton
            style={{ backgroundColor: "#F15A24", width: 192, height: 39 }}
            children={"Entrar"}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
