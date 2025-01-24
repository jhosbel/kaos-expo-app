import { Button, StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import BigButton from "@/components/BigButton";
import SmallModalComponent from "@/components/SmallModalComponent";

const WithdrawPage = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("");
  const [finishWithdraw, setFinishWithdraw] = useState(false)

  const continueOperation = () => {
    Alert.alert(
      "Estas seguro que desea retirar?",
      "¿Quieres continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => setFinishWithdraw(false),
          style: "cancel",
        },
        { 
          text: "Aceptar", 
          onPress: () => setFinishWithdraw(true) 
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center", gap: 20 }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          Recargue su saldo ganado
        </Text>
        <Text style={{ color: "#6F6F6F", fontWeight: "semibold" }}>
          Seleccione el metodo de pago
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: "Binance", value: "binance" },
            { label: "Pago Movíl", value: "pagomovil" },
          ]}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
          }}
          placeholder={{ label: "Eliga una opcion...", value: null }}
        />
        <Text style={{ color: "#6F6F6F", fontWeight: "semibold", fontSize: 20 }}>{`Saldo generado: `}<Text style={{color: "#39B97C"}}>{`$${"125.5"}`}</Text></Text>
        {selectedValue === "binance" ? (
          <View style={{ height: 250, width: "100%", justifyContent: "center", alignItems: "center", gap: 15 }}>
            <Text style={{textAlign: "center", fontSize: 20, color: "#6F6F6F"}}>Método de pago con Binance</Text>
            <Text style={{textAlign: "center", width: 350, fontSize: 18, color: "#6F6F6F"}}>Verifique que sus datos sean correctos</Text>
            <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Su numero de ID Binance Pay:</Text>
            <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>123 456 789</Text>
          </View>
        ) : selectedValue === "pagomovil" ? (
            <View style={{ height: 250, width: "100%", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <Text style={{textAlign: "center", fontSize: 20, color: "#6F6F6F"}}>Método de pago con Pago Movíl</Text>
            <Text style={{textAlign: "center", width: 350, fontSize: 18, color: "#6F6F6F"}}>Verifique que sus datos sean correctos</Text>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Codigo del banco:</Text>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}><Text style={{fontSize: 20, fontWeight: "bold"}}>{"191"}</Text></Text>
            </View>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Numero de cedula:</Text>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}><Text style={{fontSize: 20, fontWeight: "bold"}}>{"22950764"}</Text></Text>
            </View>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Telefono asociado:</Text>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}><Text style={{fontSize: 20, fontWeight: "bold"}}>{"4144666881"}</Text></Text>
            </View>
          </View>
        ) : null}
        <View style={{ flexDirection: "row", gap: 20 }}>
          <BigButton
            onPress={continueOperation}
            style={{ backgroundColor: "#39B97C", width: 140 }}
            children={"Siguiente"}
          />
          <BigButton
            style={{ backgroundColor: "#F24643", width: 140 }}
            onPress={() => router.replace("/screens/main/withdraw")}
            children={"Cancelar"}
          />
        </View>
      </View>
      <SmallModalComponent
      isVisible={finishWithdraw}
      setIsVisible={setFinishWithdraw}
      containerStyles={{ height: 250 }}
      >
        <View style={{alignItems: "center", gap: 20}}>
            <Text style={{fontSize: 20, color: "#6F6F6F", marginTop: 25, textAlign: "center"}}>
                Retiro completada, revise su cuenta de depositos.
            </Text>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
              <Text style={{fontSize: 20, color: "#6F6F6F", textAlign: "center"}}>
                  Saldo retirado:
              </Text>
              <Text style={{fontSize: 25, color: "#39B97C", textAlign: "center"}}>
                  {`$125.5`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <BigButton
                    onPress={() => setFinishWithdraw(false)}
                    style={{ backgroundColor: "#39B97C", width: 140 }}
                    children={"Finalizar"}
                />
            </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default WithdrawPage;

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
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
