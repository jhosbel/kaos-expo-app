import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import KaosLogo from "@/components/Icons/KaosLogo";
import KaosLogoText from "@/components/Icons/KaosLogoText";
import { Colors, TextField } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import BigButton from "@/components/BigButton";
import { useRouter } from "expo-router";

const register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedRepeatPassword = repeatPassword.trim();
    const trimmedPhone = phone.trim();

    if (
      trimmedUsername.length < 4 ||
      trimmedPassword.length < 4 ||
      trimmedRepeatPassword.length < 4 ||
      trimmedEmail.length < 4 ||
      trimmedPhone.length < 4
    ) {
      Alert.alert(
        "Error de validación",
        "El nombre de usuario y/o la contraseña deben tener al menos 4 caracteres.",
        [{ text: "Aceptar" }]
      );
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          phone: phone,
        }),
      });
      const data = await response.json();
      console.log("Datos del registro: ", data);
      if (data) {
        Alert.alert("Registro exitoso", `Bienvenido ${username}`);
        router.navigate("/screens/main/main"); // Redirigir a la pantalla principal
      } else if (data.status === "FIELD_ERROR") {
        Alert.alert("Error", "Revisa los campos del formulario.");
      } else if (data.status === "GENERAL_ERROR") {
        Alert.alert("Error general", data.message);
      }
    } catch (error) {
      console.log("Error al registrarse", error);
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
          gap: 23,
        }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <KaosLogo width={214} height={224} />
          <KaosLogoText width={144} height={31} />
        </View>
        <View style={{ justifyContent: "center", gap: 20 }}>
          <View style={{ gap: 20 }}>
            <TextField
              style={{
                width: 171,
                borderBottomWidth: 1,
                borderColor: "#E9E9E9",
                fontSize: 18,
              }}
              placeholder={"Nombre"}
              floatingPlaceholder
              autoCapitalize="none"
              floatingPlaceholderStyle={{ fontSize: 18 }}
              onChangeText={setUsername}
              value={username}
            />
            <TextField
              style={{
                width: 171,
                borderBottomWidth: 1,
                borderColor: "#E9E9E9",
                fontSize: 18,
              }}
              placeholder={"Correo electronico"}
              floatingPlaceholder
              autoCapitalize="none"
              floatingPlaceholderStyle={{ fontSize: 18 }}
              onChangeText={setEmail}
              value={email}
            />
            <TextField
              style={{
                width: 171,
                borderBottomWidth: 1,
                borderColor: "#E9E9E9",
                fontSize: 18,
              }}
              placeholder={"Numero telefonico"}
              floatingPlaceholder
              autoCapitalize="none"
              floatingPlaceholderStyle={{ fontSize: 18 }}
              onChangeText={setPhone}
              value={phone}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextField
                style={{
                  width: 171,
                  borderBottomWidth: 1,
                  borderColor: "#E9E9E9",
                  fontSize: 18,
                }}
                placeholder={"Repite Contraseña"}
                floatingPlaceholder
                autoCapitalize="none"
                floatingPlaceholderStyle={{ fontSize: 18 }}
                onChangeText={setRepeatPassword}
                value={repeatPassword}
                secureTextEntry={showPassword2}
              />
              <TouchableOpacity
                onPress={() => setShowPassword2(!showPassword2)}
              >
                <Ionicons
                  name={showPassword2 ? "eye-off" : "eye"}
                  size={24}
                  color={Colors.grey40}
                />
              </TouchableOpacity>
            </View>
          </View>
          <BigButton
            style={{ backgroundColor: "#F15A24", width: 192, height: 39 }}
            children={"Registrarse"}
            onPress={handleRegister}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
