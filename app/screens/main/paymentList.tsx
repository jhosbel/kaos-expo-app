import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { useQuery } from "@apollo/client";
import { GET_USERS_DEPOSITS } from "@/graphql/queries";
import SmallModalComponent from "@/components/SmallModalComponent";
import BigButton from "@/components/BigButton";
import UserPayments from "@/components/UserPayments";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

const PaymentList = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS_DEPOSITS, {
    fetchPolicy: "no-cache"
  });

  console.log("Pagos de usuarios: ", data?.UsersDeposits);

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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{color: "#6F6F6F"}}>Usuario</Text>
          <Text style={{color: "#6F6F6F"}}>Deposito</Text>
          <Text style={{color: "#6F6F6F"}}>Estatus</Text>
        </View>
        {data &&
          data?.UsersDeposits?.map((deposit: any, i: any) => (
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
      </View>
    </View>
  );
};

export default PaymentList;

const styles = StyleSheet.create({});
