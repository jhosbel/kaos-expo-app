import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import RNPickerSelect from "react-native-picker-select";
import { TextField } from "react-native-ui-lib";
import BigButton from "@/components/BigButton";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_BANKS, GET_USER_BY_EMAIL } from "@/graphql/queries";
import { ASSIGN_BANK_TO_USER } from "@/graphql/mutations";
import { useAuth } from "@/context/AuthContext";
import SmallModalComponent from "@/components/SmallModalComponent";
import AddBankToUser from "@/components/AddBankToUser";
import BankInfo from "@/components/BankInfo";

const UserBankData = () => {
  const { dataUser } = useAuth();
  const { data: userData, refetch: refetchUserData } = useQuery(
    GET_USER_BY_EMAIL,
    {
      variables: { email: dataUser },
      fetchPolicy: "no-cache",
    }
  );
  const [open, setOpen] = useState(false);

  console.log("Datos: ", userData);

  return (
    <View style={{ height: "100%" }}>
      <NavBar />
      <View style={{ height: "100%", alignItems: "center", gap: 10 }}>
        <Text
          style={{
            fontSize: 25,
            color: "#6F6F6F",
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
            width: 300,
          }}
        >
          Agregue sus datos bancarios para retiro y deposito
        </Text>
        <Text
          style={{ fontSize: 18, color: "#6F6F6F", fontWeight: "semibold" }}
        >
          Seleccione el banco con el que usted trabaja
        </Text>
        <BigButton
          onPress={() => setOpen(true)}
          style={{ backgroundColor: "#39B97C" }}
          children={"Agregar nuevo Banco"}
        />
        <ScrollView style={{ height: 330 }}>
          {userData?.userByEmail
            ? userData.userByEmail.banks.map((bank: any, i: any) => (
                <View key={i}>
                  <BankInfo
                    bankName={bank.bankName}
                    binancePay={bank.binancePayId}
                    userBankPhone={bank.userBankPhone}
                    bankCode={bank.bankCode}
                    userDniBank={bank.userDniBank}
                  />
                </View>
              ))
            : []}
        </ScrollView>
      </View>
      <SmallModalComponent
        isVisible={open}
        setIsVisible={setOpen}
        containerStyles={{ height: 650 }}
      >
        <AddBankToUser
          setOpen={setOpen}
          userEmail={userData?.userByEmail?.id}
          refetchUserData={refetchUserData}
        />
      </SmallModalComponent>
    </View>
  );
};

export default UserBankData;

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
