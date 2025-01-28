import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import BigButton from "@/components/BigButton";
import SmallModalComponent from "@/components/SmallModalComponent";
import * as ImagePicker from 'expo-image-picker';

const RechargePage = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("");
  const [amount, setAmount] = useState("");
  const [sure, setSure] = useState(false)
  const [imgLoad, setimgLoad] = useState(false)
  const [finishRecharge, setFinishRecharge] = useState(false)
  const [image, setImage] = useState<string | null>(null);
  const [codeBank, setCodeBank] = useState("")
  const [dniNum, setDniNum] = useState("")
  const [phoneUser, setPhoneUser] = useState("")

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Se requiere permiso para acceder a las imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const closeAll = () => {
    setFinishRecharge(false)
    setimgLoad(false)
    setSure(false )
  }

  console.log(codeBank)
  console.log("Saldo: ", amount)

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
          Recargue sus creditos
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
        <Text style={{ color: "#6F6F6F", fontWeight: "semibold" }}>
          Saldo que desea recargar
        </Text>
        <TextField
          style={{
            backgroundColor: "#fff",
            width: 200,
            borderRadius: 5,
            height: 40,
            fontSize: 20,
            padding: 10,
          }}
          keyboardType={"number-pad"}
          value={amount}
          onChangeText={setAmount}
        />
        {selectedValue === "binance" ? (
          <View style={{ height: 250, width: "100%", justifyContent: "center", alignItems: "center", gap: 15 }}>
            <Text style={{textAlign: "center", fontSize: 20, color: "#6F6F6F"}}>Método de pago con Binance</Text>
            <Text style={{textAlign: "center", width: 350, fontSize: 18, color: "#6F6F6F"}}>A continuacion, el id al cual tiene que transferir el dinero para hacer la recarga</Text>
            <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Numero de ID Binance Pay:</Text>
            <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>123 456 789</Text>
            <Text style={{width: 330, fontSize: 20, textAlign: "center", color: "#F24643"}}>Recuerde tomar capture de su transaccion para que podamos verificar su deposito</Text>
          </View>
        ) : selectedValue === "pagomovil" ? (
            <View style={{ height: 250, width: "100%", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <Text style={{textAlign: "center", fontSize: 20, color: "#6F6F6F"}}>Método de pago con Pago Movíl</Text>
            <Text style={{textAlign: "center", width: 350, fontSize: 18, color: "#6F6F6F"}}>A continuacion los datos requieridos para la trasferencia</Text>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Codigo del banco:</Text>
                <TextField value={codeBank} onChangeText={setCodeBank} keyboardType={"number-pad"} style={{width: 140, height: 30, backgroundColor: "#fff", borderRadius: 5, padding: 10}} />
            </View>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Numero de cedula:</Text>
                <TextField value={dniNum} onChangeText={setDniNum} keyboardType={"number-pad"} style={{width: 140, height: 30, backgroundColor: "#fff", borderRadius: 5, padding: 10}} />
            </View>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                <Text style={{textAlign: "center", fontSize: 18, color: "#6F6F6F"}}>Telefono asociado:</Text>
                <TextField value={phoneUser} onChangeText={setPhoneUser} keyboardType={"number-pad"} style={{width: 140, height: 30, backgroundColor: "#fff", borderRadius: 5, padding: 10}} />
            </View>
          </View>
        ) : null}
        <View style={{ flexDirection: "row", gap: 20 }}>
          <BigButton
            onPress={() => setSure(true)}
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
        isVisible={sure}
        setIsVisible={setSure}
        containerStyles={ selectedValue === "binance" ? { height: 280 } : selectedValue === "pagomovil" ? {height: 360} : null }
      >
        <View style={{ gap: 15, alignItems: "center" }}>
            <Text style={{fontSize: 20, color: "#6F6F6F", marginTop: 25}}>
                Esta seguro de su transaccion?
            </Text>
            {
                selectedValue === "binance" ? (
                    <View>
                        <Text style={{fontSize: 15}}>{`Metodo de pago: ${selectedValue === "binance" ? "Binance" : null}`}</Text>
                        <Text style={{fontSize: 15}}>{`Monto a recargar: ${amount}`}</Text>
                        <Text style={{width: 320, fontSize: 20, textAlign: "center", color: "#F24643"}}>Recuerde tomar capture de su transaccion para que podamos verificar su deposito</Text>
                    </View>
                ) :
                selectedValue === "pagomovil" ? (
                    <View style={{alignItems: "center"}}>
                        <Text style={{fontSize: 15}}>{`Metodo de pago: ${selectedValue === "pagomovil" ? "Pago Movíl" : null}`}</Text>
                        <Text style={{fontSize: 15}}>{`Monto a recargar: ${amount}`}</Text>
                        <Text style={{fontSize: 15}}>{`Codigo del banco: ${codeBank}`}</Text>
                        <Text style={{fontSize: 15}}>{`Numero de cedula: ${dniNum}`}</Text>
                        <Text style={{fontSize: 15}}>{`Telefono asociado: ${phoneUser}`}</Text>
                        <Text style={{width: 320, fontSize: 20, textAlign: "center", color: "#F24643"}}>Recuerde tomar capture de su transaccion para que podamos verificar su deposito</Text>
                    </View>
                ) : null
            }
            <View style={{ flexDirection: "row", gap: 20 }}>
            <BigButton
                style={{ backgroundColor: "#39B97C", width: 140 }}
                onPress={() => setimgLoad(true)}
                children={"Siguiente"}
            />
            <BigButton
                style={{ backgroundColor: "#F24643", width: 140 }}
                onPress={() => setSure(false)}
                children={"Cancelar"}
            />
            </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
      isVisible={imgLoad}
      setIsVisible={setimgLoad}
      >
        <View style={{alignItems: "center", gap: 30}}>
            <Text style={{fontSize: 20, color: "#6F6F6F", marginTop: 25}}>
                Cargue el capture de su trasferencia
            </Text>
            <View style={{}}>
                <Button title="Seleccionar imagen" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <BigButton
                    onPress={() => setFinishRecharge(true)}
                    style={{ backgroundColor: "#39B97C", width: 140 }}
                    children={"Siguiente"}
                />
                {/* <BigButton
                    style={{ backgroundColor: "#F24643", width: 140 }}
                    onPress={() => setimgLoad(false)}
                    children={"Cancelar"}
                /> */}
            </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
      isVisible={finishRecharge}
      setIsVisible={setFinishRecharge}
      containerStyles={{ height: 200 }}
      >
        <View style={{alignItems: "center", gap: 30}}>
            <Text style={{fontSize: 20, color: "#6F6F6F", marginTop: 25, textAlign: "center"}}>
                Recarga completada, pronto su saldo aparecera en su interfaz
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <BigButton
                    onPress={closeAll}
                    style={{ backgroundColor: "#39B97C", width: 140 }}
                    children={"Finalizar"}
                />
            </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default RechargePage;

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
