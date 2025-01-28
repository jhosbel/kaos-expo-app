import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeSplash from "@/components/WelcomeSplash";

export default function index() {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {isShowSplash ? <WelcomeSplash /> : <Redirect href={"/(tabs)/login"} />}
      </View>
    </SafeAreaView>
  );
}
