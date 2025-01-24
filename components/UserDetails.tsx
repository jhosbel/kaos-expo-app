import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextField } from "react-native-ui-lib";
import SmallModalComponent from "./SmallModalComponent";
import BigButton from "./BigButton";

const UserDetails = ({ name, usdBalance, crdBalance, userId }: any) => {
  const [showUser, setShowUser] = useState(false);
  const [banear, setBanear] = useState(false);
  const [confirmBan, setConfirmBan] = useState(false);
  const [finishBan, setFinishBan] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [finishDelete, setFinishDelete] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowUser(true)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: 35,
            backgroundColor: "#F8F8F8",
            elevation: 10,
            marginTop: 5,
          }}
        >
          <Text style={{ width: 25, textAlign: "center" }}>Ver</Text>
          <Text style={{ width: 80, textAlign: "center" }}>{name}</Text>
          <Text style={{ color: "#39B97C" }}>{`${usdBalance}`}</Text>
          <Text
            style={{ textAlign: "center", color: "#F15C26" }}
          >{`${crdBalance}`}</Text>
        </View>
      </TouchableOpacity>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={showUser}
        setIsVisible={setShowUser}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10, padding: 10 }}
        >
          <Text style={{ fontSize: 20 }}>ID del usuario: {userId}</Text>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          <Text style={{ fontSize: 20 }}>Saldo USD: <Text style={{ color: "#39B97C" }}>${usdBalance}</Text></Text>
          <Text style={{ fontSize: 20 }}>Saldo Crd: <Text style={{ color: "#F15C26" }}>{crdBalance}</Text></Text>
          <View style={{ flexDirection: "row", gap: 25 }}>
            <TouchableOpacity
              onPress={() => setBanear(true)}
              style={{
                width: 100,
                height: 35,
                backgroundColor: "#39B97C",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Banear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteUser(true)}
              style={{
                width: 100,
                height: 35,
                backgroundColor: "#F24643",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          <BigButton
            onPress={() => setShowUser(false)}
            style={{ backgroundColor: "#F24643" }}
            children={"Volver"}
          />
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 250 }}
        isVisible={banear}
        setIsVisible={setBanear}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
            }}
          >
            Banear usuario
          </Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              Ingrese el ID:
            </Text>
            <TextField
              placeholder={"86513518123135135"}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setConfirmBan(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Continuar"}
            />
            <BigButton
              onPress={() => setBanear(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={confirmBan}
        setIsVisible={setConfirmBan}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
              textAlign: "center",
              width: 300,
            }}
          >
            Seguro que desea banear este usuario?
          </Text>
          <Text style={{ fontSize: 20, color: "#6F6F6F" }}>GlaciusTwo.</Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setFinishBan(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Banear"}
            />
            <BigButton
              onPress={() => setConfirmBan(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={finishBan}
        setIsVisible={setFinishBan}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
              textAlign: "center",
              width: 300,
            }}
          >
            Usuario baneado con exito
          </Text>
          <Text style={{ fontSize: 20, color: "#6F6F6F" }}>GlaciusTwo.</Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setFinishBan(false)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Finalizar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={deleteUser}
        setIsVisible={setDeleteUser}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
            }}
          >
            Eliminar usuario
          </Text>

          <View style={{ flexDirection: "row", width: 350, gap: 10 }}>
            <Text style={{ fontSize: 20, color: "6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 20, color: "6F6F6F" }}>
              Ingrese el ID:
            </Text>
            <TextField
              placeholder={"86513518123135135"}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 4,
                fontSize: 20,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setConfirmDelete(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Continuar"}
            />
            <BigButton
              onPress={() => setDeleteUser(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={confirmDelete}
        setIsVisible={setConfirmDelete}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
              textAlign: "center",
              width: 300,
            }}
          >
            Seguro que desea eliminar este usuario?
          </Text>
          <Text style={{ fontSize: 20, color: "#6F6F6F" }}>GlaciusTwo.</Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setFinishDelete(true)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Eliminar"}
            />
            <BigButton
              onPress={() => setConfirmDelete(false)}
              style={{ backgroundColor: "#F24643", width: 140 }}
              children={"Cancelar"}
            />
          </View>
        </View>
      </SmallModalComponent>
      <SmallModalComponent
        containerStyles={{ height: 280 }}
        isVisible={finishDelete}
        setIsVisible={setFinishDelete}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 30,
              fontWeight: "semibold",
              marginTop: 20,
              textAlign: "center",
              width: 300,
            }}
          >
            Usuario eliminado con exito
          </Text>
          <Text style={{ fontSize: 20, color: "#6F6F6F" }}>GlaciusTwo.</Text>
          <View style={{ flexDirection: "row", width: 350 }}>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              ID del usuario:
            </Text>
            <Text style={{ fontSize: 20, color: "#6F6F6F" }}>
              {"7520453512485314138451354853"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 350,
            }}
          >
            <BigButton
              onPress={() => setFinishDelete(false)}
              style={{ backgroundColor: "#39B97C", width: 140 }}
              children={"Finalizar"}
            />
          </View>
        </View>
      </SmallModalComponent>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({});
