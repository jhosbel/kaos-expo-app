import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import SmallModalComponent from "@/components/SmallModalComponent";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ROOM } from "@/graphql/mutations";
import { GET_ALL_GAMES } from "@/graphql/queries";

const MakeRoom = () => {
  const { data } = useQuery(GET_ALL_GAMES, { fetchPolicy: "no-cache" });
  const [createRoom] = useMutation(CREATE_ROOM);
  const [selectedValue, setSelectedValue] = useState("");
  const [dataFormat, setDataFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState("");
  const [mode, setMode] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [endMakeRoom, setEndMakeRoom] = useState(false);
  const [formData, setFormData] = useState({
    gameId: "",
    gameName: "",
    roomGameId: "",
    roomPassword: "",
    playersNum: "",
    mode: "",
    time: timeFormat,
    date: dataFormat,
    status: "NEW",
  });

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDate(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB");
      setDataFormat(formattedDate);
      handleInputChange("date", formattedDate);
    }
  };

  const handleTimeChange = (selectedTime: any) => {
    setShowTime(false);
    if (selectedTime && selectedTime.nativeEvent) {
      const date = new Date(selectedTime.nativeEvent.timestamp);
      const formattedTime = date.toLocaleString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        //second: "2-digit",
        hour12: true,
      });
      setTimeFormat(formattedTime);
      handleInputChange("time", formattedTime);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom({
        variables: {
          input: {
            ...formData,
            gameId: parseInt(formData.gameId),
            playersNum: parseInt(formData.playersNum),
          },
        },
      });
      console.log("Sala creada exitosamente: ", response.data);
      setEndMakeRoom(true);
    } catch (error) {
      console.error("Error al crear la Sala: ", error);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (data?.games) {
    data.games.forEach((game: any) => {
      console.log("Juegos ID: ", game.id);
      console.log("Juegos Nombre: ", game.name);
    });
  }

  console.log("Opcion: ", selectedValue);
  console.log("Modalidad: ", mode);
  console.log("Fecha: ", dataFormat);
  console.log("Hora: ", timeFormat);

  console.log("Formulario: ", formData);

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <ScrollView>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            //borderWidth: 1,
            gap: 20,
          }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 25,
              marginTop: 25,
              fontWeight: "semibold",
            }}
          >
            Crear sala
          </Text>
          <Text style={{ color: "#6F6F6F", fontWeight: "semibold" }}>
            Seleccione el juego
          </Text>
          <RNPickerSelect
            onValueChange={(value) => {
              const selectedGame = data?.games.find(
                (game: any) => game.id === value
              );
              if (selectedGame) {
                handleInputChange("gameId", value);
                handleInputChange("gameName", selectedGame.name);
              }
              setSelectedValue(value);
            }}
            items={
              data?.games
                ? data.games.map((game: any) => ({
                    label: game.name,
                    value: game.id,
                  }))
                : []
            }
            style={{
              inputAndroid: styles.input,
              inputIOS: styles.input,
            }}
            placeholder={{ label: "Eliga una opcion...", value: null }}
          />
          <Text style={{ color: "#6F6F6F", fontWeight: "semibold" }}>
            Seleccione la modalidad de la partida
          </Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setMode(value);
              handleInputChange("mode", value);
            }}
            items={[
              { label: "BattleRoyale", value: "BattleRoyale" },
              { label: "Escondite", value: "Escondite" },
              { label: "Duos", value: "Duos" },
              { label: "Escuadrones", value: "Escuadrones" },
              { label: "Posición", value: "Posición" },
            ]}
            style={{
              inputAndroid: styles.input,
              inputIOS: styles.input,
            }}
            placeholder={{ label: "Eliga una opcion...", value: null }}
          />
          <View style={{ gap: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>Hora de inicio: </Text>
              <TouchableOpacity onPress={() => setShowTime(true)}>
                {timeFormat ? (
                  <Text style={{ fontSize: 18 }}>{timeFormat}</Text>
                ) : (
                  <Text
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 5,
                      fontSize: 18,
                    }}
                  >
                    Editar
                  </Text>
                )}
              </TouchableOpacity>
              {showTime && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleTimeChange}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>Fecha de inicio: </Text>
              <TouchableOpacity onPress={() => setShowDate(true)}>
                {dataFormat ? (
                  <Text style={{ fontSize: 18 }}>{dataFormat}</Text>
                ) : (
                  <Text
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 5,
                      fontSize: 18,
                    }}
                  >
                    Editar
                  </Text>
                )}
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>Cantidad de participantes: </Text>
              <TextField
                style={{
                  fontSize: 18,
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 4,
                  paddingHorizontal: 5,
                }}
                keyboardType={"number-pad"}
                placeholder={"100"}
                value={formData.playersNum}
                onChangeText={(text) => handleInputChange("playersNum", text)}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>ID de la sala: </Text>
              <TextField
                style={{
                  fontSize: 18,
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 4,
                  paddingHorizontal: 5,
                }}
                placeholder={"587953155"}
                value={formData.roomGameId}
                onChangeText={(text) => handleInputChange("roomGameId", text)}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18 }}>Contraseña de la sala: </Text>
              <TextField
                style={{
                  fontSize: 18,
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 4,
                  paddingHorizontal: 5,
                }}
                placeholder={"jv123456"}
                value={formData.roomPassword}
                onChangeText={(text) => handleInputChange("roomPassword", text)}
              />
            </View>
          </View>
          <BigButton
            onPress={handleCreateRoom}
            children={"Crear sala"}
            style={{ backgroundColor: "#39B97C", width: 140, marginBottom: 35 }}
          />
        </View>
      </ScrollView>
      <SmallModalComponent
        isVisible={endMakeRoom}
        setIsVisible={setEndMakeRoom}
        containerStyles={{ height: 360 }}
      >
        <View style={{ gap: 15, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 30,
              color: "#6F6F6F",
              fontWeight: "semibold",
              width: 200,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Sala creada exitosamente
          </Text>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <Text>Juego:</Text>
            <Text>{formData.gameName}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <Text>ID de la sala:</Text>
            <Text>{formData.gameId}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <Text>Contraseña:</Text>
            <Text>{formData.roomPassword}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <Text>Modalidad:</Text>
            <Text>{formData.mode}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <Text>Num. de participantes:</Text>
            <Text>{formData.playersNum}</Text>
          </View>
          <BigButton
            onPress={() => {
              setEndMakeRoom(false);
              setFormData({
                gameId: "",
                gameName: "",
                roomGameId: "",
                roomPassword: "",
                playersNum: "",
                mode: "",
                time: timeFormat,
                date: dataFormat,
                status: "NEW",
              });
            }}
            style={{ backgroundColor: "#39B97C", width: 140 }}
            children={"Finalizar"}
          />
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default MakeRoom;

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
