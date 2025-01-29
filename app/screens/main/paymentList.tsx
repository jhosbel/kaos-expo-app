import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { useQuery } from "@apollo/client";
import { GET_USERS_DEPOSITS } from "@/graphql/queries";
import RNPickerSelect from "react-native-picker-select";
import UserPayments from "@/components/UserPayments";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const PaymentList = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS_DEPOSITS, {
    fetchPolicy: "no-cache",
  });
  const [selectedValue, setSelectedValue] = useState();
  const [nameFilter, setNameFilter] = useState("");

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    console.error("Error en la consulta Payment List: ", error);
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
      <View style={{ width: 350 }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          Depositos de los usuarios
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: "Todos", value: "" },
            { label: "Pendientes", value: "PENDING" },
            { label: "Finalizados", value: "FINISH" },
          ]}
          placeholder={{color: "#6F6F6F", label: "Filtrar por estatus...", value: null }}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "#6F6F6F",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Filtrar por nombre"
          value={nameFilter}
          onChangeText={(text) => setNameFilter(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ color: "#6F6F6F" }}>Usuario</Text>
          <Text style={{ color: "#6F6F6F" }}>Deposito</Text>
          <Text style={{ color: "#6F6F6F" }}>Estatus</Text>
        </View>

        <ScrollView style={{ height: 435 }}>
          {data &&
            data?.UsersDeposits?.filter((deposit: any) => {
              const nameMatch = deposit.user.name
                .toLowerCase()
                .includes(nameFilter.toLowerCase());
              const statusMatch = selectedValue
                ? deposit.rol === selectedValue
                : true;
              return nameMatch && statusMatch;
            }).map((deposit: any, i: any) => (
              <View key={i}>
                <UserPayments
                  name={deposit.user.name}
                  email={deposit.user.email}
                  deposit={deposit.deposit}
                  rol={deposit.rol}
                  crdBalance={deposit.user.crdBalance}
                  usdBalance={deposit.user.usdBalance}
                  phone={deposit.user.phone}
                  image={deposit.depositImage}
                  userId={deposit.user.id}
                  depositId={deposit.id}
                  refetch={refetch}
                />
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PaymentList;

const styles = StyleSheet.create({});
